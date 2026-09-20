import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clientAuth } from '@/lib/firebase-client';
import { toast } from 'sonner';
import type { QueueStatus, QueueType, ActionTaken } from '@/types/moderation';

async function authHeaders() {
  const token = await clientAuth.currentUser?.getIdToken();
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
}

export function useModerationQueue(status: QueueStatus = 'pending', queueType?: QueueType) {
  return useQuery({
    queryKey: ['moderationQueue', status, queueType],
    queryFn: async () => {
      const params = new URLSearchParams({ status, ...(queueType ? { queueType } : {}) });
      const res = await fetch(`/api/admin/moderation-queue?${params}`, { headers: await authHeaders() });
      if (!res.ok) throw new Error('Failed to load queue');
      return res.json();
    },
  });
}

export function useModerationAction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, action, actionTaken, }: { id: string; action: 'approve' | 'reject'; actionTaken: ActionTaken; }) => {
      const res = await fetch(`/api/admin/moderation-queue/${id}`, {
        method: 'PATCH',
        headers: await authHeaders(),
        body: JSON.stringify({ action, actionTaken }),
      });
      if (!res.ok) throw new Error('Action failed');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moderationQueue'] });
      toast.success('Done');
    },
    onError: () => toast.error('Something went wrong'),
  });
}