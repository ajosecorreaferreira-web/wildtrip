import * as React from 'react'
import { Check, X, AlertCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type ApprovalState =
  | 'idle'
  | 'confirming_approve'
  | 'rejecting'
  | 'loading'
  | 'approved'
  | 'rejected'

export interface ApprovalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  trip: {
    destination: string
    traveler: string
    amount: number
    currency?: string
  }
  onApprove: (id: string) => Promise<void> | void
  onReject: (id: string, reason: string) => Promise<void> | void
}

function ApprovalCard({ id, trip, onApprove, onReject, className, ...props }: ApprovalCardProps) {
  const [state, setState] = React.useState<ApprovalState>('idle')
  const [reason, setReason] = React.useState('')
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const currency = trip.currency ?? 'EUR'
  const formattedAmount = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(trip.amount)

  React.useEffect(() => {
    if (state === 'rejecting') {
      textareaRef.current?.focus()
    }
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
    if (!reason.trim()) {
      textareaRef.current?.focus()
      return
    }
    setState('loading')
    try {
      await onReject(id, reason.trim())
      setState('rejected')
    } catch {
      setState('rejecting')
    }
  }

  return (
    <div className={cn('rounded-2xl border bg-card p-5 space-y-4', className)} {...props}>
      {/* Trip info */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-2xl font-normal leading-tight tracking-tight text-card-foreground truncate">
            {trip.destination}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">{trip.traveler}</p>
        </div>
        <span className="text-xl font-semibold text-card-foreground shrink-0 tabular-nums">
          {formattedAmount}
        </span>
      </div>

      <div className="border-t border-[var(--border)]" />

      {/* idle — first tap: Aprobar o Rechazar */}
      {state === 'idle' && (
        <div className="flex gap-3">
          <button
            onClick={() => setState('confirming_approve')}
            className={cn(
              'flex-1 inline-flex items-center justify-center gap-2',
              'rounded-xl min-h-[44px] px-5 text-sm font-medium',
              'bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]',
            )}
            style={{ transition: 'background-color var(--duration-fast) var(--ease-default)' }}
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
            )}
            style={{ transition: 'background-color var(--duration-fast) var(--ease-default)' }}
          >
            <X size={20} strokeWidth={1.5} />
            Rechazar
          </button>
        </div>
      )}

      {/* confirming_approve — segundo tap de confirmación */}
      {state === 'confirming_approve' && (
        <div className="space-y-3 animate-fade-in">
          <p className="text-sm text-muted-foreground">
            ¿Confirmas la aprobación de este viaje?
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleApprove}
              className={cn(
                'flex-1 inline-flex items-center justify-center gap-2',
                'rounded-xl min-h-[44px] px-5 text-sm font-semibold',
                'bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90',
              )}
              style={{ transition: 'opacity var(--duration-fast) var(--ease-default)' }}
            >
              <Check size={20} strokeWidth={1.5} />
              Sí, aprobar
            </button>
            <button
              onClick={() => setState('idle')}
              className={cn(
                'inline-flex items-center justify-center',
                'rounded-xl min-h-[44px] px-5 text-sm font-medium',
                'bg-muted text-muted-foreground hover:bg-secondary',
              )}
              style={{ transition: 'background-color var(--duration-fast) var(--ease-default)' }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* rejecting — input de motivo */}
      {state === 'rejecting' && (
        <div className="space-y-3 animate-fade-in">
          <label
            className="text-sm font-medium text-card-foreground"
            htmlFor={`reject-reason-${id}`}
          >
            Motivo del rechazo
          </label>
          <textarea
            ref={textareaRef}
            id={`reject-reason-${id}`}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Explica brevemente el motivo..."
            rows={3}
            className={cn(
              'w-full rounded-xl border bg-background px-4 py-3',
              'text-sm text-foreground placeholder:text-muted-foreground',
              'resize-none min-h-[44px]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
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
                'disabled:opacity-40 disabled:pointer-events-none',
              )}
              style={{ transition: 'opacity var(--duration-fast) var(--ease-default)' }}
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
              )}
              style={{ transition: 'background-color var(--duration-fast) var(--ease-default)' }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* loading — spinner durante la operación async */}
      {state === 'loading' && (
        <div className="flex items-center justify-center py-4">
          <Loader2 size={20} strokeWidth={1.5} className="animate-spin text-muted-foreground" />
        </div>
      )}

      {/* approved — estado post-aprobación con animación */}
      {state === 'approved' && (
        <div className="flex items-center gap-3 py-2 animate-success-pop">
          <div className="size-10 rounded-full bg-[var(--success-muted)] flex items-center justify-center shrink-0">
            <Check size={20} strokeWidth={1.5} className="text-[var(--success-text)]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--success-text)]">Viaje aprobado.</p>
            <p className="text-xs text-muted-foreground">
              Notificación enviada a {trip.traveler}.
            </p>
          </div>
        </div>
      )}

      {/* rejected — estado post-rechazo */}
      {state === 'rejected' && (
        <div className="flex items-center gap-3 py-2 animate-fade-in">
          <div className="size-10 rounded-full bg-[var(--destructive-muted)] flex items-center justify-center shrink-0">
            <AlertCircle size={20} strokeWidth={1.5} className="text-destructive" />
          </div>
          <div>
            <p className="text-sm font-semibold text-destructive">Viaje rechazado.</p>
            <p className="text-xs text-muted-foreground">
              Se ha notificado a {trip.traveler}.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export { ApprovalCard }
