import * as React from 'react'
import { CheckCircle2, MapPin, Calendar, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar, StatusBadge, Button } from '@/components/wildtrip/atoms'
import { BudgetMiniCard } from '@/components/wildtrip/molecules'

export type ApprovalStatus = 'pending' | 'approved' | 'rejected'

export interface ApprovalCardProps {
  id: string
  requesterName: string
  requesterRole: string
  destination: string
  clientName: string
  dateRange: string
  totalDays: number
  requestedAmount: number
  clientBudget: number
  clientBudgetUsed: number
  motivo: string
  urgency: 'high' | 'normal'
  status: ApprovalStatus
  onApprove: (id: string) => Promise<void>
  onReject: (id: string, reason: string) => Promise<void>
  isLoading?: boolean
}

function formatEUR(n: number) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n)
}

export function ApprovalCard({
  id,
  requesterName,
  requesterRole,
  destination,
  clientName,
  dateRange,
  totalDays,
  requestedAmount,
  clientBudget,
  clientBudgetUsed,
  motivo,
  urgency,
  status,
  onApprove,
  onReject,
  isLoading,
}: ApprovalCardProps) {
  const [rejectMode, setRejectMode] = React.useState(false)
  const [rejectReason, setRejectReason] = React.useState('')
  const [resolving, setResolving] = React.useState(false)
  const [resolved, setResolved] = React.useState<'approved' | 'rejected' | null>(
    status !== 'pending' ? status : null
  )

  async function handleApprove() {
    setResolving(true)
    try {
      await onApprove(id)
      setResolved('approved')
    } finally {
      setResolving(false)
    }
  }

  async function handleReject() {
    if (!rejectReason.trim()) return
    setResolving(true)
    try {
      await onReject(id, rejectReason)
      setResolved('rejected')
    } finally {
      setResolving(false)
    }
  }

  // Collapsed state after resolution
  if (resolved) {
    const isApproved = resolved === 'approved'
    return (
      <div
        className={cn(
          'flex items-center gap-3 rounded-xl px-4 py-3 animate-success-pop',
          isApproved ? 'bg-success-muted' : 'bg-destructive-muted',
        )}
      >
        <Avatar name={requesterName} size="sm" />
        <div className="flex-1 min-w-0">
          <p className={cn('font-sans text-sm font-semibold', isApproved ? 'text-success-text' : 'text-destructive')}>
            {isApproved ? 'Aprobado' : 'Rechazado'} · {destination}
          </p>
          <p className="font-sans text-xs text-muted-foreground">{requesterName} · {dateRange}</p>
        </div>
        <CheckCircle2
          size={20}
          strokeWidth={1.5}
          className={isApproved ? 'text-success-text' : 'text-destructive'}
        />
      </div>
    )
  }

  const clientSpent = (clientBudgetUsed / 100) * clientBudget

  return (
    <div
      className={cn(
        'rounded-2xl bg-card border flex flex-col overflow-y-auto max-h-[70vh]',
        urgency === 'high' ? 'border-warning' : 'border-border',
      )}
      style={{ boxShadow: 'var(--shadow-md)' }}
    >
      {/* Scrollable content */}
      <div className="flex flex-col gap-4 px-5 py-5 flex-1">
        {/* Urgency banner */}
        {urgency === 'high' && (
          <div className="flex items-center gap-2 -mt-1">
            <AlertTriangle size={14} strokeWidth={1.5} className="text-warning-text shrink-0" />
            <p className="font-sans text-xs font-semibold text-warning-text uppercase tracking-wide">
              Urgente
            </p>
          </div>
        )}

        {/* Requester header */}
        <div className="flex items-center gap-3">
          <Avatar name={requesterName} size="base" />
          <div className="flex-1 min-w-0">
            <p className="font-sans text-sm font-semibold text-foreground">{requesterName}</p>
            <p className="font-sans text-xs text-muted-foreground">{requesterRole}</p>
          </div>
          <StatusBadge status="pending" size="sm" />
        </div>

        {/* Trip details */}
        <div className="flex flex-col gap-2 pl-1">
          <div className="flex items-center gap-2">
            <MapPin size={14} strokeWidth={1.5} className="text-muted-foreground shrink-0" />
            <p className="font-sans text-sm text-foreground font-medium">
              {destination}
              <span className="font-normal text-muted-foreground"> · {clientName}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={14} strokeWidth={1.5} className="text-muted-foreground shrink-0" />
            <p className="font-sans text-sm text-muted-foreground">
              {dateRange} · {totalDays} días
            </p>
          </div>
        </div>

        {/* Motivo */}
        <p className="font-sans text-sm text-muted-foreground italic border-l-2 border-border pl-3">
          "{motivo}"
        </p>

        {/* Amount + client budget */}
        <div className="flex items-center justify-between gap-4 py-3 border-t border-b border-border">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-wide font-semibold text-muted-foreground">
              Solicitado
            </p>
            <p className="font-sans text-xl font-semibold text-foreground mt-0.5">
              {formatEUR(requestedAmount)}
            </p>
          </div>
          <div className="flex-1">
            <BudgetMiniCard
              spent={clientSpent}
              total={clientBudget}
              variant="light"
            />
          </div>
        </div>

        {/* Reject textarea */}
        {rejectMode && (
          <div className="flex flex-col gap-2 animate-fade-in">
            <label className="font-sans text-xs font-semibold text-foreground uppercase tracking-wide">
              Motivo del rechazo
            </label>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Ej. Presupuesto insuficiente del cliente este mes."
              rows={3}
              className={cn(
                'w-full rounded-xl border border-border bg-background px-3 py-2.5',
                'font-sans text-sm text-foreground placeholder:text-muted-foreground',
                'resize-none focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20',
              )}
            />
          </div>
        )}
      </div>

      {/* Sticky actions */}
      <div className="sticky bottom-0 bg-card border-t border-border px-3 py-3">
        <div className="flex gap-2">
          {!rejectMode ? (
            <>
              <Button
                variant="ghost"
                size="base"
                className="flex-1"
                onClick={() => setRejectMode(true)}
                disabled={resolving || isLoading}
              >
                Rechazar
              </Button>
              <Button
                variant="accent"
                size="base"
                className="flex-1"
                loading={resolving || isLoading}
                onClick={handleApprove}
              >
                Aprobar
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="base"
                className="flex-1"
                onClick={() => { setRejectMode(false); setRejectReason('') }}
                disabled={resolving}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                size="base"
                className="flex-1 bg-destructive hover:bg-destructive/90"
                loading={resolving}
                disabled={!rejectReason.trim()}
                onClick={handleReject}
              >
                Confirmar rechazo
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// --- Mock Data ---
export const MOCK_APPROVAL_CARDS: ApprovalCardProps[] = [
  {
    id: 'req-001',
    requesterName: 'Ana García',
    requesterRole: 'Diseño UX · Madrid',
    destination: 'A Coruña',
    clientName: 'Inditex Arteixo',
    dateRange: '15–17 jun 2026',
    totalDays: 3,
    requestedAmount: 560,
    clientBudget: 2000,
    clientBudgetUsed: 34,
    motivo: 'Reunión de kick-off con equipo de producto de Inditex.',
    urgency: 'normal',
    status: 'pending',
    onApprove: async () => {},
    onReject: async () => {},
  },
  {
    id: 'req-002',
    requesterName: 'Carlos Martín',
    requesterRole: 'Estrategia · Barcelona',
    destination: 'Lisboa',
    clientName: 'Nos Telecom',
    dateRange: '20–22 jun 2026',
    totalDays: 3,
    requestedAmount: 890,
    clientBudget: 3000,
    clientBudgetUsed: 72,
    motivo: 'Presentación de resultados Q2 a dirección.',
    urgency: 'high',
    status: 'pending',
    onApprove: async () => {},
    onReject: async () => {},
  },
]
