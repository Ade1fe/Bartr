'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, ArrowLeftRight, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import type { ListingDetail } from "@/types/listing";

export function ListingActions({ listing }: { listing: ListingDetail }) {
  const { user } = useAuth();
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const isOwnListing = user?.uid === listing.userId;

  if (isOwnListing) {
    return (
      <div className="space-y-3">
        <p className="text-xs text-neutral-400 bg-neutral-50 rounded-md px-3 py-2">
          This is your listing — you can't propose a trade on it.
        </p>
        <Button
          onClick={() => router.push(`/profile/listings/${listing.id}/edit`)}
          className="w-full rounded-lg bg-black text-white shadow-black/20 shadow-xs hover:shadow-sm gap-2"
        >
          <Pencil size={16} /> Edit Listing
        </Button>
      </div>
    );
  }

  async function handleProposeTrade() {
    router.push(`/trades/propose?listingId=${listing.id}`);
  }

  async function handleSaveToggle() {
    setSaved((s) => !s); // optimistic — wire to a real savedListings write when that route exists
    toast.success(saved ? 'Removed from saved' : 'Listing saved');
  }

  return (
    <div className="space-y-3">
      <Button onClick={handleProposeTrade} className="w-full rounded-lg bg-black text-white shadow-black/20 shadow-xs hover:shadow-sm gap-2">
        <ArrowLeftRight size={16} /> Propose Trade
      </Button>
      <Button onClick={handleSaveToggle} variant="outline" className="w-full rounded-lg border-neutral-200 text-neutral-700 gap-2">
        <Heart size={16} className={saved ? 'fill-red-500 text-red-500' : ''} /> {saved ? 'Saved' : 'Save Listing'}
      </Button>
      <button className="w-full flex items-center justify-center gap-2 text-sm text-[#5f8577] hover:underline py-1">
        <MessageSquare size={14} /> Message Seller
      </button>
    </div>
  );
}