import { cn } from '@/lib/utils'
import { BudgetBar } from '@/components/wildtrip/atoms'

export type BudgetMiniCardVariant = 'light' | 'dark'

export interface BudgetMiniCardProps {
  spent: number
  total: number
  daysLeft?: number
  variant: BudgetMiniCardVariant
  className?: string
}

function formatEUR(n: number) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n)
}

export function BudgetMiniCard({
  spent,
  total,
  daysLeft,
  variant,
  className,
}: BudgetMiniCardProps) {
  const remaining = total - spent
  const isDark = variant === 'dark'

  return (
    <div className={cn('rounded-xl p-4', isDark ? 'bg-primary/40' : 'bg-card border border-border', className)}>
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <p
          className={cn(
            'font-sans text-xs font-semibold uppercase tracking-wide',
            isDark ? 'text-primary-foreground/60' : 'text-muted-foreground',
          )}
        >
          Presupuesto
        </p>
        {daysLeft !== undefined && (
          <p
            className={cn(
              'font-sans text-xs',
              isDark ? 'text-primary-foreground/60' : 'text-muted-foreground',
            )}
          >
            {daysLeft}d restantes
          </p>
        )}
      </div>

      {/* Budget bar */}
      <BudgetBar
        spent={spent}
        total={total}
        variant={isDark ? 'hero' : 'default'}
      />

      {/* Available */}
      {remaining >= 0 && (
        <p
          className={cn(
            'font-sans text-xs mt-2',
            isDark ? 'text-primary-foreground/60' : 'text-muted-foreground',
          )}
        >
          <span
            className={cn(
              'font-semibold',
              isDark ? 'text-primary-foreground' : 'text-foreground',
            )}
          >
            {formatEUR(remaining)}
          </span>
          {' '}disponibles
        </p>
      )}
    </div>
  )
}

// --- Mock Data ---
export const MOCK_BUDGET_MINI_CARDS = {
  lightHealthy:  { spent: 320,  total: 800,  daysLeft: 2, variant: 'light' as BudgetMiniCardVariant },
  lightWarning:  { spent: 720,  total: 800,  daysLeft: 1, variant: 'light' as BudgetMiniCardVariant },
  darkHealthy:   { spent: 650,  total: 1200, daysLeft: 1, variant: 'dark'  as BudgetMiniCardVariant },
  darkExceeded:  { spent: 1300, total: 1200,              variant: 'dark'  as BudgetMiniCardVariant },
}
