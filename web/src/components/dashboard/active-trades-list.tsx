'use client';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ActiveTradeSummary } from "@/types/dashboard";

const statusStyles: Record<ActiveTradeSummary['status'], string> = {
  in_progress: 'bg-black text-white',
  pending: 'bg-neutral-100 text-neutral-600',
  completed: 'bg-emerald-100 text-emerald-700',
};

const statusLabels: Record<ActiveTradeSummary['status'], string> = {
  in_progress: 'In Progress',
  pending: 'Pending',
  completed: 'Completed',
};

interface ActiveTradesListProps {
  trades?: ActiveTradeSummary[];
  loading?: boolean;
}

export function ActiveTradesList({ trades, loading }: ActiveTradesListProps) {
  return (
    <Card className="rounded-lg shadow-xs border-neutral-100 p-4 md:p-5">
      <CardHeader className="p-0 mb-4 flex-row items-center justify-between">
        <h2 className="text-sm md:text-base font-medium text-neutral-700">Active Trades</h2>
        <Link href="/trades" className="text-sm text-blue-600 hover:text-blue-800 underline underline-offset-2">
          View All
        </Link>
      </CardHeader>
      <CardContent className="p-0 space-y-4">
        {loading && Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="space-y-3 border border-neutral-100 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
            <Skeleton className="h-2 w-full" />
          </div>
        ))}

        {!loading && trades?.length === 0 && (
          <p className="text-sm text-neutral-500 py-6 text-center">
            No active trades yet. Browse the marketplace to start one.
          </p>
        )}

        {!loading && trades?.map((trade) => (
          <div key={trade.id} className="border border-neutral-100 rounded-lg p-4 hover:border-neutral-200 transition-colors">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 rounded-full bg-neutral-100 flex items-center justify-center text-xs font-medium text-neutral-600 shrink-0">
                  {trade.partnerName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-neutral-700 truncate">Trade with {trade.partnerName}</p>
                  <p className="text-xs text-neutral-500 truncate">{trade.title}</p>
                </div>
              </div>
              <Badge className={`${statusStyles[trade.status]} rounded-md text-xs shrink-0`}>
                {statusLabels[trade.status]}
              </Badge>
            </div>

            <div className="mb-2">
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                <span>Progress</span>
                <span>{trade.progress}%</span>
              </div>
              <Progress value={trade.progress} className="h-1.5" />
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-500">
              <span className="flex items-center gap-1">
                <Clock size={12} /> {trade.daysRemaining} days remaining
              </span>
              <Link href={`/trades/${trade.id}`} className="flex items-center gap-1 text-neutral-700 hover:text-black">
                View Details <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}