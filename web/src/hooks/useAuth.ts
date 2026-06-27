'use client'

import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut, User } from "firebase/auth"
import { clientAuth } from "@/lib/firebase-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function useAUth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(clientAuth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    })

    return () => unsubscribe();
  }, []);


  async function handleSignOut() {
    try {
      await signOut(clientAuth);

      await fetch('/api/auth/session', { method: 'DELETE' })

      router.push('/auth');
    }
    catch (err: any) {
      toast.error('Sign out error', err);
    }
  }

  return {user, loading, signOut: handleSignOut, isAuthenticated: !!user}
}