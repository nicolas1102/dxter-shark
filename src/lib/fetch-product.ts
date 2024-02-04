'use server'

import { getPayloadClient } from '@/get-payload'
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

  return product
}