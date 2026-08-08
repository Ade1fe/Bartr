import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase-admin";
import { verifyToken } from "@/lib/auth";
import { handleApiError, AppError } from "@/lib/errors";
import { deleteListingFromIndex } from "@/lib/algolia";
import { z } from "zod";

const deleteListingSchema = z.object({
  listingId: z.string().min(1, 'Listing ID is required '),
});


export async function DELETE(req: NextRequest) {
  try {
    const decoded = await verifyToken(req);
    const userId = decoded.uid;

    const body = await req.json();
    const { listingId } = deleteListingSchema.parse(body);

    const listingRef = adminDb.collection('listings').doc(listingId);
    const listingSnap = await listingRef.get();

    if (!listingSnap.exists) {
      throw new AppError('Listing not found', 404);
    }

    const listing = listingSnap.data()!;

    const isAdmin = decoded.admin === true;
    if (listing?.userId !== userId && !isAdmin) {
      throw new AppError('You do not have permission to delete this listing', 403);
    }

    if (listing.status === 'in_trade') {
      throw new AppError('This listing is currently part of an active trade. ' +
        'You can delete it once the trade is completed or cancelled.', 400);
    }


    if (listing.status === 'deleted') {
      throw new AppError('This listing has already been deleted', 400);
    }


    await listingRef.update({
      status: 'deleted',
      deletedAt: FieldValue.serverTimestamp(),
      deletedBy: userId,
      updatedAt: FieldValue.serverTimestamp(),
    })

    try {
      await deleteListingFromIndex(listingId);
    }
    catch (err) {
      console.error(`[listings/delete] Algolia sync failed for ${listingId}`, err);
    }

    return NextResponse.json({ success: true, message: 'Listing deleted successfully' });
  }
  catch (err) {
    return handleApiError(err);
  }
}