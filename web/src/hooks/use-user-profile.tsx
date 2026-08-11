'use client';

import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { clientDb } from "@/lib/firebase-client";
import { useAuth } from "@/hooks/useAuth";

interface UserProfile {
  city?: string;
  state?: string;
  lat?: number;
  lng?: number;
}

export function useUserProfile() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['userProfile', user?.uid],
    queryFn: async (): Promise<UserProfile | null> => {
      if (!user) return null;
      const snap = await getDoc(doc(clientDb, 'users', user.uid));
      return snap.exists() ? (snap.data() as UserProfile) : null;
    },
    enabled: !!user, // don't fire until we actually have a uid to query with
    staleTime: 5 * 60 * 1000, // city/state changes rarely — no need to refetch often
  });
}