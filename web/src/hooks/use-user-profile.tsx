'use client';

import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { clientDb } from "@/lib/firebase-client";
import { useAuth } from "@/hooks/useAuth";
import type { GeoLocation } from "@/types/location";

export function useUserProfile() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['userProfile', user?.uid],
    queryFn: async (): Promise<GeoLocation | null> => {
      if (!user) return null;
      const snap = await getDoc(doc(clientDb, 'users', user.uid));
      return snap.exists() ? (snap.data()?.location as GeoLocation) ?? null : null;
    },
    enabled: !!user, // don't fire until we actually have a uid to query with
    staleTime: 5 * 60 * 1000, // city/state changes rarely — no need to refetch often
  });
}