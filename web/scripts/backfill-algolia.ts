// scripts/backfill-algolia.ts — run once with `npx tsx scripts/backfill-algolia.ts`
import "dotenv/config";

import { adminDb } from "../src/lib/firebase-admin";
import { saveListingToIndex } from "../src/lib/algolia";

async function backfill() {
  const snap = await adminDb.collection('listings').where('status', '==', 'active').get();

  console.log(`Found ${snap.size} active listings to backfill.`);

  for (const doc of snap.docs) {
    const listing = doc.data();

    const userSnap = await adminDb.collection("users").doc(listing.userId).get();
    const userData = userSnap.data();
    const sellerName = listing.sellerName ?? userData?.displayName ?? "Unknown";
    const sellerAvatarUrl = listing.sellerAvatarUrl ?? userData?.photoURL ?? "";

    try {
      await saveListingToIndex({
        objectID: doc.id,
        title: listing.title,
        description: listing.description,
        category: listing.category,
        offerTags: listing.offerTags,
        wantTags: listing.wantTags,
        creditValue: listing.creditValue,
        condition: listing.condition,
        photos: listing.photos,
        userId: listing.userId,
        status: listing.status,
        sellerName,
        sellerAvatarUrl,
      });
      console.log(`✓ Synced ${doc.id} — ${listing.title}`);
    }
    catch (err) {
      console.error(`✗ Failed to sync ${doc.id}`, err);
    }
  }

  console.log('Backfill complete.');
}

backfill();