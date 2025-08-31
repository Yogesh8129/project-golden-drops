"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import { useCartStore, useUIStore } from "@/lib/stores";
import { cn } from "@/lib/utils";
import Button from "@/components/atoms/Button";
import Logo from "@/components/atoms/Logo";
import { motion } from "framer-motion";
import { useScrollDirection } from "@/lib/hooks/useScrollDirection";
import { HEADER_CONFIG } from "@/lib/utils/constants";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/products", label: "Products" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

const Header = () => {
  const pathname = usePathname();
  const { totalItems, toggleCart } = useCartStore();
  const { isMobileMenuOpen, toggleMobileMenu, setMobileMenuOpen } = useUIStore();
  
  // Use the scroll hook for all scroll-related state
  const { isScrolled, isAtTop } = useScrollDirection();
  
  // Determine logo size based on scroll state
  const logoSize = useMemo(() => {
    if (typeof window !== 'undefined' && window.innerWidth < HEADER_CONFIG.BREAKPOINTS.mobile) {
      return HEADER_CONFIG.LOGO_SIZES.mobile;
    }
    return isScrolled ? HEADER_CONFIG.LOGO_SIZES.collapsed : HEADER_CONFIG.LOGO_SIZES.expanded;
  }, [isScrolled]);
  
  // Calculate dynamic header height
  const headerHeight = useMemo(() => {
    const baseHeight = isScrolled 
      ? HEADER_CONFIG.COLLAPSED_HEIGHT 
      : HEADER_CONFIG.EXPANDED_HEIGHT;
    return `${baseHeight}px`;
  }, [isScrolled]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, setMobileMenuOpen]);

  const isActive = (path: string) => pathname === path;

  return (
    <motion.header
      initial={{
        y: -80,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{ duration: 0.5 }}
      style={{
        height: headerHeight,
        transition: `all ${HEADER_CONFIG.TRANSITION_DURATION}ms ease-in-out`
      }}
      className={cn(
        "sticky z-50 border border-transparent m-auto top-0 bg-white rounded-full backdrop-blur-md w-[80%] flex items-center",
        isScrolled && "shadow-md border-yellow-500 top-4",
        !isAtTop && "bg-white/95"
      )}
    >
      <div className="flex items-center justify-between w-full h-full px-6">
        {/* Logo with adaptive behavior */}
        <Logo 
          size={logoSize}
          variant="adaptive"
          isScrolled={isScrolled}
          priority
          animated
          className="transition-all duration-300"
        />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                "font-medium transition-colors duration-200 relative py-2",
                isActive(link.path) ? "text-cotanak-green" : "text-gray-700 hover:text-cotanak-green",
                "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-cotanak-green after:scale-x-0 after:transition-transform after:duration-200",
                "hover:after:scale-x-100",
                isActive(link.path) && "after:scale-x-100"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Search Button */}
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Search className="w-5 h-5" />
          </Button>

          {/* Cart Button */}
          <Button variant="ghost" size="sm" onClick={toggleCart} className="relative">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-cotanak-green text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-scale-in">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Button>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" onClick={toggleMobileMenu} className="md:hidden">
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn("md:hidden overflow-hidden transition-all duration-300", isMobileMenuOpen ? "max-h-64" : "max-h-0")}>
        <nav className="py-4 border-t border-gray-200">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                "block py-3 px-4 font-medium transition-all duration-200 rounded-lg",
                isActive(link.path) ? "text-cotanak-green bg-green-50" : "text-gray-700 hover:text-cotanak-green hover:bg-gray-50"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;