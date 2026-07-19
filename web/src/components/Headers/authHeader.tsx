'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import Image from 'next/image';
import { Bartr_bg } from '@/assets';
import { useRouter } from 'next/navigation';

export default function AuthHeader() {
  const isMobile = useIsMobile();
  const router = useRouter();

  if (isMobile) {
    return (
      <header className='sticky top-0 z-50 w-full h-16 shadow-sm bg-white'>
        <div className='flex items-center justify-between h-full px-4'>
          <div className="relative h-16 w-20 -ml-2">
            <Image src={Bartr_bg} fill className="object-contain hover:cursor-pointer" loading='lazy' alt="Bartr" onClick={() => router.push('/')} />
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className={`z-50 flex shadow-b-sm shadow-neutral-50 bg-white ${isMobile ? 'min-h-screen flex-col items-start justify-start w-[80%] py-5 px-4' : 'h-16 items-center w-full sticky top-0 px-4 lg:px-8 gap-6'}`}>
      <div className="relative h-16 w-24">
        <Image src={Bartr_bg} fill className="object-contain hover:cursor-pointer" loading='lazy' alt="Bartr" onClick={() => router.push('/')} />
      </div>
    </header>
  )
}