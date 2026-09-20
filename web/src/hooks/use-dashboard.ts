'use client'

import { useQuery } from "@tanstack/react-query";
import { DashboardData } from "@/types/dashboard";
import { clientAuth } from "@/lib/firebase-client";

async function fetchDashboard(): Promise<DashboardData> {
  const token = await clientAuth.currentUser?.getIdToken();
  if (!token) throw new Error('Not authenticated');

  const res = await fetch('/api/dashboard', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to load dashboard');
  return res.json();
}

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboard,
    staleTime: 60 * 1000, // 1 min - dashboard data doesn't need to be second-fresh
  });
}