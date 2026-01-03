'use client';

import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '../ui/navigation-menu';
import Link from 'next/link';
import Image from 'next/image';
import { Bartr_bg } from '../../../public/img';
import { redirect, useRouter } from 'next/navigation';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';

const navItems = [
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'How It Works', href: '/howItWorks' },
  { label: 'Community', href: '/community' },
];

export default function Header() {
  const isMobile = useIsMobile();
  const router = useRouter();
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
                  <Link key={item.href} href={item.href} className='text-sm font-medium text-neutral-500 hover:text-neutral-700 cursor-pointer' onClick={() => setIsOpen(false)}>
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
    <header className={`z-50 flex shadow-b-sm shadow-neutral-50 bg-white ${isMobile ? 'min-h-screen flex-col items-start justify-start w-[80%] py-5 px-4' : 'h-16 items-center w-full sticky top-0 px-4 lg:px-8 gap-6'}`}>
      <div className="relative h-16 w-24">
        <Image src={Bartr_bg} fill className="object-contain hover:cursor-pointer" loading='lazy' alt="Bartr" onClick={() => redirect('/home')} />
      </div>

      <NavigationMenu className={`max-w-none hidden md:flex ${isMobile ? 'items-start justify-start' : 'mx-auto'}`}>
        <NavigationMenuList className={`gap-8 font-inter font-medium lg:gap-14 ${isMobile ? "flex-col" : "flex-wrap"}`}>
          <NavigationMenuItem className='hover:cursor-pointer text-neutral-500 hover:text-neutral-700'>
            <NavigationMenuLink asChild>
              <Link href="/marketplace">Marketplace</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className='hover:cursor-pointer text-neutral-500 hover:text-neutral-700'>
            <NavigationMenuLink asChild>
              <Link href="/howItWorks">How It Works</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className='hover:cursor-pointer text-neutral-500 hover:text-neutral-700'>
            <NavigationMenuLink asChild>
              <Link href="/community">Community</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className='hidden md:flex items-center gap-4'>
        <Button variant='outline' className='w-full border-none shadow-none hover:shadow-sm cursor-pointer' onClick={() => router.push('/auth') }>
          Sign In
        </Button>
        <Button className='w-full bg-black text-white border-none shadow-sm cursor-pointer' onClick={() => router.push('/auth')}>
          Sign Up
        </Button>
      </div>
    </header>
  )
}