import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { verifyAdminToken } from "@/lib/admin-auth";
import { handleApiError, AppError } from "@/lib/errors";

export async function GET(req: NextRequest) {
  try {
    await verifyAdminToken(req);

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') ?? 'pending';
    const queueType = searchParams.get('queueType');
    const cursor = searchParams.get('cursor');

    let query = adminDb.collection('moderationQueue')
      .where('status', '==', status)
      .orderBy('createdAt', 'desc')
      .limit(20);

    if (queueType) {
      query = query.where('queueType', '==', queueType);
    }

    if (cursor) {
      const cursorSnap = await adminDb.collection('moderationQueue').doc(cursor).get();
      if (cursorSnap.exists) query = query.startAfter(cursorSnap);
    }

    const snap = await query.get();
    const items = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const nextCursor = snap.docs.length === 25 ? snap.docs[snap.docs.length - 1].id : null;

    return NextResponse.json({ items, nextCursor });
  }
  catch (err) {
    return handleApiError(err);
  }
}