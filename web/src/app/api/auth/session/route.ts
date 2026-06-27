import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { handleApiError } from "@/lib/errors";

export async function POST(req: NextRequest) {
  try {
    const decoded = await verifyToken(req);

    const response = NextResponse.json({ success: true })
    
    response.cookies.set('session', req.headers.get('Authorization')!.split('Bearer')[1], {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
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