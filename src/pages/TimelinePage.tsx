import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Plane, Car, Building2, Briefcase, Receipt } from 'lucide-react'
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
  meal:   Receipt,
}

function EventDot({ status }: { status: EventStatus }) {
  return (
    <div className="relative flex items-center justify-center shrink-0">
      <div className={cn(
        'w-3 h-3 rounded-full border-2 transition-colors',
        status === 'completed' && 'bg-primary border-primary',
        status === 'active'    && 'bg-accent border-accent',
        status === 'upcoming'  && 'bg-background border-border',
      )} />
      {status === 'active' && (
        <div className="absolute w-3 h-3 rounded-full bg-accent animate-ping opacity-40" />
      )}
    </div>
  )
}

function EventRow({
  event,
  isLast,
}: {
  event: TimelineEvent
  isLast: boolean
}) {
  const Icon = ICONS[event.type]
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <EventDot status={event.status} />
        {!isLast && (
          <div className={cn(
            'w-px flex-1 mt-1 mb-1 min-h-[24px]',
            event.status === 'completed' ? 'bg-primary/30' : 'bg-border',
          )} />
        )}
      </div>
      <div className={cn('flex-1 pb-4 min-w-0', isLast && 'pb-2')}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Icon
              size={14}
              strokeWidth={1.5}
              className={cn(
                'shrink-0 mt-0.5',
                event.status === 'active' ? 'text-accent' : 'text-muted-foreground',
              )}
            />
            <div className="min-w-0">
              <p className={cn(
                'font-sans text-sm font-semibold leading-snug',
                event.status === 'completed'
                  ? 'text-muted-foreground line-through decoration-1'
                  : 'text-foreground',
              )}>
                {event.title}
              </p>
              {event.location && (
                <p className="font-sans text-xs text-muted-foreground mt-0.5">
                  {event.location}
                </p>
              )}
            </div>
          </div>
          <p className="font-sans text-xs text-muted-foreground shrink-0 mt-0.5">
            {event.time}
          </p>
        </div>
      </div>
    </div>
  )
}

export function TimelinePage() {
  const navigate = useNavigate()
  const days: TimelineDay[] = MOCK_TIMELINE_DAYS_ORG
  const [activeDay, setActiveDay] = React.useState(MOCK_BUDGET.currentDay - 1)
  const day = days[activeDay] ?? days[0]

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
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-32">
        {day?.events.map((event, idx) => (
          <EventRow
            key={event.id}
            event={event}
            isLast={idx === day.events.length - 1}
          />
        ))}
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
