export type TradeStatus = 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';

export interface Trade {
  id: string;
  listingId: string;
  proposerId: string;
  receiverId: string;
  offeredListingId: string;
  creditsOffered?: number;
  message?: string;
  status: TradeStatus;
  proposerConfirmed: boolean;
  receiverConfirmed: boolean;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}