'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, X } from 'lucide-react'
import { useProductsStore } from '@/lib/stores'
import ProductCard from '@/components/molecules/ProductCard'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import productsData from '@/data/products.json'
import { Product, SortOption } from '@/lib/types'

export default function ProductsPage() {
  const { 
    items, 
    filters, 
    setProducts, 
    setFilter, 
    resetFilters,
    getFilteredProducts 
  } = useProductsStore()
  
  const [searchInput, setSearchInput] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    setProducts(productsData.products)
  }, [setProducts])

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilter('search', searchInput)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchInput, setFilter])

  const filteredProducts = getFilteredProducts()
  
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(items.map(p => p.category))]
    return uniqueCategories
  }, [items])

  const handleViewDetails = (product: Product) => {
    // Implement product detail modal or navigation
    console.log('View details for:', product)
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="heading-xl mb-4">
            Our <span className="text-gradient">Products</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our premium collection of natural and healthy edible oils
          </p>
        </motion.div>

        {/* Search and Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-grow relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {(filters.category || filters.sortBy !== 'name') && (
                  <span className="ml-2 bg-cotanak-green text-white rounded-full px-2 text-xs">
                    Active
                  </span>
                )}
              </Button>
              
              {(filters.category || filters.search || filters.sortBy !== 'name') && (
                <Button
                  variant="ghost"
                  onClick={resetFilters}
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-4 p-4 bg-gray-50 rounded-lg overflow-hidden"
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cotanak-green"
                    value={filters.category}
                    onChange={(e) => setFilter('category', e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat.replace('-', ' ').charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cotanak-green"
                    value={filters.sortBy}
                    onChange={(e) => setFilter('sortBy', e.target.value as SortOption)}
                  >
                    <option value="name">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="price">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                    <option value="featured">Featured First</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Results Count */}
        <div className="mb-6 text-gray-600">
          Showing {filteredProducts.length} of {items.length} products
          {filters.search && (
            <span className="ml-2">
              for &quot;{filters.search}&quot;
            </span>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductCard 
                  product={product} 
                  onViewDetails={handleViewDetails}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button onClick={resetFilters}>
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}