'use client';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { CreditActivity } from "@/types/dashboard";
import { timeAgo } from "@/lib/time-ago";

interface RecentCreditsPanelProps {
  credits?: CreditActivity[];
  loading?: boolean;
}

export function RecentCreditsPanel({ credits, loading }: RecentCreditsPanelProps) {
  return (
    <Card className="rounded-lg shadow-xs border-neutral-100 p-4 md:p-5">
      <CardHeader className="p-0 mb-4">
        <h2 className="text-sm md:text-base font-medium text-neutral-700">Recent Credits</h2>
      </CardHeader>
      <CardContent className="p-0 space-y-4">
        {loading && Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-4 w-10" />
          </div>
        ))}

        {!loading && credits?.length === 0 && (
          <p className="text-sm text-neutral-500 py-4 text-center">No credit activity yet.</p>
        )}

        {!loading && credits?.map((credit) => (
          <div key={credit.id} className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm text-neutral-700 truncate">{credit.label}</p>
              <p className="text-xs text-neutral-500 truncate">{credit.subLabel} · {timeAgo(credit.createdAt)}</p>
            </div>
            <span className={`text-sm font-medium shrink-0 ${credit.amount >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
              {credit.amount >= 0 ? '+' : ''}{credit.amount}
            </span>
          </div>
        ))}

        <Link
          href="/credits"
          className="block text-center text-sm text-neutral-600 hover:text-black pt-2 border-t border-neutral-100"
        >
          View Credit History
        </Link>
      </CardContent>
    </Card>
  );
}