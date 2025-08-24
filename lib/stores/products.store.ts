import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Product, ProductFilters, Category, SortOption } from '@/lib/types'

interface ProductsState {
  items: Product[]
  categories: Category[]
  loading: boolean
  error: string | null
  filters: ProductFilters
  setProducts: (products: Product[]) => void
  setCategories: (categories: Category[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setFilter: <K extends keyof ProductFilters>(filterType: K, value: ProductFilters[K]) => void
  resetFilters: () => void
  getFilteredProducts: () => Product[]
}

const initialFilters: ProductFilters = {
  category: '',
  search: '',
  sortBy: 'name' as SortOption
}

const useProductsStore = create<ProductsState>()(
  devtools(
    (set, get) => ({
      items: [],
      categories: [],
      loading: false,
      error: null,
      filters: initialFilters,

      setProducts: (products: Product[]) => {
        set({ items: products })
      },

      setCategories: (categories: Category[]) => {
        set({ categories })
      },

      setLoading: (loading: boolean) => {
        set({ loading })
      },

      setError: (error: string | null) => {
        set({ error })
      },

      setFilter: <K extends keyof ProductFilters>(filterType: K, value: ProductFilters[K]) => {
        set((state) => ({
          filters: {
            ...state.filters,
            [filterType]: value
          }
        }))
      },

      resetFilters: () => {
        set({ filters: initialFilters })
      },

      getFilteredProducts: () => {
        const { items, filters } = get()
        let filtered = [...items]

        // Filter by search term
        if (filters.search) {
          const searchTerm = filters.search.toLowerCase()
          filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
          )
        }

        // Filter by category
        if (filters.category) {
          filtered = filtered.filter(product => product.category === filters.category)
        }

        // Filter by price range
        if (filters.priceRange) {
          filtered = filtered.filter(product => 
            product.price >= filters.priceRange!.min &&
            product.price <= filters.priceRange!.max
          )
        }

        // Sort products
        switch (filters.sortBy) {
          case 'name':
            filtered.sort((a, b) => a.name.localeCompare(b.name))
            break
          case 'name-desc':
            filtered.sort((a, b) => b.name.localeCompare(a.name))
            break
          case 'price':
            filtered.sort((a, b) => a.price - b.price)
            break
          case 'price-desc':
            filtered.sort((a, b) => b.price - a.price)
            break
          case 'featured':
            filtered.sort((a, b) => {
              if (a.featured === b.featured) return 0
              return a.featured ? -1 : 1
            })
            break
        }

        return filtered
      }
    })
  )
)

export default useProductsStore