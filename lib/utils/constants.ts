export const HEADER_CONFIG = {
  SCROLL_THRESHOLD: 50,
  EXPANDED_HEIGHT: 100,  // Increased from 80 to accommodate logo
  COLLAPSED_HEIGHT: 70,   // Increased from 64
  TRANSITION_DURATION: 300,
  LOGO_TRANSITION_DURATION: 200,
  LOGO_SIZES: {
    expanded: 'lg' as const,  // Full logo when at top
    collapsed: 'md' as const,  // Increased from sm to md for better visibility
    mobile: 'md' as const,     // Increased for mobile too
    icon: 'md' as const        // Icon size matches collapsed
  },
  BREAKPOINTS: {
    mobile: 768,
    tablet: 1024
  }
} as const

export const LOGO_CONFIG = {
  FULL_LOGO_PATH: '/images/logos/golden-drops-logo.svg',
  ICON_LOGO_PATH: '/images/logos/logo-icon.svg',
  ASPECT_RATIOS: {
    full: 2.8,  // Adjusted based on actual logo proportions
    icon: 1.2   // Slightly wider than square for icon
  }
} as const