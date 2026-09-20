import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clientAuth } from '@/lib/firebase-client';
import { toast } from 'sonner';
import type { VerificationDecision, PendingVerificationUser } from '@/types/verification';

async function authHeaders() {
  const token = await clientAuth.currentUser?.getIdToken();
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
}

export function useVerificationQueue() {
  return useQuery({
    queryKey: ['verificationQueue'],
    queryFn: async (): Promise<{ users: PendingVerificationUser[] }> => {
      const res = await fetch('/api/admin/users/verification-queue', { headers: await authHeaders() });
      if (!res.ok) throw new Error('Failed to load verification queue');
      return res.json();
    },
  });
}

export function useVerificationDecision() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ uid, decision }: { uid: string; decision: VerificationDecision }) => {
      const res = await fetch(`/api/admin/users/${uid}/verify-id`, {
        method: 'PATCH',
        headers: await authHeaders(),
        body: JSON.stringify({ decision }),
      });
      if (!res.ok) throw new Error('Action failed');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['verificationQueue'] });
      toast.success('Done');
    },
    onError: () => toast.error('Something went wrong'),
  });
}