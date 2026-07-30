// 'use client';

// import { useState } from 'react';
// import { useIsMobile } from '@/hooks/use-mobile';
// import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '../ui/navigation-menu';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Bartr_bg } from '@/assets';
// import { useRouter, usePathname } from 'next/navigation';
// import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
// import { Button } from '../ui/button';
// import { Menu, Bell, LogOut, User, Settings, LayoutDashboard, ArrowLeftRight } from 'lucide-react';
// import { useAUth } from '@/hooks/useAuth';
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
// import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

// const navItems = [
//   { label: 'Marketplace', href: '/marketplace' },
//   { label: 'How It Works', href: '/how-it-works' },
//   { label: 'Community', href: '/community' },
// ];

// const appNavItems = [
//   { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
//   { label: 'Marketplace', href: '/marketplace', icon: null },
//   { label: 'Trades', href: '/trades', icon: ArrowLeftRight },
//   { label: 'Community', href: '/community', icon: null },
// ]

// export default function Header() {
//   const isMobile = useIsMobile();
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isOpen, setIsOpen] = useState(false);
//   const { user, loading, signOut } = useAUth();

//   function getInitials(name: string | null): string {
//     if (!name) return '?';
//     return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
//   }

//   function AuthenticatedActions() {
//     return (
//       <div className='flex items-center gap-3'>
//         <Button variant='ghost' size='icon' className='relative' onClick={() => router.push('/notifications')}>
//           <Bell className='h-5 w-5 text-neutral-500' />
//         </Button>

//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <button className='rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-200'>
//               <Avatar className="h-8 w-8 cursor-pointer">
//                 <AvatarImage src={user?.photoURL ?? undefined} alt={user?.displayName ?? 'User'} />
//                 <AvatarFallback className="bg-[#86B7A9] text-white text-sm">
//                   {getInitials(user?.displayName ?? null)}
//                 </AvatarFallback>
//               </Avatar>
//             </button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end" className="w-52 bg-white shadow-lg border-neutral-100">
//             {/* User info at top */}
//             <div className="px-3 py-2 border-b border-neutral-100">
//               <p className="text-sm font-medium text-neutral-700 truncate">
//                 {user?.displayName ?? 'User'}
//               </p>
//               <p className="text-xs text-neutral-500 truncate">
//                 {user?.email}
//               </p>
//             </div>

//             <DropdownMenuItem className="cursor-pointer text-neutral-600 hover:text-neutral-900" onClick={() => router.push(`/profile/${user?.uid}`)} >
//               <User className="mr-2 h-4 w-4" />
//               Profile
//             </DropdownMenuItem>

//             <DropdownMenuItem className="cursor-pointer text-neutral-600 hover:text-neutral-900" onClick={() => router.push('/dashboard')} >
//               <LayoutDashboard className="mr-2 h-4 w-4" />
//               Dashboard
//             </DropdownMenuItem>

//             <DropdownMenuItem className="cursor-pointer text-neutral-600 hover:text-neutral-900" onClick={() => router.push('/profile/settings')} >
//               <Settings className="mr-2 h-4 w-4" />
//               Settings
//             </DropdownMenuItem>

//             <DropdownMenuSeparator className="bg-neutral-100" />

//             <DropdownMenuItem className="cursor-pointer text-red-500 hover:text-red-600" onClick={signOut} >
//               <LogOut className="mr-2 h-4 w-4" />
//               Sign Out
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     )
//   }


//   function UnauthenticatedActions({ onNavigate }: { onNavigate?: () => void }) {
//     return (
//       <div className='flex items-center gap-3'>
//         <Button variant='outline' className='border-none shadow-none hover:shadow-sm cursor-pointer' onClick={() => { onNavigate?.(); router.push('/auth') }} >
//           Sign In
//         </Button>
//         <Button className='bg-black text-white border-none shadow-sm cursor-pointer' onClick={() => { onNavigate?.(); router.push('/auth') }} >
//           Sign Up
//         </Button>
//       </div>
//     )
//   }


//   if (isMobile) {
//     return (
//       <header className='sticky top-0 z-50 w-full h-16 shadow-sm bg-white'>
//         <div className='flex items-center justify-between h-full px-4'>
//           <div className="relative h-16 w-20 -ml-2">
//             <Image src={Bartr_bg} fill className="object-contain hover:cursor-pointer" loading='lazy' alt="Bartr" onClick={() => router.push('/')} />
//           </div>

//           <div className='flex items-center gap-2'>
//             {!loading && user && (
//               <Button variant="ghost" size="icon" className="relative" onClick={() => router.push('/notifications')} >
//                 <Bell className="h-5 w-5 text-neutral-500" />
//               </Button>
//             )}

//             <Sheet open={isOpen} onOpenChange={setIsOpen}>
//               <SheetTrigger asChild>
//                 <Button variant='ghost' size='icon' className='md:hidden'>
//                   <Menu className='h-6 w-6' />
//                   <span className='sr-only'>Toggle Menu</span>
//                 </Button>
//               </SheetTrigger>
//               <SheetContent side='right' className='w-75 sm:w-100 bg-white'>
//                 <SheetHeader>
//                   <SheetTitle></SheetTitle>
//                   <SheetDescription></SheetDescription>
//                 </SheetHeader>
//                 <nav className='flex flex-col gap-6 mt-8'>
//                   {(user ? appNavItems : navItems).map((item) => (
//                     <Link key={item.href} href={item.href} className={`text-sm font-medium cursor-pointer ${pathname === item.href ? 'text-[#86B7A9]' : 'text-neutral-500 hover:text-[#86B7A9]'}`} onClick={() => setIsOpen(false)}>
//                       {item.label}
//                     </Link>
//                   ))}

//                   <div className='flex flex-col gap-3 mt-6 pt-6'>
//                     {!loading && (
//                       user ? (
//                         <>
//                           {/* Authenticated mobile menu */}
//                           <div className="flex items-center gap-3 mb-2">
//                             <Avatar className="h-9 w-9">
//                               <AvatarImage src={user.photoURL ?? undefined} />
//                               <AvatarFallback className="bg-[#86B7A9] text-white text-sm">
//                                 {getInitials(user.displayName)}
//                               </AvatarFallback>
//                             </Avatar>
//                             <div>
//                               <p className="text-sm font-medium text-neutral-700">
//                                 {user.displayName}
//                               </p>
//                               <p className="text-xs text-neutral-500">{user.email}</p>
//                             </div>
//                           </div>
//                           <Button variant='outline' className='w-full border-neutral-200 cursor-pointer text-neutral-600' onClick={() => { setIsOpen(false); router.push(`/profile/${user.uid}`) }} >
//                             <User className="mr-2 h-4 w-4" />
//                             Profile
//                           </Button>
//                           <Button className='w-full bg-red-50 text-red-500 border-none shadow-none cursor-pointer hover:bg-red-100' onClick={() => { setIsOpen(false); signOut() }} >
//                             <LogOut className="mr-2 h-4 w-4" />
//                             Sign Out
//                           </Button>
//                         </>
//                       ) : (
//                         <>
//                           {/* Unauthenticated mobile menu */}
//                           <Button variant='outline' className='w-full border-none shadow-sm cursor-pointer' onClick={() => { setIsOpen(false); router.push('/auth') }} >
//                             Sign In
//                           </Button>
//                           <Button className='w-full bg-black text-white border-none shadow-sm cursor-pointer' onClick={() => { setIsOpen(false); router.push('/auth') }} >
//                             Sign Up
//                           </Button>
//                         </>
//                       )
//                     )}
//                   </div>
//                 </nav>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </header>
//     )
//   }

//   return (
//     <header className={`z-50 flex shadow-b-sm shadow-neutral-50 bg-white ${isMobile ? 'min-h-screen flex-col items-start justify-start w-[80%] py-5 px-4' : 'h-16 items-center w-full sticky top-0 px-4 lg:px-8 gap-6'}`}>
//       <div className="relative h-16 w-24">
//         <Image src={Bartr_bg} fill className="object-contain hover:cursor-pointer" loading='lazy' alt="Bartr" onClick={() => router.push('/')} />
//       </div>

//       <NavigationMenu className={`max-w-none hidden md:flex ${isMobile ? 'items-start justify-start' : 'mx-auto'}`}>
//         <NavigationMenuList className={`gap-8 font-inter font-medium lg:gap-14 ${isMobile ? "flex-col" : "flex-wrap"}`}>
//           {(user ? appNavItems : navItems).map((item) => (
//             <NavigationMenuItem key={item.href} className={`hover:cursor-pointer ${pathname === item.href ? 'text-[#86B7A9]' : 'text-neutral-500 hover:text-[#86B7A9]'}`}>
//               <NavigationMenuLink asChild>
//                 <Link href={item.href}>{item.label}</Link>
//               </NavigationMenuLink>
//             </NavigationMenuItem>
//           ))}
//         </NavigationMenuList>
//       </NavigationMenu>

//       <div className='hidden md:flex items-center gap-4'>
//         {loading ? (
//           <div className="h-8 w-8 rounded-full bg-neutral-100 animate-pulse" />
//         ) : user ? (
//           <AuthenticatedActions />
//         ) : (
//           <UnauthenticatedActions />
//         )}
//       </div>
//     </header>
//   )
// }






































'use client';

import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Link from 'next/link';
import Image from 'next/image';
import { Bartr_bg } from '@/assets';
import { useRouter, usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { ArrowLeftRight, Bell, LayoutDashboard, LogOut, LucideIcon, Menu, MessagesSquare, Settings, User } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAUth } from '@/hooks/useAuth';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '../ui/navigation-menu';

type NavVisibility = 'always' | 'authenticated' | 'public';

type NavItem = {
  label: string;
  href: string;
  icon?: LucideIcon;
  visibility: NavVisibility;
};

// Single source of truth for nav items. Add/remove/reassign visibility here
// instead of maintaining separate arrays per auth state.
const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, visibility: 'authenticated' },
  { label: 'Marketplace', href: '/marketplace', visibility: 'always' },
  { label: 'Trades', href: '/trades', icon: ArrowLeftRight, visibility: 'authenticated' },
  { label: 'Messages', href: '/messages', icon: MessagesSquare, visibility: 'authenticated' },
  { label: 'How It Works', href: '/how-it-works', visibility: 'public' },
  { label: 'Community', href: '/community', visibility: 'always' },
];

function getVisibleNavItems(isAuthenticated: boolean): NavItem[] {
  return NAV_ITEMS.filter((item) => {
    if (item.visibility === 'always') return true;
    if (item.visibility === 'authenticated') return isAuthenticated;
    return !isAuthenticated; // 'public'
  });
}

type HeaderVariant = 'default' | 'marketing';

export default function Header({ variant = 'default' }: { variant?: HeaderVariant }) {
  const isMobile = useIsMobile();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading, signOut } = useAUth();

  const navItems = getVisibleNavItems(!!user);

  function getInitials(name: string | null): string {
    if (!name) return '?';
    return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
  }

  function AuthenticatedActions() {
    return (
      <div className='flex items-center gap-3'>
        <Button variant='ghost' size='icon' className='relative' onClick={() => router.push('/notifications')}>
          <Bell className='h-5 w-5 text-neutral-500' />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className='rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-200'>
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src={user?.photoURL ?? undefined} alt={user?.displayName ?? 'User'} />
                <AvatarFallback className="bg-[#86B7A9] text-white text-sm">
                  {getInitials(user?.displayName ?? null)}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52 bg-white shadow-lg border-neutral-100">
            <div className="px-3 py-2 border-b border-neutral-100">
              <p className="text-sm font-medium text-neutral-700 truncate">
                {user?.displayName ?? 'User'}
              </p>
              <p className="text-xs text-neutral-500 truncate">
                {user?.email}
              </p>
            </div>

            <DropdownMenuItem className="cursor-pointer text-neutral-600 hover:text-neutral-900" onClick={() => router.push(`/profile/${user?.uid}`)}>
              <User className="mr-2 h-4 w-4" />
              My Profile
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer text-neutral-600 hover:text-neutral-900" onClick={() => router.push('/dashboard')}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer text-neutral-600 hover:text-neutral-900" onClick={() => router.push('/profile/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-neutral-100" />

            <DropdownMenuItem className="cursor-pointer text-red-500 hover:text-red-600" onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  function UnauthenticatedActions({ onNavigate }: { onNavigate?: () => void }) {
    return (
      <div className='flex items-center gap-3'>
        <Button variant='outline' className='text-neutral-500 border-neutral-200/80 shadow-none hover:shadow-sm cursor-pointer' onClick={() => { onNavigate?.(); router.push('/auth'); }}>
          Sign In
        </Button>
        <Button className='bg-black text-white border-none shadow-sm cursor-pointer' onClick={() => { onNavigate?.(); router.push('/auth'); }}>
          Sign Up
        </Button>
      </div>
    );
  }

  if (isMobile) {
    return (
      <header className='sticky top-0 z-50 w-full h-16 shadow-sm bg-white'>
        <div className='flex items-center justify-between h-full px-4'>
          <div className="relative h-16 w-20 -ml-2">
            <Image src={Bartr_bg} fill className="object-contain hover:cursor-pointer" loading='lazy' alt="Bartr" onClick={() => router.push('/')} />
          </div>

          <div className='flex items-center gap-2'>
            {!loading && user && (
              <Button variant="ghost" size="icon" className="relative" onClick={() => router.push('/notifications')}>
                <Bell className="h-5 w-5 text-neutral-500" />
              </Button>
            )}

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
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-sm font-medium cursor-pointer ${pathname === item.href ? 'text-[#86B7A9]' : 'text-neutral-500 hover:text-[#86B7A9]'}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}

                  <div className='flex flex-col gap-3 mt-6 pt-6'>
                    {!loading && (
                      user ? (
                        <>
                          <div className="flex items-center gap-3 mb-2">
                            <Avatar className="h-9 w-9">
                              <AvatarImage src={user.photoURL ?? undefined} />
                              <AvatarFallback className="bg-[#86B7A9] text-white text-sm">
                                {getInitials(user.displayName)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium text-neutral-700">
                                {user.displayName}
                              </p>
                              <p className="text-xs text-neutral-500">{user.email}</p>
                            </div>
                          </div>
                          <Button variant='outline' className='w-full border-neutral-200 cursor-pointer text-neutral-600' onClick={() => { setIsOpen(false); router.push(`/profile/${user.uid}`); }}>
                            <User className="mr-2 h-4 w-4" />
                            Profile
                          </Button>
                          <Button className='w-full bg-red-50 text-red-500 border-none shadow-none cursor-pointer hover:bg-red-100' onClick={() => { setIsOpen(false); signOut(); }}>
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign Out
                          </Button>
                        </>
                      ) : (
                        <UnauthenticatedActions onNavigate={() => setIsOpen(false)} />
                      )
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`z-50 flex shadow-b-sm shadow-neutral-50 bg-white ${
        isMobile
          ? 'min-h-screen flex-col items-start justify-start w-[80%] py-5 px-4'
          : 'h-16 items-center w-full sticky top-0 px-4 lg:px-8 gap-6'
      } ${variant === 'marketing' ? 'justify-between' : 'justify-between'}`}
    >
      <div className="relative h-16 w-24">
        <Image src={Bartr_bg} fill className="object-contain hover:cursor-pointer" loading='lazy' alt="Bartr" onClick={() => router.push('/')} />
      </div>

      <NavigationMenu className={`max-w-none hidden md:flex ${isMobile ? 'items-start justify-start' : 'mx-auto'}`}>
        <NavigationMenuList className={`gap-8 font-inter font-medium lg:gap-14 ${isMobile ? 'flex-col' : 'flex-wrap'}`}>
          {navItems.map((item) => (
            <NavigationMenuItem key={item.href} className={`hover:cursor-pointer ${pathname === item.href ? 'text-[#86B7A9]' : 'text-neutral-500 hover:text-[#86B7A9]'}`}>
              <NavigationMenuLink asChild>
                <Link href={item.href}>{item.label}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <div className='hidden md:flex items-center gap-4'>
        {loading ? (
          <div className="h-8 w-8 rounded-full bg-neutral-100 animate-pulse" />
        ) : user ? (
          <AuthenticatedActions />
        ) : (
          <UnauthenticatedActions />
        )}
      </div>
    </header>
  );
}