import * as React from 'react'
import { MapPin, Phone, Star, CheckCircle2, ArrowRight } from 'lucide-react'
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
      viewBox="0 0 390 280"
      className="w-full h-full"
      aria-label="Mapa de ruta"
      role="img"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0.05" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="390" height="280" fill="#F2EFE9" />

      {/* Building blocks */}
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

      {/* Main streets */}
      <line x1="0" y1="80"  x2="390" y2="80"  stroke="white" strokeWidth="8" />
      <line x1="0" y1="175" x2="390" y2="175" stroke="white" strokeWidth="8" />
      <line x1="100" y1="0" x2="100" y2="280" stroke="white" strokeWidth="8" />
      <line x1="205" y1="0" x2="205" y2="280" stroke="white" strokeWidth="8" />
      <line x1="310" y1="0" x2="310" y2="280" stroke="white" strokeWidth="8" />

      {/* Secondary streets */}
      <line x1="0"   y1="130" x2="390" y2="130" stroke="white" strokeWidth="4" />
      <line x1="50"  y1="0"   x2="50"  y2="280" stroke="white" strokeWidth="4" />
      <line x1="155" y1="0"   x2="155" y2="280" stroke="white" strokeWidth="4" />
      <line x1="260" y1="0"   x2="260" y2="280" stroke="white" strokeWidth="4" />

      <rect width="390" height="280" fill="url(#mapGlow)" />

      {/* Route */}
      <polyline
        points={`${car.x},${car.y} ${DEST.x},${DEST.y}`}
        fill="none"
        stroke="oklch(0.55 0.18 162)"
        strokeWidth="3"
        strokeDasharray="8 4"
        strokeLinecap="round"
      />

      {/* Destination pin */}
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

      {/* Conductor pulse ring */}
      <circle cx={car.x} cy={car.y} r="10" fill="oklch(0.55 0.18 162)" opacity="0.2">
        <animate attributeName="r"       values="10;18;10" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.2;0;0.2" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx={car.x} cy={car.y} r="6" fill="oklch(0.55 0.18 162)" />
    </svg>
  )
}

// ─── Driver Row ───────────────────────────────────────────────────────────────

function DriverRow({
  name,
  car,
  plate,
  rating,
  compact,
  onCall,
}: {
  name: string
  car: string
  plate: string
  rating: number
  compact?: boolean
  onCall?: () => void
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-muted shrink-0 flex items-center justify-center font-sans font-semibold text-sm text-foreground">
        {name[0]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="font-sans text-sm font-semibold text-foreground">{name}</p>
          <Star size={11} strokeWidth={1.5} className="text-warning fill-warning" aria-hidden />
          <span className="font-sans text-xs text-muted-foreground">{rating}</span>
        </div>
        <p className="font-sans text-xs text-muted-foreground">
          {compact ? plate : `${car} · ${plate}`}
        </p>
      </div>
      {onCall && (
        <button
          onClick={onCall}
          aria-label="Llamar al conductor"
          className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
        >
          <Phone size={16} strokeWidth={1.5} className="text-foreground" />
        </button>
      )}
    </div>
  )
}

// ─── State Views ──────────────────────────────────────────────────────────────

function IncomingContent({
  eta,
  driverName,
  driverCar,
  driverPlate,
  driverRating,
  estimatedPrice,
  paymentMethod,
  onCall,
  onCancel,
}: {
  eta: number
  driverName: string
  driverCar: string
  driverPlate: string
  driverRating: number
  estimatedPrice: number
  paymentMethod: string
  onCall?: () => void
  onCancel?: () => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-foreground shrink-0" />
          <span className="font-sans text-xs font-semibold text-foreground uppercase tracking-wide">
            En camino
          </span>
        </div>
        <div className="text-right">
          <p className="font-display text-4xl text-foreground leading-none">{eta}</p>
          <p className="font-sans text-xs text-muted-foreground mt-0.5">minutos</p>
        </div>
      </div>
      <DriverRow
        name={driverName} car={driverCar} plate={driverPlate}
        rating={driverRating} onCall={onCall}
      />
      <div className="flex items-center justify-between rounded-xl bg-muted px-3 py-2.5">
        <span className="font-sans text-sm font-semibold text-foreground">~{estimatedPrice}€</span>
        <span className="font-sans text-xs text-muted-foreground">{paymentMethod}</span>
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" className="flex-1" onClick={onCall}>Llamar</Button>
        <Button variant="ghost" className="flex-1" onClick={onCancel}>Cancelar</Button>
      </div>
    </div>
  )
}

function LiveContent({
  eta,
  origin,
  destination,
  estimatedPrice,
  paymentMethod,
  onCall,
}: {
  eta: number
  origin: string
  destination: string
  estimatedPrice: number
  paymentMethod: string
  onCall?: () => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
          <span className="font-sans text-xs font-semibold text-accent uppercase tracking-wide">
            En vivo
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-sans text-sm font-semibold text-foreground">{eta} min</span>
          {onCall && (
            <button
              onClick={onCall}
              aria-label="Llamar al conductor"
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <Phone size={14} strokeWidth={1.5} className="text-foreground" />
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 min-w-0">
        <p className="font-sans text-sm text-muted-foreground truncate flex-1">{origin}</p>
        <ArrowRight size={12} strokeWidth={1.5} className="text-muted-foreground shrink-0" />
        <p className="font-sans text-sm font-semibold text-foreground truncate flex-1 text-right">{destination}</p>
      </div>
      <div className="flex items-center justify-between rounded-xl bg-muted px-3 py-2.5">
        <span className="font-sans text-sm font-semibold text-foreground">~{estimatedPrice}€</span>
        <span className="font-sans text-xs text-muted-foreground">{paymentMethod}</span>
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
  onMarkArrived,
}: {
  origin: string
  destination: string
  eta: number
  estimatedPrice: number
  paymentMethod: string
  onMarkArrived?: () => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="flex-1 min-w-0">
          <p className="font-sans text-xs text-muted-foreground truncate">{origin}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <MapPin size={12} strokeWidth={1.5} className="text-accent shrink-0" />
            <p className="font-sans text-sm font-semibold text-foreground truncate">{destination}</p>
          </div>
        </div>
        <div className="flex gap-1.5 shrink-0">
          <span className="px-2 py-1 rounded-full bg-muted font-sans text-xs font-semibold text-muted-foreground">
            {eta} min
          </span>
          <span className="px-2 py-1 rounded-full bg-muted font-sans text-xs font-semibold text-muted-foreground">
            ~{estimatedPrice}€
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-xl bg-accent-soft px-3 py-2.5">
        <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
        <p className="font-sans text-xs text-accent-text">
          Se cargará a <span className="font-semibold">{paymentMethod}</span> automáticamente.
        </p>
      </div>
      <Button variant="accent" className="w-full" onClick={onMarkArrived}>
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
        <div className="flex flex-col items-center pt-12">
          <CheckCircle2 size={56} strokeWidth={1.5} className="text-accent" />
          <p className="font-sans text-sm text-muted-foreground mt-4 text-center">Llegaste a</p>
          <h2 className="font-display text-[28px] text-foreground mt-1 text-center">{destination}</h2>
          <p className="font-sans text-xs text-muted-foreground mt-1 text-center">
            Polígono de Sabón, Arteixo, A Coruña
          </p>
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-center gap-5 mt-8">
          {[
            { value: '13 min', label: 'duración' },
            { value: '10 km',  label: 'distancia' },
            { value: formattedPrice, label: 'total' },
          ].map(({ value, label }, i, arr) => (
            <React.Fragment key={label}>
              <div className="text-center">
                <p className="font-sans text-base font-semibold text-foreground">{value}</p>
                <p className="font-sans text-xs text-muted-foreground">{label}</p>
              </div>
              {i < arr.length - 1 && (
                <div className="w-px h-8 bg-border shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Payment badge */}
        <div className="flex justify-center mt-4">
          <span className="px-3 py-1.5 rounded-full bg-accent-soft font-sans text-xs font-semibold text-accent-text">
            Pagado · {paymentMethod} *4821
          </span>
        </div>

        <div className="border-t border-border mt-6 mb-5" />

        <p className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Registrar como gasto
        </p>
        <div className="rounded-xl bg-muted px-4 py-3 flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl bg-background flex items-center justify-center text-lg shrink-0"
            aria-hidden
          >
            🚕
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-sans text-sm font-semibold text-foreground">Transporte</p>
            <p className="font-sans text-xs text-muted-foreground truncate">{destination}</p>
          </div>
          <span className="font-sans text-sm font-semibold text-foreground shrink-0">
            {formattedPrice}
          </span>
        </div>
      </div>

      {/* Sticky CTAs */}
      <div className="shrink-0 px-5 pt-4 pb-safe border-t border-border bg-background flex flex-col gap-2">
        <Button
          variant="accent"
          className="w-full"
          loading={confirming}
          onClick={handleConfirm}
        >
          Confirmar gasto
        </Button>
        <Button variant="ghost" className="w-full" onClick={onBack}>
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
  driverRating,
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
      {/* Map fills remaining space */}
      <div className="flex-1 relative overflow-hidden">
        <SchematicMap state={state} />
      </div>

      {/* Bottom sheet */}
      <div className="bg-background rounded-t-3xl px-5 pt-5 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        {state === 'incoming' && (
          <IncomingContent
            eta={eta}
            driverName={driverName}
            driverCar={driverCar}
            driverPlate={driverPlate}
            driverRating={driverRating}
            estimatedPrice={estimatedPrice}
            paymentMethod={paymentMethod}
            onCall={onCall}
            onCancel={onCancel}
          />
        )}
        {state === 'live' && (
          <LiveContent
            eta={eta}
            origin={origin}
            destination={destination}
            estimatedPrice={estimatedPrice}
            paymentMethod={paymentMethod}
            onCall={onCall}
          />
        )}
        {state === 'inprogress' && (
          <InProgressContent
            origin={origin}
            destination={destination}
            eta={eta}
            estimatedPrice={estimatedPrice}
            paymentMethod={paymentMethod}
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
