import Image from "next/image";
import { Star, ShieldCheck, MapPin } from "lucide-react";
import type { SellerProfile } from "@/types/listing";

export function SellerCard({ seller }: { seller: SellerProfile }) {
  const initials = seller.displayName.split(' ').map((n) => n[0]).join('').slice(0, 2);
  const memberSinceLabel = seller.memberSince ? new Date(seller.memberSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : null;

  return (
    <div className="bg-white rounded-lg shadow-xs border border-neutral-100 p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="relative h-12 w-12 rounded-full bg-[#86B7A9] flex items-center justify-center text-white font-medium shrink-0 overflow-hidden">
          {seller.photoURL ? (
            <Image src={seller.photoURL} alt={seller.displayName} fill sizes="48px" className="object-cover" />
          ) : (
            initials
          )}
        </div>
        <div className="min-w-0">
          <p className="font-medium text-neutral-800 truncate">{seller.displayName}</p>
          {!!seller.rating && (
            <span className="flex items-center gap-1 text-sm text-neutral-600">
              <Star size={13} className="fill-amber-400 text-amber-400" /> {seller.rating.toFixed(1)}
              {!!seller.reviewCount && <span className="text-neutral-400">({seller.reviewCount})</span>}
            </span>
          )}
        </div>
      </div>

      {(seller.city || seller.state) && (
        <p className="text-xs text-neutral-500 flex items-center gap-1 mb-4">
          <MapPin size={12} /> {[seller.city, seller.state].filter(Boolean).join(', ')}
        </p>
      )}

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-100 text-sm">
        {seller.totalTrades !== undefined && (
          <div>
            <p className="text-xs text-neutral-400">Total trades</p>
            <p className="font-medium text-neutral-800">{seller.totalTrades}</p>
          </div>
        )}
        {seller.responseTimeHours !== undefined && (
          <div>
            <p className="text-xs text-neutral-400">Response time</p>
            <p className="font-medium text-neutral-800">~{seller.responseTimeHours} hrs</p>
          </div>
        )}
        {memberSinceLabel && (
          <div>
            <p className="text-xs text-neutral-400">Member since</p>
            <p className="font-medium text-neutral-800">{memberSinceLabel}</p>
          </div>
        )}
        <div>
          <p className="text-xs text-neutral-400">Verification</p>
          {seller.verified ? (
            <p className="font-medium text-emerald-600 flex items-center gap-1">
              <ShieldCheck size={14} /> Verified
            </p>
          ) : (
            <p className="font-medium text-neutral-400">Unverified</p>
          )}
        </div>
      </div>
    </div>
  );
}