import { cn } from '@/lib/utils'
import { StatusBadge } from '@/components/wildtrip/atoms'

export type ExpenseCategory = 'meal' | 'transport' | 'hotel' | 'coffee' | 'other'

export type ExpenseSource = 'revolut_auto' | 'cash_manual'

export type ExpenseStatus = 'ok' | 'pending_ticket' | 'confirmed'

export interface ExpenseItemProps {
  id: string
  description: string
  category: ExpenseCategory
  amount: number
  date: string
  time?: string
  source: ExpenseSource
  status: ExpenseStatus
  tripName?: string
  isAnimated?: boolean
  staggerIndex?: number
  onClick?: () => void
}

export const EXPENSE_EMOJIS: Record<ExpenseCategory, string> = {
  meal:      '🍽️',
  transport: '🚕',
  hotel:     '🏨',
  coffee:    '☕',
  other:     '📎',
}

function formatEUR(n: number) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(n)
}

function getBadgeFromStatus(status: ExpenseStatus, source: ExpenseSource) {
  if (status === 'pending_ticket') return <StatusBadge status="no_ticket" size="sm" />
  if (status === 'confirmed')      return <StatusBadge status="approved"  size="sm" />
  if (status === 'ok' && source === 'revolut_auto') return <StatusBadge status="auto" size="sm" />
  return null
}

export function ExpenseItem({
  description,
  category,
  amount,
  date,
  time,
  source,
  status,
  tripName,
  isAnimated,
  staggerIndex = 0,
  onClick,
}: ExpenseItemProps) {
  const isPendingTicket = status === 'pending_ticket'

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      className={cn(
        'flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-[var(--duration-base)]',
        onClick && 'cursor-pointer hover:bg-muted/50',
        isPendingTicket
          ? 'border border-warning bg-warning-muted/30'
          : 'border border-transparent',
        isAnimated && 'animate-list-item opacity-0',
      )}
      style={
        isAnimated
          ? { animationDelay: `${staggerIndex * 50}ms` }
          : undefined
      }
    >
      {/* Category emoji */}
      <div
        className="w-9 h-9 rounded-xl bg-muted shrink-0 flex items-center justify-center text-base"
        aria-hidden
      >
        {EXPENSE_EMOJIS[category]}
      </div>

      {/* Description + metadata */}
      <div className="flex-1 min-w-0">
        <p className="font-sans text-sm font-semibold text-foreground leading-snug truncate">
          {description}
        </p>
        <p className="font-sans text-xs text-muted-foreground mt-0.5 truncate">
          {tripName && <span>{tripName} · </span>}
          {date}
          {time && <span> · {time}</span>}
        </p>
      </div>

      {/* Badge + amount */}
      <div className="shrink-0 flex flex-col items-end gap-1">
        {getBadgeFromStatus(status, source)}
        <p className="font-sans text-sm font-semibold text-foreground">
          {formatEUR(amount)}
        </p>
      </div>
    </div>
  )
}

// --- Mock Data ---
export const MOCK_EXPENSES: ExpenseItemProps[] = [
  {
    id: 'exp-1',
    description: 'Restaurante Domus',
    category: 'meal',
    amount: 34.5,
    date: '15 jun',
    time: '14:30',
    source: 'revolut_auto',
    status: 'ok',
    tripName: 'A Coruña',
    isAnimated: true,
    staggerIndex: 0,
  },
  {
    id: 'exp-2',
    description: 'Cabify · MAD → LCG',
    category: 'transport',
    amount: 18.0,
    date: '15 jun',
    time: '06:10',
    source: 'revolut_auto',
    status: 'ok',
    tripName: 'A Coruña',
    isAnimated: true,
    staggerIndex: 1,
  },
  {
    id: 'exp-3',
    description: 'Cena equipo Inditex',
    category: 'meal',
    amount: 87.0,
    date: '16 jun',
    time: '21:00',
    source: 'cash_manual',
    status: 'pending_ticket',
    tripName: 'A Coruña',
    isAnimated: true,
    staggerIndex: 2,
  },
  {
    id: 'exp-4',
    description: 'NH Finisterre · 2 noches',
    category: 'hotel',
    amount: 178.0,
    date: '15–16 jun',
    source: 'revolut_auto',
    status: 'confirmed',
    tripName: 'A Coruña',
    isAnimated: true,
    staggerIndex: 3,
  },
]
