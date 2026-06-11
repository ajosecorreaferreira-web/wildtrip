import * as React from 'react'
import { Check, X, Loader2, Calendar, Wallet } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BudgetMeter } from './budget-meter'

type QuickApprovalState = 'idle' | 'rejecting' | 'loading' | 'approved' | 'rejected'

export interface QuickApprovalProps {
  id: string
  trip: {
    destination: string
    traveler: string
    startDate: string
    endDate: string
    requestedAmount: number
    clientBudget: number
    currency?: string
  }
  onApprove: (id: string) => Promise<void> | void
  onReject: (id: string, reason: string) => Promise<void> | void
  className?: string
}

function QuickApproval({ id, trip, onApprove, onReject, className }: QuickApprovalProps) {
  const [state, setState] = React.useState<QuickApprovalState>('idle')
  const [reason, setReason] = React.useState('')
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const currency = trip.currency ?? 'EUR'

  React.useEffect(() => {
    if (state === 'rejecting') textareaRef.current?.focus()
  }, [state])

  async function handleApprove() {
    setState('loading')
    try {
      await onApprove(id)
      setState('approved')
    } catch {
      setState('idle')
    }
  }

  async function handleReject() {
    if (!reason.trim()) { textareaRef.current?.focus(); return }
    setState('loading')
    try {
      await onReject(id, reason.trim())
      setState('rejected')
    } catch {
      setState('rejecting')
    }
  }

  return (
    <div className={cn('rounded-2xl border bg-card p-5 space-y-4', className)}>
      {/* Trip summary */}
      <div>
        <h3 className="font-display text-2xl font-normal leading-tight tracking-tight text-card-foreground">
          {trip.destination}
        </h3>
        <p className="text-sm text-muted-foreground mt-0.5">{trip.traveler}</p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar size={20} strokeWidth={1.5} className="shrink-0" />
          <span>{trip.startDate} — {trip.endDate}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Wallet size={20} strokeWidth={1.5} className="shrink-0" />
          <span>Presupuesto cliente</span>
        </div>
      </div>

      <BudgetMeter
        spent={trip.requestedAmount}
        total={trip.clientBudget}
        currency={currency}
        label="Solicitado vs cliente"
      />

      <div className="border-t border-border" />

      {state === 'idle' && (
        <div className="flex gap-3">
          <button
            onClick={handleApprove}
            className={cn(
              'flex-1 inline-flex items-center justify-center gap-2',
              'rounded-xl min-h-[44px] px-5 text-sm font-medium',
              'bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90',
              'transition-opacity duration-150'
            )}
          >
            <Check size={20} strokeWidth={1.5} />
            Aprobar
          </button>
          <button
            onClick={() => setState('rejecting')}
            className={cn(
              'flex-1 inline-flex items-center justify-center gap-2',
              'rounded-xl min-h-[44px] px-5 text-sm font-medium',
              'border border-destructive text-destructive bg-card hover:bg-[var(--destructive-muted)]',
              'transition-colors duration-150'
            )}
          >
            <X size={20} strokeWidth={1.5} />
            Rechazar
          </button>
        </div>
      )}

      {state === 'rejecting' && (
        <div className="space-y-3 animate-fade-in">
          <label
            className="text-sm font-medium text-card-foreground"
            htmlFor={`reason-${id}`}
          >
            Motivo del rechazo
          </label>
          <textarea
            ref={textareaRef}
            id={`reason-${id}`}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Explica brevemente el motivo..."
            rows={3}
            className={cn(
              'w-full rounded-xl border bg-background px-4 py-3 text-sm',
              'placeholder:text-muted-foreground resize-none min-h-[44px]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          />
          <div className="flex gap-3">
            <button
              onClick={handleReject}
              disabled={!reason.trim()}
              className={cn(
                'flex-1 inline-flex items-center justify-center gap-2',
                'rounded-xl min-h-[44px] px-5 text-sm font-medium',
                'bg-destructive text-destructive-foreground hover:opacity-90',
                'disabled:opacity-40 disabled:pointer-events-none transition-opacity duration-150'
              )}
            >
              <X size={20} strokeWidth={1.5} />
              Confirmar rechazo
            </button>
            <button
              onClick={() => setState('idle')}
              className={cn(
                'inline-flex items-center justify-center',
                'rounded-xl min-h-[44px] px-5 text-sm font-medium',
                'bg-muted text-muted-foreground hover:bg-secondary',
                'transition-colors duration-150'
              )}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {state === 'loading' && (
        <div className="flex items-center justify-center py-4">
          <Loader2 size={20} strokeWidth={1.5} className="animate-spin text-muted-foreground" />
        </div>
      )}

      {state === 'approved' && (
        <div className="flex items-center gap-3 py-2 animate-success-pop">
          <div className="size-10 rounded-full bg-[var(--success-muted)] flex items-center justify-center shrink-0">
            <Check size={20} strokeWidth={1.5} className="text-[var(--success-text)]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--success-text)]">Viaje aprobado.</p>
            <p className="text-xs text-muted-foreground">Notificado a {trip.traveler}.</p>
          </div>
        </div>
      )}

      {state === 'rejected' && (
        <div className="flex items-center gap-3 py-2 animate-fade-in">
          <div className="size-10 rounded-full bg-[var(--destructive-muted)] flex items-center justify-center shrink-0">
            <X size={20} strokeWidth={1.5} className="text-destructive" />
          </div>
          <div>
            <p className="text-sm font-semibold text-destructive">Viaje rechazado.</p>
            <p className="text-xs text-muted-foreground">Notificado a {trip.traveler}.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export { QuickApproval }
