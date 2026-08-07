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

  console.log("Session:", session);

  if (pathname === '/') {
    if (session?.otpVerified) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    return NextResponse.redirect(new URL('/home', req.url));
  }

  
  if (pathname === '/home' && session?.otpVerified) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  const isProtected = protectedROutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authROutes.some((route) => pathname.startsWith(route));
  const isVerifyEmailROute = pathname.startsWith(verifyEmailRoute);

  if (!session) {
    if (isProtected || isVerifyEmailROute) {
      const url = new URL('/auth', req.url);
      url.searchParams.set('reason', 'unauthenticated');
      return NextResponse.redirect(url);
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























// import { NextRequest, NextResponse } from 'next/server';
// import { jwtVerify } from 'jose';

// const protectedRoutes = [
//   '/dashboard',
//   '/profile',
//   '/profile/settings',
//   '/trades',
//   '/messages',
//   '/notifications',
//   '/credits',
//   '/marketplace',
//   '/onboarding',
// ];

// const authRoutes = ['/auth'];
// const verifyEmailRoute = '/verify-email';

// const secret = new TextEncoder().encode(process.env.SESSION_SECRET!);

// async function readSession(token: string | undefined) {
//   if (!token) return null;
//   try {
//     const { payload } = await jwtVerify(token, secret);
//     return payload as { uid: string; emailVerified?: boolean; otpVerified?: boolean };
//   }
//   catch {
//     return null;
//   }
// }

// export async function proxy(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   const token = req.cookies.get('session')?.value;
//   const session = await readSession(token);

//   console.log('Session:', session);

//   if (pathname === '/' || pathname === '/home') {
//     if (session?.emailVerified) {
//       console.log('Email verified? ', session.emailVerified);
//       return NextResponse.redirect(new URL('/dashboard', req.url));
//     }
//     return NextResponse.redirect(new URL('/home', req.url));
//   }

//   const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
//   const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
//   const isVerifyEmailRoute = pathname.startsWith(verifyEmailRoute);

//   if (!session) {
//     if (isProtected || isVerifyEmailRoute) {
//       const url = new URL('/auth', req.url);
//       url.searchParams.set('reason', 'unauthenticated');
//       return NextResponse.redirect(url);
//     }
//     return NextResponse.next();
//   }

//   if (!session.emailVerified) {
//     if (isProtected) {
//       return NextResponse.redirect(new URL('/verify-email', req.url));
//     }
//     if (isAuthRoute) {
//       return NextResponse.redirect(new URL('/verify-email', req.url));
//     }
//     return NextResponse.next();
//   }

//   if (isVerifyEmailRoute || isAuthRoute) {
//     return NextResponse.redirect(new URL('/dashboard', req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/((?!_next/static|_next/image|favicon.ico|img).*)'],
// };