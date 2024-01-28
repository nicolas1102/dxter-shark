import { User } from 'lucide-react'
import Link from 'next/link'

const Profile = () => {
  return (
    // TODO: make the link redireccion dynamic
    <Link
      className='bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 flex items-center justify-around p-1.5 rounded-md'
      href='/sign-up'
    >
      <User />
    </Link>
  )
}

export default Profile
