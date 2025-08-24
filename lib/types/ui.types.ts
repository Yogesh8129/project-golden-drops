export interface Notification {
  id: string
  message: string
  type: NotificationType
  duration?: number
}

export type NotificationType = 'info' | 'success' | 'error' | 'warning'

export interface UIState {
  isMobileMenuOpen: boolean
  isSearchOpen: boolean
  theme: Theme
  notification: Notification | null
}

export interface UIActions {
  toggleMobileMenu: () => void
  setMobileMenuOpen: (isOpen: boolean) => void
  toggleSearch: () => void
  setSearchOpen: (isOpen: boolean) => void
  setTheme: (theme: Theme) => void
  showNotification: (notification: Omit<Notification, 'id'>) => void
  hideNotification: () => void
}

export type Theme = 'light' | 'dark'

export type UIStore = UIState & UIActions