import * as React from 'react'
import { Camera, Upload, CheckCircle2, ChevronRight, Loader2, X, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button, Input, Stepper } from '@/components/wildtrip/atoms'
import { EXPENSE_EMOJIS } from '@/components/wildtrip/molecules'
import type { ExpenseCategory } from '@/components/wildtrip/molecules'

export type TicketStep = 1 | 2 | 3 | 4 | 5

export interface TripOption {
  id: string
  destination: string
  dateRange: string
  isActive: boolean
  budget: number
  available: number
}

export interface ExpenseSubmission {
  amount: number
  merchant: string
  date: string
  category: ExpenseCategory
  tripId: string
  imageData?: string
}

export interface TicketUploaderProps {
  trips: TripOption[]
  onComplete: (expense: ExpenseSubmission) => Promise<void>
  onCancel: () => void
  className?: string
}

const CATEGORY_OPTIONS: ExpenseCategory[] = ['meal', 'transport', 'hotel', 'coffee', 'other']

const CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  meal:      'Comida',
  transport: 'Transporte',
  hotel:     'Alojamiento',
  coffee:    'Café',
  other:     'Otro',
}

// ─── Step 1: Photo ────────────────────────────────────────────────────────────

function StepPhoto({ onFile }: { onFile: (file: File) => void }) {
  const fileRef = React.useRef<HTMLInputElement>(null)
  const cameraRef = React.useRef<HTMLInputElement>(null)

  function handle(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (f) onFile(f)
  }

  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      <p className="font-sans text-sm text-muted-foreground">
        Sube una foto del ticket o justificante.
      </p>
      <button
        onClick={() => cameraRef.current?.click()}
        className={cn(
          'w-full flex flex-col items-center justify-center gap-3 min-h-[160px]',
          'rounded-2xl border-2 border-dashed border-accent bg-accent-soft',
          'hover:bg-accent/10 transition-colors duration-[180ms]',
        )}
      >
        <Camera size={32} strokeWidth={1.5} className="text-accent-text" />
        <span className="font-sans text-sm font-semibold text-accent-text">Hacer foto</span>
      </button>
      <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handle} />
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="font-sans text-xs text-muted-foreground uppercase tracking-widest">o</span>
        <div className="h-px flex-1 bg-border" />
      </div>
      <Button variant="secondary" size="base" onClick={() => fileRef.current?.click()}>
        <Upload size={16} strokeWidth={1.5} />
        Subir archivo
      </Button>
      <input ref={fileRef} type="file" accept="image/*,application/pdf" className="hidden" onChange={handle} />
    </div>
  )
}

// ─── Step 2: OCR scanning ─────────────────────────────────────────────────────

function StepOcr({ preview }: { preview: string | null }) {
  return (
    <div className="flex flex-col items-center gap-5 py-8 animate-fade-in">
      {preview && (
        <div className="w-20 h-20 rounded-xl overflow-hidden border bg-muted shrink-0">
          <img src={preview} alt="Ticket" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="w-12 h-12 rounded-full bg-accent-soft flex items-center justify-center">
        <Sparkles size={20} strokeWidth={1.5} className="text-accent-text" />
      </div>
      <div className="flex items-center gap-2">
        <Loader2 size={16} strokeWidth={1.5} className="animate-wt-spin text-muted-foreground" />
        <p className="font-sans text-sm text-muted-foreground">Escaneando ticket…</p>
      </div>
      <div className="w-full space-y-2 animate-pulse">
        {[48, 32, 40].map((w, i) => (
          <div key={i} className="h-3 rounded bg-muted" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  )
}

// ─── Step 3: Confirm OCR ─────────────────────────────────────────────────────

function StepConfirm({
  merchant,
  amount,
  date,
  onMerchant,
  onAmount,
  onDate,
}: {
  merchant: string
  amount: number
  date: string
  onMerchant: (v: string) => void
  onAmount: (v: number) => void
  onDate: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      <div className="flex items-center gap-2 rounded-xl bg-success-muted px-3 py-2">
        <CheckCircle2 size={14} strokeWidth={1.5} className="text-success-text shrink-0" />
        <p className="font-sans text-xs text-success-text font-semibold">
          Datos extraídos con 94% de confianza
        </p>
      </div>
      <Input
        label="Establecimiento"
        value={merchant}
        onChange={(e) => onMerchant(e.target.value)}
        placeholder="Restaurante, comercio…"
      />
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            label="Importe"
            type="number"
            step="0.01"
            min="0"
            value={String(amount)}
            onChange={(e) => onAmount(parseFloat(e.target.value) || 0)}
          />
        </div>
        <div className="w-20">
          <Input
            label="IVA"
            value="21%"
            readOnly
            className="bg-muted text-muted-foreground"
          />
        </div>
      </div>
      <Input
        label="Fecha"
        type="date"
        value={date}
        onChange={(e) => onDate(e.target.value)}
      />
    </div>
  )
}

// ─── Step 4: Associate trip + category ───────────────────────────────────────

function StepAssociate({
  trips,
  selectedTripId,
  onSelectTrip,
  selectedCategory,
  onSelectCategory,
}: {
  trips: TripOption[]
  selectedTripId: string
  onSelectTrip: (id: string) => void
  selectedCategory: ExpenseCategory
  onSelectCategory: (c: ExpenseCategory) => void
}) {
  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      <div>
        <p className="font-sans text-xs font-semibold text-foreground uppercase tracking-wide mb-2">
          Viaje
        </p>
        <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto">
          {trips.map((trip) => (
            <button
              key={trip.id}
              onClick={() => onSelectTrip(trip.id)}
              className={cn(
                'w-full flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all duration-[180ms]',
                selectedTripId === trip.id
                  ? 'border-accent bg-accent-soft'
                  : 'border-border bg-card hover:bg-muted',
              )}
            >
              <div
                className={cn(
                  'w-4 h-4 rounded-full border-2 shrink-0 transition-colors duration-[180ms]',
                  selectedTripId === trip.id ? 'border-accent bg-accent' : 'border-border',
                )}
              />
              <div className="min-w-0 flex-1">
                <p className="font-sans text-sm font-semibold text-foreground truncate">
                  {trip.destination}
                  {trip.isActive && (
                    <span className="ml-1.5 text-[9px] font-semibold uppercase tracking-wide text-accent-text">
                      Activo
                    </span>
                  )}
                </p>
                <p className="font-sans text-xs text-muted-foreground">{trip.dateRange}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="font-sans text-xs font-semibold text-foreground uppercase tracking-wide mb-2">
          Categoría
        </p>
        <div className="grid grid-cols-5 gap-1.5">
          {CATEGORY_OPTIONS.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={cn(
                'flex flex-col items-center gap-1 py-2 rounded-xl border text-center transition-all duration-[180ms]',
                selectedCategory === cat
                  ? 'border-primary bg-secondary'
                  : 'border-border bg-card hover:bg-muted',
              )}
            >
              <span className="text-xl" aria-hidden>{EXPENSE_EMOJIS[cat]}</span>
              <span className="font-sans text-[9px] text-muted-foreground leading-none">
                {CATEGORY_LABELS[cat]}
              </span>
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}

// ─── Step 5: Success ──────────────────────────────────────────────────────────

function StepSuccess({
  merchant,
  amount,
  category,
  onDone,
}: {
  merchant: string
  amount: number
  category: ExpenseCategory
  onDone: () => void
}) {
  return (
    <div className="flex flex-col items-center gap-5 py-6 animate-success-pop">
      <div className="w-16 h-16 rounded-full bg-success-muted flex items-center justify-center">
        <CheckCircle2 size={32} strokeWidth={1.5} className="text-success-text" />
      </div>
      <div className="text-center">
        <p className="font-sans text-base font-semibold text-success-text">Gasto guardado.</p>
        <p className="font-sans text-sm text-muted-foreground mt-1">
          {EXPENSE_EMOJIS[category]} {merchant} · {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount)}
        </p>
      </div>
      <Button variant="primary" size="base" onClick={onDone}>
        Cerrar
      </Button>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function TicketUploader({ trips, onComplete, onCancel, className }: TicketUploaderProps) {
  const [step, setStep] = React.useState<TicketStep>(1)
  const [preview, setPreview] = React.useState<string | null>(null)
  const [merchant, setMerchant] = React.useState('')
  const [amount, setAmount] = React.useState(0)
  const [date, setDate] = React.useState(new Date().toISOString().split('T')[0])
  const [category, setCategory] = React.useState<ExpenseCategory>('meal')
  const [tripId, setTripId] = React.useState(trips.find((t) => t.isActive)?.id ?? '')
  const [submitting, setSubmitting] = React.useState(false)

  async function handleFile(file: File) {
    if (file.type.startsWith('image/')) setPreview(URL.createObjectURL(file))
    setStep(2)
    await new Promise((r) => setTimeout(r, 2000))
    setMerchant('Restaurante Domus')
    setAmount(47.5)
    setDate(new Date().toISOString().split('T')[0])
    setStep(3)
  }

  async function handleComplete() {
    setSubmitting(true)
    try {
      await onComplete({ amount, merchant, date, category, tripId })
      setStep(5)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={cn('flex flex-col flex-1 bg-background', className)}>
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-4">
        <div
          className="rounded-3xl bg-card border border-border px-6 py-5 w-full max-w-sm mx-auto"
          style={{ boxShadow: 'var(--shadow-lg)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-sans text-base font-semibold text-foreground">Añadir ticket</h2>
            {step < 5 && (
              <button
                onClick={onCancel}
                aria-label="Cancelar"
                className="w-8 h-8 flex items-center justify-center rounded-xl text-muted-foreground hover:bg-muted"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            )}
          </div>

          {/* Stepper */}
          {step < 5 && <Stepper steps={5} current={step} className="mb-6" />}

          {step === 1 && <StepPhoto onFile={handleFile} />}
          {step === 2 && <StepOcr preview={preview} />}
          {step === 3 && (
            <StepConfirm
              merchant={merchant} amount={amount} date={date}
              onMerchant={setMerchant} onAmount={setAmount} onDate={setDate}
            />
          )}
          {step === 4 && (
            <StepAssociate
              trips={trips}
              selectedTripId={tripId}
              onSelectTrip={setTripId}
              selectedCategory={category}
              onSelectCategory={setCategory}
            />
          )}
          {step === 5 && (
            <StepSuccess merchant={merchant} amount={amount} category={category} onDone={onCancel} />
          )}
        </div>
      </div>

      {/* Sticky CTAs */}
      {step === 3 && (
        <div className="sticky-cta">
          <Button variant="primary" size="base" className="w-full max-w-sm mx-auto flex" onClick={() => setStep(4)}>
            Confirmar datos
            <ChevronRight size={16} strokeWidth={1.5} />
          </Button>
        </div>
      )}
      {step === 4 && (
        <div className="sticky-cta">
          <Button
            variant="primary"
            size="base"
            className="w-full max-w-sm mx-auto flex"
            disabled={!tripId}
            loading={submitting}
            onClick={handleComplete}
          >
            Guardar gasto
          </Button>
        </div>
      )}
    </div>
  )
}

// --- Mock Data ---
export const MOCK_TICKET_UPLOADER_TRIPS: TripOption[] = [
  { id: 'trip-1', destination: 'A Coruña', dateRange: '15–17 jun', isActive: true, budget: 1200, available: 550 },
  { id: 'trip-2', destination: 'Barcelona', dateRange: '22–24 jun', isActive: false, budget: 900, available: 900 },
]
