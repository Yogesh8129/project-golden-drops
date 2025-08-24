import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { CartState, CartItem, Product } from '@/lib/types'

const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        totalItems: 0,
        totalPrice: 0,
        isOpen: false,

        addToCart: (product: Product) => {
          set((state) => {
            const existingItem = state.items.find(item => item.id === product.id)
            
            let newItems: CartItem[]
            if (existingItem) {
              newItems = state.items.map(item =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            } else {
              const newItem: CartItem = {
                ...product,
                quantity: 1,
                addedAt: new Date()
              }
              newItems = [...state.items, newItem]
            }

            const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
            const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

            return {
              items: newItems,
              totalItems,
              totalPrice
            }
          })
        },

        removeFromCart: (productId: string) => {
          set((state) => {
            const newItems = state.items.filter(item => item.id !== productId)
            const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
            const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

            return {
              items: newItems,
              totalItems,
              totalPrice
            }
          })
        },

        updateQuantity: (productId: string, quantity: number) => {
          if (quantity <= 0) {
            get().removeFromCart(productId)
            return
          }

          set((state) => {
            const newItems = state.items.map(item =>
              item.id === productId
                ? { ...item, quantity }
                : item
            )
            const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
            const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

            return {
              items: newItems,
              totalItems,
              totalPrice
            }
          })
        },

        clearCart: () => {
          set({
            items: [],
            totalItems: 0,
            totalPrice: 0
          })
        },

        toggleCart: () => {
          set((state) => ({ isOpen: !state.isOpen }))
        },

        setCartOpen: (isOpen: boolean) => {
          set({ isOpen })
        }
      }),
      {
        name: 'cart-storage',
        partialize: (state) => ({
          items: state.items,
          totalItems: state.totalItems,
          totalPrice: state.totalPrice
        })
      }
    )
  )
)

export default useCartStore