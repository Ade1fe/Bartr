import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { verifyAdminToken } from "@/lib/admin-auth";
import { handleApiError } from "@/lib/errors";

export async function GET(req: NextRequest) {
  try {
    await verifyAdminToken(req);

    const snap = await adminDb.collection('users')
      .where('verificationStatus', '==', 'pending')
      .orderBy('createdAt', 'asc') // oldest submissions reviewed first
      .limit(50)
      .get();

    const users = snap.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
    return NextResponse.json({ users });
  }
  catch (err) {
    return handleApiError(err);
  }
}