import { adminDb } from "@/lib/firebase-admin"; 
import { FieldValue } from "firebase-admin/firestore";
import type { QueueType, ReportReason } from "@/types/moderation";

const BLOCKLIST_TERMS = [
  'gun', 'firearm', 'ammo', 'ammunition', 'pistol', 'rifle', 'cocaine', 'heroin',
  'meth', 'methamphetamine', 'lsd', 'ecstasy', 'mdma', 'cannabis', 'marijuana', 'weed',
  'narcotic', 'fake', 'replica', 'counterfeit', 'knockoff', 'stolen', 'no questions asked',
  'explosive', 'grenade', 'bomb', 'taser', 'knife', 'switchblade', 'brass knuckles', 'silencer', 'suppressor',
];

export function checkForBlockedTerms(text: string): string[] {
  const lower = text.toLowerCase();
  return BLOCKLIST_TERMS.filter(term => lower.includes(term));
}

export async function enqueueForReview(listingId: string, queueType: QueueType) {
  const listingRef = adminDb.collection('listings').doc(listingId);
  const listingSnap = await listingRef.get();
  if (!listingSnap.exists) return null;
  const listing = listingSnap.data()!;

  const keywordFlags = [
    ...checkForBlockedTerms(listing.title ?? ''),
    ...checkForBlockedTerms(listing.description ?? ''),
  ];

  const queueRef = await adminDb.collection('moderationQueue').add({
    listingId,
    listingOwnerId: listing.userId,
    queueType,
    status: 'pending',
    keywordFlags: [...new Set(keywordFlags)],
    reportCount: 0,
    reportReason: [],
    reportDetails: [],
    listingSnapshot: {
      title: listing.title,
      description: listing.description,
      category: listing.category,
      photos: listing.photos ?? [],
    },
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    reviewedAt: null,
    reviewedBy: null,
    actionTaken: 'none',
  });

  return queueRef.id;
}

const AUTO_HIDE_REPORT_THRESHOLD = 3;

export async function reportListing(listingId: string, reporterId: string, reason: ReportReason, details: string | undefined) {
  const listingRef = adminDb.collection('listings').doc(listingId);
  const listingSnap = await listingRef.get();
  if (!listingSnap.exists) {
    return { ok: false as const, error: 'Listing not found' };
  };
  const listing = listingSnap.data()!;

  if (listing.userId === reporterId) {
    return { ok: false as const, error: "You can't report your own listing" };
  }

  const existingReportSnap = await adminDb
    .collection('moderationQueue')
    .where('listingId', '==', listingId)
    .where('queueType', '==', 'user_report')
    .where('status', '==', 'pending')
    .limit(1)
    .get();

  const reportersRef = adminDb.collection('listingReporters').doc(listingId);
  const reportersSnap = await reportersRef.get();
  const existingReporters: string[] = reportersSnap.data()?.userIds ?? [];

  if (existingReporters.includes(reporterId)) {
    return { ok: false as const, error: "You have already reported this listing" };
  }

  await reportersRef.set(
    { userIds: FieldValue.arrayUnion(reporterId) },
    { merge: true }
  );

  const newReportCount = existingReporters.length + 1;

  if (!existingReportSnap.empty) {
    const doc = existingReportSnap.docs[0];
    await doc.ref.update({
      reportCount: FieldValue.increment(1),
      reportReason: FieldValue.arrayUnion(reason),
      ...(details ? { reportDetails: FieldValue.arrayUnion(details) } : {}),
      updatedAt: FieldValue.serverTimestamp(),
    });
  }
  else {
    await adminDb.collection('moderationQueue').add({
      listingId,
      listingOwnerId: listing.userId,
      queueType: 'user_report',
      status: 'pending',
      keywordFlags: [],
      reportCount: 1,
      reportReason: [reason],
      reportDetails: details ? [details] : [],
      listingSnapshot: {
        title: listing.title,
        description: listing.description,
        category: listing.category,
        photos: listing.photos ?? [],
      },
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      reviewedAt: null,
      reviewedBy: null,
      actionTaken: 'none',
    });
  }

  if (newReportCount >= AUTO_HIDE_REPORT_THRESHOLD && listing.status === 'active') {
    await listingRef.update({ status: 'pending_moderation' });
  }

  return { ok: true as const, reportCount: newReportCount };
}