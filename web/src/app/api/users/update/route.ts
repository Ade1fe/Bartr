import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase-admin";
import { verifyToken } from "@/lib/auth";
import { handleApiError, AppError } from "@/lib/errors";
import { updateProfileSchema } from "@/lib/validators";


export async function PATCH(req: NextRequest) {
  try {
    const decoded = await verifyToken(req);
    const userId = decoded.uid;

    const body = await req.json();
    const validated = updateProfileSchema.parse(body);

    const userRef = adminDb.collection('users').doc(userId)
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      throw new AppError('User profile not found', 404);
    }

    const updates: Record<string, unknown> = {
      updatedAt: FieldValue.serverTimestamp(),
    }

    if (validated.displayName !== undefined) updates.displayName = validated.displayName
    if (validated.firstName !== undefined) updates.firstName = validated.firstName
    if (validated.lastName !== undefined) updates.lastName = validated.lastName
    if (validated.bio !== undefined) updates.bio = validated.bio
    if (validated.location !== undefined) updates.location = validated.location
    if (validated.profilePictureUrl !== undefined) updates.profilePictureUrl = validated.profilePictureUrl
    if (validated.phoneNumber !== undefined) updates.phoneNumber = validated.phoneNumber
    if (validated.accountType !== undefined) updates.accountType = validated.accountType

    await userRef.update(updates)

    const updatedSnap = await userRef.get();
    return NextResponse.json({ success: true, user: updatedSnap.data() })
  }
  catch (err) {
    return handleApiError(err)
  }
}