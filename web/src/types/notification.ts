export type NotificationType = 'trade_proposed' | 'trade_accepted' | 'trade_rejected' | 'trade_completed' | 'trade_cancelled' | 'credit_earned' | 'credit_spent' | 'new_message' | 'listing_expired';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  isRead: boolean;
  relatedTradeId?: string;
  relatedListingId?: string;
  relatedUserId?: string;
  createdAt: FirebaseFirestore.Timestamp;
}