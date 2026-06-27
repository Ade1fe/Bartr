'use client';

import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Link from 'next/link';
import Image from 'next/image';
import { Bartr_bg } from '@/assets';
import { redirect, useRouter, usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import NotificationBell from './../notificationBell/index';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'My Trades', href: '/my-trades' },
  { label: 'Messages', href: '/messages' },
  { label: 'Community', href: '/community' },
  // { label: 'Credits', href: '/credits' },
];

export default function MarketplaceHeader() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (isMobile) {
    return (
      <header className='sticky top-0 z-50 w-full h-16 shadow-sm bg-white'>
        <div className='flex items-center justify-between h-full px-4'>
          <div className="relative h-16 w-20 -ml-2">
            <Image src={Bartr_bg} fill className="object-contain hover:cursor-pointer" loading='lazy' alt="Bartr" onClick={() => redirect('/home')} />
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant='ghost' size='icon' className='md:hidden'>
                <Menu className='h-6 w-6' />
                <span className='sr-only'>Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='right' className='w-75 sm:w-100 bg-white'>
              <SheetHeader>
                <SheetTitle></SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <nav className='flex flex-col gap-6 mt-8'>
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className={`text-sm font-medium cursor-pointer ${pathname === item.href ? 'text-[#86B7A9]' : 'text-neutral-500 hover:text-[#86B7A9]'}`} onClick={() => setIsOpen(false)}>
                    {item.label}
                  </Link>
                ))}

                <div className='flex flex-col gap-3 mt-6 pt-6'>
                  <Button variant='outline' className='w-full border-none shadow-sm cursor-pointer' onClick={() => { setIsOpen(false); router.push('/auth'); }}>
                    Sign In
                  </Button>
                  <Button className='w-full bg-black text-white border-none shadow-sm cursor-pointer' onClick={() => { setIsOpen(false); router.push('/auth'); }}>
                    Sign Up
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    )
  }

  return (
    <header className={`z-50 flex shadow-b-sm shadow-neutral-50 bg-white ${isMobile ? 'min-h-screen flex-col items-start justify-start w-[80%] py-5 px-4' : 'h-16 items-center justify-between w-full sticky top-0 px-4 lg:px-8 gap-6'}`}>
      <div className="relative h-16 w-24">
        <Image src={Bartr_bg} fill className="object-contain hover:cursor-pointer" loading='lazy' alt="Bartr" onClick={() => redirect('/')} />
      </div>

      <div className='flex items-center gap-2'>
        <NotificationBell />

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger>
            <Avatar className='size-8 cursor-pointer'>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='bg-white border-none outline-none'>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}