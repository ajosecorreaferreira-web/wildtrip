import {
  Plus,
  MapPin,
  Calendar,
  Clock,
  Receipt,
  AlertCircle,
  Plane,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { TripTimeline } from './trip-timeline'
import type { TimelineDay } from './trip-timeline'

type HomeState = 'empty' | 'upcoming' | 'in_progress' | 'pending_expenses'

export interface UpcomingTrip {
  destination: string
  startDate: string
  daysUntil: number
  purpose: string
}

export interface ActiveTrip {
  destination: string
  days: TimelineDay[]
}

export interface PendingExpensesTrip {
  destination: string
  endDate: string
  expensesCount: number
}

export interface TravelerHomeProps {
  state: HomeState
  upcoming?: UpcomingTrip
  active?: ActiveTrip
  pendingExpenses?: PendingExpensesTrip
  onNewTrip?: () => void
  onUploadTicket?: () => void
  onOpenExpenses?: () => void
  className?: string
}

function EmptyState({ onNewTrip }: { onNewTrip?: () => void }) {
  return (
    <div className="flex flex-col items-center gap-6 py-16 text-center animate-page-enter">
      <div className="size-20 rounded-full bg-[var(--accent-soft)] flex items-center justify-center">
        <Plane size={32} strokeWidth={1.5} className="text-[var(--accent-text)]" />
      </div>
      <div>
        <h2 className="font-display text-3xl font-normal tracking-tight text-foreground">
          Sin viajes activos.
        </h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
          Cuando planifiques un viaje aparecerá aquí. ¿Tienes algo en mente?
        </p>
      </div>
      {onNewTrip && (
        <button
          onClick={onNewTrip}
          className={cn(
            'inline-flex items-center gap-2',
            'rounded-xl min-h-[44px] px-8 text-sm font-medium',
            'bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]',
            'transition-colors duration-200'
          )}
        >
          <Plus size={20} strokeWidth={1.5} />
          Crear solicitud de viaje
        </button>
      )}
    </div>
  )
}

function CountdownChip({ days }: { days: number }) {
  const colorClass =
    days <= 1
      ? 'bg-[var(--destructive-muted)] text-destructive'
      : days <= 3
        ? 'bg-[var(--warning-muted)] text-[var(--warning-text)]'
        : 'bg-[var(--accent-soft)] text-[var(--accent-text)]'

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-0.5',
        'text-xs font-semibold uppercase tracking-widest',
        colorClass
      )}
    >
      <Clock size={12} strokeWidth={1.5} />
      {days === 0 ? 'Hoy' : days === 1 ? 'Mañana' : `En ${days} días`}
    </span>
  )
}

function UpcomingState({
  trip,
  onNewTrip,
  onUploadTicket,
}: {
  trip: UpcomingTrip
  onNewTrip?: () => void
  onUploadTicket?: () => void
}) {
  return (
    <div className="space-y-5 animate-page-enter">
      <div className="rounded-2xl border bg-card p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-3xl font-normal tracking-tight text-foreground">
              {trip.destination}
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">{trip.purpose}</p>
          </div>
          <CountdownChip days={trip.daysUntil} />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar size={20} strokeWidth={1.5} className="shrink-0" />
            <span>Sale el {trip.startDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin size={20} strokeWidth={1.5} className="shrink-0" />
            <span>{trip.destination}</span>
          </div>
        </div>

        <div className="flex gap-3 pt-1">
          {onUploadTicket && (
            <button
              onClick={onUploadTicket}
              className={cn(
                'flex-1 inline-flex items-center justify-center gap-2',
                'rounded-xl min-h-[44px] px-4 text-sm font-medium',
                'bg-[var(--accent-soft)] text-[var(--accent-text)] hover:opacity-90',
                'transition-opacity duration-150'
              )}
            >
              <Receipt size={20} strokeWidth={1.5} />
              Añadir ticket
            </button>
          )}
          {onNewTrip && (
            <button
              onClick={onNewTrip}
              className={cn(
                'flex-1 inline-flex items-center justify-center gap-2',
                'rounded-xl min-h-[44px] px-4 text-sm font-medium',
                'bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]',
                'transition-colors duration-200'
              )}
            >
              <Plus size={20} strokeWidth={1.5} />
              Nuevo viaje
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function InProgressState({
  trip,
  onUploadTicket,
}: {
  trip: ActiveTrip
  onUploadTicket?: () => void
}) {
  return (
    <div className="space-y-5 animate-page-enter">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl font-normal tracking-tight text-foreground">
            {trip.destination}
          </h2>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--accent-text)] mt-1">
            <span className="size-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            En curso
          </span>
        </div>
        {onUploadTicket && (
          <button
            onClick={onUploadTicket}
            className={cn(
              'inline-flex items-center gap-2',
              'rounded-xl min-h-[44px] px-4 text-sm font-medium',
              'bg-[var(--accent-soft)] text-[var(--accent-text)] hover:opacity-90',
              'transition-opacity duration-150'
            )}
          >
            <Receipt size={20} strokeWidth={1.5} />
            Ticket
          </button>
        )}
      </div>
      <TripTimeline days={trip.days} />
    </div>
  )
}

function PendingExpensesState({
  trip,
  onOpenExpenses,
}: {
  trip: PendingExpensesTrip
  onOpenExpenses?: () => void
}) {
  return (
    <div className="space-y-5 animate-page-enter">
      <div className="rounded-2xl border bg-card p-5 space-y-4">
        <h2 className="font-display text-3xl font-normal tracking-tight text-foreground">
          {trip.destination}
        </h2>
        <p className="text-sm text-muted-foreground">Viaje completado el {trip.endDate}.</p>

        <div className="rounded-xl bg-[var(--warning-muted)] border border-[var(--warning)] px-4 py-3 flex items-start gap-3">
          <AlertCircle
            size={20}
            strokeWidth={1.5}
            className="text-[var(--warning-text)] shrink-0 mt-0.5"
          />
          <div>
            <p className="text-sm font-semibold text-[var(--warning-text)]">
              Tienes {trip.expensesCount} gasto
              {trip.expensesCount !== 1 ? 's' : ''} sin justificar.
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Completa la nota de gastos antes del cierre del mes.
            </p>
          </div>
        </div>

        {onOpenExpenses && (
          <button
            onClick={onOpenExpenses}
            className={cn(
              'w-full inline-flex items-center justify-center gap-2',
              'rounded-xl min-h-[44px] px-5 text-sm font-medium',
              'bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]',
              'transition-colors duration-200'
            )}
          >
            <Receipt size={20} strokeWidth={1.5} />
            Ver nota de gastos
          </button>
        )}
      </div>
    </div>
  )
}

function TravelerHome({
  state,
  upcoming,
  active,
  pendingExpenses,
  onNewTrip,
  onUploadTicket,
  onOpenExpenses,
  className,
}: TravelerHomeProps) {
  return (
    <div className={cn('w-full', className)}>
      {state === 'empty' && <EmptyState onNewTrip={onNewTrip} />}
      {state === 'upcoming' && upcoming && (
        <UpcomingState
          trip={upcoming}
          onNewTrip={onNewTrip}
          onUploadTicket={onUploadTicket}
        />
      )}
      {state === 'in_progress' && active && (
        <InProgressState trip={active} onUploadTicket={onUploadTicket} />
      )}
      {state === 'pending_expenses' && pendingExpenses && (
        <PendingExpensesState trip={pendingExpenses} onOpenExpenses={onOpenExpenses} />
      )}
    </div>
  )
}

export { TravelerHome }
