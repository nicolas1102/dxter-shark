'use client'

import { ProductReelProps } from '@/types'
import { trpc } from '@/trpc/client'
import { Product } from '@/payload-types'
import Link from 'next/link'
import ProductListing from './ProductListing'
import { ArrowRight } from 'lucide-react'

const FALLBACK_LIMIT = 4

const ProductReel = (props: ProductReelProps) => {
  const { title, subtitle, href, query } = props
  const { data: queryResults, isLoading } =
    // using out backed function
    trpc.getInfiniteProducts.useInfiniteQuery(
      {
        limit: query.limit ?? FALLBACK_LIMIT,
        query,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextPage, // fetching the next page
      }
    )

  const products = queryResults?.pages.flatMap((page) => page.items) // flat and map at the same function

  let map: (Product | null)[] = []
  if (products && products.length) {
    map = products // products.length -> at least one product
  } else if (isLoading) {
    map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null) // se a skeleton, tantos como los que configuramos para cada paguna en la constante
  }

  return (
    <section className='p-y-12'>
      <div className='md:flex md:items-center md:justify-between mb-4'>
        <div className='max-w-2xl px-4 lg:max-w-4xl lg:px-0'>
          {title ? (
            <h1 className='text-lg font-light tracking-widest text-primary sm:text-2xl'>
              {title.toUpperCase()}
            </h1>
          ) : null}
          {/* TODO: Review this */}
          {subtitle ? (
            <p className='mt-2 text-sm text-primary-foreground'>{subtitle}</p>
          ) : null}
        </div>
        {href ? (
          <Link
            href={href}
            className='text-sm font-medium text-primary md:block bg-background hover:bg-accent hover:text-accent-foreground p-1.5 rounded-md flex items-center flex-row '
          >
            Shop the collection
            <span className='ml-2' aria-hidden='true'>&rarr;</span>
          </Link>
        ) : null}
      </div>

      <div className='relative'>
        <div className='mt-6 flex items-center w-full'>
          <div className='w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8'>
            {map.map((product, i) => (
              <ProductListing
                key={`product-${i}`}
                product={product}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductReel
