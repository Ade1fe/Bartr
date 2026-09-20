// src/types/user.ts
import type { GeoLocation } from "./location";

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber: string;
  bio?: string;
  location: GeoLocation;
  creditBalance: number;
  lockedCredits: number;
  reputationScore: number;
  totalTrades: number;
  reviewCount: number;
  successRate: number;
  accountType?: 'individual' | 'business';
  isVerified: boolean;
  verificationStatus: 'none' | 'pending' | 'verified';
  isSuspended: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
  lastVerificationReviewedBy?: string;
  lastVerificationReviewedAt?: string;
}