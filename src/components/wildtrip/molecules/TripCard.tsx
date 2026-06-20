import { cn } from '@/lib/utils'
import { StatusBadge, BudgetBar } from '@/components/wildtrip/atoms'
import type { StatusBadgeStatus } from '@/components/wildtrip/atoms'

export type TripStatus = 'pending' | 'approved' | 'in_progress' | 'completed' | 'draft' | 'rejected'

export interface TripCardProps {
  id: string
  destination: string
  clientName: string
  dateRange: string
  totalDays: number
  status: TripStatus
  approvedBudget: number
  spentAmount: number
  isNew?: boolean
  onClick?: () => void
}

// Map TripStatus → StatusBadgeStatus
const STATUS_BADGE_MAP: Record<TripStatus, StatusBadgeStatus> = {
  pending:     'pending',
  approved:    'approved',
  in_progress: 'in_progress',
  completed:   'completed',
  draft:       'draft',
  rejected:    'rejected',
}

export function TripCard({
  destination,
  clientName,
  dateRange,
  status,
  approvedBudget,
  spentAmount,
  isNew,
  onClick,
}: TripCardProps) {
  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      className={cn(
        'rounded-xl bg-card border border-border px-4 py-4 flex flex-col gap-3',
        'transition-all duration-[var(--duration-base)]',
        onClick && 'cursor-pointer hover:shadow-md hover:border-primary/30',
        isNew && 'animate-success-pop',
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-display text-2xl text-foreground leading-tight truncate">
            {destination}
          </h3>
          <p className="font-sans text-xs text-muted-foreground mt-0.5">
            {clientName} · {dateRange}
          </p>
        </div>
        <StatusBadge status={STATUS_BADGE_MAP[status]} size="sm" />
      </div>

      {/* Budget bar */}
      {approvedBudget > 0 && (
        <BudgetBar
          spent={spentAmount}
          total={approvedBudget}
          variant="compact"
        />
      )}
    </div>
  )
}

// --- Mock Data ---
export const MOCK_TRIP_CARDS: TripCardProps[] = [
  {
    id: 'trip-1',
    destination: 'A Coruña',
    clientName: 'Inditex',
    dateRange: '15–17 jun',
    totalDays: 3,
    status: 'in_progress',
    approvedBudget: 1200,
    spentAmount: 650,
    isNew: false,
  },
  {
    id: 'trip-2',
    destination: 'Barcelona',
    clientName: 'Mango',
    dateRange: '22–24 jun',
    totalDays: 3,
    status: 'approved',
    approvedBudget: 900,
    spentAmount: 0,
  },
  {
    id: 'trip-3',
    destination: 'Madrid',
    clientName: 'Hawkers',
    dateRange: '1–2 jul',
    totalDays: 2,
    status: 'pending',
    approvedBudget: 600,
    spentAmount: 0,
  },
  {
    id: 'trip-4',
    destination: 'Lisboa',
    clientName: 'Nos Telecom',
    dateRange: '10–12 may',
    totalDays: 3,
    status: 'completed',
    approvedBudget: 1000,
    spentAmount: 1120,
  },
]
