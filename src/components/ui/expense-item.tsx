import * as React from 'react'
import {
  Receipt,
  CreditCard,
  Plane,
  Hotel,
  Utensils,
  Car,
  Package,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Skeleton } from './skeleton'
import { StatusBadge, type StatusBadgeStatus } from './status-badge'

const CATEGORY_ICONS: [string, React.ElementType][] = [
  ['hotel', Hotel],
  ['alojamiento', Hotel],
  ['vuelo', Plane],
  ['avión', Plane],
  ['transporte', Plane],
  ['taxi', Car],
  ['alquiler', Car],
  ['coche', Car],
  ['comida', Utensils],
  ['restaurante', Utensils],
  ['dieta', Utensils],
  ['factura', CreditCard],
  ['tarjeta', CreditCard],
  ['otros', Package],
]

function getCategoryIcon(category: string): React.ElementType {
  const key = category.toLowerCase()
  for (const [match, Icon] of CATEGORY_ICONS) {
    if (key.includes(match)) return Icon
  }
  return Receipt
}

export interface ExpenseItemProps extends React.HTMLAttributes<HTMLDivElement> {
  category: string
  amount: number
  currency?: string
  date: string
  status: StatusBadgeStatus
  description?: string
  loading?: boolean
}

function ExpenseItemSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 px-4 py-3 rounded-xl border bg-card min-h-[44px]',
        className
      )}
      aria-busy="true"
      aria-label="Cargando gasto..."
    >
      <Skeleton className="size-10 rounded-xl shrink-0" />
      <div className="flex-1 space-y-2 min-w-0">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-20" />
      </div>
      <div className="flex flex-col items-end gap-2 shrink-0">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
    </div>
  )
}

function ExpenseItem({
  category,
  amount,
  currency = 'EUR',
  date,
  status,
  description,
  loading = false,
  className,
  ...props
}: ExpenseItemProps) {
  if (loading) {
    return <ExpenseItemSkeleton className={className} />
  }

  const Icon = getCategoryIcon(category)

  const formattedAmount = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount)

  return (
    <div
      className={cn(
        'flex items-center gap-4 px-4 py-3 rounded-xl border bg-card min-h-[44px]',
        className
      )}
      {...props}
    >
      {/* Category icon */}
      <div className="size-10 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center shrink-0">
        <Icon
          size={20}
          strokeWidth={1.5}
          className="text-[var(--accent-text)]"
        />
      </div>

      {/* Description + date */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-card-foreground truncate">
          {description ?? category}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{date}</p>
      </div>

      {/* Amount + status */}
      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <span className="text-sm font-semibold text-card-foreground tabular-nums">
          {formattedAmount}
        </span>
        <StatusBadge status={status} />
      </div>
    </div>
  )
}

export { ExpenseItem, ExpenseItemSkeleton }
