import { Product } from './product.types'

export interface CartItem extends Product {
  quantity: number
  addedAt: Date
}

export interface Cart {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  isOpen: boolean
}

export interface CartActions {
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  setCartOpen: (isOpen: boolean) => void
}

export type CartState = Cart & CartActions