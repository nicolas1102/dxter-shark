import { SelectionProduct } from '@/app/product/[productId]/page'
import { PRODUCT_CATEGORIES } from '@/config/const'
import { useCart } from '@/hooks/use-cart'
import { formatPrice } from '@/lib/utils'
import { ImageIcon, X } from 'lucide-react'
import Image from 'next/image'
import { Button } from './ui/button'
import { toast } from 'sonner'

const CartItem = ({
  selectionProduct,
  quantity,
}: {
  selectionProduct: SelectionProduct
  quantity: number
}) => {
  const productItemSelectedIndex =
    selectionProduct.product.product_items.findIndex(
      (productItem) => productItem.id === selectionProduct.colorSelectedId
    )

  const { image } =
    selectionProduct.product.product_items[productItemSelectedIndex].images[0]

  const categories = PRODUCT_CATEGORIES.flatMap((category) =>
    category.featured.map((featuredItem) => ({
      label: featuredItem.title,
      value: featuredItem.value,
    }))
  )

  const label = categories.find(
    ({ value }) => value === selectionProduct.product.category
  )?.label

  const { addItem, removeItem } = useCart()

  return (
    <div className='space y-3 py-4'>
      <div className='flex items-center gap-4'>
        <div className='relative min-h-44 min-w-28 overflow-hidden'>
          {/* we got an image of Media type */}
          {typeof image !== 'string' && image.url ? (
            <Image
              src={image.url}
              alt={selectionProduct.product.name}
              fill
              className='absolute object-cover'
            />
          ) : (
            <div className='flex h-full items-center justify-center bg-secondary'>
              <ImageIcon
                aria-hidden='true'
                className='h-4 w-4 text-muted-foreground'
              />
            </div>
          )}
        </div>
        <div className='flex flex-col self-start w-full'>
          <span className='line-clamp-1 tracking-widest'>
            {selectionProduct.product.name}
          </span>
          <span className='line-clamp-1 text-sm capitalize text-muted-foreground'>
            {label}
          </span>
          <span className='line-clamp-1 text-sm capitalize text-muted-foreground'>
            {selectionProduct.product.product_items[
              productItemSelectedIndex
            ].color_name.toUpperCase()}{' '}
            / {selectionProduct.sizeSelected?.toUpperCase()}
          </span>
          <span className='line-clamp-1 text-sm'>
            {formatPrice(selectionProduct.product.price)}
          </span>
          <div className='mt-4 text-xs text-muted-foreground flex justify-between'>
            <div className='flex flex-row h-12 justify-center items-center'>
              <button
                onClick={() => {
                  
                  if (quantity > 1) {
                    addItem({ selectionProduct, quantity: -1 })
                  } else {
                    removeItem(selectionProduct)
                  }
                  // console.log(quantity);
                }}
                className='h-12 w-10 border flex items-center justify-center '
              >
                <p className=' text-center text-xl'>-</p>
              </button>
              <div className='h-12 w-14 border flex items-center justify-center'>
                <p className=' text-center text-base'>{quantity}</p>
              </div>
              <button
                onClick={() => {
                  // verificamos que haya la cantidad de producto deseada
                  if (
                    selectionProduct.product.product_items[
                      productItemSelectedIndex
                    ].sizes_quantity[0][selectionProduct.sizeSelected] <
                    quantity + 1
                  ) {
                    toast.error('There is no requested quantity of product')
                  } else {
                    addItem({ selectionProduct, quantity: 1 })
                  }
                }}
                className='h-12 w-10 border flex items-center justify-center '
              >
                <p className=' text-center text-xl'>+</p>
              </button>
            </div>
            <Button
              variant='link'
              onClick={() => removeItem(selectionProduct)}
            >
              <p className='tracking-widest font-light text-muted-foreground'>
                REMOVE
              </p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
