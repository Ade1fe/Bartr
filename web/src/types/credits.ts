export type CreditTransactionType = 'earn' | 'spent' | 'refund' | 'bonus';

export interface CreditTransaction {
  id: string;
  userId: string;
  amount: number;
  type: CreditTransactionType;
  reason: string;
  relatedTradeId?: string;
  relatedListingId?: string;
  balanceAfter: number;
  createdAt: FirebaseFirestore.Timestamp;
}