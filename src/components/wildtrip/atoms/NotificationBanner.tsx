import * as React from 'react'
import { Plane, Car, CheckCircle2, AlertTriangle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────

export type NotificationBannerType = 'flight' | 'cabify' | 'approval' | 'alert'

export interface NotificationBannerData {
  id: string
  type: NotificationBannerType
  title: string
  description?: string
  autoDismiss?: number
  tripId?: string
}

export interface NotificationBannerProps {
  notification: NotificationBannerData
  onDismiss: () => void
}

export interface UseNotificationQueueReturn {
  current: NotificationBannerData | null
  queue: NotificationBannerData[]
  add: (notification: Omit<NotificationBannerData, 'id'>) => void
  dismiss: () => void
}

// ─── Config ───────────────────────────────────────────────────────────────────

const TYPE_CONFIG: Record<
  NotificationBannerType,
  { icon: React.ElementType; classes: string }
> = {
  flight:   { icon: Plane,         classes: 'bg-primary text-primary-foreground' },
  cabify:   { icon: Car,           classes: 'bg-accent text-accent-foreground' },
  approval: { icon: CheckCircle2,  classes: 'bg-success text-success-foreground' },
  alert:    { icon: AlertTriangle, classes: 'bg-warning-muted text-warning-text' },
}

// ─── Component ────────────────────────────────────────────────────────────────

export function NotificationBanner({ notification, onDismiss }: NotificationBannerProps) {
  const [visible, setVisible] = React.useState(false)
  const { type, title, description, autoDismiss = 5000 } = notification
  const config = TYPE_CONFIG[type]
  const Icon = config.icon

  const handleDismiss = React.useCallback(() => {
    setVisible(false)
    setTimeout(onDismiss, 300)
  }, [onDismiss])

  // Trigger enter animation on mount
  React.useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  // Auto-dismiss timer
  React.useEffect(() => {
    if (!autoDismiss) return
    const timer = setTimeout(handleDismiss, autoDismiss)
    return () => clearTimeout(timer)
  }, [autoDismiss, handleDismiss])

  return (
    <div
      className={cn(
        'w-full transition-all duration-300 ease-[var(--ease-out)]',
        visible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
      )}
    >
      <div
        className={cn(
          'flex items-start gap-3 rounded-2xl px-4 py-3 shadow-lg',
          config.classes
        )}
        role="alert"
        aria-live="polite"
      >
        <Icon size={20} strokeWidth={1.5} className="shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="font-sans text-sm font-semibold">{title}</p>
          {description && (
            <p className="font-sans text-xs opacity-80 mt-0.5">{description}</p>
          )}
        </div>
        <button
          onClick={handleDismiss}
          className="shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-150 mt-0.5"
          aria-label="Cerrar notificación"
        >
          <X size={16} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  )
}

// ─── Queue Hook ───────────────────────────────────────────────────────────────

let _notifId = 0

export function useNotificationQueue(): UseNotificationQueueReturn {
  const [queue, setQueue] = React.useState<NotificationBannerData[]>([])

  const add = React.useCallback((notification: Omit<NotificationBannerData, 'id'>) => {
    const id = `wt-notif-${++_notifId}`
    setQueue(prev => [...prev, { ...notification, id }])
  }, [])

  const dismiss = React.useCallback(() => {
    setQueue(prev => prev.slice(1))
  }, [])

  return { current: queue[0] ?? null, queue, add, dismiss }
}

// ─── Notification Catalog ─────────────────────────────────────────────────────

const fmtEUR = (n: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)

export const WILDTRIP_NOTIFICATIONS = {
  cabifyIncoming: (
    driverName: string,
    eta: number,
    rideId: string
  ): Omit<NotificationBannerData, 'id'> => ({
    type: 'cabify',
    title: `${driverName} está a ${eta} min`,
    description: 'Tu Cabify está en camino.',
    autoDismiss: 8000,
    tripId: rideId,
  }),

  flightBoarding: (code: string, gate: string): Omit<NotificationBannerData, 'id'> => ({
    type: 'flight',
    title: `Embarque ${code}`,
    description: `Puerta ${gate} — Última llamada.`,
    autoDismiss: 10000,
  }),

  tripApproved: (destination: string, tripId: string): Omit<NotificationBannerData, 'id'> => ({
    type: 'approval',
    title: `Viaje a ${destination} aprobado.`,
    autoDismiss: 5000,
    tripId,
  }),

  budgetAlert: (remaining: number, tripId: string): Omit<NotificationBannerData, 'id'> => ({
    type: 'alert',
    title: `Quedan ${fmtEUR(remaining)} de dietas.`,
    description: 'Revisa tus gastos.',
    autoDismiss: 6000,
    tripId,
  }),

  revolut: (amount: number, merchant: string, tripId: string): Omit<NotificationBannerData, 'id'> => ({
    type: 'alert',
    title: `Revolut: ${new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount)} en ${merchant}`,
    description: '¿Añadir a nota de gastos?',
    autoDismiss: 7000,
    tripId,
  }),
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

export const MOCK_NOTIFICATIONS: NotificationBannerData[] = [
  {
    id: 'mock-1',
    type: 'cabify',
    title: 'Carlos Martín está a 3 min',
    description: 'Tu Cabify está en camino.',
    tripId: 'ride-001',
  },
  {
    id: 'mock-2',
    type: 'flight',
    title: 'Embarque IB3456',
    description: 'Puerta C22 — Última llamada.',
  },
  {
    id: 'mock-3',
    type: 'approval',
    title: 'Viaje a Barcelona aprobado.',
    tripId: 'trip-001',
  },
  {
    id: 'mock-4',
    type: 'alert',
    title: 'Quedan 45 € de dietas.',
    description: 'Revisa tus gastos.',
    tripId: 'trip-002',
  },
  {
    id: 'mock-5',
    type: 'alert',
    title: 'Revolut: 32,50 € en Poke House',
    description: '¿Añadir a nota de gastos?',
    tripId: 'trip-001',
  },
]
