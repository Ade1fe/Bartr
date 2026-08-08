// src/hooks/useTrades.ts
import { clientDb } from '@/lib/firebase-client'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export function useActiveTrades(userId: string) {
  const [trades, setTrades] = useState<Record<string, any>[]>([])

  useEffect(() => {
    const q = query(
      collection(clientDb, 'trades'),
      where('initiatorId', '==', userId),
      where('status', 'in', ['proposed', 'in_escrow', 'completing'])
    )
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTrades(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    })
    return () => unsubscribe()
  }, [userId])

  return trades
}