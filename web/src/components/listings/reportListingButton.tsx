'use client'

import { useState } from "react";
import { Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from "@/components//ui/label";
import { Textarea } from "@/components/ui/textarea";
import { REPORT_REASONS, type ReportReason } from "@/types/moderation";
import { useReportListing } from '@/hooks/useReportListing';

export function ReporrtListingButton({ listingId }: { listingId: string }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<ReportReason | ''>('');
  const [details, setDetails] = useState('');
  const { mutate, isPending } = useReportListing();

  function handleSubmit() {
    if (!reason) return
    mutate(
      { listingId, reason, details: details || undefined },
      { onSuccess: () => { setOpen(false); setReason(''); setDetails('') } }
    )
  }

  return (
    <>
      <Button size='sm' className='text-white/85 hover:text-white bg-red-400 cursor-pointer' onClick={() => setOpen(true)}>
        <Flag className='h-3.5 w-3.5 mr-1.5' />
        Report
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Report this listing</DialogTitle>
          </DialogHeader>

          <RadioGroup value={reason} onValueChange={v => setReason(v as ReportReason)} className="gap-3 py-2">
            {REPORT_REASONS.map(r => (
              <div key={r.value} className="flex items-center gap-2">
                <RadioGroupItem value={r.value} id={r.value} />
                <Label htmlFor={r.value} className="text-sm text-neutral-600 font-normal cursor-pointer">{r.label}</Label>
              </div>
            ))}
          </RadioGroup>

          <Textarea placeholder="Anything else we should know? (optional)" value={details} onChange={e => setDetails(e.target.value)} className="resize-none min-h-20 text-sm text-neutral-500 border-neutral-100"
          />

          <DialogFooter>
            <Button onClick={() => setOpen(false)} className='text-sm text-white bg-red-400text-white bg-red-400 font-normal cursor-pointer'>Cancel</Button>
            <Button onClick={handleSubmit} disabled={!reason || isPending} className='text-sm text-neutral-500 font-normal cursor-pointer'>
              {isPending ? 'Submitting...' : 'Submit report'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
