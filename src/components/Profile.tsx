import { User } from 'lucide-react'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const Profile = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <>
      {isLoggedIn ? (
        <Link
          className='bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 flex items-center justify-around p-1.5 rounded-md'
          href='/profile'
        >
          <User />
        </Link>
      ) : (
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
            <DropdownMenuItem>
              <Link href='/sign-up'>Sign Up</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href='/sign-in'>Sign In</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  )
}

export default Profile
