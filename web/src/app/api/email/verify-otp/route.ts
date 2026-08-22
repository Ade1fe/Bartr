import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb, adminAuth } from "@/lib/firebase-admin";
import { verifyToken } from "@/lib/auth";
import { handleApiError, AppError } from "@/lib/errors";
import { isOtpExpired, verifyOtpHash, MAX_ATTEMPTS } from "@/lib/otp";
import { z } from 'zod';

const schema = z.object({
  otp: z.string().length(6, "OTP must be exactly 6 digits").regex(/^\d+$/, "OTP must contain only numbers"),
})

export async function POST(req: NextRequest) {
  try {
    const decoded = await verifyToken(req)
    const userId = decoded.uid;

    const { otp } = schema.parse(await req.json());

    const userRef = adminDb.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      throw new AppError("User not found", 404);
    }

    const user = userDoc.data()!;

    if (!user.otpHash || !user.pendingEmailVerification) {
      throw new AppError('No pending email verification found. Please request a new code.', 400);
    }

    if (isOtpExpired(user.otpExpiresAt)) {
      await userRef.update({
        otpHash: FieldValue.delete(),
        otpExpiresAt: FieldValue.delete(),
        otpAttempts: FieldValue.delete(),
        pendingEmailVerification: FieldValue.delete(),
      })
      throw new AppError('OTP has expired. Please request a new code.', 400);
    }

    const attempts = user.otpAttempts ?? 0;
    if (attempts >= MAX_ATTEMPTS) {
      throw new AppError('Maximum attempts exceeded. Please request a new verification code.', 400);
    }

    const isValid = verifyOtpHash(otp, user.otpHash);

    if (!isValid) {
      await userRef.update({
        otpAttempts: FieldValue.increment(1),
      });

      const remaining = MAX_ATTEMPTS - (attempts + 1);
      throw new AppError(`Invalid OTP. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining`, 400);
    }

    await userRef.update({
      emailVerified: true,
      email: user.pendingEmailVerification,
      pendingEmailVerification: FieldValue.delete(),
      otpHash: FieldValue.delete(),
      otpExpiresAt: FieldValue.delete(),
      otpAttempts: FieldValue.delete(),
      otpSendCount: FieldValue.delete(),
      otpWindowStart: FieldValue.delete(),
    })

    await adminAuth.setCustomUserClaims(userId, { otpVerified: true });

    return NextResponse.json({
      verified: true,
      email: user.pendingEmailVerification,
    })
  }
  catch (err) {
    return handleApiError(err);
  }
}