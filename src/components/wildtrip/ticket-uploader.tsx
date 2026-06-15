import * as React from 'react'
import {
  Camera,
  Upload,
  Check,
  ChevronRight,
  Loader2,
  X,
  Receipt,
  Link2,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type UploaderStep = 'camera' | 'ocr' | 'confirm' | 'associate' | 'success'

interface OcrResult {
  amount: number
  currency: string
  date: string
  category: string
  description: string
}

export interface Trip {
  id: string
  destination: string
  dates: string
}

export interface TicketUploaderProps {
  trips: Trip[]
  onComplete?: (data: { file: File; ocr: OcrResult; tripId: string }) => void
  onCancel?: () => void
  className?: string
}

const STEP_LABELS: Record<UploaderStep, string> = {
  camera: 'Foto',
  ocr: 'Leyendo',
  confirm: 'Confirmar',
  associate: 'Viaje',
  success: 'Listo',
}

const STEPS: UploaderStep[] = ['camera', 'ocr', 'confirm', 'associate', 'success']

function StepIndicator({ current }: { current: UploaderStep }) {
  const currentIdx = STEPS.indexOf(current)
  return (
    <div className="flex items-center gap-0 mb-6">
      {STEPS.map((step, idx) => {
        const done = idx < currentIdx
        const active = idx === currentIdx
        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  'size-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200',
                  done && 'bg-[var(--accent)] text-white',
                  active && 'bg-primary text-primary-foreground scale-110',
                  !done && !active && 'bg-muted text-muted-foreground'
                )}
              >
                {done ? <Check size={14} strokeWidth={1.5} /> : idx + 1}
              </div>
              <span
                className={cn(
                  'text-[10px] font-semibold uppercase tracking-widest whitespace-nowrap',
                  active ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {STEP_LABELS[step]}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={cn(
                  'h-px flex-1 mx-1 mb-4 transition-all duration-300',
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

function CameraStep({
  onFile,
}: {
  onFile: (file: File) => void
}) {
  const fileRef = React.useRef<HTMLInputElement>(null)
  const cameraRef = React.useRef<HTMLInputElement>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) onFile(file)
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <p className="text-sm text-muted-foreground">
        Sube una foto del ticket o justificante.
      </p>

      <button
        onClick={() => cameraRef.current?.click()}
        className={cn(
          'w-full flex flex-col items-center justify-center gap-3',
          'rounded-2xl border-2 border-dashed border-[var(--accent)] bg-[var(--accent-soft)]',
          'min-h-[160px] px-6 py-8 cursor-pointer',
          'hover:border-[var(--accent-text)] transition-colors duration-200'
        )}
      >
        <Camera size={32} strokeWidth={1.5} className="text-[var(--accent-text)]" />
        <span className="text-sm font-medium text-[var(--accent-text)]">
          Hacer foto
        </span>
      </button>

      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFile}
      />

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground uppercase tracking-widest">o</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <button
        onClick={() => fileRef.current?.click()}
        className={cn(
          'w-full inline-flex items-center justify-center gap-2',
          'rounded-xl min-h-[44px] px-5 text-sm font-medium',
          'bg-secondary text-secondary-foreground hover:bg-muted',
          'transition-colors duration-200'
        )}
      >
        <Upload size={20} strokeWidth={1.5} />
        Subir archivo
      </button>

      <input
        ref={fileRef}
        type="file"
        accept="image/*,application/pdf"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  )
}

function OcrStep({ preview }: { preview: string | null }) {
  return (
    <div className="flex flex-col items-center gap-5 py-8 animate-fade-in">
      {preview && (
        <div className="size-24 rounded-xl overflow-hidden border bg-muted shrink-0">
          <img src={preview} alt="Ticket" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex flex-col items-center gap-3">
        <div className="size-12 rounded-full bg-[var(--accent-soft)] flex items-center justify-center">
          <Sparkles size={20} strokeWidth={1.5} className="text-[var(--accent-text)]" />
        </div>
        <Loader2 size={20} strokeWidth={1.5} className="animate-spin text-muted-foreground" />
        <p className="text-sm text-muted-foreground text-center">
          Extrayendo datos del ticket…
        </p>
      </div>
    </div>
  )
}

function ConfirmStep({
  ocr,
  onChange,
  onNext,
}: {
  ocr: OcrResult
  onChange: (field: keyof OcrResult, value: string) => void
  onNext: () => void
}) {
  return (
    <div className="space-y-4 animate-fade-in">
      <p className="text-sm text-muted-foreground">
        Revisa los datos extraídos y corrige si es necesario.
      </p>

      {(
        [
          { field: 'description', label: 'Descripción', type: 'text' },
          { field: 'category', label: 'Categoría', type: 'text' },
          { field: 'date', label: 'Fecha', type: 'date' },
        ] as const
      ).map(({ field, label, type }) => (
        <div key={field} className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {label}
          </label>
          <input
            type={type}
            value={String(ocr[field])}
            onChange={(e) => onChange(field, e.target.value)}
            className={cn(
              'w-full rounded-xl border bg-background px-4 text-sm text-foreground',
              'min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          />
        </div>
      ))}

      <div className="space-y-1.5">
        <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Importe
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            step="0.01"
            min="0"
            value={ocr.amount}
            onChange={(e) => onChange('amount', e.target.value)}
            className={cn(
              'flex-1 rounded-xl border bg-background px-4 text-sm text-foreground',
              'min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          />
          <input
            type="text"
            value={ocr.currency}
            onChange={(e) => onChange('currency', e.target.value.toUpperCase().slice(0, 3))}
            className={cn(
              'w-20 rounded-xl border bg-background px-4 text-sm text-foreground text-center',
              'min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          />
        </div>
      </div>

      <button
        onClick={onNext}
        className={cn(
          'w-full inline-flex items-center justify-center gap-2',
          'rounded-xl min-h-[44px] px-5 text-sm font-medium',
          'bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]',
          'transition-colors duration-200'
        )}
      >
        Confirmar datos
        <ChevronRight size={20} strokeWidth={1.5} />
      </button>
    </div>
  )
}

function AssociateStep({
  trips,
  selectedId,
  onSelect,
  onNext,
}: {
  trips: Trip[]
  selectedId: string | null
  onSelect: (id: string) => void
  onNext: () => void
}) {
  return (
    <div className="space-y-4 animate-fade-in">
      <p className="text-sm text-muted-foreground">
        ¿A qué viaje pertenece este ticket?
      </p>

      <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
        {trips.map((trip) => (
          <button
            key={trip.id}
            onClick={() => onSelect(trip.id)}
            className={cn(
              'w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-left',
              'min-h-[44px] transition-all duration-150',
              selectedId === trip.id
                ? 'border-[var(--accent)] bg-[var(--accent-soft)]'
                : 'border-border bg-card hover:bg-muted'
            )}
          >
            <div
              className={cn(
                'size-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-150',
                selectedId === trip.id
                  ? 'border-[var(--accent)] bg-[var(--accent)]'
                  : 'border-border'
              )}
            >
              {selectedId === trip.id && (
                <Check size={12} strokeWidth={1.5} className="text-white" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground truncate">
                {trip.destination}
              </p>
              <p className="text-xs text-muted-foreground">{trip.dates}</p>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!selectedId}
        className={cn(
          'w-full inline-flex items-center justify-center gap-2',
          'rounded-xl min-h-[44px] px-5 text-sm font-medium',
          'bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]',
          'disabled:opacity-40 disabled:pointer-events-none transition-colors duration-200'
        )}
      >
        <Link2 size={20} strokeWidth={1.5} />
        Asociar ticket
      </button>
    </div>
  )
}

function SuccessStep({ onDone }: { onDone: () => void }) {
  return (
    <div className="flex flex-col items-center gap-5 py-8 animate-success-pop">
      <div className="size-16 rounded-full bg-[var(--success-muted)] flex items-center justify-center">
        <Receipt size={32} strokeWidth={1.5} className="text-[var(--success-text)]" />
      </div>
      <div className="text-center space-y-1">
        <p className="text-base font-semibold text-[var(--success-text)]">Ticket añadido.</p>
        <p className="text-sm text-muted-foreground">
          Ya aparece en tu nota de gastos.
        </p>
      </div>
      <button
        onClick={onDone}
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

function simulateOcr(): Promise<OcrResult> {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          amount: 47.5,
          currency: 'EUR',
          date: new Date().toISOString().split('T')[0],
          category: 'Restaurante',
          description: 'Comida de trabajo',
        }),
      2200
    )
  )
}

function TicketUploader({ trips, onComplete, onCancel, className }: TicketUploaderProps) {
  const [step, setStep] = React.useState<UploaderStep>('camera')
  const [file, setFile] = React.useState<File | null>(null)
  const [preview, setPreview] = React.useState<string | null>(null)
  const [ocr, setOcr] = React.useState<OcrResult>({
    amount: 0,
    currency: 'EUR',
    date: '',
    category: '',
    description: '',
  })
  const [selectedTripId, setSelectedTripId] = React.useState<string | null>(null)

  async function handleFile(f: File) {
    setFile(f)
    if (f.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(f))
    }
    setStep('ocr')
    const result = await simulateOcr()
    setOcr(result)
    setStep('confirm')
  }

  function handleOcrChange(field: keyof OcrResult, value: string) {
    setOcr((prev) => ({
      ...prev,
      [field]: field === 'amount' ? parseFloat(value) || 0 : value,
    }))
  }

  function handleAssociateNext() {
    if (!file || !selectedTripId) return
    setStep('success')
    onComplete?.({ file, ocr, tripId: selectedTripId })
  }

  return (
    <div
      className={cn(
        'rounded-3xl border bg-card p-6 w-full max-w-sm mx-auto',
        className
      )}
      style={{ boxShadow: 'var(--shadow-lg)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Receipt size={20} strokeWidth={1.5} className="text-[var(--accent-text)]" />
          <h2 className="font-sans text-base font-semibold text-foreground">
            Añadir ticket
          </h2>
        </div>
        {onCancel && step !== 'success' && (
          <button
            onClick={onCancel}
            aria-label="Cancelar"
            className="w-8 h-8 flex items-center justify-center rounded-xl text-muted-foreground hover:bg-muted"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        )}
      </div>

      <StepIndicator current={step} />

      {step === 'camera' && <CameraStep onFile={handleFile} />}
      {step === 'ocr' && <OcrStep preview={preview} />}
      {step === 'confirm' && (
        <ConfirmStep
          ocr={ocr}
          onChange={handleOcrChange}
          onNext={() => setStep('associate')}
        />
      )}
      {step === 'associate' && (
        <AssociateStep
          trips={trips}
          selectedId={selectedTripId}
          onSelect={setSelectedTripId}
          onNext={handleAssociateNext}
        />
      )}
      {step === 'success' && <SuccessStep onDone={() => onCancel?.()} />}
    </div>
  )
}

export { TicketUploader }
