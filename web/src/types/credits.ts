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

export const NAIRA_PER_CREDIT = 1000; // 1 credit = 100 Naira
const MAX_CREDIT_VALUE = 50_000;

export function computeCreditValue(estimatedValueNaira: number): number {
  if (!Number.isFinite(estimatedValueNaira) || estimatedValueNaira <= 0) return 0;

  const raw = Math.round(estimatedValueNaira / NAIRA_PER_CREDIT);

  return Math.min(raw, MAX_CREDIT_VALUE);
}