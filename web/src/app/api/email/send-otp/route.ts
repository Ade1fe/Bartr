import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase-admin";
import { verifyToken } from "@/lib/auth";
import { handleApiError, AppError } from "@/lib/errors";
import { generateOtp, hashOtp, otpExpiresAt } from "@/lib/otp";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { z } from 'zod';
import { sendTransactionalEmail } from "@/lib/email";

const schema = z.object({
  email: z.string().email(),
});

const MAX_SENDS_PER_WINDOW = 3;
const WINDOW_MS = 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  try {
    const decoded = await verifyToken(req);
    const userId = decoded.uid;

    const { email } = schema.parse(await req.json());

    const userRef = adminDb.collection('users').doc(userId);
    const userDoc = await userRef.get();
    const userData = userDoc.data();

    const onHourAgo = new Date(Date.now() - WINDOW_MS);
    const windowExpired = !userData?.otpWindowStart || new Date(userData.otpWindowStart) <= onHourAgo;

    if (!windowExpired && (userData?.otpSendCount ?? 0) >= MAX_SENDS_PER_WINDOW) {
      throw new AppError('Too many OTP requests. Please wait before requesting another.', 400);
    }

    const otp = generateOtp();
    const otpHash = hashOtp(otp);
    const expiresAt = otpExpiresAt();

    await userRef.set({
      pendingEmailVerification: email,
      otpHash,
      otpExpiresAt: expiresAt,
      otpAttempts: 0,
      otpSendCount: windowExpired ? 1 : FieldValue.increment(1),
      otpWindowStart: windowExpired ? new Date().toISOString() : userData!.otpWindowStart,
    }, { merge: true });

    try {
      await sendTransactionalEmail({
        // from: FROM_EMAIL,
        to: email,
        subject: 'Verify your Swapwell email address',
        html: `
          <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
            <h2 style="color: #1a1a18; font-size="16px"">Verify your email</h2>
            <p style="color: #444;">Enter this code in the Swapwell app to verify your email address:</p>
            <div style="background: #f4f4f4; border-radius: 8px; padding: 24px; text-align: center; margin: 24px 0;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #1a1a18;">
                ${otp}
              </span>
            </div>
            <p style="color: #888; font-size: 14px;">
              This code expires in 10 minutes. If you did not request this, you can safely ignore this email.
            </p>
          </div>
        `,
      })
    }
    catch {
      throw new AppError('Failed to send verification code. Please try again in a moment.', 500)
    }

    return NextResponse.json({
      sent: true,
      expiresInSeconds: 10 * 60,
    })
  }
  catch (err) {
    return handleApiError(err);
  }
}