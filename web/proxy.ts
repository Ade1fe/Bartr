import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';

const protectedROutes = [
  '/dashboard',
  '/profile',
  '/profile/settings',
  '/trades',
  '/messages',
  '/notifications',
  '/credits',
  '/marketplace',
  '/onboarding',
];

const authROutes = ['/auth'];
const verifyEmailRoute = '/verify-email';

async function readSession(cookie: string | undefined) {
  if (!cookie) return null;
  try {
    const decoded = await adminAuth.verifySessionCookie(cookie, true);
    return {
      uid: decoded.uid,
      otpVerified: decoded.otpVerified === true,
    };
  }
  catch {
    return null;
  }
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const cookie = req.cookies.get('session')?.value;
  const session = await readSession(cookie);

  const isProtected = protectedROutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authROutes.some((route) => pathname.startsWith(route));
  const isVerifyEmailROute = pathname.startsWith(verifyEmailRoute);

  if (!session) {
    if (isProtected && isVerifyEmailROute) {
      return NextResponse.redirect(new URL('/auth', req.url));
    }
    return NextResponse.next();
  }

  if (!session.otpVerified) {
    if (isProtected || isAuthRoute) {
      return NextResponse.redirect(new URL('/verify-email', req.url));
    }
    return NextResponse.next();
  }

  if (isVerifyEmailROute || isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|img).*)'],
}