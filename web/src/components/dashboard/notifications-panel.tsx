'use client';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { DashboardNotification } from "@/types/dashboard";
import { timeAgo } from "@/lib/time-ago";
import { SkeletonRows } from "./skeleton-rows";

interface NotificationsPanelProps {
  notifications?: DashboardNotification[];
  unreadCount?: number;
  loading?: boolean;
}

export function NotificationsPanel({ notifications, unreadCount, loading }: NotificationsPanelProps) {
  return (
    <Card className="rounded-lg shadow-xs border-neutral-100 p-4 md:p-5">
      <CardHeader className="p-0 mb-4 flex-row items-center justify-between">
        <h2 className="text-sm md:text-base font-medium text-neutral-700">Notifications</h2>
        {!!unreadCount && (
          <Badge className="bg-neutral-100 text-neutral-600 rounded-full text-xs">{unreadCount} new</Badge>
        )}
      </CardHeader>
      <CardContent className="p-0 space-y-1">
        {/* {loading && Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 py-2">
            <Skeleton className="h-9 w-9 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-3 w-36" />
            </div>
          </div>
        ))} */}
        {loading && <SkeletonRows count={3} variant="avatar-text" />}

        {!loading && notifications?.length === 0 && (
          <p className="text-sm text-neutral-500 py-4 text-center">You&apos;re all caught up.</p>
        )}

        {!loading && notifications?.map((n) => (
          <Link
            key={n.id}
            href="/notifications"
            className="flex items-start gap-3 -mx-1 px-1 py-2 rounded-md hover:bg-neutral-50 transition-colors"
          >
            <div className="h-9 w-9 rounded-full bg-neutral-100 flex items-center justify-center text-xs font-medium text-neutral-600 shrink-0">
              {n.actorName.split(' ').map((p) => p[0]).join('').slice(0, 2)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-neutral-700 truncate">{n.actorName}</p>
              <p className="text-xs text-neutral-500 truncate">{n.message}</p>
              <p className="text-[0.688rem] text-neutral-400 mt-0.5">{timeAgo(n.createdAt)}</p>
            </div>
            {!n.read && <span className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />}
          </Link>
        ))}

        <Link
          href="/notifications"
          className="block text-center text-sm text-neutral-600 hover:text-black pt-3 mt-2 border-t border-neutral-100"
        >
          View All Notifications
        </Link>
      </CardContent>
    </Card>
  );
}