'use client'

import { Product } from '@/payload-types'
import { useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'
import Link from 'next/link'
import { cn, formatPrice } from '@/lib/utils'
import { PRODUCT_CATEGORIES } from '@/config/const'
import Image from 'next/image'

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

  // show human readable product categories. Primero sacamos las categorias
  const categories = PRODUCT_CATEGORIES.flatMap((category) =>
    category.featured.map((featuredItem) => ({
      label: featuredItem.title,
      value: featuredItem.value,
    }))
  )

  const label = categories.find(
    ({ value }) => value === product.category
  )?.label

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
          <Image 
            src='/drive/media/475 - super villian red - 1.webp'
            width={300}
            height={500}
            alt='me vale monda'
          />
          <h3 className='mt-4 text-sm text-primary tracking-widest'>
            {product.name.toUpperCase()}
          </h3>
          {/* <p className='mt-1 text-sm text-gray-500'>{label}</p> */}
          <p className='mt-1 font-medium text-sm text-gray-500'>
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
      <div className='relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl'>
        <Skeleton className='h-full w-full' />
      </div>
      <Skeleton className='mt-4 w-2/3 h-4 rounded-lg' />
      <Skeleton className='mt-2 w-16 h-4 rounded-lg' />
      <Skeleton className='mt-2 w-12 h-4 rounded-lg' />
    </div>
  )
}
export default ProductListing
