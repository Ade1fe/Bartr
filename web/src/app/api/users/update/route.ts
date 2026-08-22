import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase-admin";
import { verifyToken } from "@/lib/auth";
import { handleApiError, AppError } from "@/lib/errors";
import { z } from 'zod';
import { toast } from "sonner";

const updateProfileSchema = z.object({
  displayName: z.string().min(1).max(100).optional(),
  firstName: z.string().min(1).max(50).optional(),
  lastName: z.string().min(1).max(50).optional(),
  bio: z.string().max(300).optional(),
  location: z.string().max(100).optional(),
  profilePictureUrl: z.string().url().nullable().optional(),
  phoneNumber: z.string().optional(),
  accountType: z.enum(['individual', 'business']).optional(),
})


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
      toast.error('User profile not found');
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