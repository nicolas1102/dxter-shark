'use client'

import { User, UserPlus, LogIn, LogOut } from 'lucide-react'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/hooks/user-auth'

const Profile = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const { signOut } = useAuth()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Link
          className='bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 flex items-center justify-around p-1.5 rounded-md'
          href='/sign-up'
        >
          <User />
        </Link>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isLoggedIn ? (
          <>
            <DropdownMenuItem>
              <User className='mr-2 h-4 w-4' />
              <Link href='/profile'>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={signOut}
              className='text-red-500 font-bold'
            >
              <LogOut className='mr-2 h-4 w-4' />
              Log Out
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <LogIn className='mr-2 h-4 w-4' />
              <Link href='/sign-in'>Sign In</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserPlus className='mr-2 h-4 w-4' />
              <Link href='/sign-up'>Sign Up</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
    // {isLoggedIn ? (
    //   <Link
    //     className='bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 flex items-center justify-around p-1.5 rounded-md'
    //     href='/profile'
    //   >
    //     <User />
    //   </Link>
    // ) : (

    // )}
  )
}

export default Profile
