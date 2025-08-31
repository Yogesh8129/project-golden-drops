'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { HEADER_CONFIG } from '@/lib/utils/constants'

interface ScrollState {
  scrollY: number
  isScrolled: boolean
  scrollProgress: number
  direction: 'up' | 'down' | null
  isAtTop: boolean
}

export const useScrollDirection = (threshold = HEADER_CONFIG.SCROLL_THRESHOLD) => {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    isScrolled: false,
    scrollProgress: 0,
    direction: null,
    isAtTop: true
  })

  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  const updateScrollState = useCallback(() => {
    const scrollY = window.scrollY
    const isScrolled = scrollY > threshold
    const isAtTop = scrollY < 10
    
    // Calculate scroll progress (0 to 1) for smooth animations
    const scrollProgress = Math.min(scrollY / (threshold * 2), 1)
    
    // Determine scroll direction
    let direction: 'up' | 'down' | null = null
    if (scrollY > lastScrollY.current && scrollY > threshold) {
      direction = 'down'
    } else if (scrollY < lastScrollY.current) {
      direction = 'up'
    }
    
    lastScrollY.current = scrollY

    setScrollState({
      scrollY,
      isScrolled,
      scrollProgress,
      direction,
      isAtTop
    })

    ticking.current = false
  }, [threshold])

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(updateScrollState)
      ticking.current = true
    }
  }, [updateScrollState])

  useEffect(() => {
    // Initial state
    updateScrollState()
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll, updateScrollState])

  return scrollState
}