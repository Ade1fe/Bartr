import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { verifyAdminToken } from "@/lib/admin-auth";
import { handleApiError, AppError } from "@/lib/errors";
import { z } from "zod";

const schema = z.object({ decision: z.enum(['verified', 'rejected']) });

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await verifyAdminToken(req);
    const { decision } = schema.parse(await req.json());
    const { id } = await params;

    const userRef = adminDb.collection('users').doc(id);
    const userSnap = await userRef.get();
    if (!userSnap.exists) throw new AppError('User not found', 404);

    await userRef.update({
      verificationStatus: decision === 'verified' ? 'verified' : 'none',
      lastVerificationReviewedBy: admin.uid,
      lastVerificationReviewedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true, verificationStatus: decision === 'verified' ? 'verified' : 'none' });
  }
  catch (err) {
    return handleApiError(err);
  }
}