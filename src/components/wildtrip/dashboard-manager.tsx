import * as React from 'react'
import { Filter, CheckCircle, Clock, Wallet, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { QuickApproval } from './quick-approval'
import type { QuickApprovalProps } from './quick-approval'

type Consultora = 'todas' | 'jungle_studio' | 'jungle_tech' | 'jungle_brand' | 'jungle_data'

const CONSULTORA_LABELS: Record<Consultora, string> = {
  todas: 'Todas',
  jungle_studio: 'Studio',
  jungle_tech: 'Tech',
  jungle_brand: 'Brand',
  jungle_data: 'Data',
}

export interface ManagerKPI {
  activeTrips: number
  pendingApproval: number
  budgetConsumed: number
  budgetTotal: number
  currency?: string
}

export interface PendingRequest
  extends Omit<QuickApprovalProps, 'onApprove' | 'onReject' | 'className'> {
  urgency: 'high' | 'medium' | 'low'
  consultora: Consultora
}

export interface DashboardManagerProps {
  kpi: ManagerKPI
  requests: PendingRequest[]
  onApprove: (id: string) => Promise<void> | void
  onReject: (id: string, reason: string) => Promise<void> | void
  className?: string
}

interface KPICardProps {
  label: string
  value: string | number
  sub?: string
  icon: React.ElementType
  highlight?: boolean
}

function KPICard({ label, value, sub, icon: Icon, highlight }: KPICardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border bg-card p-4 flex items-start gap-3',
        highlight && 'border-[var(--warning)] bg-[var(--warning-muted)]'
      )}
    >
      <div
        className={cn(
          'size-10 rounded-xl flex items-center justify-center shrink-0',
          highlight ? 'bg-[var(--warning-muted)]' : 'bg-[var(--accent-soft)]'
        )}
      >
        <Icon
          size={20}
          strokeWidth={1.5}
          className={highlight ? 'text-[var(--warning-text)]' : 'text-[var(--accent-text)]'}
        />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <p
          className={cn(
            'text-xl font-bold tabular-nums',
            highlight ? 'text-[var(--warning-text)]' : 'text-foreground'
          )}
        >
          {value}
        </p>
        {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
      </div>
    </div>
  )
}

function DashboardManager({
  kpi,
  requests,
  onApprove,
  onReject,
  className,
}: DashboardManagerProps) {
  const [filter, setFilter] = React.useState<Consultora>('todas')

  const fmt = (n: number) =>
    new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: kpi.currency ?? 'EUR',
      maximumFractionDigits: 0,
    }).format(n)

  const budgetPercent = Math.min(
    Math.round((kpi.budgetConsumed / kpi.budgetTotal) * 100),
    100
  )

  const filtered =
    filter === 'todas' ? requests : requests.filter((r) => r.consultora === filter)

  const sorted = [...filtered].sort((a, b) => {
    const order: Record<string, number> = { high: 0, medium: 1, low: 2 }
    return order[a.urgency] - order[b.urgency]
  })

  return (
    <div className={cn('space-y-6', className)}>
      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KPICard label="Viajes activos" value={kpi.activeTrips} icon={Users} />
        <KPICard
          label="Pendientes"
          value={kpi.pendingApproval}
          icon={Clock}
          highlight={kpi.pendingApproval > 3}
        />
        <KPICard
          label="Presupuesto"
          value={`${budgetPercent}%`}
          sub={`${fmt(kpi.budgetConsumed)} / ${fmt(kpi.budgetTotal)}`}
          icon={Wallet}
          highlight={budgetPercent >= 80}
        />
        <KPICard label="Solicitudes" value={requests.length} icon={CheckCircle} />
      </div>

      {/* Filter by consultora */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Filter size={20} strokeWidth={1.5} className="text-muted-foreground shrink-0" />
        {(Object.keys(CONSULTORA_LABELS) as Consultora[]).map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={cn(
              'shrink-0 rounded-full px-4 py-1.5',
              'text-xs font-semibold uppercase tracking-widest',
              'transition-all duration-150 min-h-[32px]',
              filter === c
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-secondary'
            )}
          >
            {CONSULTORA_LABELS[c]}
          </button>
        ))}
      </div>

      {/* Pending list */}
      {sorted.length === 0 ? (
        <div className="rounded-2xl border border-dashed bg-muted/30 p-10 flex flex-col items-center gap-3 text-center">
          <CheckCircle size={32} strokeWidth={1.5} className="text-[var(--accent)]" />
          <p className="text-sm font-semibold text-foreground">Todo al día.</p>
          <p className="text-sm text-muted-foreground">No hay solicitudes pendientes.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              Solicitudes pendientes
            </h3>
            <span className="text-xs text-muted-foreground">
              {sorted.length} solicitud{sorted.length !== 1 ? 'es' : ''}
            </span>
          </div>
          {sorted.map((req) => (
            <div key={req.id} className="relative">
              {req.urgency === 'high' && (
                <span className="absolute -top-2 left-4 z-10 rounded-full bg-destructive px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-destructive-foreground">
                  Urgente
                </span>
              )}
              <QuickApproval
                id={req.id}
                trip={req.trip}
                onApprove={onApprove}
                onReject={onReject}
                className={cn(req.urgency === 'high' && 'border-destructive')}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export { DashboardManager }
