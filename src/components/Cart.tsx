'use client'

import { ShoppingCartIcon } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from './ui/sheet'
import { Separator } from './ui/separator'
import { buttonVariants } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'

const Cart = () => {
  const itemCount = 1
  const fee = 1

  return (
    <Sheet>
      <SheetTrigger className='group -m-2 flex items-center p-2'>
        <div className='border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-20 flex items-center justify-around p-1.5 rounded-md'>
          <ShoppingCartIcon />
          <span className='h-6 w-px bg-gray-300' aria-hidden='true' />
          <span className='text-base text-primary font-semibold text-center'>
            10
          </span>
        </div>
      </SheetTrigger>
      <SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg'>
        <SheetHeader className='space-y-2.5 pr-6'>
          <SheetTitle className='tracking-widest'>CART</SheetTitle>
          <Separator />
          <p className='text-gray-500 text-sm'>
            Spend {formatPrice(75 - fee)} more and get free shipping!
          </p>
          <Separator />
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className='flex w-full flex-col pr-6'>
              {/* TODO: cart logic */}
              Cart Items
            </div>
            <div className='space-y-4 pr-6'>
              <Separator />
              <div className='space-y-1.5 text-base'>
                <div className='flex'>
                  <span className='flex-1'>Shipping</span>
                  <span>Free</span>
                </div>
                <div className='flex'>
                  <span className='flex-1'>Transaction Fee</span>
                  <span>{formatPrice(fee)}</span>
                </div>
                <div className='flex'>
                  <span className='flex-1'>Total</span>
                  <span>{formatPrice(fee)}</span>
                </div>
              </div>
              <Separator />
              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href='/cart'
                    className={buttonVariants({ className: 'w-full tracking-widest' })}
                  >
                    CHECKOUT
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className='flex h-full flex-col items-center justify-center space-y-1'>
            <p className='text-base tracking-widest'>YOUR CART IS EMPTY</p>
            <SheetTrigger asChild>
              <Link
                href='/products'
                className={buttonVariants({
                  variant: 'link',
                  size: 'sm',
                  className: 'text-sm text-muted-foreground font-bold',
                })}
              >
                Add items to your cart checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default Cart
