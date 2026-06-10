import * as React from 'react'
import {
  MapPin,
  Calendar,
  Briefcase,
  Wallet,
  UserCheck,
  ClipboardList,
  ChevronRight,
  ChevronLeft,
  Check,
  Loader2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface WizardManager {
  id: string
  name: string
  role: string
}

export interface TripWizardData {
  destination: string
  startDate: string
  endDate: string
  purpose: string
  budgetEstimate: number
  currency: string
  managerId: string
}

export interface TripWizardProps {
  managers: WizardManager[]
  onSubmit?: (data: TripWizardData) => Promise<void> | void
  onCancel?: () => void
  className?: string
}

type WizardStep =
  | 'destination'
  | 'dates'
  | 'purpose'
  | 'budget'
  | 'approver'
  | 'review'

const STEPS: WizardStep[] = [
  'destination',
  'dates',
  'purpose',
  'budget',
  'approver',
  'review',
]

const STEP_META: Record<WizardStep, { label: string; icon: React.ElementType; title: string }> = {
  destination: { label: 'Destino', icon: MapPin, title: '¿A dónde vas?' },
  dates: { label: 'Fechas', icon: Calendar, title: '¿Cuándo?' },
  purpose: { label: 'Motivo', icon: Briefcase, title: '¿Por qué viajas?' },
  budget: { label: 'Presupuesto', icon: Wallet, title: '¿Cuánto necesitas?' },
  approver: { label: 'Aprobador', icon: UserCheck, title: '¿Quién aprueba?' },
  review: { label: 'Resumen', icon: ClipboardList, title: 'Revísalo todo.' },
}

const PURPOSE_OPTIONS = [
  { value: 'client_meeting', label: 'Reunión con cliente' },
  { value: 'conference', label: 'Conferencia o evento' },
  { value: 'team_offsite', label: 'Offsite de equipo' },
  { value: 'training', label: 'Formación' },
  { value: 'project', label: 'Proyecto en oficina' },
  { value: 'other', label: 'Otro' },
]

function WizardProgress({ current }: { current: WizardStep }) {
  const currentIdx = STEPS.indexOf(current)
  return (
    <div className="flex items-center gap-1 mb-8">
      {STEPS.map((step, idx) => {
        const done = idx < currentIdx
        const active = idx === currentIdx
        const Icon = STEP_META[step].icon
        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center gap-1.5 min-w-0">
              <div
                className={cn(
                  'size-8 rounded-full flex items-center justify-center transition-all duration-300',
                  done && 'bg-[var(--accent)]',
                  active && 'bg-primary scale-110',
                  !done && !active && 'bg-muted'
                )}
              >
                {done ? (
                  <Check size={14} strokeWidth={1.5} className="text-white" />
                ) : (
                  <Icon
                    size={16}
                    strokeWidth={1.5}
                    className={active ? 'text-primary-foreground' : 'text-muted-foreground'}
                  />
                )}
              </div>
              <span
                className={cn(
                  'text-[9px] font-semibold uppercase tracking-widest whitespace-nowrap hidden sm:block',
                  active ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {STEP_META[step].label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={cn(
                  'h-px flex-1 mb-4 transition-all duration-300',
                  done ? 'bg-[var(--accent)]' : 'bg-border'
                )}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

function StepDestination({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="space-y-3 animate-fade-in">
      <p className="text-sm text-muted-foreground">Ciudad, país o lugar de trabajo.</p>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ej. Barcelona, España"
        autoFocus
        className={cn(
          'w-full rounded-xl border bg-background px-4 text-sm text-foreground',
          'min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
        )}
      />
    </div>
  )
}

function StepDates({
  start,
  end,
  onStart,
  onEnd,
}: {
  start: string
  end: string
  onStart: (v: string) => void
  onEnd: (v: string) => void
}) {
  return (
    <div className="space-y-4 animate-fade-in">
      <p className="text-sm text-muted-foreground">Fechas de salida y regreso.</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Salida
          </label>
          <input
            type="date"
            value={start}
            onChange={(e) => onStart(e.target.value)}
            className={cn(
              'w-full rounded-xl border bg-background px-4 text-sm text-foreground',
              'min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Regreso
          </label>
          <input
            type="date"
            value={end}
            min={start}
            onChange={(e) => onEnd(e.target.value)}
            className={cn(
              'w-full rounded-xl border bg-background px-4 text-sm text-foreground',
              'min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          />
        </div>
      </div>
    </div>
  )
}

function StepPurpose({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="space-y-3 animate-fade-in">
      <p className="text-sm text-muted-foreground">El motivo del viaje.</p>
      <div className="grid grid-cols-2 gap-2">
        {PURPOSE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={cn(
              'rounded-xl border px-4 py-3 text-sm text-left transition-all duration-150',
              'min-h-[44px]',
              value === opt.value
                ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent-text)] font-medium'
                : 'border-border bg-card text-foreground hover:bg-muted'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function StepBudget({
  amount,
  currency,
  onAmount,
  onCurrency,
}: {
  amount: number
  currency: string
  onAmount: (v: number) => void
  onCurrency: (v: string) => void
}) {
  const CURRENCIES = ['EUR', 'USD', 'GBP']
  return (
    <div className="space-y-4 animate-fade-in">
      <p className="text-sm text-muted-foreground">
        Presupuesto estimado. Incluye transporte, alojamiento y dietas.
      </p>
      <div className="flex gap-2">
        <input
          type="number"
          min="0"
          step="50"
          value={amount || ''}
          onChange={(e) => onAmount(parseFloat(e.target.value) || 0)}
          placeholder="0"
          className={cn(
            'flex-1 rounded-xl border bg-background px-4 text-sm text-foreground',
            'min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          )}
        />
        <div className="flex rounded-xl border overflow-hidden">
          {CURRENCIES.map((cur) => (
            <button
              key={cur}
              onClick={() => onCurrency(cur)}
              className={cn(
                'px-4 text-sm font-medium transition-colors duration-150 min-h-[44px]',
                currency === cur
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:bg-muted'
              )}
            >
              {cur}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function StepApprover({
  managers,
  selectedId,
  onSelect,
}: {
  managers: WizardManager[]
  selectedId: string
  onSelect: (id: string) => void
}) {
  return (
    <div className="space-y-3 animate-fade-in">
      <p className="text-sm text-muted-foreground">
        Tu manager recibirá la solicitud de aprobación.
      </p>
      <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
        {managers.map((m) => (
          <button
            key={m.id}
            onClick={() => onSelect(m.id)}
            className={cn(
              'w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-left',
              'min-h-[44px] transition-all duration-150',
              selectedId === m.id
                ? 'border-[var(--accent)] bg-[var(--accent-soft)]'
                : 'border-border bg-card hover:bg-muted'
            )}
          >
            <div
              className={cn(
                'size-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-150',
                selectedId === m.id
                  ? 'border-[var(--accent)] bg-[var(--accent)]'
                  : 'border-border'
              )}
            >
              {selectedId === m.id && (
                <Check size={12} strokeWidth={1.5} className="text-white" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">{m.name}</p>
              <p className="text-xs text-muted-foreground">{m.role}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-border last:border-0">
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground shrink-0">
        {label}
      </span>
      <span className="text-sm text-foreground text-right">{value}</span>
    </div>
  )
}

function StepReview({
  data,
  managers,
}: {
  data: TripWizardData
  managers: WizardManager[]
}) {
  const manager = managers.find((m) => m.id === data.managerId)
  const purposeLabel =
    PURPOSE_OPTIONS.find((p) => p.value === data.purpose)?.label ?? data.purpose

  const formattedBudget = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: data.currency,
    maximumFractionDigits: 0,
  }).format(data.budgetEstimate)

  return (
    <div className="space-y-4 animate-fade-in">
      <p className="text-sm text-muted-foreground">
        Todo en orden. Al enviar se notificará a tu aprobador.
      </p>
      <div className="rounded-xl border bg-muted/40 px-4 py-1 divide-y divide-border">
        <ReviewRow label="Destino" value={data.destination} />
        <ReviewRow label="Salida" value={data.startDate} />
        <ReviewRow label="Regreso" value={data.endDate} />
        <ReviewRow label="Motivo" value={purposeLabel} />
        <ReviewRow label="Presupuesto" value={formattedBudget} />
        <ReviewRow label="Aprobador" value={manager?.name ?? '—'} />
      </div>
    </div>
  )
}

function TripWizard({ managers, onSubmit, onCancel, className }: TripWizardProps) {
  const [step, setStep] = React.useState<WizardStep>('destination')
  const [submitted, setSubmitted] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const [data, setData] = React.useState<TripWizardData>({
    destination: '',
    startDate: '',
    endDate: '',
    purpose: '',
    budgetEstimate: 0,
    currency: 'EUR',
    managerId: '',
  })

  const currentIdx = STEPS.indexOf(step)
  const isFirst = currentIdx === 0
  const isReview = step === 'review'

  function canAdvance(): boolean {
    switch (step) {
      case 'destination': return data.destination.trim().length > 0
      case 'dates': return Boolean(data.startDate && data.endDate && data.endDate >= data.startDate)
      case 'purpose': return data.purpose.length > 0
      case 'budget': return data.budgetEstimate > 0
      case 'approver': return data.managerId.length > 0
      case 'review': return true
    }
  }

  function next() {
    if (currentIdx < STEPS.length - 1) setStep(STEPS[currentIdx + 1])
  }

  function prev() {
    if (currentIdx > 0) setStep(STEPS[currentIdx - 1])
  }

  async function handleSubmit() {
    setLoading(true)
    try {
      await onSubmit?.(data)
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div
        className={cn(
          'rounded-3xl border bg-card p-8 w-full max-w-md mx-auto',
          'flex flex-col items-center gap-5 text-center animate-success-pop',
          className
        )}
        style={{ boxShadow: 'var(--shadow-lg)' }}
      >
        <div className="size-16 rounded-full bg-[var(--success-muted)] flex items-center justify-center">
          <Check size={28} strokeWidth={1.5} className="text-[var(--success-text)]" />
        </div>
        <div>
          <p className="text-lg font-semibold text-[var(--success-text)]">Viaje enviado.</p>
          <p className="text-sm text-muted-foreground mt-1">
            Pendiente de{' '}
            {managers.find((m) => m.id === data.managerId)?.name ?? 'tu aprobador'}.
          </p>
        </div>
        <button
          onClick={onCancel}
          className={cn(
            'inline-flex items-center justify-center gap-2',
            'rounded-xl min-h-[44px] px-8 text-sm font-medium',
            'bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]',
            'transition-colors duration-200'
          )}
        >
          Cerrar
        </button>
      </div>
    )
  }

  const meta = STEP_META[step]
  const StepIcon = meta.icon

  return (
    <div
      className={cn(
        'rounded-3xl border bg-card p-6 w-full max-w-md mx-auto',
        className
      )}
      style={{ boxShadow: 'var(--shadow-lg)' }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <StepIcon size={20} strokeWidth={1.5} className="text-[var(--accent-text)] shrink-0" />
        <h2 className="font-display text-2xl font-normal leading-tight tracking-tight text-foreground">
          {meta.title}
        </h2>
      </div>

      <WizardProgress current={step} />

      {/* Step content */}
      <div className="min-h-[200px]">
        {step === 'destination' && (
          <StepDestination
            value={data.destination}
            onChange={(v) => setData((d) => ({ ...d, destination: v }))}
          />
        )}
        {step === 'dates' && (
          <StepDates
            start={data.startDate}
            end={data.endDate}
            onStart={(v) => setData((d) => ({ ...d, startDate: v }))}
            onEnd={(v) => setData((d) => ({ ...d, endDate: v }))}
          />
        )}
        {step === 'purpose' && (
          <StepPurpose
            value={data.purpose}
            onChange={(v) => setData((d) => ({ ...d, purpose: v }))}
          />
        )}
        {step === 'budget' && (
          <StepBudget
            amount={data.budgetEstimate}
            currency={data.currency}
            onAmount={(v) => setData((d) => ({ ...d, budgetEstimate: v }))}
            onCurrency={(v) => setData((d) => ({ ...d, currency: v }))}
          />
        )}
        {step === 'approver' && (
          <StepApprover
            managers={managers}
            selectedId={data.managerId}
            onSelect={(id) => setData((d) => ({ ...d, managerId: id }))}
          />
        )}
        {step === 'review' && <StepReview data={data} managers={managers} />}
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-6">
        {!isFirst && (
          <button
            onClick={prev}
            disabled={loading}
            className={cn(
              'inline-flex items-center justify-center gap-1.5',
              'rounded-xl min-h-[44px] px-5 text-sm font-medium',
              'bg-muted text-muted-foreground hover:bg-secondary',
              'disabled:opacity-40 transition-colors duration-200'
            )}
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
            Atrás
          </button>
        )}

        {onCancel && isFirst && (
          <button
            onClick={onCancel}
            className={cn(
              'inline-flex items-center justify-center',
              'rounded-xl min-h-[44px] px-5 text-sm font-medium',
              'bg-muted text-muted-foreground hover:bg-secondary',
              'transition-colors duration-200'
            )}
          >
            Cancelar
          </button>
        )}

        <button
          onClick={isReview ? handleSubmit : next}
          disabled={!canAdvance() || loading}
          className={cn(
            'flex-1 inline-flex items-center justify-center gap-2',
            'rounded-xl min-h-[44px] px-5 text-sm font-medium',
            'bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]',
            'disabled:opacity-40 disabled:pointer-events-none transition-colors duration-200'
          )}
        >
          {loading ? (
            <Loader2 size={20} strokeWidth={1.5} className="animate-spin" />
          ) : isReview ? (
            <>
              Enviar solicitud
              <Check size={20} strokeWidth={1.5} />
            </>
          ) : (
            <>
              Siguiente
              <ChevronRight size={20} strokeWidth={1.5} />
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export { TripWizard }
