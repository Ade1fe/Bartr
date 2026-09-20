import { ListingCard } from "./listing-card";
import type { AlgoliaListingHit } from "@/types/listing";

export function SimilarListings({ listings }: { listings: AlgoliaListingHit[] }) {
  return (
    <div>
      <h2 className="text-base font-medium text-neutral-800 mb-4">Similar Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {listings.map((hit) => (
          <ListingCard key={hit.objectID} hit={hit} />
        ))}
      </div>
    </div>
  );
}