// // src/app/(marketing)/privacy/page.tsx
// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import { ScrollArea } from '@/components/ui/scroll-area'
// import { Download, FileText, Mail, TriangleAlert } from 'lucide-react'
// import { cn } from '@/lib/utils'
// import { Button } from '@/components/ui/button'
// import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'

// const sections = [
//   { id: 'what-data-we-collect', label: 'What Data We Collect', number: 1 },
//   { id: 'data-usage', label: 'How We Use Your Data', number: 2 },
//   { id: 'data-storage-and-security', label: 'Data Storage and Security', number: 3 },
//   { id: 'data-sharing', label: 'Sharing Your Data', number: 4 },
//   { id: 'cookies-and-tracking', label: 'Cookies and Tracking', number: 5 },
//   { id: 'your-rights', label: 'Your Rights (NDPA / GDPR)', number: 6 },
//   { id: 'data-retention', label: 'Data Retention', number: 7 },
//   { id: 'childrens-privacy', label: "Children's Privacy", number: 8 },
//   { id: 'policy-changes', label: 'Changes to This Policy', number: 9 },
//   { id: 'contact', label: 'Contact Us', number: 10 },
// ]

// export default function PrivacyPage() {
//   const [activeId, setActiveId] = useState<string>('what-data-we-collect')
//   const observerRef = useRef<IntersectionObserver | null>(null)

//   useEffect(() => {
//     // IntersectionObserver watches each section heading
//     // When a section enters the top portion of the viewport,
//     // it becomes the active sidebar item
//     observerRef.current = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setActiveId(entry.target.id)
//           }
//         })
//       },
//       {
//         // rootMargin controls when the section is considered "active"
//         // -10% top means it triggers slightly before reaching the top
//         // -80% bottom means only the top 20% of the viewport counts
//         rootMargin: '-10% 0px -80% 0px',
//       }
//     )

//     // Observe every section heading
//     sections.forEach(({ id }) => {
//       const el = document.getElementById(id)
//       if (el) observerRef.current?.observe(el)
//     })

//     return () => observerRef.current?.disconnect()
//   }, [])

//   function scrollToSection(id: string) {
//     const el = document.getElementById(id)
//     if (el) {
//       el.scrollIntoView({ behavior: 'smooth', block: 'start' })
//     }
//   }

//   return (
//     <div className="min-h-screen bg-white w-full">

//       <div className="max-w-360 mx-auto px-4 lg:px-8 py-4 flex gap-16">

//         {/* ── Sidebar ──────────────────────────────────────── */}
//         <aside className="hidden lg:block w-64 shrink-0">
//           {/* sticky keeps the sidebar fixed while page scrolls */}
//           <div className="sticky top-24">
//             <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">
//               Contents
//             </p>
//             <ScrollArea className="h-[calc(100vh-160px)]">
//               <nav className="flex flex-col gap-1 pr-4">
//                 {sections.map(({ id, label, number }) => (
//                   <button key={id} onClick={() => scrollToSection(id)} className={cn( 'flex items-start gap-2 text-left text-sm py-1.5 px-0', 'transition-all duration-150 cursor-pointer', 'text-neutral-400 font-normal', activeId === id && 'text-neutral-800 font-medium' )} >
//                     <span className={cn( 'shrink-0 w-5 text-xs mt-0.5', activeId === id ? 'text-[#86B7A9]' : 'text-neutral-300' )}>
//                       {number}
//                     </span>
//                     <span>{label}</span>
//                   </button>
//                 ))}
//               </nav>
//             </ScrollArea>
//           </div>
//         </aside>

//         {/* ── Main content ─────────────────────────────────── */}
//         <main className="flex-1 min-w-0 w-full">

//           <Breadcrumb className='border-b border-neutral-100 px-6 py-3 mb-3'>
//             <BreadcrumbList className='text-xs lg:text-sm text-neutral-400'>
//               <BreadcrumbItem>
//                 <BreadcrumbLink href='/'>Home</BreadcrumbLink>
//               </BreadcrumbItem>
//               <BreadcrumbSeparator />
//               <BreadcrumbItem>
//                 <BreadcrumbLink href='#' className='text-neutral-600'>Legal</BreadcrumbLink>
//               </BreadcrumbItem>
//               <BreadcrumbSeparator />
//               <BreadcrumbItem>
//                 <BreadcrumbPage className='text-neutral-600'>Privacy Policy</BreadcrumbPage>
//               </BreadcrumbItem>
//             </BreadcrumbList>
//           </Breadcrumb>

//           {/* Page header */}
//           <h1 className="text-lg lg:text-2xl font-semibold text-neutral-900 mb-3">
//             Privacy Policy
//           </h1>
//           <div className="flex gap-6 text-xs lg:text-sm text-neutral-400 mb-8">
//             <span>Effective date: <span className="text-neutral-600">1 July 2026</span></span>
//             <span>Last updated: <span className="text-neutral-600">1 July 2026</span></span>
//           </div>

//           {/* Plain English callout */}
//           <div className="bg-[#86B7A9]/10 border border-[#86B7A9]/20 rounded-xl p-3 mb-12 flex gap-3">
//             <span className="shrink-0 h-5 w-5 rounded-full bg-[#86B7A9] text-white text-xs flex items-center justify-center mt-0.5">
//               i
//             </span>
//             <div>
//               <p className="text-xs lg:text-sm font-medium text-[#86B7A9] mb-1">In plain English</p>
//               <p className="text-xs lg:text-sm text-neutral-600 leading-relaxed">
//                 We collect the information you give us when you register and use the platform. We use it to run the platform and keep you safe. We do not sell your personal data. You can request your data or ask us to delete it at any time.
//               </p>
//             </div>
//           </div>

//           {/* ── Sections ── */}

//           <Section id="what-data-we-collect" number={1} title="What Data We Collect">
//             <h4 className='font-medium'>DATA YOU PROVIDE DIRECTLY</h4>
//             <ul className="mt-3 space-y-2 list-disc list-inside disc pl-5 marker:text-neutral-400 marker:text-xs">
//               {[
//                 'Full name and email address',
//                 'Phone number',
//                 'Location (city/state level)',
//                 'Profile photo',
//                 'Government ID documents (if you choose verification)',
//                 'Listing content (photos, descriptions, tags)',
//                 'Messages sent through the platform',
//                 'Trade history and activity',
//               ].map((item, i) => (
//                 <li key={i} className="gap-3 text-neutral-600">
//                   {item}
//                 </li>
//               ))}
//             </ul>

//             <h4 className='font-medium'>DATA WE COLLECT AUTOMATICALLY</h4>
//             <ul className="mt-3 space-y-2 list-disc list-inside disc pl-5 marker:text-neutral-400 marker:text-xs">
//               {[
//                 'IP address and approximate geolocation',
//                 'Device type, operating system, browser',
//                 'Pages visited and features used',
//                 'Time and duration of sessions',
//                 'Error logs and crash reports',
//               ].map((item, i) => (
//                 <li key={i} className="gap-3 text-neutral-600">
//                   {item}
//                 </li>
//               ))}
//             </ul>

//             <h4 className='font-medium'>DATA FROM THIRD PARTIES</h4>
//             <ul className="mt-3 space-y-2 list-disc list-inside disc pl-5 marker:text-neutral-400 marker:text-xs">
//               {[
//                 'Authentication providers (Google OAuth) if used to sign in',
//                 'Identity verification providers (if applicable)',
//               ].map((item, i) => (
//                 <li key={i} className="gap-3 text-neutral-600">
//                   {item}
//                 </li>
//               ))}
//             </ul>
//           </Section>

//           <Section id="data-usage" number={2} title="How We Use Your Data">
//             <p className="mt-4 text-neutral-600">We use your data to:</p>
//             <ol className="mt-3 space-y-2 list-none pl-3">
//               {[
//                 'Create and maintain your account',
//                 'Enable listing creation and trade matching',
//                 'Send OTP codes and security notifications',
//                 'Send transactional emails (trade updates, disputes, confirmations)',
//                 'Display your public profile to other users',
//                 'Detect and prevent fraud and abuse',
//                 'Resolve disputes between users',
//                 'Improve platform performance and features',
//                 'Comply with legal obligations',
//               ].map((item, i) => (
//                 <li key={i} className="flex gap-3 text-neutral-600">
//                   <span className="text-neutral-400 shrink-0">
//                     ({String.fromCharCode(97 + i)})
//                   </span>
//                   {item}
//                 </li>
//               ))}
//             </ol>

//             <div className="mt-5 bg-[#86B7A9]/10 border border-[#86B7A9]/20 rounded-xl p-4 flex flex-col gap-3">
//               <div className='flex gap-3'>
//                 <span className="shrink-0 h-5 w-5 rounded-full bg-[#86B7A9] text-white text-xs flex items-center justify-center mt-0.5">
//                   i
//                 </span>
//                 <p className="text-[#86B7A9] font-medium">
//                   We will NOT use your data to:
//                 </p>
//               </div>

//               <ul className="mt-1 space-y-2 list-disc list-inside disc pl-5 marker:text-neutral-400 marker:text-xs">
//                 {[
//                   'Sell or rent to third parties',
//                   'Send unsolicited marketing without your consent',
//                   'Make automated decisions that significantly affect you without human review',
//                 ].map((item, i) => (
//                   <li key={i} className="gap-3 text-neutral-600">
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </Section>

//           <Section id="data-storage-and-security" number={3} title="Data Storage and Security">
//             <ul className="space-y-3">
//               {[
//                 'Your data is stored on secure cloud infrastructure (Google Firebase / Firestore) with encryption at rest and in transit.',
//                 'You must provide accurate, current, and complete information during registration and keep it updated.',
//                 'You are responsible for maintaining the security of your account credentials. You must notify us immediately at security@bartr.com if you suspect unauthorised access.',
//                 'One person may not operate multiple accounts. We reserve the right to merge or terminate duplicate accounts.',
//                 'Accounts are non-transferable.',
//               ].map((item, i) => (
//                 <li key={i} className="flex gap-2 text-neutral-600">
//                   <span className="text-neutral-300 shrink-0 mt-1">•</span>
//                   {item}
//                 </li>
//               ))}
//             </ul>
//           </Section>

//           <Section id="user-listings" number={4} title="User Listings and Content">
//             <p className="text-neutral-600">
//               You are solely responsible for all content you post, including listing descriptions, photos, and communications.
//             </p>
//             <p className="mt-4 text-neutral-600">By posting content, you confirm that:</p>
//             <ol className="mt-3 space-y-2 list-none">
//               {[
//                 'You own or have the right to offer the listed item',
//                 'The item is accurately described',
//                 'Photos represent the actual item in its current condition',
//                 'The item is in your physical possession',
//               ].map((item, i) => (
//                 <li key={i} className="flex gap-3 text-neutral-600">
//                   <span className="text-neutral-400 shrink-0">
//                     ({String.fromCharCode(97 + i)})
//                   </span>
//                   {item}
//                 </li>
//               ))}
//             </ol>
//             {/* Warning callout */}
//             <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
//               <div className="shrink-0 w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center mt-0.5">
//                 <TriangleAlert className="size-4 text-white" />
//               </div>
//               <p className="text-amber-800">
//                 We do not verify the accuracy of listings. We are not responsible for inaccurate, misleading, or fraudulent listings posted by users. We reserve the right to remove any listing that violates these Terms without prior notice.
//               </p>
//             </div>
//           </Section>

//           {/* Add remaining sections following the same pattern */}
//           <Section id="trade-process" number={5} title="The Trade Process">
//             <p className="text-neutral-600">
//               Bartr facilitates connections between traders but is{' '} <strong>NOT a party to any trade</strong>. All trades are agreements made directly between users.
//             </p>
//             <p className="mt-4 text-neutral-600">The trade process on Bartr works as follows:</p>
//             <ol className="mt-3 space-y-2 list-none">
//               {[
//                 'User A creates a listing for an item they own',
//                 'User B proposes a trade, offering one of their own listed items in exchange',
//                 'User A accepts, counters, or declines',
//                 'If accepted, both listings enter escrow status',
//                 'Both parties coordinate the physical exchange independently',
//                 'Both parties confirm completion within the platform',
//                 'Credits are transferred and listings are closed',
//               ].map((item, i) => (
//                 <li key={i} className="flex gap-3 text-neutral-600">
//                   <span className="text-neutral-400 shrink-0">
//                     ({String.fromCharCode(97 + i)})
//                   </span>
//                   {item}
//                 </li>
//               ))}
//             </ol>

//             <div className="mt-5 bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3">
//               <span className="shrink-0 h-5 w-5 rounded-full bg-red-400 text-white text-xs flex items-center justify-center mt-0.5">
//                 !
//               </span>
//               <p className="text-red-800">
//                 <span className="font-semibold">Important: </span>
//                 Bartr does not physically handle, store, inspect, ship, or guarantee any items traded on the platform. The physical exchange is entirely the responsibility of the parties involved.
//               </p>
//             </div>

//             <p className="text-neutral-600">
//               Both parties bear the risk of physical exchange. We{' '} <strong>strongly recommend </strong>meeting in safe, public locations and inspecting items before confirming trade completion. Once both parties confirm completion, the trade is considered final. Bartr is not responsible for quality disputes raised after trade confirmation.
//             </p>
//           </Section>

//           <Section id="credit-system" number={6} title="Credit System">
//             <p className="text-neutral-600">
//               Bartr credits ("<strong>Credits</strong>") are a platform utility token used to facilitate indirect trades and balance trade value differences.
//             </p>

//             <ul className="mt-3 space-y-2 list-disc list-inside disc pl-5 marker:text-neutral-400 marker:text-xs">
//               {[
//                 'Credits have no monetary value',
//                 'Credits cannot be redeemed for cash',
//                 'Credits cannot be transferred outside the Bartr platform',
//                 'Credits are non-refundable except where required by law',
//               ].map((item, i) => (
//                 <li key={i} className="gap-3 text-neutral-600">
//                   {/* <span className="text-neutral-400 shrink-0">
//                     ({String.fromCharCode(97 + i)})
//                   </span> */}
//                   {item}
//                 </li>
//               ))}
//             </ul>

//             <p className="text-neutral-600">
//               Credits may be earned by completing trades or purchased through in-app purchase options. Bartr reserves the right to adjust Credit balances in cases of fraud, error, or Terms violation. Unused Credits are forfeited upon account termination unless otherwise required by applicable law.
//             </p>
//           </Section>

//           {/* Continue with remaining sections... */}
//           <Section id="prohibited" number={7} title="Prohibited Items and Conduct">
//             <h4 className='font-medium'>PROHIBITED ITEMS</h4>
//             <p className="text-neutral-600">
//               The following items may <strong>NOT</strong> be listed or traded on Bartr under any circumstances:
//             </p>
//             <ul className="mt-3 space-y-2 list-disc list-inside disc pl-5 marker:text-neutral-400 marker:text-xs">
//               {[
//                 'Firearms, ammunition, and weapons of any kind',
//                 'Controlled substances, narcotics, or prescription drugs without valid prescription',
//                 'Stolen, counterfeit, or illegally obtained goods',
//                 'Human remains, organs, or body parts',
//                 'Live animals or endangered species products',
//                 'Explosive materials or hazardous substances',
//                 'Child sexual abuse material or any content exploiting minors',
//                 'Goods subject to trade sanctions or embargoes',
//                 'Pirated software, media, or counterfeit branded goods',
//                 'Any item the sale or transfer of which is prohibited by applicable law',
//               ].map((item, i) => (
//                 <li key={i} className="gap-3 text-neutral-600">
//                   {item}
//                 </li>
//               ))}
//             </ul>

//             <h4 className='font-medium'>PROHIBITED CONDUCT</h4>
//             <ul className="mt-3 space-y-2 list-disc list-inside disc pl-5 marker:text-neutral-400 marker:text-xs">
//               {[
//                 'Misrepresenting items in listings',
//                 'Credits cannot be redeemed for cash',
//                 'Harassing, threatening, or abusing other users',
//                 'Attempting to conduct transactions outside the Bartr platform to avoid fees or protections',
//                 'Manipulating the rating or review system',
//                 'Using automated tools to scrape or mass-access the platform',
//                 'Any form of fraud or deceptive practice',
//               ].map((item, i) => (
//                 <li key={i} className="gap-3 text-neutral-600">
//                   {item}
//                 </li>
//               ))}
//             </ul>

//             <div className="mt-5 bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3">
//               <span className="shrink-0 h-5 w-5 rounded-full bg-red-400 text-white text-xs flex items-center justify-center mt-0.5">
//                 !
//               </span>
//               <p className="text-red-800">
//                 Violations may result in immediate account suspension, credit forfeiture, and referral to law enforcement where appropriate.
//               </p>
//             </div>
//           </Section>
//           <Section id="dispute" number={8} title="Dispute Resolution">
//             <p className="text-neutral-600">
//               Bartr provides a dispute resolution process for trade-related conflicts. This process is available where:
//             </p>
//             <ul className="mt-3 space-y-2 list-disc list-inside disc pl-5 marker:text-neutral-400 marker:text-xs">
//               {[
//                 'A party fails to deliver their item as described',
//                 'An item is materially different from its listing',
//                 'A party becomes unresponsive after acceptance',
//               ].map((item, i) => (
//                 <li key={i} className="gap-3 text-neutral-600">
//                   {item}
//                 </li>
//               ))}
//             </ul>

//             <h4 className='font-medium'>DISPUTE PROCESS</h4>
//             <ul className="mt-3 space-y-2 list-none">
//               {[
//                 'Disputes must be raised within 7 days of the scheduled or expected exchange date',
//                 'File a dispute through the trade detail page',
//                 'Both parties will be notified and given 48 hours to submit evidence',
//                 "Bartr's Trust and Safety team will review all evidence and make a determination within 5 business days",
//                 'Outcomes may include: trade cancellation, credit adjustment, account warnings, or account suspension',
//               ].map((item, i) => (
//                 <li key={i} className="flex gap-3 text-neutral-600">
//                   <span className="text-neutral-400 shrink-0">
//                     ({String.fromCharCode(97 + i)})
//                   </span>
//                   {item}
//                 </li>
//               ))}
//             </ul>

//             <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
//               <div className="shrink-0 w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center mt-0.5">
//                 <TriangleAlert className="size-4 text-white" />
//               </div>
//               <p className="text-amber-800">
//                 We do not verify the accuracy of listings. We are not responsible for inaccurate, misleading, or fraudulent listings posted by users. We reserve the right to remove any listing that violates these Terms without prior notice.
//               </p>
//             </div>
//           </Section>
//           <Section id="liability" number={9} title="Platform Liability Limitations">
//             <p className="text-neutral-600">
//               The platform is provided <strong>"as is"</strong> without warranty of any kind, express or implied.
//             </p>
//             <div className="mt-5 bg-red-50 border border-red-200 rounded-xl p-4 flex flex-col">
//               <div className='flex gap-3'>
//                 <span className="shrink-0 h-5 w-5 rounded-full bg-red-400 text-white text-xs flex items-center justify-center mt-0.5">
//                   !
//                 </span>
//                 <p className="text-red-800 font-semibold">
//                   To the maximum extent permitted by law, Bartr shall not be liable for:
//                 </p>
//               </div>

//               <ul className="mt-3 space-y-2 list-disc list-inside disc pl-5 marker:text-neutral-400 marker:text-xs">
//                 {[
//                   'Loss, damage, or theft of goods during physical exchange',
//                   'Inaccurate or fraudulent listings posted by users',
//                   'Personal injury occurring during trade meetups',
//                   'Loss of Credits due to account compromise caused by user negligence',
//                   'Indirect, incidental, or consequential damages arising from use of the platform',
//                   'Any loss arising from reliance on platform content',
//                 ].map((item, i) => (
//                   <li key={i} className="gap-3 text-neutral-600">
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <p className="text-neutral-600">
//               Where liability cannot be excluded by law, our total liability to you for any claim shall not exceed the value of Credits held in your account at the time of the claim.
//             </p>
//           </Section>
//           <Section id="contact" number={10} title="Contact Us">
//             <p className="text-neutral-600">
//               For questions about these Terms:
//             </p>

//             <ul className="mt-3 space-y-2 list-disc list-inside disc pl-5 marker:text-neutral-400 marker:text-xs">
//               <li className="gap-3 text-neutral-600">
//                 Email: <u>legal@bartr.com</u>
//               </li>
//               {/* <li className="gap-3 text-sm text-neutral-600">
//                 Address: [Your registered business address]
//               </li> */}
//             </ul>
//           </Section>

//           <hr className='text-neutral-100' />

//           <section className='scroll-mt-24'>
//             <p className="text-xs lg:text-sm text-neutral-400 mt-6">
//               Last reviewed by Bartr Legal Team
//             </p>
//             <div className='mt-3 flex gap-6'>
//               <Button className='font-normal text-neutral-600 flex gap-3 border border-neutral-200 shadow-none cursor-pointer'><Download /> Download PDF</Button>
//               <Button className='font-normal text-neutral-600 flex gap-3 border border-neutral-200 shadow-none cursor-pointer'><Mail /> Contact Us About This Policy</Button>
//             </div>

//             <div className='mt-3 flex flex-col gap-3'>
//               <p className='text-sm text-neutral-400 mt-4 tracking-widest'>RELATED</p>
//               <div className='flex gap-4'>
//                 <a href='/legal/privacy' className='font-light text-xs lg:text-sm text-neutral-400 flex gap-1 cursor-pointer items-center'><FileText className='size-4' /> Privacy Policy</a>
//                 <a href='/legal/dispute-resolution' className='font-light text-xs lg:text-sm text-neutral-400 flex gap-1 cursor-pointer items-center'><FileText className='size-4' /> Dispute Resolution Policy</a>
//                 <a href='/guidelines' className='font-light text-xs lg:text-sm text-neutral-400 flex gap-1 cursor-pointer items-center'><FileText className='size-4' /> Community Guidelines</a>
//               </div>
//             </div>
//           </section>
//         </main>
//       </div>
//     </div>
//   )
// }

// // ── Reusable section wrapper ──────────────────────────────
// function Section({ id, number, title, children }: { id: string; number: number; title: string; children: React.ReactNode }) {
//   return (
//     <section id={id} className="mb-14 scroll-mt-24">
//       <h2 className="flex items-baseline gap-3 text-xl font-normal text-neutral-700 mb-5">
//         <span className="text-[#86B7A9] font-normal text-lg">{number}.</span>
//         {title}
//       </h2>
//       <div className="text-sm text-neutral-600 leading-relaxed space-y-3">
//         {children}
//       </div>
//     </section>
//   )
// }





























// src/app/(marketing)/privacy/page.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChevronDown, Download, FileText, Mail, TriangleAlert } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

const sections = [
  { id: 'what-data-we-collect', label: 'What Data We Collect', number: 1 },
  { id: 'data-usage', label: 'How We Use Your Data', number: 2 },
  { id: 'data-storage-and-security', label: 'Data Storage and Security', number: 3 },
  { id: 'data-sharing', label: 'Sharing Your Data', number: 4 },
  { id: 'cookies-and-tracking', label: 'Cookies and Tracking', number: 5 },
  { id: 'your-rights', label: 'Your Rights (NDPA / GDPR)', number: 6 },
  { id: 'data-retention', label: 'Data Retention', number: 7 },
  { id: 'childrens-privacy', label: "Children's Privacy", number: 8 },
  { id: 'policy-changes', label: 'Changes to This Policy', number: 9 },
  { id: 'contact', label: 'Contact Us', number: 10 },
]

export default function PrivacyPage() {
  const [activeId, setActiveId] = useState<string>('what-data-we-collect')
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
                <BreadcrumbPage className='text-neutral-600'>Privacy Policy</BreadcrumbPage>
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
            Privacy Policy
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
                We collect the information you give us when you register and use the platform. We use it to run the platform and keep you safe. We do not sell your personal data. You can request your data or ask us to delete it at any time.
              </p>
            </div>
          </div>

          {/* ── Sections ── */}

          <Section id="what-data-we-collect" number={1} title="What Data We Collect">
            <h4 className='font-medium'>DATA YOU PROVIDE DIRECTLY</h4>
            <ul className="mt-3 space-y-2 list-disc list-inside disc pl-5 marker:text-neutral-400 marker:text-xs">
              {[
                'Full name and email address',
                'Phone number',
                'Location (city/state level)',
                'Profile photo',
                'Government ID documents (if you choose verification)',
                'Listing content (photos, descriptions, tags)',
                'Messages sent through the platform',
                'Trade history and activity',
              ].map((item, i) => (
                <li key={i} className="gap-3 text-neutral-600">
                  {item}
                </li>
              ))}
            </ul>

            <h4 className='font-medium'>DATA WE COLLECT AUTOMATICALLY</h4>
            <ul className="mt-3 space-y-2 list-disc list-inside disc pl-5 marker:text-neutral-400 marker:text-xs">
              {[
                'IP address and approximate geolocation',
                'Device type, operating system, browser',
                'Pages visited and features used',
                'Time and duration of sessions',
                'Error logs and crash reports',
              ].map((item, i) => (
                <li key={i} className="gap-3 text-neutral-600">
                  {item}
                </li>
              ))}
            </ul>

            <h4 className='font-medium'>DATA FROM THIRD PARTIES</h4>
            <ul className="mt-3 space-y-2 list-disc list-inside disc pl-5 marker:text-neutral-400 marker:text-xs">
              {[
                'Authentication providers (Google OAuth) if used to sign in',
                'Identity verification providers (if applicable)',
              ].map((item, i) => (
                <li key={i} className="gap-3 text-neutral-600">
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section id="data-usage" number={2} title="How We Use Your Data">
            <p className="mt-4 text-neutral-600">We use your data to:</p>
            <ol className="mt-3 space-y-2 list-none pl-3">
              {[
                'Create and maintain your account',
                'Enable listing creation and trade matching',
                'Send OTP codes and security notifications',
                'Send transactional emails (trade updates, disputes, confirmations)',
                'Display your public profile to other users',
                'Detect and prevent fraud and abuse',
                'Resolve disputes between users',
                'Improve platform performance and features',
                'Comply with legal obligations',
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-neutral-600">
                  <span className="text-neutral-400 shrink-0">
                    ({String.fromCharCode(97 + i)})
                  </span>
                  {item}
                </li>
              ))}
            </ol>

            <div className="mt-5 bg-[#86B7A9]/10 border border-[#86B7A9]/20 rounded-xl p-4 flex flex-col gap-3">
              <div className='flex gap-3'>
                <span className="shrink-0 h-5 w-5 rounded-full bg-[#86B7A9] text-white text-xs flex items-center justify-center mt-0.5">
                  i
                </span>
                <p className="text-[#86B7A9] font-medium">
                  We will NOT use your data to:
                </p>
              </div>

              <ul className="mt-1 space-y-2 list-disc list-inside disc pl-5 marker:text-neutral-400 marker:text-xs">
                {[
                  'Sell or rent to third parties',
                  'Send unsolicited marketing without your consent',
                  'Make automated decisions that significantly affect you without human review',
                ].map((item, i) => (
                  <li key={i} className="gap-3 text-neutral-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Section>

          <Section id="data-storage-and-security" number={3} title="Data Storage and Security">
            <ul className="space-y-3">
              {[
                { text: 'Your data is stored on secure cloud infrastructure (Google Firebase / Firestore) with encryption at rest and in transit.', bold: ['Google Firebase / Firestore'] },
                { text: 'Government ID documents are stored separately with restricted access (admin-only) and are deleted after verification is complete or within 90 days of submission, whichever is sooner.', bold: ['90 days of submission'] },
                { text: 'Passwords are never stored — we use Firebase Authentication which handles credential security independently.' },
                { text: 'OTP codes are stored as hashed values only. The raw code is never stored in our database.' },
              ].map((item, i) => (
                <li key={i} className="flex gap-2 text-neutral-600">
                  <span className="text-neutral-300 shrink-0 mt-1">•</span>
                  <span>{renderWithBold(item.text, item.bold)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
              <div className="shrink-0 w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center mt-0.5">
                <TriangleAlert className="size-4 text-white" />
              </div>
              <p className="text-amber-800">
                Despite our safeguards, no system is completely secure. We will notify you within <strong>72 hours</strong> of becoming aware of a data breach that affects your personal data.
              </p>
            </div>
          </Section>

          <Section id="data-sharing" number={4} title="Sharing Your Data">
            <p className="text-neutral-600">
              We share your data <strong>only</strong> in these circumstances:
            </p>

            <h4 className='font-medium'>WITH OTHER USERS</h4>
            <ul className="mt-3 space-y-2 list-disc list-inside disc pl-5 marker:text-neutral-400 marker:text-xs">
              {[
                'Your public profile (name, photo, location, rating, trade history summary) is visible to other registered users',
                'Your listing content is visible to all users',
                'Your private contact information is never shared with other users',
              ].map((item, i) => (
                <li key={i} className="gap-3 text-neutral-600">{item}</li>
              ))}
            </ul>

            <h4 className='font-medium'>WITH SERVICE PROVIDERS</h4>
            <ul className="mt-3 space-y-2 list-disc list-inside disc pl-5 marker:text-neutral-400 marker:text-xs">
              {[
                'Firebase (Google) — database and authentication',
                'Cloudinary — image storage and delivery',
                'Resend — transactional email delivery',
                'Algolia — search functionality',
                'Identity verification providers — for KYC only',
              ].map((item, i) => (
                <li key={i} className="gap-3 text-neutral-600">{item}</li>
              ))}
            </ul>
            <p className="text-neutral-600">
              All providers are contractually bound to process data only as we instruct.
            </p>

            <h4 className='font-medium'>WITH AUTHORITIES</h4>
            <p className="text-neutral-600">
              We will disclose data to law enforcement or regulatory bodies where required by law or where we have good faith belief that disclosure is necessary to prevent fraud, protect safety, or comply with legal process.
            </p>

            <div className="mt-5 bg-[#86B7A9]/10 border border-[#86B7A9]/20 rounded-xl p-3 flex gap-3">
              <span className="shrink-0 h-5 w-5 rounded-full bg-[#86B7A9] text-white text-xs flex items-center justify-center mt-0.5">
                i
              </span>
              <p className="text-[#86B7A9] font-medium">
                We will NEVER sell your personal data.
              </p>
            </div>
          </Section>

          <Section id="cookies-and-tracking" number={5} title="Cookies and Tracking">
            <p className="text-neutral-600">
              We use <strong>essential cookies only</strong>:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside disc pl-5 marker:text-neutral-400 marker:text-xs">
              {[
                'Session cookie (httpOnly, secure): keeps you logged in',
                'No advertising cookies',
                'No third-party tracking pixels',
              ].map((item, i) => (
                <li key={i} className="gap-3 text-neutral-600">{item}</li>
              ))}
            </ul>
            <p className="text-neutral-600">
              Analytics: we use privacy-respecting analytics that do not track individuals across sites and do not share data with advertising networks.
            </p>
            <p className="text-neutral-600">
              You can clear cookies through your browser settings. Clearing the session cookie will log you out.
            </p>
          </Section>

          <Section id="your-rights" number={6} title="Your Rights (NDPA / GDPR)">
            <p className="text-neutral-600">
              Under the <strong>Nigeria Data Protection Act (NDPA) 2023</strong> and, where applicable, the EU General Data Protection Regulation (GDPR), you have the right to:
            </p>

            <div className="mt-3 divide-y divide-neutral-100">
              {[
                { label: 'Access', desc: 'Request a copy of all personal data we hold about you' },
                { label: 'Correction', desc: 'Request correction of inaccurate data' },
                { label: 'Deletion', desc: 'Request deletion of your personal data ("right to be forgotten")' },
                { label: 'Portability', desc: 'Receive your data in a structured, machine-readable format' },
                { label: 'Objection', desc: 'Object to processing of your data for specific purposes' },
                { label: 'Withdrawal of Consent', desc: 'Withdraw consent at any time where processing is based on consent' },
              ].map((row) => (
                <DefinitionRow key={row.label} label={row.label} desc={row.desc} />
              ))}
            </div>

            <p className="mt-4 text-neutral-600">
              To exercise any of these rights, email <a href="mailto:privacy@bartr.com" className="text-neutral-800 underline">privacy@bartr.com</a>. We will respond within <strong>30 days</strong>. We may need to verify your identity before processing the request.
            </p>
          </Section>

          <Section id="data-retention" number={7} title="Data Retention">
            <p className="text-neutral-600">We retain your data as follows:</p>

            <div className="mt-3 rounded-xl overflow-hidden border border-neutral-100">
              {[
                { label: 'Account data', desc: 'Life of account + 2 years after deletion' },
                { label: 'Trade history', desc: '5 years (financial record-keeping)' },
                { label: 'Government ID documents', desc: 'Deleted within 90 days of submission or after verification' },
                { label: 'OTP data', desc: 'Deleted immediately after successful verification' },
                { label: 'Chat messages', desc: '2 years, then automatically deleted' },
                { label: 'Error logs', desc: '90 days' },
              ].map((row, i) => (
                <div key={row.label} className={cn('flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-4 py-3', i % 2 === 0 ? 'bg-neutral-50' : 'bg-white')}>
                  <span className="font-medium text-neutral-800 sm:w-56 shrink-0">{row.label}</span>
                  <span className="text-neutral-600">{row.desc}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section id="childrens-privacy" number={8} title="Children's Privacy">
            <p className="text-neutral-600">
              Bartr is not directed at persons <strong>under 18 years of age</strong>. We do not knowingly collect personal data from minors. If we become aware that a user is under 18, we will delete their account and associated data immediately.
            </p>
            <p className="text-neutral-600">
              If you believe a minor is using our platform, please report it to <a href="mailto:privacy@bartr.com" className="text-neutral-800 underline">privacy@bartr.com</a>.
            </p>
          </Section>

          <Section id="policy-changes" number={9} title="Changes to This Policy">
            <p className="text-neutral-600">
              We will notify you of material changes to this Privacy Policy via email and in-app notification at least <strong>14 days</strong> before they take effect. The updated policy will always be available at bartr.com/privacy.
            </p>
          </Section>

          <Section id="contact" number={10} title="Contact Us">
            <ul className="mt-3 space-y-2 list-disc list-inside disc pl-5 marker:text-neutral-400 marker:text-xs">
              <li className="gap-3 text-neutral-600">
                Data Controller: [Your Company Name]
              </li>
              <li className="gap-3 text-neutral-600">
                Email: <a href="mailto:privacy@bartr.com" className="text-neutral-800 underline">privacy@bartr.com</a>
              </li>
              <li className="gap-3 text-neutral-600">
                Address: [Your registered business address]
              </li>
            </ul>
            <p className="text-neutral-600">
              If you are not satisfied with our response to a privacy concern, you have the right to lodge a complaint with the <strong>Nigeria Data Protection Commission (NDPC)</strong> at ndpc.gov.ng.
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