// src/hooks/useTrades.ts
import { clientDb } from '@/lib/firebase-client'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import type { Trade } from '@/types/trade';

const ACTIVE_STATUSES = ['pending', 'accepted'] as const
// export interface ActiveTrade {
//   id: string;
//   initiatorId: string;
//   status: string;
//   [key: string]: unknown;
// }

export function useActiveTrades(userId: string) {
  const [trades, setTrades] = useState<Trade[]>([])

  // useEffect(() => {
  //   const q = query(
  //     collection(clientDb, 'trades'),
  //     where('initiatorId', '==', userId),
  //     where('status', 'in', ['proposed', 'in_escrow', 'completing'])
  //   )
  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     setTrades(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ActiveTrade)))
  //   })
  //   return () => unsubscribe()
  // }, [userId])


  useEffect(() => {
    if (!userId) {
      return
    }

    // A user can be on either side of a trade — proposer or receiver —
    // so this needs to match both, not just proposerId. Two separate
    // listeners merged client-side, since Firestore can't OR across two
    // different fields in a single compound query alongside an `in` clause.
    const proposerQuery = query(
      collection(clientDb, 'trades'),
      where('proposerId', '==', userId),
      where('status', 'in', ACTIVE_STATUSES)
    )
    const receiverQuery = query(
      collection(clientDb, 'trades'),
      where('receiverId', '==', userId),
      where('status', 'in', ACTIVE_STATUSES)
    )

    let proposerTrades: Trade[] = []
    let receiverTrades: Trade[] = []

    function mergeAndSet() {
      const merged = new Map<string, Trade>()
      for (const t of [...proposerTrades, ...receiverTrades]) {
        merged.set(t.id, t)
      }
      setTrades(Array.from(merged.values()))
    }

    const unsubProposer = onSnapshot(proposerQuery, (snapshot) => {
      proposerTrades = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Trade))
      mergeAndSet()
    })

    const unsubReceiver = onSnapshot(receiverQuery, (snapshot) => {
      receiverTrades = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Trade))
      mergeAndSet()
    })

    return () => {
      unsubProposer()
      unsubReceiver()
    }
  }, [userId])

  return trades
}