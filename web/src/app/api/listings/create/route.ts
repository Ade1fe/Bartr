import { adminDb } from "@/lib/firebase-admin";
import { saveListingToIndex } from "@/lib/algolia";
import { verifyToken } from "@/lib/auth";
import { handleApiError } from "@/lib/errors";
import { createListingSchema } from "@/lib/validators";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const decoded = await verifyToken(req);
    const userId = decoded.uid;

    const body = await req.json();
    const validated = createListingSchema.parse(body);

    const listingRef = await adminDb.collection('listings').doc();
    await listingRef.set({
      ...validated,
      userId,
      status: 'active',
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    try {
      await saveListingToIndex({
        objectID: listingRef.id,
        title: validated.title,
        description: validated.description,
        category: validated.category,
        offerTags: validated.offerTags,
        wantTags: validated.wantTags,
        creditValue: validated.creditValue,
        condition: validated.condition,
        photos: validated.photos,
        userId,
        status: 'active',
      })
    }
    catch (indexErr) {
      console.error(`[listings/create] Algolia sync failed for ${listingRef.id}`, indexErr);
    }

    // Mark onboarding complete the first time a user successfully creates a listing.
    // merge: true keeps this safe to call even if the field is already set —
    // no read-before-write needed, and it won't clobber other user fields.
    try {
      await adminDb.collection('users').doc(userId).set(
        { onboardingComplete: true },
        { merge: true }
      );
    }
    catch (onboardingErr) {
      console.error(`[listings/create] onboardingComplete update failed for ${userId}`, onboardingErr);
    }

    return NextResponse.json({ id: listingRef.id }, { status: 201 });
  }
  catch (e) {
    return handleApiError(e);
  }
}