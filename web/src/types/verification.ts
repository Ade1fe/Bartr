export type VerificationDecision = 'verified' | 'rejected';

export interface PendingVerificationUser {
  uid: string;
  displayName: string;
  email: string;
  idDocumentUrl: string;
  verificationStatus: 'pending';
  createdAt: string;
}