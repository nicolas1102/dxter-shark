'use client'

import AddToCartButton from '@/components/AddToCartButton'
import ImageGallery from '@/components/ImageGallery'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '@/components/ProductReel'
import { fetchProduct } from '@/lib/fetch-product'
import { formatPrice } from '@/lib/utils'
import { Product } from '@/payload-types'
import { Check, Shield } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface PageProps {
  params: {
    productId: string
  }
}

interface ColorInterface {
  color_name: string
  color_hex: string
}

const BREADCRUMBS = [
  {
    id: 1,
    name: 'HOME',
    href: '/',
  },
  {
    id: 2,
    name: 'PRODUCTS',
    href: '/products',
  },
]

export default function Page({ params }: PageProps) {
  const { productId } = params

  const [product, setProduct] = useState<Product | null>(null)
  const [label, setLabel] = useState<string | undefined>('')
  const [validUrls, setValidUrls] = useState<string[] | null>(null)
  const [colors, setColors] = useState<ColorInterface[] | null>(null)
  const [activeIndexColor, setActiveIndexColor] = useState<number>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { product, label, validUrls, colors } = await fetchProduct(
          productId
        )
        setProduct(product)
        setLabel(label)
        setValidUrls(validUrls)
        setColors(colors)
      } catch (error) {
        console.error('Error fetching product data: ', error)
      }
    }
    fetchData()
  }, [productId])

  if (!product) {
    // TODO: Make an Skeleton
    return <p>LOADING...</p>
  }

  return (
    <MaxWidthWrapper>
      {/* BREADCRUMBS */}
      <ol className='flex items-center space-x-2 py-6'>
        {BREADCRUMBS.map((breadcrumb, i) => (
          <li key={breadcrumb.href}>
            <div className='flex items-center text-sm'>
              <Link
                href={breadcrumb.href}
                className='font-light text-xs text-muted-foreground hover:text-primary tracking-widest'
              >
                {breadcrumb.name}
              </Link>
              <svg
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
                className='ml-2 h-5 w-5 flex-shrink-0 text-muted-foreground'
              >
                <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
              </svg>
            </div>
          </li>
        ))}
        <li>
          <div className='flex items-center'>
            <p className='text-sm font-light hover:text-muted-foreground cursor-pointer tracking-widest'>
              {product.name}
            </p>
          </div>
        </li>
      </ol>

      <div className='max-w-2xl lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8'>
        {/* Product Images */}
        <div className='lg:row-span-2 lg:mt-0 lg:self-center'>
          {validUrls && <ImageGallery urls={validUrls} />}
        </div>

        {/* Product Details */}
        <div className='lg:max-w-lg lg:self-end'>
          {product && (
            <>
              <div className='mt-4'>
                <h1 className='text-xl font-extralight tracking-widest text-primary sm:text-2xl'>
                  {product.name}
                </h1>
              </div>

              <section className='mt-4'>
                <div className='flex items-center'>
                  <p className='font-medium text-xl text-muted-foreground '>
                    {formatPrice(product.price)}
                  </p>
                  <div className='ml-4 border-l text-muted-foreground border-gray-300 pl-4'>
                    {label}
                  </div>
                </div>

                {/* colors */}
                <div className='my-4'>
                  <p className='text-muted-foreground font-light'>Color: </p>
                  <div className='flex flex-row gap-2'>
                    {colors?.map((color) => (
                      <span
                        key={color.color_hex}
                        className={`h-10 w-10 bg-[${color.color_hex}] border active:border-foreground`}
                      />
                    ))}
                  </div>
                </div>

                {/* sizes */}
                <div className='my-3 '>
                  <p className='text-muted-foreground font-light'>Size: </p>
                  <div className='flex flex-row gap-2'>
                    {colors?.map((color) => (
                      <span
                        key={color.color_hex}
                        className='h-10 p-3 flex items-center justify-center border active:border-foreground'
                      >
                        <p className='text-center text-muted-foreground font-light '>
                          Small
                        </p>
                      </span>
                    ))}
                  </div>
                </div>

                <div className='mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start'>
                  <div className='gap-5'>
                    <div className='mt-6 flex items-center'>
                      <Check
                        aria-hidden='true'
                        className='h-5 w-5 flex-shrink-0 text-green-500'
                      />
                      <p className='ml-2 text-sm text-muted-foreground'>
                        Eligible for instan delivery
                      </p>
                    </div>
                    <div className='group inline-flex text-sm text-medium'>
                      <Shield
                        aria-hidden='true'
                        className='mr-2 h-5 w-5 flex-shrink-0 text-gray-400'
                      />
                      <span className='text-muted-foreground hover:text-gray-700'>
                        30 Day Return Guarantee
                      </span>
                    </div>
                    <div className='my-5'>
                      <AddToCartButton product={product} />
                    </div>
                  </div>
                </div>

                <div className='gap-32'>
                  <div className='mt-4'>
                    <p className='text-base font-light'>
                      <span className='font-medium'>MATERIAL: </span>
                      {product.material}
                    </p>
                  </div>

                  <div className='mt-4 '>
                    <p className='text-base font-light'>
                      <span className='font-medium'>FIT: </span>
                      {product.fit}
                    </p>
                  </div>

                  <div className='mt-4 '>
                    <p className='text-base font-light'>
                      <span className='font-medium'>DESIGN: </span>
                      {product.description}
                    </p>
                  </div>

                  <div className='mt-4 '>
                    <p className='text-base font-light'>
                      <span className='font-medium'>MODEL: </span>
                      {product.model}
                    </p>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </div>

      {/* Similar components */}
      <ProductReel
        href='/products'
        query={{ category: product.category, limit: 4 }}
        title={`Similar ${label}`}
        subtitle={`Browse similar high-quality ${label} just like '${product.name}'`}
      />
    </MaxWidthWrapper>
  )
}
