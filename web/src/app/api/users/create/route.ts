import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from '@/lib/firebase-admin';
import { verifyToken } from '@/lib/auth';
import { handleApiError, AppError } from '@/lib/errors';
import { z } from 'zod';
import { toast } from "sonner";

const createUserSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().max(300).optional(),
  photoURL: z.string().url().nullable().optional(),
  idDocumentUrl: z.string().url().nullable().optional(),
})


export async function POST(req: NextRequest) {
  try {
    const decoded = await verifyToken(req);
    const userId = decoded.uid;

    const body = await req.json();
    const validated = createUserSchema.parse(body);

    const existingDoc = await adminDb.collection('users').doc(userId).get();
    if (existingDoc.exists) {
      toast.error('User profile already exists');
      throw new AppError('User profile already exists', 400);
    }

    await adminDb.collection('users').doc(userId).set({
      displayName: `${validated.firstName} ${validated.lastName}`,
      firstName: validated.firstName,
      lastName: validated.lastName,
      email: validated.email,
      phoneNumber: validated.phoneNumber ?? null,
      location: validated.location ?? null,
      bio: validated.bio ?? null,
      photoURL: validated.photoURL ?? null,
      idDocumentUrl: validated.idDocumentUrl ?? null,

      // Platform fields — set by server, never by client
      creditBalance: 0,
      lockedCredits: 0,
      reputationScore: 0,
      totalTrades: 0,
      reviewCount: 0,
      successRate: 0,
      accountType: 'individual',
      isVerified: false,
      verificationStatus: validated.idDocumentUrl ? 'pending' : 'none',
      isSuspended: false,
      emailVerified: decoded.email_verified ?? false,
      phoneVerified: false,

      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    })

    return NextResponse.json({ success: true }, { status: 201 })
  }
  catch (err) {
    return handleApiError(err);
  }
}