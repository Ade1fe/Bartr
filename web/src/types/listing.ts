// src/types/listing.ts

import { GeoLocation } from "./location";

export type ListingCategory = 'electronics' | 'furniture' | 'clothing' | 'books' | 'tools' | 'sports' | 'food' | 'collectibles' | 'other';
export type ListingCondition = 'new' | 'like_new' | 'good' | 'fair' | 'poor';
export type ListingStatus = 'pending_moderation' | 'active' | 'hidden' | 'in_trade' | 'closed' | 'deleted';
export type ListingType = 'good' | 'service';
export type TradeType = 'one_time' | 'recurring' | 'flexible';
export type AvailabilityType = 'immediate' | 'scheduled' | 'by_appointment';

export interface AlgoliaListingHit {
  objectID: string;
  title: string;
  description: string;
  category: string;
  offerTags: string[];
  wantTags: string[];
  creditValue: number;
  condition?: string;
  photos: string[];
  userId: string;
  sellerName: string;
  sellerAvatarUrl: string;
  city: string;
  state: string;
  status: string;
}

// The literal shape of a `listings/{id}` Firestore document
export interface Listing {
  id: string;
  userId: string;
  sellerName: string;
  sellerAvatarUrl: string | null;
  title: string;
  description: string;
  category: ListingCategory;
  listingType: ListingType;
  condition: ListingCondition;
  tradeType?: TradeType;
  availability?: AvailabilityType;
  deliveryDuration?: string;
  offerTags: string[];
  wantTags: string[];
  creditValue: number;
  photos: string[];
  location: GeoLocation;
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
  createdAt?: string | null;
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
export type ListingDetail = Pick<Listing, 'id' | 'title' | 'description' | 'category' | 'condition' | 'listingType' | 'condition' | 'tradeType' | 'availability' | 'deliveryDuration' | 'offerTags' | 'wantTags' | 'creditValue' | 'photos' | 'userId' | 'status'>;