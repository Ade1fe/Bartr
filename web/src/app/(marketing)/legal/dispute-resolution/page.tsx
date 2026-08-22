// src/app/(marketing)/privacy/page.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Check, ChevronDown, Download, FileText, Mail, TriangleAlert, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const sections = [
  { id: 'when-to-file-a-dispute', label: 'When to File a Dispute', number: 1 },
  { id: 'when-not-to-file-a-dispute', label: 'When NOT to File a Dispute', number: 2 },
  { id: 'dispute-timeline', label: 'Dispute Timeline', number: 3 },
  { id: 'evidence-to-submit', label: 'Evidence to Submit', number: 4 },
  { id: 'possible-outcomes', label: 'Possible Outcomes', number: 5 },
  { id: 'important-limitations', label: 'Important Limitations', number: 6 },
]

export default function ResolutionPage() {
  const [activeId, setActiveId] = useState<string>('when-to-file-a-dispute')
  const [mobileTocOpen, setMobileTocOpen] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // IntersectionObserver watches each section heading
    // When a section enters the top portion of the viewport,
    // it becomes the active item — this drives BOTH the desktop
    // sidebar and the mobile sticky TOC below, since both just read activeId
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-10% 0px -80% 0px',
      }
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observerRef.current?.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  function scrollToSection(id: string) {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setMobileTocOpen(false)
  }

  const activeSection = sections.find((s) => s.id === activeId) ?? sections[0]

  return (
    <div className="min-h-screen bg-white w-full">

      <div className="max-w-360 mx-auto px-4 lg:px-8 py-4 flex gap-16">

        {/* ── Desktop sidebar ──────────────────────────────────────── */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">
              Contents
            </p>
            <ScrollArea className="h-[calc(100vh-160px)]">
              <nav className="flex flex-col gap-1 pr-4">
                {sections.map(({ id, label, number }) => (
                  <button key={id} onClick={() => scrollToSection(id)} className={cn( 'flex items-start gap-2 text-left text-sm py-1.5 px-0', 'transition-all duration-150 cursor-pointer', 'text-neutral-400 font-normal', activeId === id && 'text-neutral-800 font-medium' )} >
                    <span className={cn( 'shrink-0 w-5 text-xs mt-0.5', activeId === id ? 'text-[#86B7A9]' : 'text-neutral-300' )}>
                      {number}
                    </span>
                    <span>{label}</span>
                  </button>
                ))}
              </nav>
            </ScrollArea>
          </div>
        </aside>

        {/* ── Main content ─────────────────────────────────── */}
        <main className="flex-1 min-w-0 w-full">

          <Breadcrumb className='border-b border-neutral-100 px-6 py-3 mb-3'>
            <BreadcrumbList className='text-xs lg:text-sm text-neutral-400'>
              <BreadcrumbItem>
                <BreadcrumbLink href='/'>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href='#' className='text-neutral-600'>Legal</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className='text-neutral-600'>Dispute Resolution</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>


          {/* ── Mobile sticky TOC — hidden on lg+, where the sidebar takes over ── */}
          <div className="lg:hidden sticky top-16 z-40 bg-white border-b border-neutral-100 mb-3">
            <Sheet open={mobileTocOpen} onOpenChange={setMobileTocOpen}>
              <SheetTrigger asChild>
                <button className="w-full flex items-center justify-between px-4 py-3 text-sm">
                  <span className="flex items-center gap-2 text-neutral-700 font-medium">
                    <span className="text-[#86B7A9]">{activeSection.number}.</span>
                    {activeSection.label}
                  </span>
                  <ChevronDown className="h-4 w-4 text-neutral-400" />
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="bg-white max-h-[70vh]">
                <SheetHeader>
                  <SheetTitle className="text-sm text-neutral-400 uppercase tracking-widest">Contents</SheetTitle>
                  <SheetDescription></SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col gap-1 mt-2 overflow-y-auto">
                  {sections.map(({ id, label, number }) => (
                    <button key={id} onClick={() => scrollToSection(id)} className={cn('flex items-start gap-2 text-left text-sm py-1.5 px-2 rounded-lg', 'transition-colors duration-150 cursor-pointer', 'text-neutral-500 font-normal', activeId === id && 'text-neutral-900 font-medium bg-neutral-50')} >
                      <span className={cn('shrink-0 w-5 text-xs mt-0.5', activeId === id ? 'text-[#86B7A9]' : 'text-neutral-300')}>
                        {number}
                      </span>
                      <span>{label}</span>
                    </button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <h1 className="text-lg lg:text-2xl font-semibold text-neutral-900 mb-3">
            Dispute Resolution
          </h1>
          <div className="flex flex-wrap gap-3 lg:gap-6 text-xs lg:text-sm text-neutral-400 mb-8">
            <span>Effective date: <span className="text-neutral-600">1 July 2026</span></span>
            <span>Last updated: <span className="text-neutral-600">1 July 2026</span></span>
          </div>

          <div className="bg-[#86B7A9]/10 border border-[#86B7A9]/20 rounded-xl p-3 mb-12 flex gap-3">
            <span className="shrink-0 h-5 w-5 rounded-full bg-[#86B7A9] text-white text-xs flex items-center justify-center mt-0.5">
              i
            </span>
            <div>
              <p className="text-xs lg:text-sm font-medium text-[#86B7A9] mb-1">In plain English</p>
              <p className="text-xs lg:text-sm text-neutral-600 leading-relaxed">
                If a trade goes wrong — your partner didn't deliver, or the item was nothing like the listing — you can file a dispute within 7 days. Both sides submit evidence, and Bartr's team reviews it within 5 business days. We can adjust credits and accounts, but we can't physically retrieve items or provide legal advice.
              </p>
            </div>
          </div>

          {/* ── Sections ── */}

          <Section id="when-to-file-a-dispute" number={1} title="When to File a Dispute">
            <h4 className='font-medium'>File a dispute if <strong>any of the following apply</strong> to your trade:</h4>
            <ul className="mt-3 space-y-2 list-disc list-inside disc marker:text-neutral-400 marker:text-xs">
              {[
                'Your trade partner did not deliver their item after both parties confirmed',
                'The item received was materially different from the listing description',
                'Your trade partner became unreachable after the trade was accepted',
              ].map((item, i) => (
                <li key={i} className="gap-3 text-neutral-600 bg-amber-50/40 border border-amber-200 p-3 flex items-center rounded-xl">
                  <div className='rounded-full p-1 text-white bg-green-500'>
                    <Check className='size-3.5' />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-5 bg-[#86B7A9]/10 border border-[#86B7A9]/20 rounded-xl p-3 flex gap-3">
              <span className="shrink-0 h-5 w-5 rounded-full bg-[#86B7A9] text-white text-xs flex items-center justify-center mt-0.5">
                i
              </span>
              <p className="text-neutral-500">
                Disputes must be filed <span className="font-semibold">within 7 days</span> of the scheduled or expected exchange date. Files submitted after this window may not be reviewed.
              </p>
            </div>
          </Section>

          <Section id="when-not-to-file-a-dispute" number={2} title="When NOT to File a Dispute">
            <p className="mt-4 text-neutral-600">Do <span className="font-semibold">NOT</span> file a dispute if:</p>
            <ol className="mt-3 space-y-2 list-none">
              {[
                'You changed your mind about the trade',
                'You are unhappy with a fair item that was accurately described',
                'The issue arose after you confirmed completion',
              ].map((item, i) => (
                <li key={i} className="flex gap-3 bg-red-50 border border-red-200 rounded-xl p-3 text-red-400">
                  <div className="shrink-0 h-5 w-5 rounded-full bg-red-400 text-white text-xs flex items-center justify-center mt-0.5 p-0.5">
                    <X className='size-3' />
                  </div>
                  {item}
                </li>
              ))}
            </ol>

            <p className="text-neutral-600">
              Misuse of the dispute system — including filing frivolous or bad-faith disputes — may result in account warnings or suspension.
            </p>
          </Section>

          <Section id="dispute-timeline" number={3} title="Dispute Timeline">
            <ul className="space-y-3">
              {[
                { title: 'File the dispute', duration: '0', text: 'Submit via the trade detail page within 7 days of the expected exchange date.' },
                { title: 'Evidence window', duration: '1 - 2', text: 'Both parties are notified and have 48 hours to submit photos, messages, or proof of exchange.' },
                { title: 'Review period', duration: '2 - 7', text: "Bartr's Trust and Safety team reviews all submitted evidence." },
                { title: 'Decision communicated', duration: '5 - 7', text: 'Both parties receive the outcome simultaneously via email and in-app notification.' },
              ].map((item, i) => (
                <li key={i} className="flex gap-6 text-neutral-600">
                  <div className="text-white bg-black/80 rounded-full p-3 w-5 h-5 flex items-center justify-center text-xs shrink-0">
                    {i + 1}
                  </div>
                  <div className='flex flex-1 flex-col gap-2 justify-start'>
                    <div className='flex gap-3 items-center'>
                      <span className='font-semibold'>{item.title}</span>
                      <span className='flex py-0.5 px-2 w-auto h-auto items-center border border-amber-200 bg-amber-50 rounded-2xl text-xs'>Day {item.duration}</span>
                    </div>
                    <span>{item.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="evidence-to-submit" number={4} title="Evidence to Submit">
            <p className="text-neutral-600">
              When you file a dispute, submit as much of the following as is relevant to your case:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside disc pl-5 marker:text-neutral-400 marker:text-xs">
              {[
                'Photos of the item received (if the dispute concerns item condition)',
                'Screenshots of relevant in-app conversations',
                'Any proof of delivery or physical exchange (receipts, delivery confirmations, etc.)',
                'Date and location records of any agreed meetups',
              ].map((item, i) => (
                <li key={i} className="gap-3 text-neutral-600">{item}</li>
              ))}
            </ul>

            <div className="mt-5 bg-[#86B7A9]/10 border border-[#86B7A9]/20 rounded-xl p-3 flex gap-3">
              <span className="shrink-0 h-5 w-5 rounded-full bg-[#86B7A9] text-white text-xs flex items-center justify-center mt-0.5">
                i
              </span>
              <p className="">
                Evidence must be submitted within the <span className='font-medium'>48-hour window</span> after dispute notification. Evidence submitted after this period may not be considered in the review.
              </p>
            </div>

            <p className="text-neutral-600">
              Both parties have an equal opportunity to present their case. Bartr's team reviews all evidence impartially before reaching a determination.
            </p>
          </Section>

          <Section id="possible-outcomes" number={5} title="Possible Outcomes">
            <p className="text-neutral-600">
              Bartr can only act on platform-level outcomes.
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside disc pl-5 marker:text-neutral-400 marker:text-xs">
              {[
                { title: 'Trade cancellation and credit reversal', text: 'The trade is cancelled and any Credits exchanged are reversed to their original holders.' },
                { title: 'Account warning issued', text: "A formal warning is recorded on the offending party's account. Multiple warnings may lead to suspension." },
                { title: 'Temporary account suspension', text: 'The offending account is suspended for a defined period, restricting platform access.' },
                { title: 'Permanent account ban', text: 'Reserved for serious or repeated violations. The account is permanently removed from the platform.' },
                { title: 'Referral to law enforcement', text: 'In cases of suspected fraud or criminal activity, Bartr may refer the matter to relevant authorities.' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 border border-neutral-200 rounded-xl hover:shadow-sm p-3">
                  <div className="text-neutral-600 bg-neutral-200/60 rounded-full p-3 w-5 h-5 flex items-center justify-center text-xs shrink-0">
                    {i + 1}
                  </div>
                  <div className='flex flex-1 flex-col gap-2 justify-start'>
                    <span className='font-semibold'>{item.title}</span>
                    <span>{item.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="important-limitations" number={6} title="Important Limitations">
            <div className="mt-5 bg-red-50 border border-red-200 rounded-xl p-4 flex flex-col">
              <div className='flex gap-3'>
                <span className="shrink-0 h-5 w-5 rounded-full bg-red-400 text-white text-xs flex items-center justify-center mt-0.5">
                  !
                </span>
                <p className="text-red-800 font-semibold">
                  Bartr can only act on platform-level outcomes.
                </p>
              </div>

              <ul className="mt-3 space-y-2 list-disc list-inside disc pl-3 lg:pl-5 marker:text-neutral-400 marker:text-xs">
                {[
                  'We cannot compel the return of physical goods',
                  'We cannot facilitate police reports on your behalf',
                  'We cannot provide legal advice',
                  'We cannot issue financial compensation between users',
                ].map((item, i) => (
                  <li key={i} className="gap-3 text-neutral-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-4">
              If you believe a <span className='font-semibold'>crime has occurred</span> (theft, fraud, assault), contact your local law enforcement directly. Bartr's dispute process does not substitute for legal action and does not prevent you from pursuing independent legal remedies.
            </p>

            <h4 className='font-semibold'>FINALITY OF DECISIONS</h4>

            <p className="mt-4">
              All dispute decisions made by Bartr are <span className='font-semibold'>final within the problem.</span> We do not conduct appeals processes for dispute outcomes. If you have concerns about how a dispute was handled, you may contact us at <a href='mailto:legal@bartr.com' className='underline'>legal@bartr.com</a>, however, this does not guarantee a review of the outcome.
            </p>
          </Section>

          <hr className='text-neutral-100' />

          <section className='scroll-mt-24'>
            <p className="text-xs lg:text-sm text-neutral-400 mt-6">
              Last reviewed by Bartr Legal Team
            </p>
            <div className='mt-3 flex flex-col sm:flex-row gap-3 sm:gap-6'>
              <Button className='font-normal text-neutral-600 flex gap-3 border border-neutral-200 shadow-none cursor-pointer'><Download /> Download PDF</Button>
              <Button className='font-normal text-neutral-600 flex gap-3 border border-neutral-200 shadow-none cursor-pointer'><Mail /> Contact Us About This Policy</Button>
            </div>

            <div className='mt-3 flex flex-col gap-3'>
              <p className='text-sm text-neutral-400 mt-4 tracking-widest'>RELATED</p>
              <div className='flex flex-wrap gap-4'>
                <a href='/legal/terms' className='font-light text-xs lg:text-sm text-neutral-400 flex gap-1 cursor-pointer items-center'><FileText className='size-4' /> Terms of Service</a>
                <a href='/legal/privacy' className='font-light text-xs lg:text-sm text-neutral-400 flex gap-1 cursor-pointer items-center'><FileText className='size-4' /> Privacy Policy</a>
                <a href='/guidelines' className='font-light text-xs lg:text-sm text-neutral-400 flex gap-1 cursor-pointer items-center'><FileText className='size-4' /> Community Guidelines</a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

// ── Reusable section wrapper ──────────────────────────────
function Section({ id, number, title, children }: { id: string; number: number; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-14 scroll-mt-32 lg:scroll-mt-24">
      <h2 className="flex items-baseline gap-3 text-base lg:text-xl font-normal text-neutral-700 mb-5">
        <span className="text-[#86B7A9] font-normal text-base lg:text-lg">{number}.</span>
        {title}
      </h2>
      <div className="text-xs lg:text-sm text-neutral-600 leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  )
}

// ── Label/description row used for Rights & Retention sections ──
function DefinitionRow({ label, desc }: { label: string; desc: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 py-3">
      <span className="font-medium text-neutral-800 sm:w-56 shrink-0">{label}</span>
      <span className="text-neutral-600">{desc}</span>
    </div>
  )
}

// ── Bolds specific substrings within a sentence without manual JSX splitting ──
function renderWithBold(text: string, boldParts?: string[]) {
  if (!boldParts || boldParts.length === 0) return text
  const pattern = new RegExp(`(${boldParts.map(escapeRegExp).join('|')})`, 'g')
  const parts = text.split(pattern)
  return parts.map((part, i) =>
    boldParts.includes(part) ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
  )
}

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}