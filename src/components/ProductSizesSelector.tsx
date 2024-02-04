import { SelectionProduct } from '@/app/product/[productId]/page'
import { cn } from '@/lib/utils'
import { Product } from '@/payload-types'
import Image from 'next/image'

const SizesSelectorProduct = ({
  product,
  selectionProduct,
  changeSelectedSize,
}: {
  product: Product
  selectionProduct: SelectionProduct | undefined
  changeSelectedSize: (sizeSelected: string) => void
}) => {
  const handleSizeChange = (sizeSelected: string) => {
    changeSelectedSize(sizeSelected)
  }

  const sizeHasUnits = (sizeSelected: string) => {
    return product.product_items.some((productItem) => {
      if (productItem.id === selectionProduct?.colorSelectedId) {
        if (productItem.sizes_quantity[0][sizeSelected] > 0) {
          return true
        } else {
          return false
        }
      }
    })
  }

  return (
    <div className='my-4'>
      <p className='text-muted-foreground font-light'>Size: </p>
      <ul className='flex gap-x-5 gap-y-3 flex-wrap'>
        {product.product_items.map((product_item) => {
          if (product_item.id === selectionProduct?.colorSelectedId) {
            return Object.keys(product_item.sizes_quantity[0]).map((key) => {
              if (key !== 'id') {
                return (
                  <li
                    className={cn(
                      'border hover:border-muted-foreground flex items-center cursor-pointer',
                      {
                        'border-primary':
                          key === selectionProduct?.sizeSelected,
                      }
                    )}
                    key={key}
                  >
                    <div className='h-10 p-2 m-0.5'>
                      <p
                        className={cn('font-extralight text-muted-foreground tracking-widest', {
                          'font-light text-primary':
                            key === selectionProduct?.sizeSelected,
                          'line-through': sizeHasUnits(key),
                        })}
                        onClick={() => handleSizeChange(key)}
                      >
                        {key.toUpperCase()}
                      </p>
                    </div>
                  </li>
                )
              }
            })
          }
        })}
      </ul>
    </div>
  )
}

export default SizesSelectorProduct
