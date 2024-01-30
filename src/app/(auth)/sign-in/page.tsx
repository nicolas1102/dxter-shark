'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  TAuthCredentialsValidator,
  AuthCredentialsValidator,
} from '@/lib/validators/account-credentials-validator'
import { trpc } from '@/trpc/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { ZodError } from 'zod'
import { Icons } from '@/components/Icons'

const Page = () => {
  // reciving params in the client side
  const searchParams = useSearchParams()
  const router = useRouter()
  const isSeller = searchParams.get('as') === 'seller'
  const origin = searchParams.get('origin') // to make redirections

  const continueAsSeller = () => {
    router.push('?as=seller')
  }

  const continueAsBuyer = () => {
    router.push('/sign-in', undefined) // undefined is to clear the url parameters
  }

  // register help us to handle the state of the inputs.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>(
    /* we are telling (with '<TAuthCredentialsValidator>') to register what to expect (we use this register function down bellow in each input) */
    {
      resolver: zodResolver(AuthCredentialsValidator),
    }
  )

  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    onSuccess: () => {
      toast.success('Signed in successfully')
      router.refresh()

      // we redirected back where the user was at, if he try to go to this page if he's logged in
      if (origin) {
        router.push(`/${origin}`)
        return
      }

      if (isSeller) {
        router.push('/sell')
        return
      }

      // if the user is just an user
      router.push('/')
      router.refresh()
    },
    onError: (error) => {
      if (error.data?.code === 'UNAUTHORIZED') {
        toast.error('Invalid email or password')
        return
      }
    },
  })

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    signIn({ email, password })
  }

  return (
    <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
      <Link
        href='./sign-up'
        className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 absolute right-4 top-4 md:right-8 md:top-8 z-10 tracking-widest'
      >
        SIGN UP
        <ArrowRight className='h-4 w-4 mx-1' />
      </Link>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
        <div className='flex flex-col items-center space-y-2 text-center'>
          <div className='relative mb-4 h-32 w-32 text-muted-foreground'>
            <Icons.logo className='dark:fill-white' />
          </div>
          <h1 className='text-2xl tracking-widest p-3'>
            SIGN IN TO YOUR {isSeller ? 'SELLER ' : ''}ACCOUNT
          </h1>
          <p className='text-sm tracking-wider'>
            Please enter your e-mail and password
          </p>
        </div>

        <div className='grid gap-6'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid gap-2'>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  // this handle the information of the input with the scheme we configured it
                  {...register('email')}
                  className={cn({
                    'focus-visible:ring-red-500': errors.email,
                  })}
                  placeholder='youremail@example.com'
                />
                {errors?.email && (
                  <p className='text-sm text-red-500'>{errors.email.message}</p>
                )}
              </div>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  {...register('password')}
                  type='password'
                  className={cn({
                    'focus-visible:ring-red-500': errors.password,
                  })}
                  placeholder='yourpassword'
                />
                {errors?.password && (
                  <p className='text-sm text-red-500'>
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button className='tracking-widest dark:font-semibold'>
                SIGN IN
              </Button>
            </div>
            <div className='flex justify-center'>
              <Link
                className={buttonVariants({
                  variant: 'link',
                  className: 'gap-1.5',
                })}
                href='/sign-up'
              >
                Don&apos;t have an account? Sign-up
                <ArrowRight className='h-4 w-4' />
              </Link>
            </div>
          </form>

          <div className='relative'>
            <div
              aria-hidden='true'
              className='absolute inset-0 flex items-center'
            >
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>
                or
              </span>
            </div>
          </div>
          {isSeller ? (
            <Button
              onClick={continueAsBuyer}
              variant='secondary'
              disabled={isLoading}
              className='tracking-widest dark:font-semibold'
            >
              CONTINUE AS CUSTOMER
            </Button>
          ) : (
            <Button
              onClick={continueAsSeller}
              variant='secondary'
              disabled={isLoading}
              className='tracking-widest dark:font-semibold'
            >
              CONTINUE AS SELLER
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
