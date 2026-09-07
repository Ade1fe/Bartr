import { NextRequest } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import { AppError } from '@/lib/errors';

export async function verifyAdminToken(req: NextRequest) {
  const sessionCookie = req.cookies.get('session')?.value;
  if (!sessionCookie) throw new AppError('Not authenticated', 401);

  const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
  if (decoded.admin !== true) {
    throw new AppError('Not found', 404);
  }

  return decoded;
}