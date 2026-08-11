import { adminDb } from "@/lib/firebase-admin";
import { searchClient, ALGOLIA_INDEX_NAME } from "@/lib/algolia-search";
import { notFound } from "next/navigation";
import { ListingGallery } from "@/components/marketplace/listing-gallery";
import { ListingActions } from "@/components/marketplace/listing-actions";
import { SellerCard } from "@/components/marketplace/seller-card";
import { ListingReviews } from "@/components/marketplace/listing-reviews";
import { SimilarListings } from "@/components/marketplace/similar-listings";
import { Badge } from "@/components/ui/badge";
import type { ListingDetail, SellerProfile, Review } from "@/types/listing";

export default async function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const listingSnap = await adminDb.collection('listings').doc(id).get();
  if (!listingSnap.exists || listingSnap.data()?.status === 'deleted') {
    notFound();
  }

  const listing = { id: listingSnap.id, ...listingSnap.data() } as ListingDetail;

  const [sellerSnap, reviewsSnap, similarResults] = await Promise.all([
    adminDb.collection('users').doc(listing.userId).get(),
    adminDb.collection('reviews')
      .where('sellerId', '==', listing.userId)
      .orderBy('createdAt', 'desc')
      .limit(10)
      .get(),
    searchClient.search([{
      indexName: ALGOLIA_INDEX_NAME,
      params: {
        filters: `status:active AND category:${listing.category} AND NOT objectID:${listing.id}`,
        hitsPerPage: 3,
      },
    }]),
  ]);

  const seller: SellerProfile = {
    uid: listing.userId,
    displayName: sellerSnap.data()?.displayName ?? 'Unknown',
    photoURL: sellerSnap.data()?.photoURL ?? null,
    city: sellerSnap.data()?.city,
    state: sellerSnap.data()?.state,
    rating: sellerSnap.data()?.avgRating,
    reviewCount: sellerSnap.data()?.reviewCount,
    totalTrades: sellerSnap.data()?.completedTradesCount,
    responseTimeHours: sellerSnap.data()?.responseTimeHours,
    memberSince: sellerSnap.data()?.createdAt,
    verified: sellerSnap.data()?.idVerified === true,
  };

  const reviews: Review[] = reviewsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Review));
  const similar = (similarResults.results[0] as any)?.hits ?? [];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ListingGallery photos={listing.photos} title={listing.title} />

          <div className="bg-white rounded-lg shadow-xs border border-neutral-100 p-5">
            <h2 className="text-base font-medium text-neutral-800 mb-3">Description</h2>
            <p className="text-sm text-neutral-600 leading-relaxed whitespace-pre-line">{listing.description}</p>
          </div>

          <ListingReviews reviews={reviews} reviewCount={seller.reviewCount ?? reviews.length} />
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-xs border border-neutral-100 p-5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h1 className="text-xl font-medium text-neutral-800">{listing.title}</h1>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-blue-50 text-blue-700 rounded-full capitalize">{listing.condition.replace('_', ' ')}</Badge>
              <Badge className="bg-neutral-100 text-neutral-600 rounded-full capitalize">{listing.category}</Badge>
            </div>

            {listing.wantTags.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-medium text-neutral-400 uppercase tracking-wide mb-2">Looking For</p>
                <div className="flex flex-wrap gap-2">
                  {listing.wantTags.map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-[#86B7A9]/10 text-[#5f8577] font-medium capitalize">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-neutral-100 mb-4">
              <p className="text-sm text-neutral-500">
                Values at <span className="font-medium text-neutral-800">{listing.creditValue} credits</span>
              </p>
            </div>

            <ListingActions listing={listing} />
          </div>

          <SellerCard seller={seller} />
        </div>
      </div>

      {similar.length > 0 && <SimilarListings listings={similar} />}
    </div>
  );
}