import VerifyEmail from '@/components/VerifyEmail'
import { VerifyEmailPageProps } from '@/types'
import { Icons } from '@/components/Icons'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const VerifyEmailPage = ({ searchParams }: VerifyEmailPageProps) => {
  // this come in the url as '?token=<something>
  const token = searchParams.token

  const toEmail = searchParams.to
  return (
    <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
    <Link
      href='./sign-in'
      className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 absolute right-4 top-4 md:right-8 md:top-8 z-10 tracking-widest'
    >
      SIGN IN
      <ArrowRight className='h-4 w-4 mx-1' />
    </Link>
      <div className='mx-auto flex w-ful flex-col justify-center space-y-6 sm:w-[350px]'>
        {/* cuando hay token activamos las funcionalidades con este */}
        {token && typeof token === 'string' ? (
          <div className='grid gap-6'>
            <VerifyEmail token={token} />
          </div>
        ) : (
          // cuando no hay toque mostramos el mensaje de que el token se enviara al correo
          <div className='flex h-full flex-col items-center justify-center space-y-1'>
            <div className='relative mb-4 h-40 w-40 text-muted-foreground'>
              <Icons.logo className='dark:fill-white' />
            </div>
            <h3 className='font-semibold text-2xl'>Check your email</h3>

            {toEmail ? (
              <p className='text-muted-foreground text-center'>
                We&apos;ve sent a verification link to{' '}
                <span className='font-semibold'>{toEmail}</span>
              </p>
            ) : (
              <p className='text-muted-foreground text-center'>
                We&apos;ve sent a verification link to your email
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default VerifyEmailPage
