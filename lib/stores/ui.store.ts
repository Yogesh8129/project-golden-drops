import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { UIStore, Notification, Theme } from '@/lib/types'

const useUIStore = create<UIStore>()(
  devtools(
    (set, get) => ({
      isMobileMenuOpen: false,
      isSearchOpen: false,
      theme: 'light' as Theme,
      notification: null,

      toggleMobileMenu: () => {
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen }))
      },

      setMobileMenuOpen: (isOpen: boolean) => {
        set({ isMobileMenuOpen: isOpen })
      },

      toggleSearch: () => {
        set((state) => ({ isSearchOpen: !state.isSearchOpen }))
      },

      setSearchOpen: (isOpen: boolean) => {
        set({ isSearchOpen: isOpen })
      },

      setTheme: (theme: Theme) => {
        set({ theme })
        // Apply theme to document
        if (typeof window !== 'undefined') {
          document.documentElement.classList.remove('light', 'dark')
          document.documentElement.classList.add(theme)
        }
      },

      showNotification: (notification: Omit<Notification, 'id'>) => {
        const id = Math.random().toString(36).substring(7)
        const fullNotification: Notification = {
          ...notification,
          id,
          duration: notification.duration || 3000
        }
        
        set({ notification: fullNotification })

        // Auto-hide notification after duration
        if (fullNotification.duration && fullNotification.duration > 0) {
          setTimeout(() => {
            const currentNotification = get().notification
            if (currentNotification?.id === id) {
              get().hideNotification()
            }
          }, fullNotification.duration)
        }
      },

      hideNotification: () => {
        set({ notification: null })
      }
    })
  )
)

export default useUIStore