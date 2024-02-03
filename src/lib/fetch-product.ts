'use server'

import { getPayloadClient } from '@/get-payload'
import { PRODUCT_CATEGORIES } from '@/config/const'
import { notFound } from 'next/navigation'

export const fetchProduct = async (productId: string) => {
  const payload = await getPayloadClient()
  const { docs: products } = await payload.find({
    collection: 'products',
    limit: 1,
    where: {
      id: {
        equals: productId,
      },
      approvedForSale: {
        equals: 'approved',
      },
    },
  })

  const [product] = products

  if (!product) return notFound()

  const categories = PRODUCT_CATEGORIES.flatMap((category) =>
    category.featured.map((featuredItem) => ({
      label: featuredItem.title,
      value: featuredItem.value,
    }))
  )

  const label = categories.find(
    ({ value }) => value === product.category
  )?.label

  const validUrls = product.product_item
    .map(({ images }) =>
      images.map(({ image }) => (typeof image === 'string' ? image : image.url))
    )
    .flat()
    // we filter the undefined or null values
    .filter(Boolean) as string[]


  const colors = product.product_item
    .map(({ color_name, color_hex, s_quantity, m_quantity, l_quantity, xl_quantity, xxl_quantity }) => ({ color_name, color_hex })
    )
    .flat()


  return {
    product,
    label,
    validUrls,
    colors,
  }
}