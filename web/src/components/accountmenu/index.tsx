'use client'

import { useRouter } from 'next/navigation';
import { Bell, LayoutDashboard, LogOut, Settings, User } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '../ui/button';
import { useUnreadNotifications } from '@/hooks/useUnreadNotifications';

function getInitials(name: string | null): string {
  if (!name) return '?';
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
}

export default function AccountMenu() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const unreadCount = useUnreadNotifications(user?.uid);


  return (
    <div className="flex items-center justify-between h-full px-4 lg:px-8">
      
      <Button variant='ghost' size='icon' className='relative cursor-pointer' aria-label={unreadCount > 0 ? `Notifications, ${unreadCount} unread` : 'Notifications'} onClick={() => router.push('/notifications')} >
        <Bell className='h-5 w-5 text-neutral-500' />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
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