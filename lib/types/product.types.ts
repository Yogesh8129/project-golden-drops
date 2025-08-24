export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: ProductCategory
  size: string
  image?: string
  inStock: boolean
  featured?: boolean
  nutritionalInfo?: NutritionalInfo
  benefits?: string[]
}

export interface NutritionalInfo {
  calories: number
  fat: number
  saturatedFat: number
  protein: number
  carbohydrates: number
  fiber: number
  vitamins?: Record<string, string>
}

export type ProductCategory = 
  | 'sunflower-oil'
  | 'safflower-oil'
  | 'hazelnut-oil'
  | 'walnut-oil'
  | 'specialty-oils'

export interface ProductFilters {
  category: string
  search: string
  sortBy: SortOption
  priceRange?: {
    min: number
    max: number
  }
}

export type SortOption = 
  | 'name'
  | 'name-desc'
  | 'price'
  | 'price-desc'
  | 'featured'

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
}