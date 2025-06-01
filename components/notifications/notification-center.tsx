"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { X, Bell, AlertTriangle, CheckCircle, Info } from "lucide-react"

interface NotificationCenterProps {
  notifications: any[]
  onDismiss: (id: number) => void
}

export function NotificationCenter({ notifications, onDismiss }: NotificationCenterProps) {
  const [visible, setVisible] = useState<number[]>([])
  const processedNotifications = useRef(new Set<number>())

  useEffect(() => {
    // Mostrar apenas notificações novas que ainda não foram processadas
    const newNotifications = notifications.filter((n) => !processedNotifications.current.has(n.id))

    if (newNotifications.length > 0) {
      const latest = newNotifications[0]

      // Marcar como processada
      processedNotifications.current.add(latest.id)

      // Adicionar à lista de visíveis
      setVisible((prev) => {
        const updated = [latest.id, ...prev.slice(0, 2)] // Máximo 3 visíveis
        return updated
      })

      // Auto-dismiss após 5 segundos
      const timeoutId = setTimeout(() => {
        setVisible((prev) => prev.filter((id) => id !== latest.id))
      }, 5000)

      // Cleanup do timeout se o componente for desmontado
      return () => clearTimeout(timeoutId)
    }
  }, [notifications]) // Removido 'visible' das dependências

  // Limpar notificações processadas quando a lista de notificações diminui
  useEffect(() => {
    const currentIds = new Set(notifications.map((n) => n.id))
    const processedIds = Array.from(processedNotifications.current)

    processedIds.forEach((id) => {
      if (!currentIds.has(id)) {
        processedNotifications.current.delete(id)
      }
    })
  }, [notifications])

  const getIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "success":
        return <CheckCircle className="h-4 w-4" />
      case "info":
        return <Info className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getColorClasses = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400"
      case "success":
        return "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400"
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400"
      default:
        return "bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-900/20 dark:border-gray-800 dark:text-gray-400"
    }
  }

  const handleDismiss = (notificationId: number) => {
    setVisible((prev) => prev.filter((id) => id !== notificationId))
    onDismiss(notificationId)
  }

  const visibleNotifications = notifications.filter((n) => visible.includes(n.id))

  if (visibleNotifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {visibleNotifications.map((notification, index) => (
        <div
          key={notification.id}
          className={`max-w-sm p-4 rounded-lg border shadow-lg animate-slide-in ${getColorClasses(notification.type)}`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">{getIcon(notification.type)}</div>
            <div className="flex-1">
              <h4 className="font-medium text-sm">{notification.title}</h4>
              <p className="text-xs mt-1 opacity-90">{notification.message}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="flex-shrink-0 h-6 w-6 p-0 hover:bg-black/10 dark:hover:bg-white/10"
              onClick={() => handleDismiss(notification.id)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
