'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ShoppingCart, Search } from 'lucide-react'
import { useCartStore, useUIStore } from '@/lib/stores'
import { cn } from '@/lib/utils'
import Button from '@/components/atoms/Button'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/products', label: 'Products' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
]

const Header = () => {
  const pathname = usePathname()
  const { totalItems, toggleCart } = useCartStore()
  const { isMobileMenuOpen, toggleMobileMenu, setMobileMenuOpen } = useUIStore()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname, setMobileMenuOpen])

  const isActive = (path: string) => pathname === path

  return (
    <header 
      className={cn(
        'sticky top-0 z-50 bg-transparent backdrop-blur-md transition-shadow duration-200',
        isScrolled && 'shadow-md'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-cotanak-green to-cotanak-light bg-clip-text text-transparent">
              Golden Drops
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  'font-medium transition-colors duration-200 relative py-2',
                  isActive(link.path)
                    ? 'text-cotanak-green'
                    : 'text-gray-700 hover:text-cotanak-green',
                  'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-cotanak-green after:scale-x-0 after:transition-transform after:duration-200',
                  'hover:after:scale-x-100',
                  isActive(link.path) && 'after:scale-x-100'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {/* Search Button */}
            <Button 
              variant="ghost"
              size="sm"
              className="hidden sm:flex"
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Cart Button */}
            <Button 
              variant="ghost"
              size="sm"
              onClick={toggleCart}
              className="relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-cotanak-green text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-scale-in">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="md:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300',
            isMobileMenuOpen ? 'max-h-64' : 'max-h-0'
          )}
        >
          <nav className="py-4 border-t border-gray-200">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  'block py-3 px-4 font-medium transition-all duration-200 rounded-lg',
                  isActive(link.path)
                    ? 'text-cotanak-green bg-green-50'
                    : 'text-gray-700 hover:text-cotanak-green hover:bg-gray-50'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header