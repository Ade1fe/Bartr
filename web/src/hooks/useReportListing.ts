import { useMutation } from '@tanstack/react-query';
import { clientAuth } from '@/lib/firebase-client';
import { toast } from 'sonner';
import type { ReportReason } from '@/types/moderation';

export function useReportListing() {
  return useMutation({
    mutationFn: async ({ listingId, reason, details }: { listingId: string; reason: ReportReason; details?: string }) => {
      const token = await clientAuth.currentUser?.getIdToken();
      if (!token) throw new Error('Not authenticated');

      const res = await fetch('/api/listings/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ listingId, reason, details }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Failed to submit report');
      }
      return res.json();
    },
    onSuccess: () => toast.success("Thanks — we'll take a look."),
    onError: (err: Error) => toast.error(err.message),
  });
}