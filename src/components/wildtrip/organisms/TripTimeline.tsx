import * as React from 'react'
import { Plane, Car, Building2, Briefcase, Receipt, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/wildtrip/atoms'
import { BudgetMiniCard } from '@/components/wildtrip/molecules'

export type EventType = 'flight' | 'cabify' | 'hotel' | 'work' | 'meal'
export type EventStatus = 'completed' | 'active' | 'upcoming'

export interface TimelineEvent {
  id: string
  type: EventType
  title: string
  time: string
  location?: string
  status: EventStatus
  detail?: string
  actionLabel?: string
  onAction?: () => void
}

export interface TimelineDay {
  date: string
  label: string
  events: TimelineEvent[]
}

export interface TripTimelineProps {
  days: TimelineDay[]
  currentDay: number
  destination: string
  approvedBudget: number
  spentAmount: number
  onAddExpense: () => void
  className?: string
}

const EVENT_ICONS: Record<EventType, React.ElementType> = {
  flight:  Plane,
  cabify:  Car,
  hotel:   Building2,
  work:    Briefcase,
  meal:    Receipt,
}

function EventDot({ status }: { status: EventStatus }) {
  return (
    <div className="relative flex items-center justify-center shrink-0">
      <div
        className={cn(
          'w-3 h-3 rounded-full border-2 transition-colors duration-[var(--duration-slow)]',
          status === 'completed' && 'bg-primary border-primary',
          status === 'active' && 'bg-accent border-accent',
          status === 'upcoming' && 'bg-background border-border',
        )}
      />
      {status === 'active' && (
        <div className="absolute w-3 h-3 rounded-full bg-accent animate-ping opacity-40" />
      )}
    </div>
  )
}

export function TripTimeline({
  days,
  currentDay,
  destination,
  approvedBudget,
  spentAmount,
  onAddExpense,
  className,
}: TripTimelineProps) {
  const [activeDay, setActiveDay] = React.useState(currentDay - 1)
  const day = days[activeDay] ?? days[0]

  return (
    <div className={cn('flex flex-col', className)}>
      {/* Navy header */}
      <div className="bg-primary text-primary-foreground rounded-2xl px-5 py-5 flex flex-col gap-4">
        <div>
          <h2 className="font-display text-3xl text-primary-foreground leading-tight">
            {destination}
          </h2>
          <p className="font-sans text-xs text-primary-foreground/60 mt-1 uppercase tracking-wide font-semibold">
            Día {currentDay} de {days.length} · En curso
          </p>
        </div>
        <BudgetMiniCard
          spent={spentAmount}
          total={approvedBudget}
          variant="dark"
        />
      </div>

      {/* Day tabs */}
      <div className="flex gap-2 mt-4 px-1 overflow-x-auto pb-1 scrollbar-hide">
        {days.map((d, idx) => (
          <button
            key={d.date}
            onClick={() => setActiveDay(idx)}
            className={cn(
              'shrink-0 px-3 py-1.5 rounded-full font-sans text-xs font-semibold transition-all duration-[var(--duration-base)]',
              activeDay === idx
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-secondary',
            )}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="flex flex-col mt-4 px-1">
        {day?.events.map((event, idx) => {
          const Icon = EVENT_ICONS[event.type]
          const isLast = idx === day.events.length - 1

          return (
            <div key={event.id} className="flex gap-3">
              {/* Left: dot + line */}
              <div className="flex flex-col items-center">
                <EventDot status={event.status} />
                {!isLast && (
                  <div
                    className={cn(
                      'w-px flex-1 mt-1 mb-1 min-h-[24px]',
                      event.status === 'completed' ? 'bg-primary/30' : 'bg-border',
                    )}
                  />
                )}
              </div>

              {/* Right: content */}
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
                      <p
                        className={cn(
                          'font-sans text-sm font-semibold leading-snug',
                          event.status === 'completed'
                            ? 'text-muted-foreground line-through decoration-1'
                            : 'text-foreground',
                        )}
                      >
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

                {/* Active event expansion */}
                {event.status === 'active' && (event.detail || event.actionLabel) && (
                  <div className="mt-2 ml-5 flex items-center gap-2 animate-fade-in">
                    {event.detail && (
                      <p className="font-sans text-xs text-muted-foreground flex-1">
                        {event.detail}
                      </p>
                    )}
                    {event.actionLabel && event.onAction && (
                      <Button
                        variant="accent"
                        size="sm"
                        onClick={event.onAction}
                      >
                        {event.actionLabel}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Add expense strip */}
      <div className="mt-2 pt-3 border-t border-border">
        <button
          onClick={onAddExpense}
          className="w-full flex items-center gap-2 px-2 py-2.5 rounded-xl hover:bg-muted transition-colors duration-[var(--duration-base)]"
        >
          <div className="w-7 h-7 rounded-lg bg-accent-soft flex items-center justify-center shrink-0">
            <Plus size={14} strokeWidth={1.5} className="text-accent-text" />
          </div>
          <p className="font-sans text-sm font-semibold text-foreground">Añadir gasto</p>
        </button>
      </div>
    </div>
  )
}

// --- Mock Data ---
export const MOCK_TIMELINE_DAYS: TimelineDay[] = [
  {
    date: '2026-06-15',
    label: 'Lun 15',
    events: [
      {
        id: 'ev-1',
        type: 'cabify',
        title: 'Cabify · Casa → MAD T4',
        time: '06:00',
        status: 'completed',
        detail: 'Carlos M. · BMW Serie 3',
      },
      {
        id: 'ev-2',
        type: 'flight',
        title: 'IB 3456 · MAD → LCG',
        time: '07:30',
        location: 'Puerta C22 · Asiento 14A',
        status: 'active',
        detail: 'Salida en 20 min. Puerta C22.',
        actionLabel: 'Ver boarding',
      },
      {
        id: 'ev-3',
        type: 'hotel',
        title: 'Check-in NH Finisterre',
        time: '14:00',
        location: 'A Coruña',
        status: 'upcoming',
      },
      {
        id: 'ev-4',
        type: 'meal',
        title: 'Cena equipo',
        time: '21:00',
        status: 'upcoming',
      },
    ],
  },
  {
    date: '2026-06-16',
    label: 'Mar 16',
    events: [
      {
        id: 'ev-5',
        type: 'work',
        title: 'Reunión Inditex HQ',
        time: '09:00',
        location: 'Arteixo · Sala Atlántico',
        status: 'upcoming',
        actionLabel: 'Pedir Cabify',
      },
      {
        id: 'ev-6',
        type: 'meal',
        title: 'Comida equipo',
        time: '14:00',
        status: 'upcoming',
      },
    ],
  },
  {
    date: '2026-06-17',
    label: 'Mié 17',
    events: [
      {
        id: 'ev-7',
        type: 'hotel',
        title: 'Check-out NH Finisterre',
        time: '12:00',
        status: 'upcoming',
      },
      {
        id: 'ev-8',
        type: 'flight',
        title: 'VY 6234 · LCG → MAD',
        time: '19:30',
        status: 'upcoming',
      },
    ],
  },
]
