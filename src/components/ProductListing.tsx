'use client'

import { Product } from '@/payload-types'
import { useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'
import Link from 'next/link'
import { cn, formatPrice } from '@/lib/utils'
import ImageSlider from './ImageSlider'

interface ProductListingProps {
  product: Product | null
  index: number
}

const ProductListing = ({ product, index }: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState<Boolean>(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, index * 75)

    return () => clearTimeout(timer)
  }, [index])

  if (!product || !isVisible) return <ProductPlaceholder />

  const validUrls = product.product_items
    .map(({ images }) =>
      images.map(({ image }) => (typeof image === 'string' ? image : image.url))
    )
    .flat()
    // we filter the undefined or null values
    .filter(Boolean) as string[]

  if (isVisible && product) {
    return (
      <Link
        className={cn('invisible h-full w-full cursor-pointer group/main', {
          // solo aplica si isVisible es true
          'visible animate-in fade-in-5': isVisible,
        })}
        href={`/product/${product.id}`}
      >
        <div className='flex flex-col w-full'>
          <ImageSlider urls={validUrls} />
          <h3 className='mt-4 text-sm text-primary tracking-widest text-center'>
            {product.name.toUpperCase()}
          </h3>
          <p className='mt-1 font-sm text-gray-500 text-center'>
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    )
  }
}

const ProductPlaceholder = () => {
  return (
    <div className='flex flex-col w-full'>
      <div className='relative bg-zinc-100 h-96 w-full overflow-hidden '>
        <Skeleton className='h-full w-full' />
      </div>
      <Skeleton className='mt-4 w-2/3 h-4' />
      <Skeleton className='mt-2 w-16 h-4' />
      <Skeleton className='mt-2 w-12 h-4 ' />
    </div>
  )
}
export default ProductListing
