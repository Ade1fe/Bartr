'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft, LogOut, LucideIcon } from 'lucide-react';
import { Bartr_bg } from '@/assets';
import { Button } from '../ui/button';
import AccountMenu from '../accountmenu';

type AppHeaderProps = {
  title?: string;
  icon?: LucideIcon;
  showBack?: boolean;
  backHref?: string;
  right?: React.ReactNode;
};

export default function AppHeader({ title, icon: Icon, showBack, backHref, right }: AppHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full h-16 bg-white border-b border-neutral-100">
      <div className="flex items-center justify-between h-full px-4 lg:px-8 gap-2">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={() => (backHref ? router.push(backHref) : router.back())}
              className="text-neutral-500 hover:text-neutral-700 cursor-pointer"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}

          {Icon && <Icon className="h-5 w-5 text-[#86B7A9]" />}

          <div className="relative h-16 w-24">
            <Image src={Bartr_bg} fill className="object-contain hover:cursor-pointer" loading='lazy' alt="Bartr" onClick={() => router.push('/')} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {right}
          <AccountMenu />
        </div>
      </div>
    </header>
  );
}