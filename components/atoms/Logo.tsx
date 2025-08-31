'use client'

import { forwardRef, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { LOGO_CONFIG, HEADER_CONFIG } from '@/lib/utils/constants'

const logoVariants = cva(
  'inline-flex items-center transition-all group',
  {
    variants: {
      size: {
        sm: 'h-10 w-auto',
        md: 'h-14 w-auto',  // Increased from h-12 for better icon visibility
        lg: 'h-16 w-auto',
        xl: 'h-20 w-auto'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
)

export interface LogoProps extends VariantProps<typeof logoVariants> {
  href?: string
  className?: string
  imageClassName?: string
  showText?: boolean
  priority?: boolean
  variant?: 'full' | 'icon' | 'adaptive'
  isScrolled?: boolean
  animated?: boolean
}

const Logo = forwardRef<HTMLAnchorElement, LogoProps>(
  ({ 
    href = '/', 
    className, 
    imageClassName, 
    size, 
    showText = false, 
    priority = false,
    variant = 'full',
    isScrolled = false,
    animated = true
  }, ref) => {
    
    // Determine which logo to show
    const shouldShowIcon = useMemo(() => {
      if (variant === 'icon') return true
      if (variant === 'full') return false
      if (variant === 'adaptive') return isScrolled
      return false
    }, [variant, isScrolled])
    
    // Calculate dimensions based on size and logo type
    const dimensions = useMemo(() => {
      const sizeMap = {
        sm: 40,
        md: 56,   // Increased from 48 for better icon visibility
        lg: 64,
        xl: 80
      }
      
      const height = sizeMap[size || 'md']
      const aspectRatio = shouldShowIcon 
        ? LOGO_CONFIG.ASPECT_RATIOS.icon 
        : LOGO_CONFIG.ASPECT_RATIOS.full
      const width = height * aspectRatio
      
      return { width, height }
    }, [size, shouldShowIcon])
    
    // Animation variants
    const logoAnimations = {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.9 }
    }
    
    const transitionConfig = {
      duration: HEADER_CONFIG.LOGO_TRANSITION_DURATION / 1000,
      ease: 'easeInOut' as const
    }

    return (
      <Link
        href={href}
        ref={ref}
        className={cn(
          logoVariants({ size }),
          'relative',  // Removed overflow-hidden to prevent clipping
          className
        )}
      >
        <div className="relative flex items-center space-x-2">
          <AnimatePresence mode="wait">
            {shouldShowIcon ? (
              <motion.div
                key="icon-logo"
                initial={animated ? logoAnimations.initial : undefined}
                animate={logoAnimations.animate}
                exit={animated ? logoAnimations.exit : undefined}
                transition={transitionConfig}
                className="flex items-center"
              >
                <Image
                  src={LOGO_CONFIG.ICON_LOGO_PATH}
                  alt="Golden Drops Logo"
                  width={dimensions.width}
                  height={dimensions.height}
                  priority={priority}
                  className={cn(
                    'object-contain transition-transform duration-200 group-hover:scale-105',
                    imageClassName
                  )}
                />
              </motion.div>
            ) : (
              <motion.div
                key="full-logo"
                initial={animated ? logoAnimations.initial : undefined}
                animate={logoAnimations.animate}
                exit={animated ? logoAnimations.exit : undefined}
                transition={transitionConfig}
                className="flex items-center space-x-2"
              >
                <Image
                  src={LOGO_CONFIG.FULL_LOGO_PATH}
                  alt="Golden Drops Logo"
                  width={dimensions.width}
                  height={dimensions.height}
                  priority={priority}
                  className={cn(
                    'object-contain transition-transform duration-200 group-hover:scale-105',
                    imageClassName
                  )}
                />
                {showText && (
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="text-2xl font-bold bg-gradient-to-r from-cotanak-green to-cotanak-light bg-clip-text text-transparent"
                  >
                    Golden Drops
                  </motion.span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Link>
    )
  }
)

Logo.displayName = 'Logo'

export default Logo