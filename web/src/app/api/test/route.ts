import { adminDb } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const snapshot = await adminDb.collection('_test').limit(1).get();
    return NextResponse.json({
      success: true,
      message: 'Firebase Admin is working!',
      docsFound: snapshot.size,
    });
  }
  catch (err) {
    return NextResponse.json({
      success: false,
      message: 'Firebase Admin failed to connect.',
      error: String(err),
    }, { status: 500 });
  }
}