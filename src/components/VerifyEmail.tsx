'use client'

import { trpc } from '@/trpc/client'
import { Loader2, XCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { VerifyEmailProps } from '@/types'
import { Icons } from './Icons'

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  // we call a endpoint and one of its certain procedures
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({ token })

  // something went wrong with the token verification
  if (isError) {
    return (
      <div className='flex flex-col items-center gap-2'>
        <div className='relative mb-4 h-40 w-40 text-muted-foreground'>
          <Icons.logoBlack className='dark:fill-white' />
        </div>
        <XCircle className='h-8 w-8 text-red-600' />
        <h3 className='font-semibold text-xl'>There was a problem.</h3>
        <p className='text-muted-foreground text-sm'>
          This token is not valid or might be expired. Please try again.
        </p>
      </div>
    )
  }

  if (data?.success) {
    return (
      <div className='flex h-full flex-col items-center justify-center'>
        <div className='relative mb-4 h-40 w-40 text-muted-foreground'>
          <Icons.logoBlack className='dark:fill-white' />
        </div>
        <h3 className='font-semibold text-2xl'>You&apos;re all set!</h3>
        <p className='text-muted-foreground text-center mt-1'>
          Thank you for verifying your email.
        </p>
        <Link className={buttonVariants({ className: 'mt-4' })} href='/sign-in'>
          Sign In
        </Link>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='flex flex-col items-center gap-2'>
        <div className='animate-pulse relative mb-4 h-40 w-40 text-muted-foreground'>
          <Icons.logoBlack className='dark:fill-white' />
        </div>
        <Loader2 className='animate-spin h-8 w-8 text-zinc-300' />
        <h3 className='font-semibold text-xl'>Verifying...</h3>
        <p className='text-muted-foreground text-sm'>
          This won&apos;t take long.
        </p>
      </div>
    )
  }
}

export default VerifyEmail
