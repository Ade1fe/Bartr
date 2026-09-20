import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase-admin";
import { verifyToken } from "@/lib/auth";
import { handleApiError, AppError } from "@/lib/errors";
import { updateListingInIndex } from "@/lib/algolia";
import { computeCreditValue } from "@/types/credits";
import { enqueueForReview } from "@/lib/moderation";
import { updateListingSchema } from "@/lib/validators";


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

    const contentChanged = 
      (updates.title !== undefined && updates.title !== listing.title) ||
      (updates.description !== undefined && updates.description !== listing.description) ||
      (updates.photos !== undefined && JSON.stringify(updates.photos) !== JSON.stringify(listing.photos));

    
    // const effectiveListingType = updates.listingType ?? listing.listingType ?? 'good';
    const switchingToGood = updates.listingType === 'good' && listing.listingType !== 'good';
    const switchingToService = updates.listingType === 'service' && listing.listingType !== 'service';

    if (switchingToGood && updates.condition === undefined) {
      throw new AppError(`Condition is required when switching a listing to "good"`, 400);
    }
    if (switchingToService && (updates.tradeType === undefined || updates.availability === undefined)) {
      throw new AppError(`Trade type and availability are required when switching a listing to 'service'`, 400);
    }
    

    const firestoreUpdate: Record<string, unknown> = {
      updatedAt: FieldValue.serverTimestamp(),
    }

    if (updates.title !== undefined) firestoreUpdate.title = updates.title;
    if (updates.description !== undefined) firestoreUpdate.description = updates.description;
    if (updates.category !== undefined) firestoreUpdate.category = updates.category;
    if (updates.offerTags !== undefined) firestoreUpdate.offerTags = updates.offerTags;
    if (updates.wantTags !== undefined) firestoreUpdate.wantTags = updates.wantTags;
    if (updates.condition !== undefined) firestoreUpdate.condition = updates.condition;
    if (updates.photos !== undefined) firestoreUpdate.photos = updates.photos;
    if (updates.status !== undefined) firestoreUpdate.status = updates.status;
    if (updates.listingType !== undefined) firestoreUpdate.listingType = updates.listingType;

    if (updates.condition !== undefined) firestoreUpdate.condition = updates.condition;
    if (updates.tradeType !== undefined) firestoreUpdate.tradeType = updates.tradeType;
    if (updates.availability !== undefined) firestoreUpdate.availability = updates.availability;
    if (updates.deliveryDuration !== undefined) firestoreUpdate.deliveryDuration = updates.deliveryDuration;


    // Clear the fields that no longer apply on a type switch, so a
    // listing doesn't end up with e.g. both `condition` and `tradeType`
    // set from before and after a good <-> service change.
    if (switchingToGood) {
      firestoreUpdate.tradeType = FieldValue.delete();
      firestoreUpdate.availability = FieldValue.delete();
      firestoreUpdate.deliveryDuration = FieldValue.delete();
    }
    if (switchingToService) {
      firestoreUpdate.condition = FieldValue.delete();
    }


    let creditValue: number | undefined;
    if (updates.estimatedValue !== undefined) {
      creditValue = computeCreditValue(updates.estimatedValue);
      firestoreUpdate.estimatedValue = updates.estimatedValue;
      firestoreUpdate.creditValue = creditValue;
    }

    if (contentChanged) {
      firestoreUpdate.status = 'pending_moderation';
    }

    await listingRef.update(firestoreUpdate);

    const finalStatus = (firestoreUpdate.status as string | undefined) ?? listing.status;

    if (contentChanged) {
      try {
        await enqueueForReview(listingId, 'edited_listing');
      }
      catch (queueErr) {
        console.error(`[listings/update] Failed to enqueue listing ${listingId} for review`, queueErr);
      }
    }

    const algoliaUpdates: Record<string, unknown> = {};

    if (updates.title !== undefined) algoliaUpdates.title = updates.title;
    if (updates.description !== undefined) algoliaUpdates.description = updates.description;
    if (updates.category !== undefined) algoliaUpdates.category = updates.category;
    if (updates.offerTags !== undefined) algoliaUpdates.offerTags = updates.offerTags;
    if (updates.wantTags !== undefined) algoliaUpdates.wantTags = updates.wantTags;
    if (creditValue !== undefined) algoliaUpdates.creditValue = creditValue;
    // if (updates.condition !== undefined) algoliaUpdates.condition = updates.condition;
    if (updates.status !== undefined) algoliaUpdates.status = updates.status;
    if (updates.listingType !== undefined) algoliaUpdates.listingType = updates.listingType;


    if (switchingToService) {
      algoliaUpdates.condition = null;
    }
    else if (updates.condition !== undefined) {
      algoliaUpdates.condition = updates.condition;
    }

    if (Object.keys(algoliaUpdates).length > 0) {
      try {
        await updateListingInIndex(listingId, algoliaUpdates);
      }
      catch (err) {
        console.error(`[listings/update] Algolia sync failed for ${listingId}`, err);
      }
    }

    const updateSnap = await listingRef.get();
    const updatedListing = { id: listingId, ...updateSnap.data() };

    return NextResponse.json({ updatedListing, status: finalStatus });
  }
  catch (err) {
    return handleApiError(err);
  }
}