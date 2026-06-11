import * as React from 'react'
import { Hotel, QrCode, CheckCircle, Clock, ChevronRight, MapPin, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type CheckinState = 'confirmed' | 'available' | 'checked_in'

export interface HotelCheckinProps {
  hotel: {
    name: string
    address: string
    checkIn: string
    checkOut: string
    confirmationCode: string
  }
  initialState?: CheckinState
  onCheckin?: () => void
  className?: string
}

interface StateConfig {
  label: string
  labelClass: string
  dot: string
}

const STATE_CONFIG: Record<CheckinState, StateConfig> = {
  confirmed: {
    label: 'Reserva confirmada',
    labelClass: 'text-[var(--accent-text)]',
    dot: 'bg-[var(--accent)]',
  },
  available: {
    label: 'Check-in online disponible',
    labelClass: 'text-[var(--warning-text)]',
    dot: 'bg-[var(--warning)]',
  },
  checked_in: {
    label: 'Checked in',
    labelClass: 'text-[var(--success-text)]',
    dot: 'bg-[var(--success)]',
  },
}

function QRPlaceholder({ code }: { code: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <div className="size-40 rounded-2xl bg-muted flex items-center justify-center border-2 border-dashed border-border">
        <QrCode size={48} strokeWidth={1.5} className="text-foreground opacity-50" />
      </div>
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Código de acceso
        </p>
        <p className="text-2xl font-mono font-bold text-foreground tracking-widest mt-1">
          {code}
        </p>
      </div>
    </div>
  )
}

function HotelCheckin({
  hotel,
  initialState = 'confirmed',
  onCheckin,
  className,
}: HotelCheckinProps) {
  const [state, setState] = React.useState<CheckinState>(initialState)
  const cfg = STATE_CONFIG[state]

  return (
    <div className={cn('rounded-2xl border bg-card p-5 space-y-5', className)}>
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="size-12 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center shrink-0">
          <Hotel size={20} strokeWidth={1.5} className="text-[var(--accent-text)]" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-2xl font-normal leading-tight tracking-tight text-card-foreground">
            {hotel.name}
          </h3>
          <span className="inline-flex items-center gap-1.5 mt-1">
            <span className={cn('size-1.5 rounded-full', cfg.dot)} />
            <span
              className={cn(
                'text-xs font-semibold uppercase tracking-widest',
                cfg.labelClass
              )}
            >
              {cfg.label}
            </span>
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin size={20} strokeWidth={1.5} className="shrink-0" />
          <span className="truncate">{hotel.address}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar size={20} strokeWidth={1.5} className="shrink-0" />
          <span>
            {hotel.checkIn} → {hotel.checkOut}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock size={20} strokeWidth={1.5} className="shrink-0" />
          <span>
            Código:{' '}
            <span className="font-mono font-semibold text-foreground">
              {hotel.confirmationCode}
            </span>
          </span>
        </div>
      </div>

      <div className="border-t border-border" />

      {state === 'confirmed' && (
        <div className="space-y-3 animate-fade-in">
          <div className="rounded-xl bg-[var(--accent-soft)] px-4 py-3 flex items-center gap-3">
            <CheckCircle
              size={20}
              strokeWidth={1.5}
              className="text-[var(--accent-text)] shrink-0"
            />
            <p className="text-sm text-[var(--accent-text)]">
              El check-in online se habilitará 24h antes de tu llegada.
            </p>
          </div>
          <button
            onClick={() => setState('available')}
            className={cn(
              'w-full inline-flex items-center justify-between',
              'rounded-xl border border-border bg-muted px-4 py-3 min-h-[44px]',
              'text-sm text-muted-foreground hover:bg-secondary transition-colors duration-150'
            )}
          >
            <span>Ver detalles de la reserva</span>
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>
        </div>
      )}

      {state === 'available' && (
        <div className="space-y-3 animate-fade-in">
          <div className="rounded-xl bg-[var(--warning-muted)] border border-[var(--warning)] px-4 py-3 flex items-center gap-3">
            <Clock
              size={20}
              strokeWidth={1.5}
              className="text-[var(--warning-text)] shrink-0"
            />
            <p className="text-sm text-[var(--warning-text)]">
              Check-in online disponible. Accede directamente a tu habitación.
            </p>
          </div>
          <button
            onClick={() => {
              setState('checked_in')
              onCheckin?.()
            }}
            className={cn(
              'w-full inline-flex items-center justify-center gap-2',
              'rounded-xl min-h-[44px] px-5 text-sm font-medium',
              'bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]',
              'transition-colors duration-200'
            )}
          >
            Hacer check-in online
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>
        </div>
      )}

      {state === 'checked_in' && (
        <div className="space-y-3 animate-success-pop">
          <p className="text-sm text-muted-foreground text-center">
            Muestra este código en recepción o en el acceso digital.
          </p>
          <QRPlaceholder code={hotel.confirmationCode} />
        </div>
      )}
    </div>
  )
}

export { HotelCheckin }
