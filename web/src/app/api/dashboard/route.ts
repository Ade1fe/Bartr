import { NextRequest, NextResponse } from "next/server";
import { adminDb, adminAuth } from '@/lib/firebase-admin';
import { requireSession } from "@/lib/require-session";

export async function GET(req: NextRequest) {
  const session = await requireSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 } );
  }

  const uid = session.uid;

  const [userDoc, tradeSnap, listingsSnap, notificationsSnap, creditsSnap] = await Promise.all([
    adminDb.collection('users').doc(uid).get(),
    adminDb.collection('trades')
      .where('participantIds', 'array-contains', uid)
      .where('status', 'in', ['in_progress', 'pending'])
      .orderBy('updatedAt', 'desc')
      .limit(5)
      .get(),
    adminDb.collection('listings')
      .where('userId', '==', uid)
      .orderBy('createdAt', "desc")
      .limit(4)
      .get(),
    adminDb.collection('notifications')
      .where('recipientId', '==', uid)
      .orderBy('createdAt', 'desc')
      .limit(5)
      .get(),
    adminDb.collection('creditTransactions')
      .where('uid', '==', uid)
      .orderBy('createdAt', 'desc')
      .limit(5)
      .get(),
  ]);

  const userData = userDoc.data();

  const activeTrades = tradeSnap.docs.map((doc) => {
    const d = doc.data();
    const otherParticipant = d.participants.find((id: string) => id !== uid);
    return {
      id: doc.id,
      partnerId: otherParticipant,
      partnerName: d.participantNames?.[otherParticipant] ?? 'Unknown',
      partnerAvatarUrl: d.participantAvatars?.[otherParticipant] ?? null,
      title: d.title,
      status: d.status,
      progress: d.progress ?? 0,
      daysRemaining: d.daysRemaining ?? 0,
    };
  });

  const unreadNotificationCount = notificationsSnap.docs.filter((d) => !d.data().read).length;

  return NextResponse.json({
    stats: {
      activeTrades: userData?.activeTradesCount ?? 0,
      activeTradesDelta: userData?.activeTradesDelta ?? 0,
      creditBalance: userData?.creditBalance ?? 0,
      creditBalanceDelta: userData?.creditBalanceDelta ?? 0,
      completedTrades: userData?.completedTradesCount ?? 0,
      reputation: userData?.avgRating ?? 0,
      reviewCount: userData?.reviewCount ?? 0,
    },
    activeTrades,
    notifications: notificationsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    unreadNotificationCount,
    listings: listingsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    recentCredits: creditsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    tradeStatistics: userData?.tradeStatistics?.week ?? { period: 'week', completed: 0, inProgress: 0, pending: 0, trend: 'flat' },
  });
}
