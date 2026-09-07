import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { verifyAdminToken } from "@/lib/admin-auth";
import { handleApiError, AppError } from "@/lib/errors";
import { z } from "zod";

const actionSchema = z.object({
  action: z.enum(['approve', 'reject']),
  actionTaken: z.enum(['none', 'listing_approved', 'listing_removed', 'user_warned', 'user_suspended']),
});

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const admin = await verifyAdminToken(req);
    const { action, actionTaken } = actionSchema.parse(await req.json());

    const queueRef = adminDb.collection('moderationQueue').doc(params.id);
    const queueSnap = await queueRef.get();
    if (!queueSnap.exists) throw new AppError('Queue item not found', 404);
    
    const queueItem = queueSnap.data()!;

    const newListingsStatus = action === 'approve' ? 'active' : 'hidden';

    await adminDb.collection('listings').doc(queueItem.listingId).update({
      status: newListingsStatus,
    });

    await queueRef.update({
      status: action === 'approve' ? 'approved' : 'rejected',
      actionTaken,
      reviewedAt: FieldValue.serverTimestamp(),
      reviewedBy: admin.uid,
    });

    if (actionTaken === 'user_warned' || actionTaken === 'user_suspended') {
      await adminDb.collection('users').doc(queueItem.listingOwnerId).update({
        ...(actionTaken === 'user_suspended' ? { isSuspended: 'suspended' } : {}),
        warningCount: FieldValue.increment(actionTaken === 'user_warned' ? 1 : 0),
      })

      if (actionTaken === 'user_suspended') {
        await adminAuth.setCustomUserClaims(queueItem.listingOwnerId, { suspended: true });
        await adminAuth.revokeRefreshTokens(queueItem.listingOwnerId);
      }
    }
  }
  catch (err) {
    return handleApiError(err);
  }
}