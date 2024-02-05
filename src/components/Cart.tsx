'use client'

import { ShoppingCart } from 'lucide-react'
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
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/hooks/use-cart'
import CartItem from './CartItem'
import { useEffect, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'

const Cart = () => {
  const { items } = useCart()
  const [isMounted, setIsMounted] = useState(false)
  const itemCount = items.reduce(
    (totalCount, item) => totalCount + item.quantity,
    0
  )

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const cartTotal = items.reduce(
    (total, { selectionProduct, quantity }) =>
      total + selectionProduct?.product.price * quantity,
    0
  )

  const fee = 1

  return (
    <Sheet>
      <SheetTrigger className='group -m-2 flex items-center p-2'>
        <div className='bg-background hover:bg-accent hover:text-accent-foreground h-10 w-20 flex items-center justify-around p-1.5 '>
          <ShoppingCart />
          <span className='h-6 w-px bg-gray-300' aria-hidden='true' />
          <span className='text-sm text-primary font-semibold text-center'>
            {isMounted ? itemCount : 0}
          </span>
        </div>
      </SheetTrigger>
      <SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg'>
        <SheetHeader className='space-y-2.5 pr-6'>
          <SheetTitle className='tracking-widest'>CART</SheetTitle>
          <Separator />
          <p className='text-gray-500 text-sm'>
            {75 - cartTotal < 0
              ? 'You are eligible for free shipping!'
              : `Spend ${formatPrice(
                  75 - cartTotal
                )} more and get free shipping!`}
          </p>
          <Separator />
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className='flex w-full flex-col pr-6'>
              <ScrollArea className='flex-grow h-[450px]'>
                {items.map(({ selectionProduct, quantity }) => (
                  <CartItem
                    selectionProduct={selectionProduct}
                    quantity={quantity}
                    key={
                      selectionProduct?.colorSelectedId +
                      selectionProduct?.product.id +
                      selectionProduct?.sizeSelected
                    }
                  />
                ))}
              </ScrollArea>
            </div>
            <div className='space-y-4 pr-6'>
              <Separator />
              <div className='space-y-1.5 text-base'>
                <div className='flex'>
                  <span className='flex-1'>Shipping</span>
                  <span>{75 - cartTotal < 0 ? 'Free' : formatPrice(10)}</span>
                </div>
                <div className='flex'>
                  <span className='flex-1'>Transaction Fee</span>
                  <span>{formatPrice(fee)}</span>
                </div>
                <div className='flex'>
                  <span className='flex-1'>Total</span>
                  <span>{formatPrice(cartTotal + fee)}</span>
                </div>
              </div>
              <Separator />
              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href='/cart'
                    className={buttonVariants({
                      className: 'w-full tracking-widest',
                    })}
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
