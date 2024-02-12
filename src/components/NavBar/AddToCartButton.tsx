'use client'

import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { useCart } from '@/hooks/use-cart'
import { SelectionProduct } from '@/app/product/[productId]/page'

const AddToCartButton = ({
  selectionProduct,
  updateProduct,
}: {
  selectionProduct: SelectionProduct
  updateProduct: (quantity: number) => void
}) => {
  const { addItem } = useCart()
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [isSuccess])

  const sizeHasUnits = () => {
    return selectionProduct.product.product_items.some((productItem) => {
      if (productItem.id === selectionProduct?.colorSelectedId) {
        if (productItem.sizes_quantity[0][selectionProduct.sizeSelected] > 0) {
          return true
        } else {
          return false
        }
      }
    })
  }

  return sizeHasUnits() ? (
    <Button
      onClick={() => {
          setIsSuccess(true)
          addItem({ selectionProduct, quantity: 1 })
      }}
      size='lg'
      className={cn(
        {
          'bg-slate-500': isSuccess,
        },
        'w-full tracking-widest'
      )}
      variant={sizeHasUnits() ? 'default' : 'outline'}
    >
      {isSuccess ? 'LOADING...' : 'ADD TO CART'}
    </Button>
  ) : (
    <Button
      size='lg'
      className='w-full tracking-widest cursor-not-allowed'
      variant={sizeHasUnits() ? 'default' : 'outline'}
    >
      SOLD OUT
    </Button>
  )
}

export default AddToCartButton
