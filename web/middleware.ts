import { NextRequest, NextResponse } from 'next/server';

const protectedROutes = [
  '/dashboard',
  '/profile',
  '/profile/settings',
  '/trades',
  '/messages',
  '/notifications',
  '/credits',
  '/marketplace',
];

const authROutes = ['/auth'];

export function middleware (req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get('session')?.value;

  const isProtected = protectedROutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authROutes.some((route) => pathname.startsWith(route));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|img).*)'],
}