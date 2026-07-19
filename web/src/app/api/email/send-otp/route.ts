import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase-admin";
import { verifyToken } from "@/lib/auth";
import { handleApiError, AppError } from "@/lib/errors";
import { generateOtp, hashOtp, otpExpiresAt } from "@/lib/otp";
import { resend, FROM_EMAIL } from "@/lib/resend";
import { email, z } from 'zod';

const schema = z.object({
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  try {
    const decoded = await verifyToken(req);
    const userId = decoded.uid;

    const { email } = schema.parse(await req.json());

    const userDoc = await adminDb.collection('users').doc(userId).get();
    const userData = userDoc.data();

    if (userData?.otpSendCount && userData?.otpWindowStart) {
      const windowStart = new Date(userData.otpWindowStart);
      const onHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      
      if (windowStart > onHourAgo && userData.otpSendCount >= 3) {
        throw new AppError('Too many OTP requests. Please wait before requesting another.', 400);
      }
    }

    const otp = generateOtp();
    const otpHash = hashOtp(otp);
    const expiresAt = otpExpiresAt();

    await adminDb.collection('users').doc(userId).update({
      pendingEmailVerification: email,
      otpHash,
      otpExpiresAt: expiresAt,
      otpAttempts: 0,
      otpSendCount: FieldValue.increment(1),
      otpWindowStart: userData?.otpWindowStart ?? new Date().toISOString(),
    })

    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Verify your Bartr email address',
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #1a1a18;">Verify your email</h2>
          <p style="color: #444;">Enter this code in the Bartr app to verify your email address:</p>
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

    return NextResponse.json({
      sent: true,
      expiresInSeconds: 10 * 60,
    })
  }
  catch (err) {
    handleApiError(err);
  }
}