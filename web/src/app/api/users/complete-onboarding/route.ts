import { adminDb } from "@/lib/firebase-admin";
import { verifyToken } from "@/lib/auth";
import { handleApiError } from "@/lib/errors";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const decoded = await verifyToken(req);
    const userId = decoded.uid;

    await adminDb.collection('users').doc(userId).set(
      { onboardingComplete: true },
      { merge: true }
    );

    return NextResponse.json({ onboardingComplete: true });
  }
  catch (e) {
    return handleApiError(e);
  }
}