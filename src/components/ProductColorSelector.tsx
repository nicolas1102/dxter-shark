import { SelectionProduct } from '@/app/product/[productId]/page'
import { cn } from '@/lib/utils'
import { Product } from '@/payload-types'
import Image from 'next/image'

interface Color {
  id?: string;
  color_name?: string
  color_hex?: string
  sizes_quantity?: {
    [key: string]: string | number | undefined
    xsmall: number
    small: number
    medium: number
    large: number
    xlarge: number
    xxlarge: number
    id?: string
  }[]
}

const ProductColorSelector = ({
  product,
  selectionProduct,
  changeSelectedColor,
}: {
  product: Product
  selectionProduct: SelectionProduct | undefined
  changeSelectedColor: (colorId: string) => void
}) => {
  const colors = product.product_items
    .map(({ id, color_name, color_hex, sizes_quantity }) => ({
      id,
      color_name,
      color_hex,
      sizes_quantity,
    }))
    .flat()

  const handleColorChange = (color: Color) => {
    changeSelectedColor(color.id)
  }

  const colorHasUnits = (color: Color) => {
    return color.sizes_quantity?.every((size) => {
      for (const key in size) {
        if (key !== 'id' && size[key] !== 0) {
          return false
        }
      }
      return true
    })
  }

  return (
    <div className='my-4'>
      <p className='text-muted-foreground font-light'>
        Color:{' '}
        {product.product_items.map((product_item) => {
          if (product_item.id === selectionProduct?.colorSelectedId)
            return product_item.color_name
        })}
      </p>
      <div className='flex flex-row gap-2'>
        {colors?.map((color) => (
          <div
            key={color.id}
            className={cn(
              'border border-transparent hover:border-muted-foreground',
              {
                'border-primary':
                  color.id === selectionProduct?.colorSelectedId,
              }
            )}
            onClick={() => handleColorChange(color)}
          >
            <div
              className='h-10 w-10 m-0.5'
              style={{
                backgroundColor: color.color_hex,
              }}
            >
              {colorHasUnits(color) ? (
                <Image
                  src='/product-page/sold-out-x.png'
                  height={40}
                  width={40}
                  alt='solt-out'
                  className={cn('z-10 opacity-60')}
                />
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductColorSelector
