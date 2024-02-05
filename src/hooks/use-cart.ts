// add items
// remove items
// clear the cart

import { SelectionProduct } from '@/app/product/[productId]/page'
import { toast } from 'sonner'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface ProductItem {
  selectionProduct: SelectionProduct
  quantity: number
}

type CartState = {
  items: ProductItem[]
  addItem: ({ selectionProduct, quantity }: ProductItem) => void
  removeItem: (selectionProduct: SelectionProduct) => void
  clearCart: () => void
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: ({ selectionProduct, quantity }) => set((state) => {
        const existingCartProductIndex = state.items.findIndex(item =>
          item.selectionProduct.product.id === selectionProduct.product.id &&
          item.selectionProduct.colorSelectedId === selectionProduct.colorSelectedId &&
          item.selectionProduct.sizeSelected === selectionProduct.sizeSelected
        )

        // intentamos aumentar la cantidad del producto si ya existe en el carrito
        if (existingCartProductIndex >= 0) {
          const productItemSelectedIndex =
            selectionProduct.product.product_items.findIndex(
              (productItem) => productItem.id === selectionProduct.colorSelectedId
            )

          if (
            selectionProduct.product.product_items[
              productItemSelectedIndex
            ].sizes_quantity[0][selectionProduct.sizeSelected] <
            state.items[existingCartProductIndex].quantity + 1
          ) {
            toast.error('There is no more units of this product')
            return state
          } else {
            toast.success('Quantity product updated successfully!')
            return {
              items: [
                ...state.items.slice(0, existingCartProductIndex),
                {
                  ...state.items[existingCartProductIndex],
                  quantity: state.items[existingCartProductIndex].quantity + quantity,
                },
                ...state.items.slice(existingCartProductIndex + 1),
              ],
            }
          }
        } else {
          toast.success('Product added to cart successfully!')
          return { items: [...state.items, { selectionProduct, quantity }] }
        }
      }),
      removeItem: (selectionProduct) => set((state) => ({
        items: state.items.filter(
          (item) =>
            item.selectionProduct.product.id !== selectionProduct.product.id ||
            item.selectionProduct.colorSelectedId !== selectionProduct.colorSelectedId ||
            item.selectionProduct.sizeSelected !== selectionProduct.sizeSelected
        )
      }
      )),
      clearCart: () => set({ items: [] }),
    }), {
    // configuration object
    name: 'cart-storage', // name of where we are gonna save it in local storage
    storage: createJSONStorage(() => localStorage)
  }
  )
)
