'use client';

import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Star } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ListingCardProps {
  hit: {
    objectID: string;
    title: string;
    photos?: string[];
    userId: string;
    sellerName?: string;
    sellerAvatarUrl?: string | null;
    rating?: number;
    reviewCount?: number;
    city?: string;
    state?: string;
    wantTags?: string[];
    creditValue: number;
  };
}

export function ListingCard({ hit }: ListingCardProps) {
  const { user } = useAuth();
  const isOwnListing = user?.uid === hit.userId;

  function getInitials(name: string | null): string {
    if (!name) return '?';
    return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
  }

  return (
    <div className="bg-white rounded-lg shadow-xs border border-neutral-100 overflow-hidden">
      <Link href={`/marketplace/${hit.objectID}`} className="block relative h-56 w-full bg-neutral-100">
        {hit.photos?.[0] && (
          <Image src={hit.photos[0]} alt={hit.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        )}
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link href={`/marketplace/${hit.objectID}`}>
            <h3 className="text-sm md:text-base font-medium text-neutral-800 hover:underline">{hit.title}</h3>
          </Link>
          {/* Favoriting your own listing is harmless, so no isOwnListing guard needed here */}
          <button aria-label="Save listing" className="text-neutral-400 hover:text-red-500 shrink-0">
            <Heart size={18} />
          </button>
        </div>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <Avatar className='h-6 w-6 rounded-full'>
              <AvatarImage src={hit?.sellerAvatarUrl ?? undefined} alt={hit.sellerName ?? 'Seller Avatar'} />
              <AvatarFallback className='bg-[#86B7A9] text-white text-sm'>
                {getInitials(user?.displayName ?? null)}
              </AvatarFallback>
            </Avatar>
            {/* {hit.sellerAvatarUrl ? (
              <Image src={hit.sellerAvatarUrl} alt={hit.sellerName ?? 'Seller avatar'} fill className="h-6 w-6 rounded-full bg-neutral-200 shrink-0" />
            ) : (
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-neutral-200 text-xs text-neutral-500 shrink-0">
                ?
              </span>
            )} */}
            <span className="text-xs md:text-sm text-neutral-600 truncate">{hit.sellerName ?? 'Unknown'}</span>
          </div>
          {!!hit.rating && (
            <span className="flex items-center gap-1 text-xs md:text-sm text-neutral-700 shrink-0">
              <Star size={14} className="fill-amber-400 text-amber-400" /> {hit.rating.toFixed(1)}
              <span className="text-neutral-400">({hit.reviewCount ?? 0})</span>
            </span>
          )}
        </div>

        {(hit.city || hit.state) && (
          <p className="text-xs text-neutral-500 flex items-center gap-1 mb-3">
            <MapPin size={12} /> {[hit.city, hit.state].filter(Boolean).join(', ')}
          </p>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
          <div>
            <p className="text-xs text-neutral-400">Seeking</p>
            <p className="text-xs md:text-sm text-neutral-700 capitalize">{hit.wantTags?.[0] ?? '—'}</p>
          </div>
          {isOwnListing ? (
            <span className="text-xs text-neutral-400 bg-neutral-100 rounded-md px-2.5 py-1.5">Your listing</span>
          ) : (
            <span className="text-xs md:text-sm font-medium text-neutral-700 bg-neutral-100 rounded-md px-2.5 py-1.5">
              {hit.creditValue} credits
            </span>
          )}
        </div>
      </div>
    </div>
  );
}