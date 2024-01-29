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
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ZodError } from 'zod'

const Page = () => {
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

  const router = useRouter()

  // example where we get the info return by a endpoind.the type of the data variable depends of what do we return in our backend (index.ts file) in that endpoint
  // const { data } = trpc.auth.useQuery()
  // console.log(data);

  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
    // callbacks
    onError: (error) => {
      // there's already a user with the email
      if (error.data?.code === 'CONFLICT') {
        toast.error('This email is already in use. Sign in instead?')
        return
      }
      // check if in the zod validation there's an error (like the password is not long enough)
      if (error instanceof ZodError) {
        toast.error(error.issues[0].message)
        return
      }

      // default message
      toast.error('Something went worng. Please try again.')
    },
    onSuccess: ({ sentToEmail }) => {
      toast.success(`Verification email sent to ${sentToEmail}.`)
      router.push('/verify-email?to=' + sentToEmail)
    },
  })

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    mutate({ email, password })
  }

  return (
    <>
      <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
        <Link
          href='./sign-in'
          className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 absolute right-4 top-4 md:right-8 md:top-8 z-10'
        >
          Sign In
          <ArrowRight className='h-4 w-4 mx-1' />
        </Link>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col items-center space-y-2 text-center'>
            <h1 className='text-2xl tracking-widest p-3'>CREATE AN ACCOUNT</h1>
            <p className='text-sm tracking-wider'>
              Please fill in the information below
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
                    placeholder='you@example.com'
                  />
                </div>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='password'>Password</Label>
                  <Input
                    {...register('password')}
                    className={cn({
                      'focus-visible:ring-red-500': errors.password,
                    })}
                    type='password'
                    placeholder='Password'
                  />
                </div>

                <Button>Sign up</Button>
              </div>
            </form>
          </div>
          <div className='flex justify-center'>
            <Link
              className={buttonVariants({
                variant: 'link',
                className: 'gap-1.5',
              })}
              href='/sign-in'
            >
              Already have an account? Sign In
              <ArrowRight className='h-4 w-4' />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
