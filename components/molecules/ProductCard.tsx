'use client'

import Image from 'next/image'
import { ShoppingCart, Eye } from 'lucide-react'
import { Product } from '@/lib/types'
import { useCartStore, useUIStore } from '@/lib/stores'
import { formatPrice } from '@/lib/utils'
import Button from '@/components/atoms/Button'

interface ProductCardProps {
  product: Product
  onViewDetails?: (product: Product) => void
}

const ProductCard = ({ product, onViewDetails }: ProductCardProps) => {
  const { addToCart } = useCartStore()
  const { showNotification } = useUIStore()

  const handleAddToCart = () => {
    addToCart(product)
    showNotification({
      message: `${product.name} added to cart`,
      type: 'success'
    })
  }

  return (
    <div className="group card hover:shadow-2xl transition-all duration-300">
      {/* Product Image */}
      <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gradient-to-br from-green-50 to-white">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl group-hover:animate-pulse">🌻</span>
          </div>
        )}
        
        {/* Quick Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleAddToCart}
            className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
          {onViewDetails && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onViewDetails(product)}
              className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75"
            >
              <Eye className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-2 left-2 bg-cotanak-green text-white px-2 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>
        
        {/* Category & Size */}
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">
            {product.category}
          </span>
          <span className="text-gray-500">{product.size}</span>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-bold text-cotanak-green">
            {formatPrice(product.price)}
          </span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard