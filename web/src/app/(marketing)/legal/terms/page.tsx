// src/app/(marketing)/terms/page.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChevronDown, Download, FileText, Mail, TriangleAlert } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const sections = [
  { id: 'who-we-are', label: 'Who We Are', number: 1 },
  { id: 'acceptance-of-terms', label: 'Acceptance of Terms', number: 2 },
  { id: 'eligibility', label: 'Eligibility & Account Registration', number: 3 },
  { id: 'user-listings', label: 'User Listings and Content', number: 4 },
  { id: 'trade-process', label: 'The Trade Process', number: 5 },
  { id: 'credit-system', label: 'Credit System', number: 6 },
  { id: 'prohibited', label: 'Prohibited Items and Conduct', number: 7 },
  { id: 'dispute', label: 'Dispute Resolution', number: 8 },
  { id: 'liability', label: 'Platform Liability Limitations', number: 9 },
  { id: 'termination', label: 'Account Suspension & Termination', number: 10 },
  { id: 'ip', label: 'Intellectual Property', number: 11 },
  { id: 'changes', label: 'Changes to These Terms', number: 12 },
  { id: 'governing-law', label: 'Governing Law', number: 13 },
  { id: 'contact', label: 'Contact Us', number: 14 },
]

export default function TermsPage() {
  const [activeId, setActiveId] = useState<string>('who-we-are')
  const [mobileTocOpen, setMobileTocOpen] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // IntersectionObserver watches each section heading
    // When a section enters the top portion of the viewport,
    // it becomes the active sidebar item
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        // rootMargin controls when the section is considered "active"
        // -10% top means it triggers slightly before reaching the top
        // -80% bottom means only the top 20% of the viewport counts
        rootMargin: '-10% 0px -80% 0px',
      }
    )

    // Observe every section heading
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
  }

  const activeSection = sections.find((s) => s.id === activeId) ?? sections[0]

  return (
    <div className="min-h-screen bg-white w-full">

      <div className="max-w-360 mx-auto px-4 lg:px-8 py-4 flex gap-16">

        {/* ── Sidebar ──────────────────────────────────────── */}
        <aside className="hidden lg:block w-64 shrink-0">
          {/* sticky keeps the sidebar fixed while page scrolls */}
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
                <BreadcrumbPage className='text-neutral-600'>Terms of Service</BreadcrumbPage>
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


          {/* Page header */}
          <h1 className="text-lg lg:text-2xl font-semibold text-neutral-900 mb-3">
            Terms of Service
          </h1>
          <div className="flex gap-6 text-xs lg:text-sm text-neutral-400 mb-8">
            <span>Effective date: <span className="text-neutral-600">1 July 2026</span></span>
            <span>Last updated: <span className="text-neutral-600">1 July 2026</span></span>
          </div>

          {/* Plain English callout */}
          <div className="bg-[#86B7A9]/10 border border-[#86B7A9]/20 rounded-xl p-3 mb-12 flex gap-3">
            <span className="shrink-0 h-5 w-5 rounded-full bg-[#86B7A9] text-white text-xs flex items-center justify-center mt-0.5">
              i
            </span>
            <div>
              <p className="text-xs lg:text-sm font-medium text-[#86B7A9] mb-1">In plain English</p>
              <p className="text-xs lg:text-sm text-neutral-600 leading-relaxed">
                Bartr is a platform where people trade goods directly with each other. We provide the tools to find trade partners, negotiate, and coordinate exchanges. We do not own, inspect, or guarantee any goods traded on the platform. You are responsible for your listings, your trades, and your conduct.
              </p>
            </div>
          </div>

          {/* ── Sections ── */}

          <Section id="who-we-are" number={1} title="Who We Are">
            <p>
              <strong>Bartr</strong> ("we", "us", "our") is a peer-to-peer barter marketplace operated by [Your Company Name], registered in [Registration Country/State]. Our platform enables users to list goods and exchange them directly with other users without monetary transactions.
            </p>
            <p className="mt-3">
              Contact:{' '}
              <a href="mailto:legal@bartr.com" className="text-blue-600 underline">
                legal@bartr.com
              </a>
            </p>
          </Section>

          <Section id="acceptance-of-terms" number={2} title="Acceptance of Terms">
            <p>
              By creating an account or using the Bartr platform (web or mobile),
              you confirm that you:
            </p>
            <ol className="mt-3 space-y-2 list-none">
              {[
                'Are at least 18 years of age',
                'Have read and understood these Terms',
                'Agree to be legally bound by them',
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-neutral-600">
                  <span className="text-neutral-400 shrink-0">
                    ({String.fromCharCode(97 + i)})
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </Section>

          <Section id="eligibility" number={3} title="Eligibility & Account Registration">
            <ul className="space-y-3">
              {[
                'You must be at least 18 years old to register.',
                'You must provide accurate, current, and complete information during registration and keep it updated.',
                'You are responsible for maintaining the security of your account credentials. You must notify us immediately at security@bartr.com if you suspect unauthorised access.',
                'One person may not operate multiple accounts. We reserve the right to merge or terminate duplicate accounts.',
                'Accounts are non-transferable.',
              ].map((item, i) => (
                <li key={i} className="flex gap-2 text-neutral-600">
                  <span className="text-neutral-300 shrink-0 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section id="user-listings" number={4} title="User Listings and Content">
            <p className="text-neutral-600">
              You are solely responsible for all content you post, including listing descriptions, photos, and communications.
            </p>
            <p className="mt-4 text-neutral-600">By posting content, you confirm that:</p>
            <ol className="mt-3 space-y-2 list-none">
              {[
                'You own or have the right to offer the listed item',
                'The item is accurately described',
                'Photos represent the actual item in its current condition',
                'The item is in your physical possession',
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-neutral-600">
                  <span className="text-neutral-400 shrink-0">
                    ({String.fromCharCode(97 + i)})
                  </span>
                  {item}
                </li>
              ))}
            </ol>
            {/* Warning callout */}
            <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
              <div className="shrink-0 w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center mt-0.5">
                <TriangleAlert className="size-4 text-white" />
              </div>
              <p className="text-amber-800">
                We do not verify the accuracy of listings. We are not responsible for inaccurate, misleading, or fraudulent listings posted by users. We reserve the right to remove any listing that violates these Terms without prior notice.
              </p>
            </div>
          </Section>

          {/* Add remaining sections following the same pattern */}
          <Section id="trade-process" number={5} title="The Trade Process">
            <p className="text-neutral-600">
              Bartr facilitates connections between traders but is{' '} <strong>NOT a party to any trade</strong>. All trades are agreements made directly between users.
            </p>
            <p className="mt-4 text-neutral-600">The trade process on Bartr works as follows:</p>
            <ol className="mt-3 space-y-2 list-none">
              {[
                'User A creates a listing for an item they own',
                'User B proposes a trade, offering one of their own listed items in exchange',
                'User A accepts, counters, or declines',
                'If accepted, both listings enter escrow status',
                'Both parties coordinate the physical exchange independently',
                'Both parties confirm completion within the platform',
                'Credits are transferred and listings are closed',
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-neutral-600">
                  <span className="text-neutral-400 shrink-0">
                    ({String.fromCharCode(97 + i)})
                  </span>
                  {item}
                </li>
              ))}
            </ol>

            <div className="mt-5 bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3">
              <span className="shrink-0 h-5 w-5 rounded-full bg-red-400 text-white text-xs flex items-center justify-center mt-0.5">
                !
              </span>
              <p className="text-red-800">
                <span className="font-semibold">Important: </span>
                Bartr does not physically handle, store, inspect, ship, or guarantee any items traded on the platform. The physical exchange is entirely the responsibility of the parties involved.
              </p>
            </div>

            <p className="text-neutral-600">
              Both parties bear the risk of physical exchange. We{' '} <strong>strongly recommend </strong>meeting in safe, public locations and inspecting items before confirming trade completion. Once both parties confirm completion, the trade is considered final. Bartr is not responsible for quality disputes raised after trade confirmation.
            </p>
          </Section>

          <Section id="credit-system" number={6} title="Credit System">
            <p className="text-neutral-600">
              Bartr credits ("<strong>Credits</strong>") are a platform utility token used to facilitate indirect trades and balance trade value differences.
            </p>

            <ul className="mt-3 space-y-2 list-disc list-inside disc pl-3 lg:pl-5 marker:text-neutral-400 marker:text-xs">
              {[
                'Credits have no monetary value',
                'Credits cannot be redeemed for cash',
                'Credits cannot be transferred outside the Bartr platform',
                'Credits are non-refundable except where required by law',
              ].map((item, i) => (
                <li key={i} className="gap-3 text-neutral-600">
                  {/* <span className="text-neutral-400 shrink-0">
                    ({String.fromCharCode(97 + i)})
                  </span> */}
                  {item}
                </li>
              ))}
            </ul>

            <p className="text-neutral-600">
              Credits may be earned by completing trades or purchased through in-app purchase options. Bartr reserves the right to adjust Credit balances in cases of fraud, error, or Terms violation. Unused Credits are forfeited upon account termination unless otherwise required by applicable law.
            </p>
          </Section>

          {/* Continue with remaining sections... */}
          <Section id="prohibited" number={7} title="Prohibited Items and Conduct">
            <h4 className='font-medium'>PROHIBITED ITEMS</h4>
            <p className="text-neutral-600">
              The following items may <strong>NOT</strong> be listed or traded on Bartr under any circumstances:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside disc pl-3 lg:pl-5 marker:text-neutral-400 marker:text-xs">
              {[
                'Firearms, ammunition, and weapons of any kind',
                'Controlled substances, narcotics, or prescription drugs without valid prescription',
                'Stolen, counterfeit, or illegally obtained goods',
                'Human remains, organs, or body parts',
                'Live animals or endangered species products',
                'Explosive materials or hazardous substances',
                'Child sexual abuse material or any content exploiting minors',
                'Goods subject to trade sanctions or embargoes',
                'Pirated software, media, or counterfeit branded goods',
                'Any item the sale or transfer of which is prohibited by applicable law',
              ].map((item, i) => (
                <li key={i} className="gap-3 text-neutral-600">
                  {item}
                </li>
              ))}
            </ul>

            <h4 className='font-medium'>PROHIBITED CONDUCT</h4>
            <ul className="mt-3 space-y-2 list-disc list-inside disc pl-3 lg:pl-5 marker:text-neutral-400 marker:text-xs">
              {[
                'Misrepresenting items in listings',
                'Credits cannot be redeemed for cash',
                'Harassing, threatening, or abusing other users',
                'Attempting to conduct transactions outside the Bartr platform to avoid fees or protections',
                'Manipulating the rating or review system',
                'Using automated tools to scrape or mass-access the platform',
                'Any form of fraud or deceptive practice',
              ].map((item, i) => (
                <li key={i} className="gap-3 text-neutral-600">
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-5 bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3">
              <span className="shrink-0 h-5 w-5 rounded-full bg-red-400 text-white text-xs flex items-center justify-center mt-0.5">
                !
              </span>
              <p className="text-red-800">
                Violations may result in immediate account suspension, credit forfeiture, and referral to law enforcement where appropriate.
              </p>
            </div>
          </Section>
          <Section id="dispute" number={8} title="Dispute Resolution">
            <p className="text-neutral-600">
              Bartr provides a dispute resolution process for trade-related conflicts. This process is available where:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside disc pl-3 lg:pl-5 marker:text-neutral-400 marker:text-xs">
              {[
                'A party fails to deliver their item as described',
                'An item is materially different from its listing',
                'A party becomes unresponsive after acceptance',
              ].map((item, i) => (
                <li key={i} className="gap-3 text-neutral-600">
                  {item}
                </li>
              ))}
            </ul>

            <h4 className='font-medium'>DISPUTE PROCESS</h4>
            <ul className="mt-3 space-y-2 list-none">
              {[
                'Disputes must be raised within 7 days of the scheduled or expected exchange date',
                'File a dispute through the trade detail page',
                'Both parties will be notified and given 48 hours to submit evidence',
                "Bartr's Trust and Safety team will review all evidence and make a determination within 5 business days",
                'Outcomes may include: trade cancellation, credit adjustment, account warnings, or account suspension',
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-neutral-600">
                  <span className="text-neutral-400 shrink-0">
                    ({String.fromCharCode(97 + i)})
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
              <div className="shrink-0 w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center mt-0.5">
                <TriangleAlert className="size-4 text-white" />
              </div>
              <p className="text-amber-800">
                Bartr's dispute determination is final within the platform. We are not an arbitration service and our decisions do not prevent either party from seeking legal remedies independently. We can only adjudicate on platform-level outcomes — we cannot compel return of physical goods or financial compensation between users.
              </p>
            </div>
          </Section>
          <Section id="liability" number={9} title="Platform Liability Limitations">
            <p className="text-neutral-600">
              The platform is provided <strong>"as is"</strong> without warranty of any kind, express or implied.
            </p>
            <div className="mt-5 bg-red-50 border border-red-200 rounded-xl p-4 flex flex-col">
              <div className='flex gap-3'>
                <span className="shrink-0 h-5 w-5 rounded-full bg-red-400 text-white text-xs flex items-center justify-center mt-0.5">
                  !
                </span>
                <p className="text-red-800 font-semibold">
                  To the maximum extent permitted by law, Bartr shall not be liable for:
                </p>
              </div>

              <ul className="mt-3 space-y-2 list-disc list-inside disc pl-3 lg:pl-5 marker:text-neutral-400 marker:text-xs">
                {[
                  'Loss, damage, or theft of goods during physical exchange',
                  'Inaccurate or fraudulent listings posted by users',
                  'Personal injury occurring during trade meetups',
                  'Loss of Credits due to account compromise caused by user negligence',
                  'Indirect, incidental, or consequential damages arising from use of the platform',
                  'Any loss arising from reliance on platform content',
                ].map((item, i) => (
                  <li key={i} className="gap-3 text-neutral-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-neutral-600">
              Where liability cannot be excluded by law, our total liability to you for any claim shall not exceed the value of Credits held in your account at the time of the claim.
            </p>
          </Section>
          <Section id="termination" number={10} title="Account Suspension & Termination">
            <p className="text-neutral-600">
              We may suspend or terminate your account, with or without notice, if you:
            </p>
            <ul className="mt-3 space-y-2 list-none">
              {[
                'Violate these Terms',
                'Engage in fraudulent activity',
                'Receive multiple substantiated complaints from other users',
                'Remain inactive for 24 consecutive months',
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-neutral-600">
                  <span className="text-neutral-400 shrink-0">
                    ({String.fromCharCode(97 + i)})
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <p className="text-neutral-600">
              You may delete your account at any time through Settings. Upon deletion:
            </p>
            <ul className="mt-3 space-y-2 list-none">
              {[
                'Your listings will be removed',
                'Your Credits will be forfeited',
                'Your trade history will be retained for legal and safety purposes per our Data Retention Policy',
                'Active trades must be resolved before deletion is processed',
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-neutral-600">
                  <span className="text-neutral-400 shrink-0">
                    ({String.fromCharCode(97 + i)})
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <p className="text-neutral-600">
              We will give reasonable notice before terminating accounts for inactivity.
            </p>
          </Section>
          <Section id="ip" number={11} title="Intellectual Property">
            <p className="text-neutral-600">All platform content, design, code, trademarks, and branding are owned by Bartr and protected by applicable intellectual property laws.</p>
            <p className="text-neutral-600">By posting content on Bartr, you grant us a <strong>non-exclusive, royalty-free, worldwide licence</strong> to display, reproduce, and distribute that content solely for the purpose of operating the platform. You retain ownership of all content you post.</p>
          </Section>
          <Section id="changes" number={12} title="Changes to These Terms">
            <p className="text-neutral-600">We will notify users of material changes to these Terms via email and in-app notification at least <strong>14 days</strong> before they take effect. Continued use of the platform after changes take effect constitutes acceptance.</p>
          </Section>
          <Section id="governing-law" number={13} title="Governing Law">
            <p className="text-neutral-600">These Terms are governed by the laws of the <strong>Federal Republic of Nigeria.</strong> Any disputes arising from these Terms shall be subject to the jurisdiction of the courts of Nigeria, without prejudice to your rights under consumer protection laws in your country of residence.</p>
          </Section>
          <Section id="contact" number={14} title="Contact Us">
            <p className="text-neutral-600">
              For questions about these Terms:
            </p>

            <ul className="mt-3 space-y-2 list-disc list-inside disc pl-3 lg:pl-5 marker:text-neutral-400 marker:text-xs">
              <li className="gap-3 text-neutral-600">
                Email: <u>legal@bartr.com</u>
              </li>
              {/* <li className="gap-3 text-neutral-600">
                Address: [Your registered business address]
              </li> */}
            </ul>
          </Section>

          <hr className='text-neutral-100' />

          <section className='scroll-mt-24'>
            <p className="text-xs lg:text-sm text-neutral-400 mt-6">
              Last reviewed by Bartr Legal Team
            </p>
            <div className='mt-3 flex flex-col sm:flex-row gap-6'>
              <Button className='font-normal text-neutral-600 flex gap-3 border border-neutral-200 shadow-none cursor-pointer'><Download /> Download PDF</Button>
              <Button className='font-normal text-neutral-600 flex gap-3 border border-neutral-200 shadow-none cursor-pointer'><Mail /> Contact Us About This Policy</Button>
            </div>

            <div className='mt-3 flex flex-col gap-3'>
              <p className='text-sm text-neutral-400 mt-4 tracking-widest'>RELATED</p>
              <div className='flex flex-wrap gap-4'>
                <a href='/legal/privacy' className='font-light text-xs lg:text-sm text-neutral-400 flex gap-1 cursor-pointer items-center'><FileText className='size-4' /> Privacy Policy</a>
                <a href='/legal/dispute-resolution' className='font-light text-xs lg:text-sm text-neutral-400 flex gap-1 cursor-pointer items-center'><FileText className='size-4' /> Dispute Resolution Policy</a>
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
    <section id={id} className="mb-14 scroll-mt-24">
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