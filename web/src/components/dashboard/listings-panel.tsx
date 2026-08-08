'use client';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { DashboardListing } from "@/types/dashboard";

interface ListingsPanelProps {
  listings?: DashboardListing[];
  loading?: boolean;
}

export function ListingsPanel({ listings, loading }: ListingsPanelProps) {
  return (
    <Card className="rounded-lg shadow-xs border-neutral-100 p-4 md:p-5">
      <CardHeader className="p-0 mb-4 flex-row items-center justify-between">
        <h2 className="text-sm md:text-base font-medium text-neutral-700">My Listings</h2>
        <Link
          href="/marketplace/new"
          aria-label="Add new listing"
          className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-neutral-100 text-neutral-600"
        >
          <Plus size={16} />
        </Link>
      </CardHeader>
      <CardContent className="p-0 space-y-1">
        {loading && Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 py-2">
            <Skeleton className="h-12 w-12 rounded-md" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        ))}

        {!loading && listings?.length === 0 && (
          <div className="text-center py-4 space-y-2">
            <p className="text-sm text-neutral-500">You haven&apos;t listed anything yet.</p>
            <Link href="/marketplace/new" className="text-sm text-blue-600 hover:text-blue-800 underline underline-offset-2">
              Create your first listing
            </Link>
          </div>
        )}

        {!loading && listings?.map((listing) => (
          <Link
            key={listing.id}
            href={`/profile/listings/${listing.id}`}
            className="flex items-center gap-3 -mx-1 px-1 py-2 rounded-md hover:bg-neutral-50 transition-colors"
          >
            <div className="relative h-12 w-12 rounded-md bg-neutral-100 overflow-hidden shrink-0">
              {listing.photos[0] && (
                <Image src={listing.photos[0]} alt={listing.title} fill sizes="48px" className="object-cover" />
              )}
              {listing.photos.length > 1 && (
                <span className="absolute bottom-0 right-0 bg-black/70 text-white text-[0.625rem] leading-none px-1 py-0.5 rounded-tl-md">
                  +{listing.photos.length - 1}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-neutral-700 truncate">{listing.title}</p>
              <p className="text-xs text-neutral-500 flex items-center gap-1">
                <Eye size={12} /> {listing.views} views
              </p>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}