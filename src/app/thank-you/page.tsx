import { getServerSideUser } from '@/lib/payload-utils'
import Image from 'next/image'
import { cookies } from 'next/headers'
import { getPayloadClient } from '@/get-payload'
import { notFound, redirect } from 'next/navigation'
import { Product } from '@/payload-types'
import { PRODUCT_CATEGORIES } from '@/config/const'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { User } from 'payload/dist/auth'
import PaymentStatus from '@/components/PaymentStatus'

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const Page = async ({ searchParams }: PageProps) => {
  const orderId = searchParams.orderId

  // protenting page
  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)
  const payload = await getPayloadClient()
  const { docs: orders } = await payload.find({
    collection: 'orders',
    // in the collection orders, we hava the client id, but we wanna al the user register, so we configure 2, so the request to the data base brind us all that data
    depth: 2,
    where: {
      id: {
        equals: orderId,
      },
    },
  })

  // we want the first element
  const [order] = orders

  if (!order) return notFound()

  // we verify the user is logged is the users of the order
  const orderUserId =
    typeof order.user === 'string' ? order.user : order.user.id

  // the user is not logged in or not authorized
  if (orderUserId !== user?.id) {
    return redirect(`/sign-in?origin=thank-you?orderId=${order.id}`) // origin we use it to redirect back to this page once the user log in
  }

  const orderTotal = order.productsCart.reduce(
    (total, { product, quantity }) =>
      total + (product as Product).price * quantity,
    0
  )

  return (
    <main className='relative lg:min-h-full'>
      <div className='hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12'>
        <Image
          fill
          src='/thank-you-cbum.webp'
          className='h-full w-full object-cover object-center grayscale'
          alt='thank you for your order'
        />
      </div>

      <div>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-16 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-12 xl:gap-x-24'>
          <div className='lg:col-start-2'>
            <p className='text-sm font-medium tracking-widest'>
              ORDER SUCCESSFUL
            </p>
            <h1 className='mt-2 text-4xl font-bold tracking-tight sm:text-5xl'>
              Thanks for ordering
            </h1>

            {order._isPaid ? (
              <p className='mt-2 text-base text-muted-foreground'>
                Your order was processed and yout assets are avilable to
                download below. We&apos;ve sent your receipt and order details
                to your email (
                {typeof order.user !== 'string' ? (
                  <span className='font-medium text-primary'>
                    {order.user.email}
                  </span>
                ) : null}
                )
              </p>
            ) : (
              <p className='mt-2 text-base text-muted-foreground'>
                We appreciate your order, and we&apos;re currently processing
                it. So hang tight and we&apos;ll send you confirmation very
                soon!
              </p>
            )}

            <div className='mt-16 text-sm font-medium'>
              <div className='text-muted-foreground'>Order N°.</div>
              <div className='mt-2 text-primary'>{order.id}</div>

              <ul className='mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-muted-foreground'>
                {order.productsCart.map((productCart) => {
                  const categories = PRODUCT_CATEGORIES.flatMap((category) =>
                    category.featured.map((featuredItem) => ({
                      label: featuredItem.title,
                      value: featuredItem.value,
                    }))
                  )
                  const label = categories.find(
                    ({ value }) =>
                      value === (productCart.product as Product).category
                  )?.label

                  const productItemSelectedIndex = (
                    productCart.product as Product
                  ).product_items.findIndex(
                    (productItem) => productItem.id === productCart.colorId
                  )

                  const { image } = (productCart.product as Product)
                    .product_items[productItemSelectedIndex].images[0]

                  return (
                    <li key={productCart.id} className='flex space-x-6 py-6'>
                      <div className='relative min-h-44 min-w-28'>
                        {typeof image !== 'string' && image.url ? (
                          <Image
                            fill
                            src={image.url}
                            alt={`${(productCart.product as Product).name}`}
                            className='flex-none bg-gray-100 object-cover object-center'
                          />
                        ) : null}
                      </div>

                      <div className='flex-auto flex flex-col'>
                        <div className='space-y-1'>
                          <h3 className='tracking-widest  hover:text-gray-400 text-primary'>
                            <Link
                              href={`/product/${
                                (productCart.product as Product).id
                              }`}
                            >
                              {(productCart.product as Product).name}
                            </Link>
                          </h3>
                        </div>

                        <div className='mt-1 flex text-sm'>
                          <p className='text-muted-foreground'>{label}</p>
                        </div>

                        <div className='mt-1 flex text-sm'>
                          <p className='text-muted-foreground'>
                            {(productCart.product as Product).product_items[
                              productItemSelectedIndex
                            ].color_name.toUpperCase()}{' '}
                            / {productCart.size?.toUpperCase()}
                          </p>
                        </div>

                        <div className='mt-1 flex text-sm'>
                          <p className='text-muted-foreground'>
                            Quantity: {productCart.quantity}
                          </p>
                        </div>
                      </div>

                      <p className='mt-1 text-sm font-medium'>
                        {formatPrice(
                          (productCart.product as Product).price *
                            productCart.quantity
                        )}
                      </p>
                    </li>
                  )
                })}
              </ul>

              <div className='space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-muted-foreground'>
                <div className='flex justify-between'>
                  <p>Subtotal</p>
                  <p>{formatPrice(orderTotal)}</p>
                </div>

                <div className='flex justify-between'>
                  <p>Transaction Fee</p>
                  <p>{formatPrice(1)}</p>
                </div>

                <div className='flex items-center justify-between border-t border-gray-200 pt-6 text-primary'>
                  <p className='text-base'>Total</p>
                  <p className='text-base'>{formatPrice(orderTotal + 1)}</p>
                </div>
              </div>

              <PaymentStatus
                isPaid={order._isPaid}
                orderEmail={(order.user as unknown as User).email}
                orderId={order.id}
              />

              <div className='mt-12 border-t border-gray-200 py-6 text-right'>
                <Link
                  href='/products'
                  className='text-sm font-medium tracking-widest  hover:text-gray-400'
                >
                  CONTINUE SHOPPING &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Page
