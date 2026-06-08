import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase-admin";
import { verifyToken } from "@/lib/auth";
import { handleApiError, AppError } from "@/lib/errors";
import { updateListingInIndex } from "@/lib/algolia";
import { z } from "zod";

const updateListingSchema = z.object({
  listingId: z.string().min(1, 'Listing ID is required '),
  title: z.string().min(3).max(100).optional(),
  description: z.string().min(10).max(1000).optional(),
  category: z.enum(['electronics', 'furniture', 'clothing', 'books', 'tools', 'sports', 'food', 'collectibles', 'other']).optional(),
  offerTags: z.array(z.string().min(1).max(30)).min(1).max(10).optional(),
  wantTags: z.array(z.string().min(1).max(30)).min(1).max(10).optional(),
  creditValue: z.number().int().min(0).max(50000).optional(),
  condition: z.enum(['new', 'like_new', 'good', 'fair', 'poor']).optional(),
  photos: z.array(z.string().url()).min(1).max(5).optional(),
  status: z.enum(['active', 'in_trade', 'deleted', 'closed']).optional(),
})


export async function PUT(req: NextRequest) {
  try {
    const decoded = await verifyToken(req);
    const userId = decoded.uid;

    const body = await req.json();
    const { listingId, ...updates } = updateListingSchema.parse(body);

    if (Object.keys(updates).length === 0) {
      throw new AppError('No update fields provided', 400);
    }

    const listingRef = adminDb.collection('listings').doc(listingId);
    const listingSnap = await listingRef.get();

    if (!listingSnap.exists) {
      throw new AppError('Listing not found', 404);
    }

    const listing = listingSnap.data()!;

    if (listing.userId !== userId) {
      throw new AppError('You do not have permission to update this listing', 403);
    }

    if (listing.status === 'in_trade' && updates.status !== 'in_trade') {
      throw new AppError('This listing is currently part of an active trade and cannot be edited', 400);
    }

    if (listing.status === 'deleted') {
      throw new AppError('This listing has been deleted and cannot be updated', 400);
    }

    const firestoreUpdate: Record<string, unknown> = {
      updatedAt: FieldValue.serverTimestamp(),
    }

    if (updates.title !== undefined) firestoreUpdate.title = updates.title;
    if (updates.description !== undefined) firestoreUpdate.description = updates.description;
    if (updates.category !== undefined) firestoreUpdate.category = updates.category;
    if (updates.offerTags !== undefined) firestoreUpdate.offerTags = updates.offerTags;
    if (updates.wantTags !== undefined) firestoreUpdate.wantTags = updates.wantTags;
    if (updates.creditValue !== undefined) firestoreUpdate.creditValue = updates.creditValue;
    if (updates.condition !== undefined) firestoreUpdate.condition = updates.condition;
    if (updates.photos !== undefined) firestoreUpdate.photos = updates.photos;
    if (updates.status !== undefined) firestoreUpdate.status = updates.status;

    await listingRef.update(firestoreUpdate);

    const algoliaUpdates: Record<string, unknown> = {};

    if (updates.title !== undefined) algoliaUpdates.title = updates.title;
    if (updates.description !== undefined) algoliaUpdates.description = updates.description;
    if (updates.category !== undefined) algoliaUpdates.category = updates.category;
    if (updates.offerTags !== undefined) algoliaUpdates.offerTags = updates.offerTags;
    if (updates.wantTags !== undefined) algoliaUpdates.wantTags = updates.wantTags;
    if (updates.creditValue !== undefined) algoliaUpdates.creditValue = updates.creditValue;
    if (updates.condition !== undefined) algoliaUpdates.condition = updates.condition;
    if (updates.status !== undefined) algoliaUpdates.status = updates.status;

    if (Object.keys(algoliaUpdates).length > 0) {
      await updateListingInIndex(listingId, algoliaUpdates);
    }

    const updateSnap = await listingRef.get();
    const updatedListing = { id: listingId, ...updateSnap.data() };

    return NextResponse.json({updatedListing});
  }
  catch (err) {
    return handleApiError(err);
  }
}