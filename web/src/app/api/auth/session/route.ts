import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { verifyToken } from "@/lib/auth";
import { handleApiError, AppError } from "@/lib/errors";

const SESSION_EXPIRES_IN_MS = 60 * 60 * 24 * 7 * 1000;

export async function POST(req: NextRequest) {
  try {
    const decoded = await verifyToken(req);

    const idToken = req.headers.get('Authorization')?.split('Bearer ')[1];

    if (!idToken) {
      throw new AppError('Missing token', 401);
    }

    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: SESSION_EXPIRES_IN_MS,
    })

    const userSnap = await adminDb.collection('users').doc(decoded.uid).get();
    const onboardingComplete = userSnap.exists ? !!userSnap.data()?.onboardingComplete : false;

    const response = NextResponse.json({ success: true, onboardingComplete });
    
    response.cookies.set('session', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: SESSION_EXPIRES_IN_MS / 1000, // 7 days
      path: '/',
    })

    return response;
  }
  catch (err) {
    return handleApiError(err)
  }
}

export async function DELETE(req: NextRequest) {
  const response = NextResponse.json({ success: true })
  response.cookies.delete('session');
  return response;
}