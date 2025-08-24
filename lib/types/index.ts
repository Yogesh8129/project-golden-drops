export * from './product.types'
export * from './cart.types'
export * from './ui.types'

export interface Company {
  name: string
  tagline: string
  description: string
  mission: string
  vision: string
  values: CompanyValue[]
  certifications: Certification[]
  contact: ContactInfo
  socialMedia: SocialMedia
}

export interface CompanyValue {
  title: string
  description: string
  icon?: string
}

export interface Certification {
  name: string
  issuer: string
  year: number
  image?: string
}

export interface ContactInfo {
  email: string
  phone: string
  address: Address
  hours: string
}

export interface Address {
  street: string
  city: string
  state: string
  zip: string
  country: string
}

export interface SocialMedia {
  facebook?: string
  instagram?: string
  twitter?: string
  linkedin?: string
  youtube?: string
}