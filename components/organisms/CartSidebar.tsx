'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { useCartStore, useUIStore } from '@/lib/stores'
import { cn, formatPrice } from '@/lib/utils'
import Button from '@/components/atoms/Button'

const CartSidebar = () => {
  const { 
    items, 
    totalPrice, 
    isOpen, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    setCartOpen 
  } = useCartStore()
  
  const { showNotification } = useUIStore()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleRemoveItem = (itemId: string, itemName: string) => {
    removeFromCart(itemId)
    showNotification({
      message: `${itemName} removed from cart`,
      type: 'info'
    })
  }

  const handleCheckout = () => {
    showNotification({
      message: 'Proceeding to checkout...',
      type: 'success'
    })
    // Implement checkout logic here
  }

  const handleClearCart = () => {
    clearCart()
    showNotification({
      message: 'Cart cleared',
      type: 'info'
    })
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          'fixed inset-0 bg-black/50 z-40 transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setCartOpen(false)}
      />
      
      {/* Sidebar */}
      <div 
        className={cn(
          'fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-cotanak-green" />
              <h2 className="text-xl font-semibold">Shopping Cart</h2>
              <span className="text-sm text-gray-500">({items.length})</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCartOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-grow overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-gray-500 mb-6">Your cart is empty</p>
                <Button
                  onClick={() => setCartOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {/* Product Image */}
                    <div className="relative w-20 h-20 flex-shrink-0 bg-white rounded-lg overflow-hidden">
                      {item.image ? (
                        <Image 
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
                          <span className="text-2xl">🌻</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.size}</p>
                      
                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-medium w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Price */}
                        <span className="font-semibold text-cotanak-green">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.id, item.name)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-cotanak-green">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              
              {/* Actions */}
              <div className="space-y-2">
                <Button
                  onClick={handleCheckout}
                  fullWidth
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
                <Button
                  onClick={handleClearCart}
                  variant="secondary"
                  fullWidth
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default CartSidebar