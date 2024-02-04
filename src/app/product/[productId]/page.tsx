'use client'

import AddToCartButton from '@/components/AddToCartButton'
import ImageGallery from '@/components/ImageGallery'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '@/components/ProductReel'
import { fetchProduct } from '@/lib/fetch-product'
import { cn, formatPrice } from '@/lib/utils'
import { Product } from '@/payload-types'
import { Check, Shield } from 'lucide-react'
import { PRODUCT_CATEGORIES } from '@/config/const'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import InfoProductItem from '@/components/InfoProductItem'
import SizesSelectorProduct from '@/components/ProductSizesSelector'
import ProductColorSelector from '@/components/ProductColorSelector'

interface PageProps {
  params: {
    productId: string
  }
}

export interface SelectionProduct {
  productId: string | null | undefined
  colorSelectedId: string | null | undefined
  sizeSelected: string | null | undefined
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
  const [selectionProduct, setSelectionProduct] = useState<
    SelectionProduct | undefined
  >()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await fetchProduct(productId)
        setProduct(product)
        setSelectionProduct({
          productId: product?.id,
          colorSelectedId: product.product_items[0].id,
          sizeSelected: 'xsmall',
        })
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

  const categories = PRODUCT_CATEGORIES.flatMap((category) =>
    category.featured.map((featuredItem) => ({
      label: featuredItem.title,
      value: featuredItem.value,
    }))
  )

  const label = categories.find(
    ({ value }) => value === product.category
  )?.label

  const validUrls = product.product_items
    .map(({ images }) =>
      images.map(({ image }) => (typeof image === 'string' ? image : image.url))
    )
    .flat()
    // we filter the undefined or null values
    .filter(Boolean) as string[]

  const changeSelectedColor = (colorId: string | null | undefined) => {
    if (colorId) {
      setSelectionProduct((prevState) => ({
        productId: prevState?.productId,
        colorSelectedId: colorId,
        sizeSelected: prevState?.sizeSelected,
      }))
    }
  }

  const changeSelectedSize = (sizeSelected: string | null | undefined) => {
    if (sizeSelected) {
      setSelectionProduct((prevState) => ({
        productId: prevState?.productId,
        colorSelectedId: prevState?.colorSelectedId,
        sizeSelected: sizeSelected,
      }))
    }
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

      <div className='max-w-2xl lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-16 mb-16'>
        {/* Product Images */}
        <div className='lg:row-span-2 lg:mt-0 lg:self-center'>
          {validUrls && <ImageGallery urls={validUrls} />}
        </div>

        {/* Product Details */}
        {product && (
          <div className='lg:max-w-lg lg:self-end'>
            <div className='mt-4'>
              <h1 className='text-xl font-light tracking-widest text-primary sm:text-2xl'>
                {product.name}
                <span className='ml-4 border-l text-muted-foreground border-gray-300 pl-4 text-lg'>
                  {label}
                </span>
              </h1>
            </div>

            <section className='mt-4'>
              <div className='flex items-center'>
                <p className='font-medium text-xl text-muted-foreground '>
                  {formatPrice(product.price)}
                </p>
              </div>

              {/* colors */}
              <ProductColorSelector
                product={product}
                selectionProduct={selectionProduct}
                changeSelectedColor={changeSelectedColor}
              />

              {/* sizes */}
              <SizesSelectorProduct
                product={product}
                selectionProduct={selectionProduct}
                changeSelectedSize={changeSelectedSize}
              />

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
                    <AddToCartButton />
                  </div>
                </div>
              </div>

              <ul className='gap-y-14'>
                {product.material && (
                  <InfoProductItem
                    props={{ title: 'MATERIAL', data: product.material }}
                  />
                )}
                {product.fit && (
                  <InfoProductItem
                    props={{ title: 'FIT', data: product.fit }}
                  />
                )}
                {product.description && (
                  <InfoProductItem
                    props={{ title: 'DESIGN', data: product.description }}
                  />
                )}
                {product.model && (
                  <InfoProductItem
                    props={{ title: 'MODEL', data: product.model }}
                  />
                )}
                <li className='mt-10 w-auto'>
                  <Image
                    src='/product-page/size chart (inches).avif'
                    alt='size chart'
                    width={500}
                    height={176}
                  />
                </li>
              </ul>
            </section>
          </div>
        )}
      </div>

      {/* Similar components */}
      <ProductReel
        href='/products'
        query={{ category: product.category, limit: 4 }}
        title={`MORE ${label} YOU MAY ALSO LIKE`}
        subtitle={`Browse similar high-quality ${label} just like '${product.name}'`}
      />
    </MaxWidthWrapper>
  )
}
