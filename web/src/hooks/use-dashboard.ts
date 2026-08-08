'use client'

import { useQuery } from "@tanstack/react-query";
import { DashboardData } from "@/types/dashboard";

async function fetchDashboard(): Promise<DashboardData> {
  const res = await fetch('/api/dashboard');
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