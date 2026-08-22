'use client'

import { useDashboard } from "@/hooks/use-dashboard";
import { StatCard } from "@/components/dashboard/stat-card";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { ActiveTradesList } from "@/components/dashboard/active-trades-list";
import { NotificationsPanel } from "@/components/dashboard/notifications-panel";
import { ListingsPanel } from "@/components/dashboard/listings-panel";
import { RecentCreditsPanel } from "@/components/dashboard/recent-credits-panel";
import { Box, Coins, CheckCircle2, Star } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Loader from "@/components/loader";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard () {
  const { user, loading: authLoading } = useAuth();
  const { data, isLoading, isError } = useDashboard();
  const firstName = user?.displayName?.split(' ')[0] ?? 'there';


  return (
    <>
      {/* {isLoading && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-[5px]'>
          <Loader type="bars" color="#A5B6B1" height={30} width={30} />
        </div>
      )} */}

      <section className='max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 space-y-6 md:space-y-8'>
        <div className='max-w-360 mx-auto px-4 md:px-8 grid grid-cols-1 items-center gap-8'>
          <div className='text-start'>
            {isLoading ? (
              <Skeleton className="h-7 w-48 mb-3 bg-neutral-200" />
            ) : (
              <h1 className='text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-poppins font-normal text-neutral-700 mb-3'>Welcome back, {firstName}!</h1>
            )}
            <p className='text-neutral-500 text-sm lg:text-base'>Here&apos;s what&apos;s happening with your trades</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <StatCard icon={<Box size={18} />} label="Active Trades" value={data?.stats.activeTrades} delta={data?.stats.activeTradesDelta} loading={isLoading} />
          <StatCard icon={<Coins size={18} />} label="Credit Balance" value={data?.stats.creditBalance} delta={data?.stats.creditBalanceDelta} loading={isLoading} />
          <StatCard icon={<CheckCircle2 size={18} />} label="Completed" value={data?.stats.completedTrades} delta="All time" loading={isLoading} />
          <StatCard icon={<Star size={18} />} label="Reputation" value={data?.stats.reputation.toFixed(1)} delta={`Based on ${data?.stats.reviewCount ?? 0} reviews`} loading={isLoading} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <QuickActions />
            <ActiveTradesList trades={data?.activeTrades} loading={isLoading} />
          </div>
          <div className="space-y-4 md:space-y-6">
            <NotificationsPanel notifications={data?.notifications} unreadCount={data?.unreadNotificationCount} loading={isLoading} />
            <ListingsPanel listings={data?.listings} loading={isLoading} />
            <RecentCreditsPanel credits={data?.recentCredits} loading={isLoading} />
          </div>
        </div>

        {isError && (
          <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-md">
            Couldn&apos;t load your dashboard right now. Try refreshing.
          </p>
        )}
      </section>
    </>
  )
}