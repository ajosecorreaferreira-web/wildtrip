import * as React from 'react'
import {
  Plane,
  Car,
  Hotel,
  Clock,
  ChevronDown,
  ChevronUp,
  Receipt,
  Plus,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { StatusBadge } from './status-badge'
import type { StatusBadgeStatus } from './status-badge'

type EventType = 'flight' | 'cabify' | 'hotel' | 'other'

export interface TimelineEvent {
  id: string
  type: EventType
  title: string
  time: string
  location?: string
  status: StatusBadgeStatus
  ctaLabel?: string
  onCta?: () => void
}

export interface DayExpense {
  description: string
  amount: number
  currency?: string
}

export interface TimelineDay {
  date: string
  label: string
  events: TimelineEvent[]
  expenses?: DayExpense[]
}

export interface TripTimelineProps {
  days: TimelineDay[]
  className?: string
}

const EVENT_ICONS: Record<EventType, React.ElementType> = {
  flight: Plane,
  cabify: Car,
  hotel: Hotel,
  other: Clock,
}

function ExpenseStrip({ expenses, currency = 'EUR' }: { expenses: DayExpense[]; currency?: string }) {
  const [open, setOpen] = React.useState(false)
  const total = expenses.reduce((s, e) => s + e.amount, 0)
  const fmt = (n: number) =>
    new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(n)

  return (
    <div className="mt-3 rounded-xl border bg-muted/40 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 min-h-[44px] text-sm"
      >
        <span className="flex items-center gap-2 text-muted-foreground font-medium">
          <Receipt size={20} strokeWidth={1.5} />
          Gastos del día
        </span>
        <span className="flex items-center gap-2">
          <span className="font-semibold text-foreground tabular-nums">{fmt(total)}</span>
          {open ? (
            <ChevronUp size={20} strokeWidth={1.5} className="text-muted-foreground" />
          ) : (
            <ChevronDown size={20} strokeWidth={1.5} className="text-muted-foreground" />
          )}
        </span>
      </button>
      {open && (
        <div className="px-4 pb-3 space-y-2 border-t border-border animate-fade-in">
          {expenses.map((e, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{e.description}</span>
              <span className="font-medium text-foreground tabular-nums">{fmt(e.amount)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function EventRow({ event }: { event: TimelineEvent }) {
  const Icon = EVENT_ICONS[event.type]
  return (
    <div className="flex gap-4 py-3 border-b border-border last:border-0">
      <div className="flex flex-col items-center gap-1 shrink-0">
        <div className="size-10 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center">
          <Icon size={20} strokeWidth={1.5} className="text-[var(--accent-text)]" />
        </div>
        <div className="w-px flex-1 bg-border min-h-[16px]" aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0 pt-1.5 pb-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{event.title}</p>
            {event.location && (
              <p className="text-xs text-muted-foreground mt-0.5">{event.location}</p>
            )}
          </div>
          <StatusBadge status={event.status} className="shrink-0" />
        </div>
        <p className="text-xs text-muted-foreground">{event.time}</p>
        {event.ctaLabel && event.onCta && (
          <button
            onClick={event.onCta}
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-text)] hover:underline underline-offset-2 min-h-[44px] transition-opacity duration-150"
          >
            <Plus size={16} strokeWidth={1.5} />
            {event.ctaLabel}
          </button>
        )}
      </div>
    </div>
  )
}

function TripTimeline({ days, className }: TripTimelineProps) {
  const [activeDay, setActiveDay] = React.useState(0)
  const day = days[activeDay]

  return (
    <div className={cn('rounded-2xl overflow-hidden border', className)}>
      {/* Tabs — navy header */}
      <div className="bg-[var(--sidebar)] px-4 py-0 flex overflow-x-auto">
        {days.map((d, idx) => (
          <button
            key={d.date}
            onClick={() => setActiveDay(idx)}
            className={cn(
              'shrink-0 px-4 py-4 text-sm font-medium border-b-2 transition-all duration-150 min-h-[44px]',
              activeDay === idx
                ? 'border-[var(--sidebar-primary)] text-white'
                : 'border-transparent text-[var(--sidebar-foreground)] opacity-60 hover:opacity-100'
            )}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Day content */}
      {day && (
        <div className="bg-card p-4 animate-fade-in">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            {day.date}
          </p>
          <div>
            {day.events.map((event) => (
              <EventRow key={event.id} event={event} />
            ))}
          </div>
          {day.expenses && day.expenses.length > 0 && (
            <ExpenseStrip expenses={day.expenses} />
          )}
        </div>
      )}
    </div>
  )
}

export { TripTimeline }
