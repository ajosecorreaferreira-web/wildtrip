import { cn } from '@/lib/utils'

export type BudgetBarVariant = 'compact' | 'default' | 'hero' | 'ring'

export interface BudgetBarProps {
  spent: number
  total: number
  variant?: BudgetBarVariant
  showSaved?: boolean
  className?: string
}

function getBarColorClass(pct: number): string {
  if (pct >= 100) return 'bg-destructive'
  if (pct >= 80)  return 'bg-warning'
  return 'bg-accent'
}

function formatEUR(n: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n)
}

export function BudgetBar({
  spent,
  total,
  variant = 'default',
  showSaved,
  className,
}: BudgetBarProps) {
  const pct = total > 0 ? Math.min((spent / total) * 100, 100) : 0
  const remaining = total - spent
  const barColor = getBarColorClass(pct)

  if (variant === 'compact') {
    return (
      <div
        className={cn('h-1.5 w-full rounded-full bg-muted overflow-hidden', className)}
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${Math.round(pct)}% del presupuesto usado`}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-[var(--duration-slower)] ease-[var(--ease-elegant)]',
            barColor
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    )
  }

  if (variant === 'ring') {
    const R = 40
    const circumference = 2 * Math.PI * R
    const strokeDash = (pct / 100) * circumference
    const ringStroke =
      pct >= 100 ? 'var(--destructive)' : pct >= 80 ? 'var(--warning)' : 'var(--accent)'

    return (
      <div
        className={cn('relative inline-flex items-center justify-center', className)}
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${Math.round(pct)}% del presupuesto usado`}
      >
        <svg width="100" height="100" viewBox="0 0 100 100" className="-rotate-90" aria-hidden>
          <circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke="var(--border)"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke={ringStroke}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${strokeDash} ${circumference}`}
            className="transition-all duration-[var(--duration-slower)] ease-[var(--ease-elegant)]"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="font-sans text-lg font-semibold text-foreground">
            {Math.round(pct)}%
          </span>
          <span className="font-sans text-[10px] uppercase tracking-wide text-muted-foreground">
            usado
          </span>
        </div>
      </div>
    )
  }

  const isHero = variant === 'hero'
  const trackClass    = isHero ? 'bg-primary-foreground/20' : 'bg-muted'
  const labelClass    = isHero ? 'text-primary-foreground/60' : 'text-muted-foreground'
  const mainTextClass = isHero ? 'text-primary-foreground' : 'text-foreground'
  const subTextClass  = isHero ? 'text-primary-foreground/70' : 'text-muted-foreground'

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex items-end justify-between">
        <div>
          <p className={cn('font-sans text-xs uppercase tracking-wide font-semibold', labelClass)}>
            Gastado
          </p>
          <p className={cn('font-sans text-xl font-semibold', mainTextClass)}>
            {formatEUR(spent)}
          </p>
        </div>
        <div className="text-right">
          <p className={cn('font-sans text-xs uppercase tracking-wide font-semibold', labelClass)}>
            Total
          </p>
          <p className={cn('font-sans text-sm font-medium', subTextClass)}>
            {formatEUR(total)}
          </p>
        </div>
      </div>

      <div
        className={cn('h-2 w-full rounded-full overflow-hidden', trackClass)}
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${Math.round(pct)}% del presupuesto usado`}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-[var(--duration-slower)] ease-[var(--ease-elegant)]',
            barColor
          )}
          style={{ width: `${pct}%` }}
        />
      </div>

      {showSaved && remaining > 0 && (
        <p className={cn('font-sans text-xs', subTextClass)}>
          {formatEUR(remaining)} disponibles
        </p>
      )}
    </div>
  )
}

// --- Mock Data ---
export const MOCK_BUDGET_BARS = {
  healthy:  { spent: 650,  total: 1200, label: 'Barcelona — bajo presupuesto' },
  warning:  { spent: 980,  total: 1200, label: 'Madrid — casi agotado' },
  exceeded: { spent: 1300, total: 1200, label: 'Lisboa — superado' },
  zero:     { spent: 0,    total: 800,  label: 'Sin gastos aún' },
}
