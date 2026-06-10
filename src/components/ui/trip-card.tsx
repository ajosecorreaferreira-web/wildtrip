import * as React from 'react'
import { Calendar, User, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { StatusBadge, type StatusBadgeStatus } from './status-badge'

interface TripBudget {
  spent: number
  total: number
  currency?: string
}

interface TripDates {
  start: string
  end: string
}

export interface TripCardProps extends React.HTMLAttributes<HTMLDivElement> {
  destination: string
  dates: TripDates
  traveler: string
  status: StatusBadgeStatus
  budget: TripBudget
}

function formatAmount(amount: number, currency: string): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

function TripCard({
  destination,
  dates,
  traveler,
  status,
  budget,
  className,
  ...props
}: TripCardProps) {
  const currency = budget.currency ?? 'EUR'
  const percent = Math.min(Math.round((budget.spent / budget.total) * 100), 100)

  const barColor =
    percent >= 90
      ? 'bg-destructive'
      : percent >= 70
        ? 'bg-[var(--warning)]'
        : 'bg-[var(--accent)]'

  return (
    <div
      className={cn(
        'rounded-2xl border bg-card p-5 cursor-pointer',
        'hover:-translate-y-[3px] hover:shadow-lg',
        className
      )}
      style={{
        transition:
          'transform var(--duration-base) var(--ease-default), box-shadow var(--duration-base) var(--ease-default)',
      }}
      {...props}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <h3 className="font-display text-2xl font-normal leading-tight tracking-tight text-card-foreground truncate flex-1 min-w-0">
          {destination}
        </h3>
        <StatusBadge status={status} className="shrink-0 mt-0.5" />
      </div>

      {/* Meta */}
      <div className="flex flex-col gap-2 mb-5">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar size={20} strokeWidth={1.5} className="shrink-0" />
          <span>
            {dates.start} — {dates.end}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User size={20} strokeWidth={1.5} className="shrink-0" />
          <span className="truncate">{traveler}</span>
        </div>
      </div>

      {/* Budget */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2 text-sm">
          <span className="flex items-center gap-1.5 text-muted-foreground shrink-0">
            <TrendingUp size={20} strokeWidth={1.5} />
            Presupuesto
          </span>
          <span className="font-medium text-card-foreground text-right">
            {formatAmount(budget.spent, currency)}{' '}
            <span className="font-normal text-muted-foreground">
              / {formatAmount(budget.total, currency)}
            </span>
          </span>
        </div>

        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div
            className={cn('h-full rounded-full', barColor)}
            style={{
              width: `${percent}%`,
              transition: 'width var(--duration-slow) var(--ease-out)',
            }}
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${percent}% del presupuesto usado`}
          />
        </div>

        <p className="text-xs text-muted-foreground text-right">{percent}% usado</p>
      </div>
    </div>
  )
}

export { TripCard }
