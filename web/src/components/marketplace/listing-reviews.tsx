
import { Star } from "lucide-react";
import type { Review } from "@/types/listing";

export function ListingReviews({ reviews, reviewCount }: { reviews: Review[]; reviewCount: number }) {
  return (
    <div className="bg-white rounded-lg shadow-xs border border-neutral-100 p-5">
      <h2 className="text-base font-medium text-neutral-800 mb-4">Reviews ({reviewCount})</h2>

      {reviews.length === 0 ? (
        <p className="text-sm text-neutral-400">No reviews yet.</p>
      ) : (
        <div className="space-y-5">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-neutral-50 last:border-0 pb-5 last:pb-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-medium text-neutral-600">
                    {review.reviewerName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <p className="text-sm font-medium text-neutral-800">{review.reviewerName}</p>
                </div>
                <div className="flex gap-0.5 shrink-0">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} className={i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-neutral-600 ml-10">{review.comment}</p>
              <p className="text-xs text-neutral-400 ml-10 mt-1">
                {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}