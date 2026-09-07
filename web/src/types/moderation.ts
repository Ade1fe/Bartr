export type QueueType = 'new_listing' | 'edited_listing' | 'user_report';
export type QueueStatus = 'pending' | 'approved' | 'rejected';
export type ActionTaken = 'none' | 'listing_approved' | 'listing_removed' | 'user_warned' | 'user_suspended';

export type ReportReason = 'prohibited_item' | 'counterfeit_or_stolen' | 'misleading_description' | 'scam_or_fraud' | 'inappropriate_content' | 'other';

export const REPORT_REASONS: { value: ReportReason; label: string }[] = [
  { value: 'prohibited_item', label: 'Prohibited or illegal item' },
  { value: 'counterfeit_or_stolen', label: 'Counterfeit or Stolen goods' },
  { value: 'misleading_description', label: "Photos/description don't match the item" },
  { value: 'scam_or_fraud', label: 'Looks like a scam' },
  { value: 'inappropriate_content', label: 'Inappropriate Content' },
  { value: 'other', label: 'Something else' },
];

export interface ModerationQueueItem {
  id: string;
  listingId: string;
  listingOwnerId: string;
  queueType: QueueType;
  status: QueueStatus;
  keywordFlags: string[];
  reportCount: number;
  reportReason: ReportReason[];
  reportDetails: string[];
  listingSnapshot: {
    title: string;
    description: string;
    category: string;
    photos: string[];
  };
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
  reviewedAt: FirebaseFirestore.Timestamp | null;
  reviewedBy: string | null;
  actionTaken: ActionTaken;
}