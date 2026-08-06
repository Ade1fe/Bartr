// 'use client'

// import { useEffect, useState } from "react"
// import { onAuthStateChanged, signOut, User } from "firebase/auth"
// import { clientAuth } from "@/lib/firebase-client"
// import { useRouter } from "next/navigation"
// import { toast } from "sonner"

// export function useAuth() {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(clientAuth, (firebaseUser) => {
//       setUser(firebaseUser);
//       setLoading(false);
//     })

//     return () => unsubscribe();
//   }, []);


//   async function handleSignOut() {
//     try {
//       await signOut(clientAuth);

//       await fetch('/api/auth/session', { method: 'DELETE' })

//       router.push('/auth');
//     }
//     catch (err: any) {
//       toast.error('Sign out error', err);
//     }
//   }

//   return {user, loading, signOut: handleSignOut, isAuthenticated: !!user}
// }













'use client'

import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged, signOut, User } from "firebase/auth"
import { clientAuth } from "@/lib/firebase-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
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

  return (
    <AuthContext.Provider value={{ user, loading, signOut: handleSignOut, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}


export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}