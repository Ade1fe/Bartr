// src/types/listing.ts

export type ListingCategory = 'electronics' | 'furniture' | 'clothing' | 'books' | 'tools' | 'sports' | 'food' | 'collectibles' | 'other';
export type ListingCondition = 'new' | 'like_new' | 'good' | 'fair' | 'poor';
export type ListingStatus = 'active' | 'in_trade' | 'deleted' | 'closed';

// The literal shape of a `listings/{id}` Firestore document
export interface Listing {
  id: string;
  userId: string;
  sellerName: string;
  sellerAvatarUrl: string | null;
  title: string;
  description: string;
  category: ListingCategory;
  condition: ListingCondition;
  offerTags: string[];
  wantTags: string[];
  creditValue: number;
  photos: string[];
  location: {
    city: string;
    state: string;
    lat: number;
    lng: number;
  };
  status: ListingStatus;
  views: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  deletedBy?: string;
}

export interface SellerProfile {
  uid: string;
  displayName: string;
  photoURL: string | null;
  city?: string;
  state?: string;
  rating?: number;
  reviewCount?: number;
  totalTrades?: number;
  responseTimeHours?: number;
  memberSince?: string;
  verified?: boolean;
}

export interface Review {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// What the [id] detail page actually needs — a subset of Listing
export type ListingDetail = Pick<Listing, 'id' | 'title' | 'description' | 'category' | 'condition' | 'offerTags' | 'wantTags' | 'creditValue' | 'photos' | 'userId' | 'status'>;