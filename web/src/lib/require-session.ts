// src/lib/require-session.ts
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase-admin";
import { redirect } from "next/navigation";

export async function requireSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;

  if (!sessionCookie) redirect('/auth?reason=unauthenticated');

  try {
    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
    if (decoded.suspended) redirect('/suspended');
    if (!decoded.otpVerified) redirect('/verify-email');
    return decoded;
  }
  catch {
    redirect('/auth?reason=unauthenticated');
  }
}