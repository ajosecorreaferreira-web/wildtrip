import { TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export interface BudgetMeterProps {
  spent: number
  total: number
  currency?: string
  label?: string
  showPercent?: boolean
  className?: string
}

function BudgetMeter({
  spent,
  total,
  currency = 'EUR',
  label,
  showPercent = true,
  className,
}: BudgetMeterProps) {
  const percent = Math.min(Math.round((spent / total) * 100), 100)

  const barColor =
    percent >= 90 ? 'bg-destructive' : percent >= 70 ? 'bg-[var(--warning)]' : 'bg-[var(--accent)]'

  const textColor =
    percent >= 90
      ? 'text-destructive'
      : percent >= 70
        ? 'text-[var(--warning-text)]'
        : 'text-[var(--accent-text)]'

  const fmt = (n: number) =>
    new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(n)

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between gap-2 text-sm">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <TrendingUp size={20} strokeWidth={1.5} />
          {label ?? 'Presupuesto'}
        </span>
        <span className="font-medium text-foreground tabular-nums">
          {fmt(spent)}{' '}
          <span className="font-normal text-muted-foreground">/ {fmt(total)}</span>
        </span>
      </div>

      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
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

      {showPercent && (
        <div className="flex justify-end">
          <Badge className={cn('text-xs font-medium border-0 bg-transparent px-0 py-0', textColor)}>
            {percent}% usado
          </Badge>
        </div>
      )}
    </div>
  )
}

export { BudgetMeter }
