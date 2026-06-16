import * as React from 'react'
import { Phone, X, ChevronRight, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/wildtrip/atoms'

export type TrackerState = 'incoming' | 'live' | 'inprogress' | 'arrived'

export interface CabifyTrackerProps {
  state: TrackerState
  origin: string
  destination: string
  driverName: string
  driverCar: string
  driverPlate: string
  driverRating: number
  eta: number
  estimatedPrice: number
  paymentMethod: string
  onCall?: () => void
  onCancel?: () => void
  onMarkArrived?: () => void
  className?: string
}

// ─── Schematic SVG Map ────────────────────────────────────────────────────────

const CAR_POSITIONS: Record<TrackerState, { x: number; y: number }> = {
  incoming:   { x: 80,  y: 200 },
  live:       { x: 140, y: 160 },
  inprogress: { x: 220, y: 120 },
  arrived:    { x: 290, y: 85  },
}

const DEST = { x: 290, y: 85 }

function SchematicMap({ state }: { state: TrackerState }) {
  const car = CAR_POSITIONS[state]

  return (
    <svg
      viewBox="0 0 390 420"
      width="100%"
      height="100%"
      aria-label="Mapa de ruta"
      role="img"
      preserveAspectRatio="xMidYMid slice"
      style={{ display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0.05" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="390" height="420" fill="#F2EFE9" />

      <rect x="20"  y="20"  width="80" height="50" rx="4" fill="#E8E3D9" />
      <rect x="120" y="10"  width="60" height="40" rx="4" fill="#E8E3D9" />
      <rect x="200" y="25"  width="90" height="55" rx="4" fill="#E8E3D9" />
      <rect x="310" y="15"  width="65" height="45" rx="4" fill="#E8E3D9" />
      <rect x="15"  y="100" width="70" height="60" rx="4" fill="#E8E3D9" />
      <rect x="110" y="90"  width="85" height="65" rx="4" fill="#E8E3D9" />
      <rect x="220" y="100" width="75" height="55" rx="4" fill="#E8E3D9" />
      <rect x="315" y="90"  width="60" height="70" rx="4" fill="#E8E3D9" />
      <rect x="20"  y="195" width="85" height="65" rx="4" fill="#E8E3D9" />
      <rect x="130" y="200" width="70" height="60" rx="4" fill="#E8E3D9" />
      <rect x="225" y="190" width="80" height="70" rx="4" fill="#E8E3D9" />
      <rect x="325" y="200" width="50" height="55" rx="4" fill="#E8E3D9" />

      <line x1="0" y1="80"  x2="390" y2="80"  stroke="white" strokeWidth="8" />
      <line x1="0" y1="175" x2="390" y2="175" stroke="white" strokeWidth="8" />
      <line x1="100" y1="0" x2="100" y2="280" stroke="white" strokeWidth="8" />
      <line x1="205" y1="0" x2="205" y2="280" stroke="white" strokeWidth="8" />
      <line x1="310" y1="0" x2="310" y2="280" stroke="white" strokeWidth="8" />

      <line x1="0"   y1="130" x2="390" y2="130" stroke="white" strokeWidth="4" />
      <line x1="50"  y1="0"   x2="50"  y2="280" stroke="white" strokeWidth="4" />
      <line x1="155" y1="0"   x2="155" y2="280" stroke="white" strokeWidth="4" />
      <line x1="260" y1="0"   x2="260" y2="280" stroke="white" strokeWidth="4" />

      <rect width="390" height="420" fill="url(#mapGlow)" />

      <polyline
        points={`${car.x},${car.y} ${DEST.x},${DEST.y}`}
        fill="none"
        stroke="oklch(0.55 0.18 162)"
        strokeWidth="3"
        strokeDasharray="8 4"
        strokeLinecap="round"
      />

      <circle cx={DEST.x} cy={DEST.y} r="10" fill="oklch(0.20 0.10 264)" />
      <circle cx={DEST.x} cy={DEST.y} r="4"  fill="white" />
      <rect x="255" y="55" width="70" height="20" rx="4" fill="oklch(0.20 0.10 264)" />
      <text
        x="290" y="69"
        textAnchor="middle"
        fill="white"
        fontSize="9"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontWeight="600"
      >
        Inditex Ar.
      </text>

      <circle cx={car.x} cy={car.y} r="10" fill="oklch(0.55 0.18 162)" opacity="0.2">
        <animate attributeName="r"       values="10;18;10" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.2;0;0.2" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx={car.x} cy={car.y} r="6" fill="oklch(0.55 0.18 162)" />
    </svg>
  )
}

// ─── Driver Avatar ────────────────────────────────────────────────────────────

function driverInitials(name: string) {
  return name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()
}

// ─── State Views ──────────────────────────────────────────────────────────────

function IncomingContent({
  eta,
  driverName,
  driverCar,
  driverPlate,
  origin,
  destination,
  estimatedPrice,
  paymentMethod,
  onCall,
  onCancel,
  isLive,
}: {
  eta: number
  driverName: string
  driverCar: string
  driverPlate: string
  origin: string
  destination: string
  estimatedPrice: number
  paymentMethod: string
  onCall?: () => void
  onCancel?: () => void
  isLive?: boolean
}) {
  return (
    <div className="flex flex-col gap-0">
      {/* Drag handle */}
      <div className="w-10 h-1 bg-border rounded-full mx-auto mb-4" />

      {/* Badge + ETA */}
      <div className="flex items-center justify-between">
        <span className={cn(
          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-sans text-xs font-semibold',
          isLive ? 'bg-accent/10 text-accent' : 'bg-muted text-foreground',
        )}>
          <span className={cn(
            'w-1.5 h-1.5 rounded-full bg-accent shrink-0',
            isLive && 'animate-pulse',
          )} />
          {isLive ? 'EN VIVO' : 'EN CAMINO'}
        </span>
        <span className="font-sans text-3xl font-bold text-foreground leading-none">
          {eta} <span className="text-base font-normal text-muted-foreground">min</span>
        </span>
      </div>

      {/* Driver row */}
      <div className="flex items-center gap-3 mt-4">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
          <span className="font-sans text-xs font-semibold text-primary-foreground">
            {driverInitials(driverName)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-sans text-sm font-semibold text-foreground">{driverName}</p>
          <p className="font-sans text-xs text-muted-foreground">
            {driverCar} · {driverPlate}
          </p>
        </div>
        <span className="font-sans text-[13px] text-warning font-semibold shrink-0">
          ★ 4.9
        </span>
      </div>

      <div className="border-t border-border mt-3" />

      {/* Origin → destination */}
      <div className="flex items-center gap-2 mt-3">
        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
        <p className="font-sans text-xs text-muted-foreground">{origin}</p>
        <ChevronRight size={14} strokeWidth={1.5} className="text-muted-foreground shrink-0" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
        <p className="font-sans text-xs font-semibold text-foreground">{destination}</p>
      </div>

      {/* Price pill */}
      <div className="mt-3">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-muted font-sans text-xs text-muted-foreground">
          ~{estimatedPrice}€ · {paymentMethod}
        </span>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={onCall}
          className="flex-1 h-10 rounded-xl border border-border flex items-center justify-center gap-2 font-sans text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          <Phone size={16} strokeWidth={1.5} />
          Llamar
        </button>
        {!isLive && (
          <button
            onClick={onCancel}
            className="flex-1 h-10 rounded-xl border border-border flex items-center justify-center gap-2 font-sans text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <X size={16} strokeWidth={1.5} />
            Cancelar
          </button>
        )}
      </div>
    </div>
  )
}

function InProgressContent({
  origin,
  destination,
  eta,
  estimatedPrice,
  paymentMethod,
  driverName,
  driverCar,
  driverPlate,
  onCall,
  onMarkArrived,
}: {
  origin: string
  destination: string
  eta: number
  estimatedPrice: number
  paymentMethod: string
  driverName: string
  driverCar: string
  driverPlate: string
  onCall?: () => void
  onMarkArrived?: () => void
}) {
  return (
    <div className="flex flex-col gap-0">
      {/* Drag handle */}
      <div className="w-10 h-1 bg-border rounded-full mx-auto mb-4" />

      {/* Badge + ETA */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted font-sans text-xs font-semibold text-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
          EN TRAYECTO
        </span>
        <span className="font-sans text-3xl font-bold text-foreground leading-none">
          {eta} <span className="text-base font-normal text-muted-foreground">min</span>
        </span>
      </div>

      {/* Driver compact */}
      <div className="flex items-center gap-3 mt-4">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
          <span className="font-sans text-xs font-semibold text-primary-foreground">
            {driverInitials(driverName)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-sans text-sm font-semibold text-foreground">
            {driverName} · {driverCar}
          </p>
          <p className="font-sans text-xs text-muted-foreground">{driverPlate}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={onCall}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Llamar"
          >
            <Phone size={16} strokeWidth={1.5} className="text-foreground" />
          </button>
        </div>
      </div>

      {/* Payment banner */}
      <div className="mt-3 rounded-xl bg-success-muted px-3 py-2.5">
        <p className="font-sans text-xs text-success-text">
          Se cargará a <span className="font-semibold">{paymentMethod}</span> automáticamente.
        </p>
      </div>

      <div className="flex items-center justify-between mt-3">
        <span className="font-sans text-sm text-muted-foreground">
          {origin} → {destination}
        </span>
        <span className="font-sans text-sm font-semibold text-foreground">~{estimatedPrice}€</span>
      </div>

      <Button variant="accent" className="w-full mt-4" onClick={onMarkArrived}>
        Ya llegué
      </Button>
    </div>
  )
}

function ArrivedView({
  destination,
  estimatedPrice,
  paymentMethod,
  onBack,
}: {
  destination: string
  estimatedPrice: number
  paymentMethod: string
  onBack?: () => void
}) {
  const [confirming, setConfirming] = React.useState(false)
  const [confirmed, setConfirmed] = React.useState(false)

  const formattedPrice =
    new Intl.NumberFormat('es-ES', { minimumFractionDigits: 2 }).format(estimatedPrice) + '€'

  async function handleConfirm() {
    setConfirming(true)
    await new Promise((r) => setTimeout(r, 1000))
    setConfirming(false)
    setConfirmed(true)
  }

  if (confirmed) {
    return (
      <>
        <div className="flex flex-col items-center justify-center flex-1 gap-4 px-5">
          <div className="w-14 h-14 rounded-full bg-accent-soft flex items-center justify-center">
            <CheckCircle2 size={28} strokeWidth={1.5} className="text-accent-text" />
          </div>
          <p className="font-sans text-sm font-semibold text-foreground">Gasto guardado.</p>
        </div>
        <div className="shrink-0 px-5 pb-safe pt-4">
          <Button variant="ghost" className="w-full" onClick={onBack}>
            Volver al itinerario
          </Button>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto px-5 pb-4">
        <div className="flex flex-col items-center pt-16">
          <CheckCircle2 size={56} strokeWidth={1.5} className="text-accent" />
          <p className="font-sans text-sm text-muted-foreground mt-4 text-center">Llegaste a</p>
          <h2 className="font-display text-[26px] text-foreground mt-1 text-center leading-tight">
            {destination}
          </h2>
          <p className="font-sans text-xs text-muted-foreground mt-1 text-center">
            Polígono de Sabón · Arteixo, A Coruña
          </p>

          {/* Stats inline */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="font-sans text-sm font-semibold text-foreground">13 min</span>
            <span className="text-muted-foreground">·</span>
            <span className="font-sans text-sm font-semibold text-foreground">10 km</span>
            <span className="text-muted-foreground">·</span>
            <span className="font-sans text-sm font-semibold text-foreground">{formattedPrice}</span>
          </div>

          {/* Payment badge */}
          <span className="mt-3 px-3 py-1 rounded-full bg-success-muted font-sans text-xs font-semibold text-success-text">
            ✓ Pagado · {paymentMethod} *4821
          </span>
        </div>

        <div className="border-t border-border mt-6 mb-4" />

        <p className="font-sans text-sm font-semibold text-foreground mb-3">
          Registrar como gasto
        </p>

        {/* Expense card */}
        <div className="rounded-xl bg-muted px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg" aria-hidden>🚕</span>
            <div>
              <p className="font-sans text-[13px] text-foreground">Transporte</p>
              <p className="font-sans text-xs text-muted-foreground">
                Inditex A Coruña · 15-17 jun
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-sans text-[13px] font-semibold text-foreground">
              {formattedPrice}
            </span>
            <ChevronRight size={14} strokeWidth={1.5} className="text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Sticky CTAs */}
      <div className="shrink-0 px-5 pt-4 pb-safe border-t border-border bg-background flex flex-col gap-2">
        <Button
          variant="accent"
          size="lg"
          className="w-full"
          loading={confirming}
          onClick={handleConfirm}
        >
          Confirmar gasto
        </Button>
        <Button variant="ghost" className="w-full h-11" onClick={onBack}>
          Ahora no
        </Button>
      </div>
    </>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function CabifyTracker({
  state,
  origin,
  destination,
  driverName,
  driverCar,
  driverPlate,
  eta,
  estimatedPrice,
  paymentMethod,
  onCall,
  onCancel,
  onMarkArrived,
  className,
}: CabifyTrackerProps) {
  if (state === 'arrived') {
    return (
      <div className={cn('flex flex-col h-full bg-background', className)}>
        <ArrivedView
          destination={destination}
          estimatedPrice={estimatedPrice}
          paymentMethod={paymentMethod}
          onBack={onCancel}
        />
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Map */}
      <div className="min-h-[60vh] flex-1 relative overflow-hidden">
        <SchematicMap state={state} />
      </div>

      {/* Bottom sheet */}
      <div className="bg-background rounded-t-3xl px-5 pt-4 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        {(state === 'incoming' || state === 'live') && (
          <IncomingContent
            eta={eta}
            driverName={driverName}
            driverCar={driverCar}
            driverPlate={driverPlate}
            origin={origin}
            destination={destination}
            estimatedPrice={estimatedPrice}
            paymentMethod={paymentMethod}
            onCall={onCall}
            onCancel={onCancel}
            isLive={state === 'live'}
          />
        )}
        {state === 'inprogress' && (
          <InProgressContent
            origin={origin}
            destination={destination}
            eta={eta}
            estimatedPrice={estimatedPrice}
            paymentMethod={paymentMethod}
            driverName={driverName}
            driverCar={driverCar}
            driverPlate={driverPlate}
            onCall={onCall}
            onMarkArrived={onMarkArrived}
          />
        )}
      </div>
    </div>
  )
}

// --- Mock Data ---
export const MOCK_CABIFY_TRACKER: Omit<CabifyTrackerProps, 'state'> = {
  origin: 'Hotel NH Finisterre · A Coruña',
  destination: 'Inditex Arteixo',
  driverName: 'Carlos M.',
  driverCar: 'BMW Serie 3 · Gris',
  driverPlate: '2847 KTL',
  driverRating: 4.9,
  eta: 6,
  estimatedPrice: 22,
  paymentMethod: 'Revolut Jungle',
}
