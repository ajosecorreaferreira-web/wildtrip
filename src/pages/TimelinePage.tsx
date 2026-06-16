import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Plane, Car, Building2, Briefcase, UtensilsCrossed } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/wildtrip/atoms'
import { BudgetMiniCard } from '@/components/wildtrip/molecules'
import { BottomNav } from '@/components/wildtrip/BottomNav'
import { MOCK_TIMELINE_DAYS_ORG, MOCK_BUDGET } from '@/data/mock'
import type {
  TimelineDay,
  TimelineEvent,
  EventType,
  EventStatus,
} from '@/components/wildtrip/organisms/TripTimeline'

const ICONS: Record<EventType, React.ElementType> = {
  flight: Plane,
  cabify: Car,
  hotel:  Building2,
  work:   Briefcase,
  meal:   UtensilsCrossed,
}

function EventDot({ status, type }: { status: EventStatus; type: EventType }) {
  const Icon = ICONS[type]
  return (
    <div className="relative flex items-center justify-center shrink-0 w-7 h-7">
      <div className={cn(
        'w-7 h-7 rounded-full flex items-center justify-center transition-colors',
        status === 'completed' && 'bg-accent',
        status === 'active'    && 'bg-accent ring-4 ring-accent/20 animate-pulse',
        status === 'upcoming'  && 'border-2 border-border bg-background',
      )}>
        <Icon
          size={14}
          strokeWidth={1.5}
          className={status === 'upcoming' ? 'text-muted-foreground' : 'text-white'}
        />
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: EventStatus }) {
  return (
    <span className={cn(
      'shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-sans text-[11px] font-semibold whitespace-nowrap',
      status === 'completed' && 'bg-success-muted text-success-text',
      status === 'active'    && 'bg-accent/10 text-accent',
      status === 'upcoming'  && 'bg-muted text-muted-foreground',
    )}>
      {status === 'active' && (
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0" />
      )}
      {status === 'completed' && 'Completado'}
      {status === 'active'    && 'En curso'}
      {status === 'upcoming'  && 'Pendiente'}
    </span>
  )
}

function EventRow({
  event,
  isLast,
  extraAction,
}: {
  event: TimelineEvent
  isLast: boolean
  extraAction?: React.ReactNode
}) {
  return (
    <div className="flex gap-3">
      {/* Left: dot + connector line */}
      <div className="flex flex-col items-center" style={{ width: 28 }}>
        <EventDot status={event.status} type={event.type} />
        {!isLast && (
          <div className={cn(
            'w-0.5 flex-1 mt-1 mb-1 min-h-[28px]',
            event.status === 'completed' ? 'bg-accent' : 'bg-border',
          )} />
        )}
      </div>

      {/* Right: content */}
      <div className={cn('flex-1 pb-5 min-w-0', isLast && 'pb-2')}>
        <div className="flex items-center justify-between gap-2">
          <p className={cn(
            'font-sans text-sm font-semibold leading-snug',
            event.status === 'completed'
              ? 'text-muted-foreground line-through decoration-1'
              : 'text-foreground',
          )}>
            {event.title}
          </p>
          <StatusBadge status={event.status} />
        </div>
        {event.location && (
          <p className="font-sans text-xs text-muted-foreground mt-0.5">{event.location}</p>
        )}
        <p className="font-sans text-xs text-muted-foreground mt-0.5">{event.time}</p>
        {extraAction}
      </div>
    </div>
  )
}

export function TimelinePage() {
  const navigate = useNavigate()
  const days: TimelineDay[] = MOCK_TIMELINE_DAYS_ORG
  const [activeDay, setActiveDay] = React.useState(MOCK_BUDGET.currentDay - 1)
  const day = days[activeDay] ?? days[0]
  const isMie17 = activeDay === 2

  return (
    <div className="flex flex-col min-h-screen bg-background">

      {/* Full-bleed navy header */}
      <div className="bg-primary px-4 pt-12 pb-4">
        <p className="font-sans text-xs text-primary-foreground/60">
          Día {MOCK_BUDGET.currentDay} de {days.length} · En curso
        </p>
        <h1 className="font-display text-2xl text-primary-foreground mt-0.5">
          A Coruña
        </h1>
        <BudgetMiniCard
          spent={MOCK_BUDGET.spent}
          total={MOCK_BUDGET.total}
          variant="dark"
          className="mt-3"
        />
      </div>

      {/* Day tabs */}
      <div className="flex gap-2 px-4 py-3 border-b border-border overflow-x-auto scrollbar-hide">
        {days.map((d, idx) => (
          <button
            key={d.date}
            onClick={() => setActiveDay(idx)}
            className={cn(
              'shrink-0 px-3 py-1.5 rounded-full font-sans text-xs font-semibold transition-all duration-[180ms]',
              activeDay === idx
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-secondary',
            )}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Scrollable events */}
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-32">
        {day?.events.map((event: TimelineEvent, idx: number) => {
          const isLast = idx === day.events.length - 1

          let extraAction: React.ReactNode = null
          if (isMie17 && event.id === 'ev-8') {
            extraAction = (
              <button
                className="font-sans text-xs text-accent underline mt-1"
                onClick={() => navigate('/traveler/checkout')}
              >
                Ver checkout
              </button>
            )
          } else if (isMie17 && event.id === 'ev-10') {
            extraAction = (
              <button
                className="font-sans text-xs text-accent underline mt-1"
                onClick={() => navigate('/traveler/boarding-pass?flight=return')}
              >
                Ver boarding pass
              </button>
            )
          }

          return (
            <EventRow
              key={event.id}
              event={event}
              isLast={isLast}
              extraAction={extraAction}
            />
          )
        })}

        {/* Mié 17 — link to day screen */}
        {isMie17 && (
          <button
            className="mt-4 font-sans text-xs text-accent underline"
            onClick={() => navigate('/traveler/countdown?day=3')}
          >
            Ver pantalla del día
          </button>
        )}
      </div>

      {/* Sticky CTA */}
      <div className="sticky-cta">
        <Button
          variant="primary"
          className="w-full"
          onClick={() => navigate('/traveler/ticket')}
        >
          + Añadir gasto
        </Button>
      </div>

      <BottomNav role="traveler" />
    </div>
  )
}
