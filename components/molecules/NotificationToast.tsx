'use client'

import { X, CheckCircle, Info, AlertTriangle, XCircle } from 'lucide-react'
import { useUIStore } from '@/lib/stores'
import { cn } from '@/lib/utils'
import { NotificationType } from '@/lib/types'

const iconMap: Record<NotificationType, React.ReactNode> = {
  info: <Info className="w-5 h-5" />,
  success: <CheckCircle className="w-5 h-5" />,
  warning: <AlertTriangle className="w-5 h-5" />,
  error: <XCircle className="w-5 h-5" />
}

const colorMap: Record<NotificationType, string> = {
  info: 'bg-blue-50 text-blue-800 border-blue-200',
  success: 'bg-green-50 text-green-800 border-green-200',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  error: 'bg-red-50 text-red-800 border-red-200'
}

const NotificationToast = () => {
  const { notification, hideNotification } = useUIStore()

  if (!notification) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div
        className={cn(
          'flex items-start gap-3 p-4 rounded-lg border shadow-lg min-w-[300px] max-w-md',
          colorMap[notification.type]
        )}
      >
        <div className="flex-shrink-0">
          {iconMap[notification.type]}
        </div>
        <div className="flex-grow">
          <p className="text-sm font-medium">{notification.message}</p>
        </div>
        <button
          onClick={hideNotification}
          className="flex-shrink-0 hover:opacity-70 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default NotificationToast