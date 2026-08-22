'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeftRight, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";

interface QuickActionsProps {
  loading?: boolean;
}

export function QuickActions({ loading }: QuickActionsProps) {
  const router = useRouter();

  return (
    <Card className="rounded-lg shadow-xs border-neutral-100 p-4 md:p-5">
      <CardContent className="p-0">
        <h2 className="text-sm md:text-base font-medium text-neutral-700 mb-4">Quick Actions</h2>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Skeleton className="h-11 w-full rounded-lg" />
            <Skeleton className="h-11 w-full rounded-lg" />
            <Skeleton className="h-11 w-full rounded-lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button onClick={() => router.push('/marketplace/new')} className="rounded-lg bg-black text-white cursor-pointer shadow-black/20 shadow-xs hover:shadow-sm justify-start gap-2 h-11" >
              <Plus size={16} /> New Listing
            </Button>
            <Button variant="outline" onClick={() => router.push('/marketplace')} className="rounded-lg border-neutral-200 text-neutral-700 cursor-pointer shadow-xs hover:shadow-sm justify-start gap-2 h-11" >
              <ArrowLeftRight size={16} /> Browse Trades
            </Button>
            <Button variant="secondary" onClick={() => router.push('/messages')} className="rounded-lg bg-neutral-100 text-neutral-700 cursor-pointer hover:bg-neutral-200 justify-start gap-2 h-11" >
              <MessageSquare size={16} /> Messages
            </Button>
          </div>
        )}
        
      </CardContent>
    </Card>
  );
}