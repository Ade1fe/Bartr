import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "./firebase-admin";


export async function verifyToken(req: NextRequest) {
  const header = req.headers.get("Authorization");
  if (!header?.startsWith('Bearer ')) {
    throw new AuthError('Missing or malformed Authorization header');
  }
  const token = header.split('Bearer ')[1];
  try {
    return await adminAuth.verifyIdToken(token);
  }
  catch {
    throw new AuthError('Invalid or expired token');
  }
}


export async function requireAdmin(req: NextRequest) {
  const decoded = await verifyToken(req);
  if (!decoded.admin) {
    throw new AuthError('Admin access required');
  }
  return decoded;
}


export class AuthError extends Error {
  status = 401;
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}