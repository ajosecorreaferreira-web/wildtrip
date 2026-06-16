import {
  Plus,
  AlertTriangle,
  Plane,
  Check,
  CheckCircle2,
  Receipt,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button, StatusBadge } from '@/components/wildtrip/atoms'
import { BudgetMiniCard } from '@/components/wildtrip/molecules'
import { TripTimeline } from '@/components/wildtrip/trip-timeline'
import type { TimelineDay } from '@/components/wildtrip/trip-timeline'

type HomeState = 'empty' | 'upcoming' | 'in_progress' | 'pending_expenses' | 'closed'

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

function ClosingState() {
  const navigate = useNavigate()
  return (
    <div>
      <div className="bg-primary px-4 pt-12 pb-5">
        <p className="font-sans text-xs text-primary-foreground/60">Buenos días,</p>
        <h1 className="font-display text-[32px] text-primary-foreground mt-0.5">Ana García</h1>
      </div>

      <div className="px-4 pb-24">
        <div className="bg-warning-muted border border-warning rounded-xl p-4 mt-4">
          <div className="flex items-start gap-2">
            <AlertTriangle size={18} strokeWidth={1.5} className="text-warning-text shrink-0 mt-0.5" />
            <div>
              <p className="font-sans text-sm font-semibold text-warning-text">
                Cierra la nota antes del viernes · 3 días
              </p>
              <p className="font-sans text-sm text-warning-text/80 mt-0.5">
                1 gasto sin ticket · Café LCG sin justificar
              </p>
            </div>
          </div>
        </div>

        <div className="bg-muted rounded-2xl mt-3 p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="font-sans text-base font-semibold text-foreground">Inditex A Coruña</span>
            <span className="font-sans text-[10px] font-semibold uppercase tracking-wide text-warning-text bg-warning-muted border border-warning rounded-full px-2.5 py-0.5 shrink-0">
              1 SIN TICKET
            </span>
          </div>
          <p className="font-sans text-xs text-muted-foreground mt-1">Completado · 15–17 jun</p>

          <div className="h-px bg-border my-3" />

          <div className="flex items-baseline justify-between">
            <span className="font-sans text-lg font-bold text-foreground">451€ gastados</span>
            <span className="font-sans text-sm text-accent">109€ ahorrados</span>
          </div>

          <div className="mt-3">
            <span className="inline-flex items-center font-sans text-xs font-semibold bg-primary text-primary-foreground rounded-full px-3 py-1">
              ✓ Completado
            </span>
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          className="w-full mt-4"
          iconLeft={<Receipt size={20} strokeWidth={1.5} />}
          onClick={() => navigate('/traveler/expense-report')}
        >
          Cerrar nota · A Coruña
        </Button>

        <Button
          variant="ghost"
          size="base"
          className="w-full mt-2"
          onClick={() => navigate('/traveler/budget?view=summary')}
        >
          Ver resumen del viaje
        </Button>
      </div>
    </div>
  )
}

const CLOSED_BULLETS = [
  'La nota ha sido enviada a Jungle Group',
  'Recibirás confirmación por email',
  'El pago se procesará en 5 días laborables',
]

function ClosedState() {
  const navigate = useNavigate()
  return (
    <div className="animate-page-enter">
      <div className="flex flex-col items-center mt-16">
        <CheckCircle2 size={56} strokeWidth={1.5} className="text-accent animate-success-pop" />
        <h2 className="font-display text-[26px] font-normal text-foreground mt-4 text-center">
          Nota cerrada.
        </h2>
        <p className="font-sans text-sm text-muted-foreground mt-1 text-center">
          Jungle Group la revisará en 24-48h.
        </p>
      </div>

      <div className="bg-muted rounded-xl p-4 mt-6">
        <p className="font-sans text-sm font-semibold text-foreground">Inditex A Coruña · 15–17 jun</p>
        <p className="font-sans text-xs text-accent mt-1">451€ gastados · 109€ ahorrados</p>
        <span className="inline-flex items-center font-sans text-xs font-semibold text-accent bg-accent/10 rounded-full px-3 py-1 mt-2">
          ✓ Nota enviada
        </span>
      </div>

      <div className="mt-6 space-y-3">
        {CLOSED_BULLETS.map((text, i) => (
          <div key={i} className="flex gap-2 items-start">
            <CheckCircle2 size={16} strokeWidth={1.5} className="text-accent shrink-0 mt-0.5" />
            <p className="font-sans text-sm text-foreground">{text}</p>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        className="w-full mt-8"
        onClick={() => navigate('/traveler')}
      >
        Volver al inicio
      </Button>
    </div>
  )
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


const UPCOMING_BULLETS = [
  'Te avisaremos cuando esté aprobado',
  'Las reservas se harán automáticamente',
  'El cargo va directamente a Jungle',
]

function UpcomingState() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center py-8 animate-page-enter">
      <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
        <Check size={32} strokeWidth={1.5} className="text-accent-foreground" />
      </div>
      <h2 className="font-display text-[26px] font-normal text-foreground mt-4 text-center">
        Solicitud enviada.
      </h2>
      <p className="font-sans text-sm text-muted-foreground mt-2 text-center">
        Está en manos de Sara García.{' '}
        Te avisamos cuando lo apruebe.
      </p>

      <div className="bg-muted rounded-xl p-4 mt-6 w-full">
        <p className="font-sans text-xs text-muted-foreground">A Coruña · Inditex Arteixo</p>
        <p className="font-sans text-sm font-semibold text-foreground mt-1">
          15–17 jun · 560€ estimados
        </p>
        <StatusBadge status="pending" className="mt-2" />
      </div>

      <div className="w-full mt-6 space-y-3">
        {UPCOMING_BULLETS.map((text, i) => (
          <div key={i} className="flex gap-2 items-start">
            <CheckCircle2 size={16} strokeWidth={1.5} className="text-accent shrink-0 mt-0.5" />
            <p className="font-sans text-sm text-foreground">{text}</p>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        className="w-full mt-8"
        onClick={() => navigate('/traveler')}
      >
        Volver al inicio
      </Button>
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
  const navigate = useNavigate()
  return (
    <div>
      <div className="bg-primary px-4 pt-12 pb-5">
        <p className="font-sans text-xs text-primary-foreground/60">Buenos días</p>
        <h1 className="font-display text-3xl text-primary-foreground mt-0.5">Ana García</h1>
        <div className="mt-4">
          <BudgetMiniCard spent={312} total={560} daysLeft={1} variant="dark" />
        </div>
        <div className="flex gap-3 mt-4">
          <Button
            variant="accent"
            className="flex-1 text-sm h-10"
            onClick={() => navigate('/traveler/cabify')}
          >
            🚕 Pedir Cabify
          </Button>
          <Button
            variant="ghost"
            className="flex-1 text-sm h-10 border-white/30 text-white"
            onClick={() => onUploadTicket?.()}
          >
            🧾 Añadir ticket
          </Button>
        </div>
      </div>
      <div className="px-4 pt-4 pb-24">
        <TripTimeline days={trip.days} />
      </div>
    </div>
  )
}


function TravelerHome({
  state,
  active,
  onNewTrip,
  onUploadTicket,
  className,
}: TravelerHomeProps) {
  return (
    <div className={cn('w-full', className)}>
      {state === 'empty' && <EmptyState onNewTrip={onNewTrip} />}
      {state === 'upcoming' && <UpcomingState />}
      {state === 'in_progress' && active && (
        <InProgressState trip={active} onUploadTicket={onUploadTicket} />
      )}
      {state === 'pending_expenses' && <ClosingState />}
      {state === 'closed' && <ClosedState />}
    </div>
  )
}

export { TravelerHome }
