import * as React from 'react'
import { Download, TrendingUp, Users, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BudgetMeter } from './budget-meter'

type DashboardView = 'consultant' | 'manager' | 'finance'

export interface ClientBudget {
  clientName: string
  spent: number
  total: number
  currency?: string
}

export interface MonthlyData {
  month: string
  amount: number
}

export interface ExpenseRow {
  id: string
  date: string
  traveler: string
  destination: string
  amount: number
  currency?: string
  category: string
}

export interface BudgetDashboardProps {
  role: DashboardView
  clientBudgets: ClientBudget[]
  monthlyData: MonthlyData[]
  expenses: ExpenseRow[]
  onExport?: () => void
  className?: string
}

const VIEW_META: Record<DashboardView, { label: string; icon: React.ElementType }> = {
  consultant: { label: 'Mis gastos', icon: TrendingUp },
  manager: { label: 'Equipo', icon: Users },
  finance: { label: 'Global', icon: Globe },
}

function MiniChart({ data }: { data: MonthlyData[] }) {
  const max = Math.max(...data.map((d) => d.amount), 1)
  return (
    <div className="flex items-end gap-1.5 h-16">
      {data.map((d) => {
        const pct = Math.round((d.amount / max) * 100)
        return (
          <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-t-md bg-[var(--accent)]"
              style={{
                height: `${pct}%`,
                minHeight: 4,
                transition: 'height var(--duration-slow) var(--ease-out)',
                opacity: 0.75,
              }}
              title={`${d.month}: ${d.amount}€`}
            />
            <span className="text-[9px] text-muted-foreground">{d.month.slice(0, 3)}</span>
          </div>
        )
      })}
    </div>
  )
}

function ExpensesTable({
  expenses,
  onExport,
}: {
  expenses: ExpenseRow[]
  onExport?: () => void
}) {
  const fmt = (amount: number, currency = 'EUR') =>
    new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-foreground">Gastos recientes</h4>
        {onExport && (
          <button
            onClick={onExport}
            className={cn(
              'inline-flex items-center gap-1.5 text-xs font-medium',
              'rounded-xl border border-border px-3 min-h-[44px]',
              'text-muted-foreground hover:bg-muted transition-colors duration-150'
            )}
          >
            <Download size={16} strokeWidth={1.5} />
            Exportar
          </button>
        )}
      </div>
      <div className="rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted">
              <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Destino
              </th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground hidden sm:table-cell">
                Fecha
              </th>
              <th className="text-right px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Importe
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {expenses.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-muted/40 transition-colors duration-100"
              >
                <td className="px-4 py-3">
                  <p className="font-medium text-foreground truncate max-w-[160px]">
                    {row.destination}
                  </p>
                  <p className="text-xs text-muted-foreground">{row.category}</p>
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                  {row.date}
                </td>
                <td className="px-4 py-3 text-right font-semibold text-foreground tabular-nums">
                  {fmt(row.amount, row.currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function BudgetDashboard({
  role,
  clientBudgets,
  monthlyData,
  expenses,
  onExport,
  className,
}: BudgetDashboardProps) {
  const [view, setView] = React.useState<DashboardView>(role)

  return (
    <div className={cn('space-y-6', className)}>
      {/* View selector */}
      <div className="flex gap-1 rounded-xl bg-muted p-1">
        {(Object.keys(VIEW_META) as DashboardView[]).map((v) => {
          const Icon = VIEW_META[v].icon
          return (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                'flex-1 inline-flex items-center justify-center gap-1.5 text-sm font-medium',
                'rounded-lg min-h-[36px] transition-all duration-150',
                view === v
                  ? 'bg-card text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon size={16} strokeWidth={1.5} />
              <span className="hidden sm:inline">{VIEW_META[v].label}</span>
            </button>
          )
        })}
      </div>

      {/* Budget per client */}
      <div className="rounded-2xl border bg-card p-5 space-y-5">
        <h3 className="text-sm font-semibold text-foreground">Presupuesto por cliente</h3>
        {clientBudgets.map((cb) => (
          <BudgetMeter
            key={cb.clientName}
            spent={cb.spent}
            total={cb.total}
            currency={cb.currency}
            label={cb.clientName}
          />
        ))}
      </div>

      {/* Monthly chart */}
      {monthlyData.length > 0 && (
        <div className="rounded-2xl border bg-card p-5 space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Evolución mensual</h3>
          <MiniChart data={monthlyData} />
        </div>
      )}

      {/* Expenses table */}
      <ExpensesTable expenses={expenses} onExport={onExport} />
    </div>
  )
}

export { BudgetDashboard }
