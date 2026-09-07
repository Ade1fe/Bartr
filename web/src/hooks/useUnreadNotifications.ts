'use client'

import { useEffect, useState } from "react"
import { collection, query, where, onSnapshot } from "firebase/firestore"
import { clientDb } from "@/lib/firebase-client"

export function useUnreadNotifications(uid: string | undefined) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!uid) {
      setCount(0);
      return;
    }

    const q = query(
      collection(clientDb, 'notifications'),
      where('userId', '==', uid),
      where('read', '==', false)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCount(snapshot.size);
    })

    return () => unsubscribe()
  }, [uid])

  return count;
}