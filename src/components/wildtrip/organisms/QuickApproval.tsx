import * as React from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar, Button } from '@/components/wildtrip/atoms'

export interface QuickApprovalProps {
  requestId: string
  requesterName: string
  requesterAvatar: string
  destination: string
  dateRange: string
  breakdown: {
    flights: number
    hotel: number
    cabify: number
  }
  totalAmount: number
  clientBudget: number
  clientBudgetPct: number
  onApprove: (id: string) => Promise<void>
  onReject: (id: string) => Promise<void>
  onViewFull?: () => void
  className?: string
}

function formatEUR(n: number) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n)
}

export function QuickApproval({
  requestId,
  requesterName,
  requesterAvatar,
  destination,
  dateRange,
  breakdown,
  totalAmount,
  clientBudget,
  clientBudgetPct,
  onApprove,
  onReject,
  onViewFull,
  className,
}: QuickApprovalProps) {
  const [loading, setLoading] = React.useState<'approve' | 'reject' | null>(null)
  const [resolved, setResolved] = React.useState<'approved' | 'rejected' | null>(null)

  async function handleApprove() {
    setLoading('approve')
    try {
      await onApprove(requestId)
      setResolved('approved')
    } finally {
      setLoading(null)
    }
  }

  async function handleReject() {
    setLoading('reject')
    try {
      await onReject(requestId)
      setResolved('rejected')
    } finally {
      setLoading(null)
    }
  }

  if (resolved) {
    const isApproved = resolved === 'approved'
    return (
      <div
        className={cn(
          'flex items-center gap-3 rounded-xl px-4 py-3 animate-success-pop',
          isApproved ? 'bg-success-muted' : 'bg-destructive-muted',
          className,
        )}
      >
        <Avatar name={requesterName} size="sm" />
        <p className={cn('font-sans text-sm font-semibold', isApproved ? 'text-success-text' : 'text-destructive')}>
          {isApproved ? 'Aprobado' : 'Rechazado'} · {destination}
        </p>
      </div>
    )
  }

  const clientRemaining = clientBudget - (clientBudgetPct / 100) * clientBudget
  const budgetColor = clientBudgetPct >= 100
    ? 'bg-destructive'
    : clientBudgetPct >= 80
    ? 'bg-warning'
    : 'bg-accent'

  return (
    <div
      className={cn('rounded-2xl bg-card border border-border px-5 py-5 flex flex-col gap-4', className)}
      style={{ boxShadow: 'var(--shadow-md)' }}
    >
      {/* Requester */}
      <div className="flex items-center gap-3">
        <Avatar name={requesterAvatar} size="base" />
        <div className="flex-1 min-w-0">
          <p className="font-sans text-sm font-semibold text-foreground">{requesterName}</p>
          <p className="font-sans text-xs text-muted-foreground">
            {destination} · {dateRange}
          </p>
        </div>
        <p className="font-sans text-lg font-semibold text-foreground shrink-0">
          {formatEUR(totalAmount)}
        </p>
      </div>

      {/* Breakdown */}
      <div className="flex gap-2">
        {[
          { label: '✈ Vuelos',  value: breakdown.flights },
          { label: '🏨 Hotel',  value: breakdown.hotel },
          { label: '🚕 Cabify', value: breakdown.cabify },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex-1 rounded-xl bg-muted px-3 py-2.5 text-center"
          >
            <p className="font-sans text-[10px] text-muted-foreground">{label}</p>
            <p className="font-sans text-xs font-semibold text-foreground mt-0.5">
              {formatEUR(value)}
            </p>
          </div>
        ))}
      </div>

      {/* Client budget */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <p className="font-sans text-xs text-muted-foreground">
            Presupuesto cliente
          </p>
          <p className="font-sans text-xs font-semibold text-foreground">
            {formatEUR(clientRemaining)} libres
          </p>
        </div>
        <div
          className="h-1.5 w-full rounded-full bg-muted overflow-hidden"
          role="progressbar"
          aria-valuenow={clientBudgetPct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className={cn('h-full rounded-full transition-all duration-[var(--duration-slower)]', budgetColor)}
            style={{ width: `${Math.min(clientBudgetPct, 100)}%` }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="base"
          className="flex-1"
          loading={loading === 'reject'}
          disabled={loading !== null}
          onClick={handleReject}
        >
          Rechazar
        </Button>
        <Button
          variant="accent"
          size="base"
          className="flex-1"
          loading={loading === 'approve'}
          disabled={loading !== null}
          onClick={handleApprove}
        >
          Aprobar
        </Button>
      </div>

      {/* View full link */}
      {onViewFull && (
        <button
          onClick={onViewFull}
          className="flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Ver solicitud completa
          <ChevronRight size={12} strokeWidth={1.5} />
        </button>
      )}
    </div>
  )
}

// --- Mock Data ---
export const MOCK_QUICK_APPROVAL: QuickApprovalProps = {
  requestId: 'req-003',
  requesterName: 'Ana García',
  requesterAvatar: 'AG',
  destination: 'A Coruña',
  dateRange: '15–17 jun',
  breakdown: { flights: 178, hotel: 267, cabify: 45 },
  totalAmount: 490,
  clientBudget: 2000,
  clientBudgetPct: 34,
  onApprove: async () => {},
  onReject: async () => {},
}
