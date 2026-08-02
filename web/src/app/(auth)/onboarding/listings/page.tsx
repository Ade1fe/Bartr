// // src/app/(auth)/onboarding/listings/page.tsx
// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Textarea } from '@/components/ui/textarea'
// import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
// import { CloudUpload, CheckCircle2, X } from 'lucide-react'
// import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty'
// import { clientAuth } from '@/lib/firebase-client'
// import { useImageUpload } from '@/hooks/useImageUpload'

// const CATEGORIES = [
//   { value: 'electronics', label: 'Electronics' },
//   { value: 'furniture', label: 'Furniture' },
//   { value: 'clothing', label: 'Clothing' },
//   { value: 'books', label: 'Books' },
//   { value: 'tools', label: 'Tools' },
//   { value: 'sports', label: 'Sports' },
//   { value: 'food', label: 'Food' },
//   { value: 'collectibles', label: 'Collectibles' },
//   { value: 'other', label: 'Other' },
// ]

// const CONDITIONS = [
//   { value: 'new', label: 'New' },
//   { value: 'like_new', label: 'Like New' },
//   { value: 'good', label: 'Good' },
//   { value: 'fair', label: 'Fair' },
//   { value: 'poor', label: 'Poor' },
// ]

// export default function OnboardingListingsPage() {
//   const router = useRouter()

//   const [title, setTitle] = useState('')
//   const [description, setDescription] = useState('')
//   const [category, setCategory] = useState('')
//   const [condition, setCondition] = useState('')
//   const [offerTags, setOfferTags] = useState('')
//   const [wantTags, setWantTags] = useState('')
//   const [creditValue, setCreditValue] = useState(0)
//   const [photos, setPhotos] = useState<File[]>([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   const photoUpload = useImageUpload({ type: 'listings' })

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault()
//     setLoading(true)
//     setError(null)

//     try {
//       const token = await clientAuth.currentUser?.getIdToken()
//       if (!token) throw new Error('Not authenticated')

//       // Upload all photos to Cloudinary
//       const photoUrls: string[] = []
//       for (const photo of photos) {
//         const url = await photoUpload.upload(photo)
//         if (url) photoUrls.push(url)
//       }

//       // Parse tags — split by comma and trim whitespace
//       const parsedOfferTags = offerTags
//         .split(',')
//         .map(t => t.trim())
//         .filter(Boolean)

//       const parsedWantTags = wantTags
//         .split(',')
//         .map(t => t.trim())
//         .filter(Boolean)

//       // Create the listing via API route
//       const res = await fetch('/api/listings/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           title,
//           description,
//           category,
//           condition,
//           offerTags: parsedOfferTags,
//           wantTags: parsedWantTags,
//           creditValue: Number(creditValue),
//           photos: photoUrls,
//         }),
//       })

//       if (!res.ok) {
//         const data = await res.json()
//         throw new Error(data.error ?? 'Failed to create listing')
//       }

//       // Registration complete — redirect to dashboard
//       router.push('/dashboard')

//     } catch (err: any) {
//       setError(err.message ?? 'Something went wrong')
//     } finally {
//       setLoading(false)
//     }
//   }

//   function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
//     const files = Array.from(e.target.files ?? [])
//     setPhotos(prev => [...prev, ...files].slice(0, 5)) // max 5
//   }

//   function handleDrop(e: React.DragEvent<HTMLDivElement>) {
//     e.preventDefault()
//     const files = Array.from(e.dataTransfer.files).filter(f =>
//       ['image/png', 'image/jpeg', 'image/webp'].includes(f.type)
//     )
//     setPhotos(prev => [...prev, ...files].slice(0, 5))
//   }

//   function removePhoto(index: number) {
//     setPhotos(prev => prev.filter((_, i) => i !== index))
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4 py-8">
//       <div className="w-full max-w-md">
//         {/* Step indicator */}
//         <div className="flex items-center justify-center gap-2 mb-6">
//           <div className="h-2 w-8 rounded-full bg-neutral-300" />
//           <div className="h-2 w-8 rounded-full bg-neutral-300" />
//           <div className="h-2 w-8 rounded-full bg-black" />
//         </div>

//         <Card className='rounded-lg shadow-xs border-neutral-100 px-4 py-8'>
//           <CardHeader className='p-0 mb-8'>
//             <CardTitle className='font-normal text-2xl text-neutral-600'>
//               What Do You Offer?
//             </CardTitle>
//             <CardDescription className='text-base text-neutral-500'>
//               Add your first listing to start trading
//             </CardDescription>
//           </CardHeader>

//           <CardContent className="grid gap-5 p-0 mb-8">
//             {error && (
//               <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-md">
//                 {error}
//               </p>
//             )}

//             {/* Title */}
//             <div className="grid gap-2">
//               <Label htmlFor="title" className="text-neutral-600">Title</Label>
//               <Input id="title" placeholder="e.g. Handmade wooden table" value={title} onChange={e => setTitle(e.target.value)} className="border-neutral-100 shadow-xs text-neutral-600" />
//             </div>

//             {/* Description */}
//             <div className="grid gap-2">
//               <Label htmlFor="description" className="text-neutral-600">Description</Label>
//               <Textarea id="description" placeholder="Describe what you're offering in detail..." value={description} onChange={e => setDescription(e.target.value)} className="border-neutral-100 shadow-xs text-neutral-600 resize-none min-h-20" />
//             </div>

//             {/* Category and Condition */}
//             <div className="grid grid-cols-2 gap-3">
//               <div className="grid gap-2">
//                 <Label className="text-neutral-600">Category</Label>
//                 <select value={category} onChange={e => setCategory(e.target.value)} className="border border-neutral-100 rounded-md px-3 py-2 text-sm text-neutral-600 shadow-xs bg-white focus:outline-none" >
//                   <option value="">Select...</option>
//                   {CATEGORIES.map(c => (
//                     <option key={c.value} value={c.value}>{c.label}</option>
//                   ))}
//                 </select>
//               </div>
//               <div className="grid gap-2">
//                 <Label className="text-neutral-600">Condition</Label>
//                 <select value={condition} onChange={e => setCondition(e.target.value)} className="border border-neutral-100 rounded-md px-3 py-2 text-sm text-neutral-600 shadow-xs bg-white focus:outline-none" >
//                   <option value="">Select...</option>
//                   {CONDITIONS.map(c => (
//                     <option key={c.value} value={c.value}>{c.label}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* What I offer tags */}
//             <div className="grid gap-2">
//               <Label htmlFor="offerTags" className="text-neutral-600">
//                 What I Offer
//                 <span className="text-xs text-neutral-400 ml-1">(comma separated)</span>
//               </Label>
//               <Input id="offerTags" placeholder="e.g. web design, logo design, photography" value={offerTags} onChange={e => setOfferTags(e.target.value)} className="border-neutral-100 shadow-xs text-neutral-600" />
//             </div>

//             {/* What I want tags */}
//             <div className="grid gap-2">
//               <Label htmlFor="wantTags" className="text-neutral-600">
//                 What I'm Seeking
//                 <span className="text-xs text-neutral-400 ml-1">(comma separated)</span>
//               </Label>
//               <Input id="wantTags" placeholder="e.g. furniture, gardening tools, lessons" value={wantTags} onChange={e => setWantTags(e.target.value)} className="border-neutral-100 shadow-xs text-neutral-600" />
//             </div>

//             {/* Credit value */}
//             <div className="grid gap-2">
//               <Label htmlFor="creditValue" className="text-neutral-600">
//                 Credit Value
//                 <span className="text-xs text-neutral-400 ml-1">(0 = open to offers)</span>
//               </Label>
//               <Input id="creditValue" type="number" min={0} max={50000} placeholder="0" value={creditValue} onChange={e => setCreditValue(Number(e.target.value))} className="border-neutral-100 shadow-xs text-neutral-600" />
//             </div>

//             {/* Photos */}
//             <div className="grid gap-2">
//               <Label className="text-neutral-600">
//                 Photos
//                 <span className="text-xs text-neutral-400 ml-1">(up to 5)</span>
//               </Label>
//               <input type="file" id="listing-photos" accept="image/png,image/jpeg,image/webp" className="hidden" multiple onChange={handleFileSelect} />

//               {/* Show upload area if fewer than 5 photos selected */}
//               {photos.length < 5 && (
//                 <Empty onDrop={handleDrop} onDragOver={e => e.preventDefault()} onClick={() => document.getElementById('listing-photos')?.click()} className="border border-dashed border-neutral-200 text-neutral-600 cursor-pointer" >
//                   <EmptyHeader>
//                     <EmptyMedia variant="icon"><CloudUpload /></EmptyMedia>
//                     <EmptyTitle className="text-sm">
//                       Click to upload or drag and drop
//                     </EmptyTitle>
//                     <EmptyDescription className="text-xs">
//                       PNG, JPG, WebP up to 5MB each
//                     </EmptyDescription>
//                   </EmptyHeader>
//                 </Empty>
//               )}

//               {/* Photo list */}
//               {photos.length > 0 && (
//                 <div className="grid gap-2 mt-1">
//                   {photos.map((photo, index) => (
//                     <div key={index} className="border border-neutral-200 rounded-lg p-3 bg-neutral-50 flex items-center justify-between" >
//                       <div className="flex items-center gap-3">
//                         <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
//                         <div>
//                           <p className="text-sm text-neutral-700 truncate max-w-48">{photo.name}</p>
//                           <p className="text-xs text-neutral-400">
//                             {(photo.size / 1024 / 1024).toFixed(2)} MB
//                           </p>
//                         </div>
//                       </div>
//                       <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => removePhoto(index)} >
//                         <X className="h-3 w-3" />
//                       </Button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </CardContent>

//           <CardFooter className="grid grid-cols-2 gap-3 p-0">
//             <Button type="button" variant="outline" className="border-neutral-200 text-neutral-600" onClick={() => router.push('/dashboard')} >
//               Skip for now
//             </Button>
//             <Button type="button" onClick={handleSubmit} disabled={loading || photoUpload.uploading || !title || !category} className="bg-black text-white" >
//               {loading || photoUpload.uploading ? 'Creating...' : 'Complete Registration'}
//             </Button>
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   )
// }
























// src/app/(auth)/onboarding/listings/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { CloudUpload, X, ImageIcon, ArrowLeftRight } from 'lucide-react'
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty'
import { clientAuth } from '@/lib/firebase-client'
import { useImageUpload } from '@/hooks/useImageUpload'
import { cn } from '@/lib/utils'

const CATEGORIES = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'books', label: 'Books' },
  { value: 'tools', label: 'Tools' },
  { value: 'sports', label: 'Sports' },
  { value: 'food', label: 'Food' },
  { value: 'collectibles', label: 'Collectibles' },
  { value: 'other', label: 'Other' },
]

const CONDITIONS = [
  { value: 'new', label: 'New' },
  { value: 'like_new', label: 'Like New' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'poor', label: 'Poor' },
]

function parseTags(raw: string) {
  return raw.split(',').map(t => t.trim()).filter(Boolean)
}

export default function OnboardingListingsPage() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [condition, setCondition] = useState('')
  const [offerTags, setOfferTags] = useState('')
  const [wantTags, setWantTags] = useState('')
  const [creditValue, setCreditValue] = useState(0)
  const [photos, setPhotos] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [skipping, setSkipping] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false)

  const photoUpload = useImageUpload({ type: 'listings' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const token = await clientAuth.currentUser?.getIdToken()
      if (!token) throw new Error('Not authenticated')

      const photoUrls: string[] = []
      for (const photo of photos) {
        const url = await photoUpload.upload(photo)
        if (url) photoUrls.push(url)
      }

      const res = await fetch('/api/listings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          category,
          condition,
          offerTags: parseTags(offerTags),
          wantTags: parseTags(wantTags),
          creditValue: Number(creditValue),
          photos: photoUrls,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Failed to create listing')
      }

      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  async function handleSkip() {
    setSkipping(true)
    try {
      const token = await clientAuth.currentUser?.getIdToken()
      if (token) {
        await fetch('/api/users/complete-onboarding', {
          method: 'PATCH',
          headers: { 'Authorization': `Bearer ${token}` },
        })
      }
    } catch {
      // Non-blocking — a failed flag write shouldn't trap someone on this screen.
    } finally {
      router.push('/dashboard')
    }
  }

  function addPhotos(files: File[]) {
    const accepted = files.filter(f => ['image/png', 'image/jpeg', 'image/webp'].includes(f.type)).slice(0, 5 - photos.length)
    if (accepted.length === 0) return
    setPhotos(prev => [...prev, ...accepted].slice(0, 5))
    setPreviewUrls(prev => [...prev, ...accepted.map(f => URL.createObjectURL(f))].slice(0, 5))
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    addPhotos(Array.from(e.target.files ?? []))
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    addPhotos(Array.from(e.dataTransfer.files))
  }

  function removePhoto(index: number) {
    setPhotos(prev => prev.filter((_, i) => i !== index))
    setPreviewUrls(prev => prev.filter((_, i) => i !== index))
  }

  const offerTagList = parseTags(offerTags)
  const wantTagList = parseTags(wantTags)
  const categoryLabel = CATEGORIES.find(c => c.value === category)?.label
  const conditionLabel = CONDITIONS.find(c => c.value === condition)?.label

  return (
    <div className="w-full items-center justify-center">
      <div className="grid gap-8 items-start">

        {/* ── Form ─────────────────────────────────────── */}
        <Card className="rounded-2xl shadow-xs border-neutral-100 px-4 py-8">
          <CardHeader className="p-0 text-center mb-8">
            <CardTitle className="text-lg lg:text-xl font-medium text-neutral-900">What do you offer?</CardTitle>
            <CardDescription className="mt-2 text-sm text-neutral-500">
              List your first item so others can find something to trade with you.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 p-0">
            {error && (
              <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-md">{error}</p>
            )}

            <div className="grid gap-2">
              <Label htmlFor="title" className="text-neutral-600 font-medium text-sm">Title</Label>
              <Input id="title" placeholder="e.g. Handmade wooden table" value={title} onChange={e => setTitle(e.target.value)} className="border-neutral-200 text-sm shadow-none text-neutral-700 h-11 outline-none focus:outline-none focus:ring-1 focus:ring-[#86B7A9]" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description" className="text-neutral-600 font-medium text-sm">Description</Label>
              <Textarea id="description" placeholder="Describe what you're offering — condition, size, story, anything a trader would want to know." value={description} onChange={e => setDescription(e.target.value)} className="border-neutral-200 text-sm resize-none shadow-none text-neutral-700 min-h-24 outline-none focus:outline-none focus:ring-1 focus:ring-[#86B7A9]" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label className="text-neutral-600 font-medium text-sm">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className='cursor-pointer border-neutral-200 h-11 text-sm text-neutral-600 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none'>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="border border-neutral-200 bg-white rounded-lg">
                    <SelectGroup>
                      {CATEGORIES.map(c => <SelectItem className='hover:bg-neutral-100 hover:cursor-pointer' key={c.value} value={c.value}>{c.label}</SelectItem>)}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label className="text-neutral-600 font-medium text-sm">Condition</Label>
                <Select value={condition} onValueChange={setCondition}>
                  <SelectTrigger className='cursor-pointer border-neutral-200 h-11 text-sm text-neutral-600 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none'>
                    <SelectValue placeholder="Select Condition" />
                  </SelectTrigger>
                  <SelectContent className="border border-neutral-200 bg-white rounded-lg">
                    <SelectGroup>
                      {CONDITIONS.map(c => <SelectItem className='hover:bg-neutral-100 hover:cursor-pointer' key={c.value} value={c.value}>{c.label}</SelectItem>)}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* What I offer */}
            <div className="grid gap-2">
              <Label htmlFor="offerTags" className="text-neutral-600 font-medium text-sm">
                What I offer <span className="text-xs font-normal text-neutral-400">(comma separated)</span>
              </Label>
              <Input id="offerTags" placeholder="e.g. web design, photography" value={offerTags} onChange={e => setOfferTags(e.target.value)} className="border-neutral-200 text-sm shadow-none text-neutral-600 h-11 outline-none focus:outline-none focus:ring-1 focus:ring-[#86B7A9]" />
              {offerTagList.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {offerTagList.map(tag => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-[#86B7A9]/10 text-[#5f8577] font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* What I want */}
            <div className="grid gap-2">
              <Label htmlFor="wantTags" className="text-neutral-600 font-medium text-sm">
                What I'm seeking <span className="text-xs font-normal text-neutral-400">(comma separated)</span>
              </Label>
              <Input id="wantTags" placeholder="e.g. furniture, gardening tools" value={wantTags} onChange={e => setWantTags(e.target.value)} className="border-neutral-200 text-sm shadow-none text-neutral-600 h-11 outline-none focus:outline-none focus:ring-1 focus:ring-[#86B7A9]" />
              {wantTagList.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {wantTagList.map(tag => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Credit value */}
            <div className="grid gap-2">
              <Label htmlFor="creditValue" className="text-neutral-600 font-medium text-sm">
                Credit value <span className="text-xs font-normal text-neutral-400">(0 = open to offers)</span>
              </Label>
              <Input id="creditValue" type="number" min={0} max={50000} placeholder="0" value={creditValue} onChange={e => setCreditValue(Number(e.target.value))} className="border-neutral-200 text-sm shadow-none text-neutral-600 h-11 outline-none focus:outline-none focus:ring-1 focus:ring-[#86B7A9]" />
              <span className='text-xs text-neutral-500/75'>Suggest a value to guide negotiation — traders can still counter-offer.</span>
            </div>

            {/* Photos */}
            <div className="grid gap-2">
              <Label className="text-neutral-700 font-medium text-sm">
                Photos <span className="text-xs font-normal text-neutral-400">(up to 5)</span>
              </Label>
              <input type="file" id="listing-photos" accept="image/png,image/jpeg,image/webp" className="hidden" multiple onChange={handleFileSelect} />

              {photos.length < 5 && (
                <Empty onDrop={handleDrop} onDragOver={e => e.preventDefault()} onClick={() => document.getElementById('listing-photos')?.click()} className="border border-dashed border-neutral-200 text-neutral-500 cursor-pointer rounded-xl hover:border-[#86B7A9]/40 hover:bg-[#86B7A9]/5 transition-colors" >
                  <EmptyHeader>
                    <EmptyMedia variant="icon"><CloudUpload /></EmptyMedia>
                    <EmptyTitle className="text-sm">Click to upload or drag and drop</EmptyTitle>
                    <EmptyDescription className="text-xs">PNG, JPG, WebP up to 5MB each</EmptyDescription>
                  </EmptyHeader>
                </Empty>
              )}

              {photos.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-1">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-neutral-200 group">
                      <img src={url} alt="" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => removePhoto(index)} className="absolute top-1 right-1 h-5 w-5 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" >
                        <X className="h-3 w-3" />
                      </button>
                      {index === 0 && (
                        <span className="absolute bottom-1 left-1 text-[10px] px-1.5 py-0.5 rounded bg-black/60 text-white">Cover</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="grid grid-cols-1 lg:grid-cols-2 gap-3 p-0 mt-8">
            <Button type="button" variant="outline" className="h-11 text-sm border-neutral-200 text-neutral-600 shadow-none hover:cursor-pointer" onClick={handleSkip} disabled={skipping}>
              {skipping ? 'Skipping...' : 'Skip for now'}
            </Button>
            <Button type="button" onClick={handleSubmit} disabled={loading || photoUpload.uploading || !title || !category} className="h-11 text-sm bg-black text-white shadow-black/20 shadow-xs hover:shadow-sm hover:cursor-pointer" >
              {loading || photoUpload.uploading ? 'Creating...' : 'Complete Registration'}
            </Button>
          </CardFooter>
        </Card>

        {/* ── Live preview — desktop, sticky ─────────────── */}
        <div className="hidden lg:block sticky top-10">
          <p className="text-xs font-medium text-neutral-400 uppercase tracking-widest mb-3 px-1">
            How it'll look
          </p>
          <ListingPreviewCard title={title} description={description} categoryLabel={categoryLabel} conditionLabel={conditionLabel} offerTagList={offerTagList} wantTagList={wantTagList} creditValue={creditValue} coverImage={previewUrls[0]} />
        </div>
      </div>

      {/* ── Mobile preview toggle ─────────────────────────── */}
      <div className="lg:hidden mt-6">
        <button type="button" onClick={() => setMobilePreviewOpen(o => !o)} className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-600" >
          <span className="flex items-center gap-2 font-medium">
            <ImageIcon className="h-4 w-4 text-[#86B7A9]" />
            Preview how it'll look
          </span>
          <span className="text-neutral-400 text-sm">{mobilePreviewOpen ? 'Hide' : 'Show'}</span>
        </button>
        {mobilePreviewOpen && (
          <div className="mt-3">
            <ListingPreviewCard title={title} description={description} categoryLabel={categoryLabel} conditionLabel={conditionLabel} offerTagList={offerTagList} wantTagList={wantTagList} creditValue={creditValue} coverImage={previewUrls[0]} />
          </div>
        )}
      </div>
    </div>
  )
}

// ── Live preview card — mirrors how this listing will appear in the marketplace grid ──
function ListingPreviewCard({ title, description, categoryLabel, conditionLabel, offerTagList, wantTagList, creditValue, coverImage }: { title: string; description: string; categoryLabel?: string; conditionLabel?: string; offerTagList: string[]; wantTagList: string[]; creditValue: number; coverImage?: string }) {
  const hasContent = title || description || coverImage

  return (
    <div className="rounded-2xl border border-neutral-100 bg-white shadow-sm overflow-hidden">
      <div className="aspect-4/3 bg-neutral-100 relative flex items-center justify-center">
        {coverImage ? (
          <img src={coverImage} alt="" className="w-full h-full object-cover" />
        ) : (
          <ImageIcon className="h-8 w-8 text-neutral-300" />
        )}
        {conditionLabel && (
          <span className="absolute top-3 left-3 text-[11px] font-medium px-2 py-1 rounded-full bg-white/90 text-neutral-600">
            {conditionLabel}
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className={cn('font-medium leading-snug', title ? 'text-neutral-600' : 'text-neutral-400')}>
            {title || 'Your listing title'}
          </h3>
        </div>

        {categoryLabel && (
          <span className="text-xs text-neutral-400">{categoryLabel}</span>
        )}

        <p className={cn('text-sm mt-2 line-clamp-2', description ? 'text-neutral-500' : 'text-neutral-300')}>
          {description || 'Your description will appear here as you type.'}
        </p>

        {(offerTagList.length > 0 || wantTagList.length > 0) && (
          <div className="mt-3 pt-3 border-t border-neutral-100 flex items-start gap-2 text-xs">
            <ArrowLeftRight className="h-3.5 w-3.5 text-[#86B7A9] shrink-0 mt-0.5" />
            <div className="text-neutral-500">
              {offerTagList.length > 0 && (
                <p><span className="text-neutral-400">Offering:</span> {offerTagList.join(', ')}</p>
              )}
              {wantTagList.length > 0 && (
                <p className="mt-0.5"><span className="text-neutral-400">Seeking:</span> {wantTagList.join(', ')}</p>
              )}
            </div>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-600">
            {creditValue > 0 ? `${creditValue} credits` : 'Open to offers'}
          </span>
          {!hasContent && (
            <span className="text-[11px] text-neutral-300">Fill in the form to preview</span>
          )}
        </div>
      </div>
    </div>
  )
}