# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 e-commerce application for Golden Drops (Cotanak) edible oils. The project uses TypeScript, Zustand for state management, and follows an Atomic Design architecture.

## Essential Commands

```bash
# Development
npm run dev        # Start dev server on http://localhost:3000

# Build & Production
npm run build      # Build for production
npm start          # Start production server

# Code Quality
npm run lint       # Run ESLint
npx tsc --noEmit   # TypeScript type checking
```

## Architecture & Key Patterns

### State Management with Zustand
The app uses Zustand stores located in `lib/stores/`:
- `useCartStore` - Shopping cart with localStorage persistence
- `useProductsStore` - Product catalog and filtering
- `useUIStore` - UI state (mobile menu, notifications)

Stores are imported directly without providers:
```typescript
import { useCartStore } from '@/lib/stores'
const { items, addToCart } = useCartStore()
```

### Component Architecture
Components follow Atomic Design in `components/`:
- `atoms/` - Basic reusable components (Button, Input)
- `molecules/` - Composite components (ProductCard, NotificationToast)
- `organisms/` - Complex sections (Header, Footer, CartSidebar)

### TypeScript Path Aliases
```typescript
@/components/*  // Component imports
@/lib/*         // Libraries and utilities
@/stores/*      // Zustand stores
@/types/*       // Type definitions
@/utils/*       // Utility functions
```

### Styling Approach
- Tailwind CSS with custom Cotanak brand colors:
  - `cotanak-green`: #84cc16
  - `cotanak-dark`: #65a30d
  - `cotanak-light`: #a3e635
- Use `cn()` utility from `lib/utils` for conditional classes
- Components accept `className` prop for extensibility

## Critical Notes

### DO NOT Use Turbopack
The project has CSS compilation issues with Turbopack. Always use standard webpack:
```bash
npm run dev    # Correct - no --turbopack flag
```

### TypeScript Errors to Fix
There are TypeScript errors in `components/organisms/Footer.tsx` related to missing `socialMedia` property in company data.

### Current Implementation Status
- ✅ Product listing with search/filter
- ✅ Shopping cart with persistence
- ✅ Responsive design
- ✅ Contact form structure
- ⚠️ Using emoji placeholders for product images
- ⚠️ EmailJS integration pending
- ⚠️ No product detail pages yet

## Development Workflow

1. **Before making changes**: Check existing patterns in similar components
2. **Import libraries**: Verify dependencies in package.json before importing
3. **Follow conventions**: Match existing code style and component structure
4. **Type safety**: Ensure all TypeScript interfaces are properly defined
5. **Test changes**: Run `npx tsc --noEmit` to catch type errors

## Key Files to Understand

- `app/layout.tsx` - Root layout with Header/Footer
- `lib/stores/cart.store.ts` - Cart state management pattern
- `components/molecules/ProductCard.tsx` - Component structure example
- `tailwind.config.ts` - Custom theme configuration