'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { PRODUCT_CATEGORIES } from '@/config/const'
import { useCart } from '@/hooks/use-cart'
import { cn, formatPrice } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { SelectionProduct } from '../product/[productId]/page'
import { useRouter } from 'next/navigation'
import { trpc } from '@/trpc/client'

export default function Page() {
  const { items, addItem, removeItem } = useCart()

  const router = useRouter()

  const { mutate: createCheckoutSession, isLoading } =
    trpc.payment.createSession.useMutation({
      onSuccess: ({ url }) => {
        if (url) router.push(url)
      },
    })

  // Trick: we basically waiting for everything that comes from client side
  const [isMounted, setIsMounted] = useState<boolean>(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const cartTotal = items.reduce(
    (total, { selectionProduct, quantity }) =>
      total + selectionProduct?.product.price * quantity,
    0
  )

  const fee = 1

  const productsData = items.map(({ selectionProduct, quantity }) => {
    return {
      product: selectionProduct.product.id,
      colorId: selectionProduct.colorSelectedId!,
      size: selectionProduct.sizeSelected!,
      quantity: quantity,
    }
  })

  // TODO: arreglar logica de fee y que tales
  // TODO: Skeleton
  // TODO: Modular componentes

  return (
    <div className='mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8'>
      <h1 className='text-3xl font-semibold tracking-widest sm:text-4xl'>
        SHOPPING CART
      </h1>

      <div className='mt-2 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16'>
        <div
          className={cn('lg:col-span-7', {
            'border-2 border-dashed border-zinc-300 p-32':
              isMounted && items.length === 0,
          })}
        >
          {isMounted && items.length === 0 ? (
            <div className='flex h-full flex-col items-center justify-center'>
              <h3 className='tracking-widest text-xl'>YOUR CART IS EMPTY</h3>
              <p className='text-muted-foreground text-center'>
                Whoops! Nothing to show here yet.
              </p>
              <Link
                href='/'
                className={buttonVariants({
                  className: 'w-full tracking-widest mt-7',
                })}
              >
                SHOP OUR PRODUCTS
              </Link>
            </div>
          ) : null}

          {isMounted && items.length !== 0 ? (
            <>
              <h2 className='text-muted-foreground'>
                Items in your shopping cart
              </h2>
              <ul
                className={cn({
                  'divide-y divide-gray-200 border-b border-t border-gray-200':
                    items.length > 0,
                })} // if we got products in the cart, we get a divide for each product
              >
                {isMounted &&
                  items.map(
                    ({
                      selectionProduct,
                      quantity,
                    }: {
                      selectionProduct: SelectionProduct
                      quantity: number
                    }) => {
                      const categories = PRODUCT_CATEGORIES.flatMap(
                        (category) =>
                          category.featured.map((featuredItem) => ({
                            label: featuredItem.title,
                            value: featuredItem.value,
                          }))
                      )
                      const label = categories.find(
                        ({ value }) =>
                          value === selectionProduct.product.category
                      )?.label

                      const productItemSelectedIndex =
                        selectionProduct.product.product_items.findIndex(
                          (productItem) =>
                            productItem.id === selectionProduct.colorSelectedId
                        )

                      const { image } =
                        selectionProduct.product.product_items[
                          productItemSelectedIndex
                        ].images[0]

                      return (
                        <li
                          key={
                            selectionProduct.product.id +
                            selectionProduct.colorSelectedId +
                            selectionProduct.sizeSelected
                          }
                          className='flex py-6'
                        >
                          <div className='flex-shrink-0'>
                            <div className='relative min-h-44 min-w-28'>
                              {typeof image !== 'string' && image.url ? (
                                <Image
                                  src={image.url}
                                  alt={selectionProduct.product.name}
                                  className='h-full w-full object-cover object-center sm:h-48 sm:w-48'
                                  fill
                                />
                              ) : null}
                            </div>
                          </div>

                          <div className='ml-4 flex flex-1 flex-col justify-between sm:ml-6'>
                            <div className='relative pr-9 sm:gap-x-6 sm:pr-0'>
                              <div className='flex justify-between'>
                                <h3 className='tracking-widest  hover:text-gray-400'>
                                  <Link
                                    href={`/product/${selectionProduct.product.id}`}
                                  >
                                    {selectionProduct.product.name}
                                  </Link>
                                </h3>
                              </div>

                              <div className='mt-1 flex text-sm'>
                                <p className='text-muted-foreground'>{label}</p>
                              </div>

                              <div className='mt-1 flex text-sm'>
                                <p className='text-muted-foreground'>
                                  {selectionProduct.product.product_items[
                                    productItemSelectedIndex
                                  ].color_name.toUpperCase()}{' '}
                                  /{' '}
                                  {selectionProduct.sizeSelected?.toUpperCase()}
                                </p>
                              </div>

                              <p className='mt-1 text-sm font-medium'>
                                {formatPrice(selectionProduct.product.price)}
                              </p>
                            </div>

                            <div className='mt-4 text-xs text-muted-foreground flex justify-between'>
                              <div className='flex flex-row h-12 justify-center items-center'>
                                <button
                                  onClick={() => {
                                    if (quantity > 1) {
                                      addItem({
                                        selectionProduct,
                                        quantity: -1,
                                      })
                                    } else {
                                      removeItem(selectionProduct)
                                    }
                                  }}
                                  className='h-12 w-10 border flex items-center justify-center '
                                >
                                  <p className=' text-center text-xl'>-</p>
                                </button>
                                <div className='h-12 w-14 border flex items-center justify-center'>
                                  <p className=' text-center text-base'>
                                    {quantity}
                                  </p>
                                </div>
                                <button
                                  onClick={() => {
                                    // verificamos que haya la cantidad de producto deseada
                                    if (
                                      selectionProduct.product.product_items[
                                        productItemSelectedIndex
                                      ].sizes_quantity[0][
                                        selectionProduct.sizeSelected
                                      ] <
                                      quantity + 1
                                    ) {
                                      toast.error(
                                        'There is no requested quantity of product'
                                      )
                                    } else {
                                      addItem({
                                        selectionProduct,
                                        quantity: 1,
                                      })
                                    }
                                  }}
                                  className='h-12 w-10 border flex items-center justify-center '
                                >
                                  <p className=' text-center text-xl'>+</p>
                                </button>
                              </div>
                              <Button
                                variant='link'
                                onClick={() => removeItem(selectionProduct)}
                              >
                                <p className='tracking-widest font-light text-muted-foreground'>
                                  REMOVE
                                </p>
                              </Button>
                            </div>
                          </div>
                        </li>
                      )
                    }
                  )}
              </ul>
            </>
          ) : null}
        </div>

        <section className='mt-16 px-4 bg-primary-foreground py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
          <h2 className='text-lg font-medium'>Order summary</h2>

          <div className='mt-6 space-y-4'>
            <div className='flex items-center justify-between'>
              <p className='text-sm text-muted-foreground'>Subtotal</p>
              <p className='text-sm font-medium text-muted-foreground'>
                {isMounted ? (
                  formatPrice(cartTotal)
                ) : (
                  <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                )}
              </p>
            </div>

            <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
              <div className='flex items-center text-sm text-muted-foreground'>
                <span>Flat Transaction Fee</span>
              </div>
              <div className='text-sm font-medium text-muted-foreground'>
                {isMounted ? (
                  formatPrice(fee)
                ) : (
                  <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                )}
              </div>
            </div>

            <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
              <div className='text-base font-medium'>Order Total</div>
              <div className='text-base font-medium'>
                {isMounted ? (
                  formatPrice(cartTotal + fee)
                ) : (
                  <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                )}
              </div>
            </div>

            <div className='mt-6'>
              {/* This button are gonna tell the backend to create a checkout session (the front send the products (the cart)), where it's ready, backend send it to client (the url session) and front redirect to the user to that session url */}
              <Button
                disabled={items.length === 0 || isLoading}
                className='w-full tracking-widest'
                size='lg'
                onClick={() => createCheckoutSession({ productsData })}
              >
                {isLoading ? (
                  <Loader2 className='w-4 h-4 animate-spin mr-1.5' />
                ) : null}
                CHECKOUT
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
