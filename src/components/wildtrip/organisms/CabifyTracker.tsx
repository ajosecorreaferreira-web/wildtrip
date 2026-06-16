import * as React from 'react'
import { MapPin, Phone, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button, StatusBadge } from '@/components/wildtrip/atoms'
import { EXPENSE_EMOJIS } from '@/components/wildtrip/molecules'
import type { ExpenseCategory } from '@/components/wildtrip/molecules'

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

      {/* Subtle glow */}
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
      {/* Conductor dot */}
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
        {!compact && (
          <p className="font-sans text-xs text-muted-foreground">{car} · {plate}</p>
        )}
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

// ─── State views ──────────────────────────────────────────────────────────────

function IncomingContent({
  eta,
  driverName,
  driverCar,
  driverPlate,
  driverRating,
  onCall,
  onCancel,
}: {
  eta: number
  driverName: string
  driverCar: string
  driverPlate: string
  driverRating: number
  onCall?: () => void
  onCancel?: () => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display text-4xl text-foreground leading-none">{eta}</p>
          <p className="font-sans text-xs text-muted-foreground mt-1">minutos</p>
        </div>
        <StatusBadge status="in_progress" size="base" />
      </div>
      <DriverRow
        name={driverName} car={driverCar} plate={driverPlate}
        rating={driverRating} onCall={onCall}
      />
      <Button variant="ghost" className="w-full mt-2" onClick={onCancel}>
        Cancelar
      </Button>
    </div>
  )
}

function LiveContent({
  eta,
  driverName,
  driverCar,
  driverPlate,
  driverRating,
  onCall,
}: {
  eta: number
  driverName: string
  driverCar: string
  driverPlate: string
  driverRating: number
  onCall?: () => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
          <span className="font-sans text-xs font-semibold text-accent uppercase tracking-wide">En vivo</span>
        </div>
        <span className="font-sans text-sm font-semibold text-foreground ml-auto">{eta} min</span>
      </div>
      <DriverRow
        name={driverName} car={driverCar} plate={driverPlate}
        rating={driverRating} compact onCall={onCall}
      />
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
  const selectedCategory: ExpenseCategory = 'transport'

  async function handleConfirm() {
    setConfirming(true)
    await new Promise((r) => setTimeout(r, 1000))
    setConfirming(false)
    setConfirmed(true)
  }

  if (confirmed) {
    return (
      <div className="flex flex-col items-center gap-3 py-6 animate-success-pop">
        <div className="w-12 h-12 rounded-full bg-success-muted flex items-center justify-center">
          <span className="text-xl" aria-hidden>{EXPENSE_EMOJIS[selectedCategory]}</span>
        </div>
        <p className="font-sans text-sm font-semibold text-success-text">Gasto guardado.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5 animate-success-pop">
      {/* Check */}
      <div className="flex flex-col items-center gap-3 py-4">
        <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center shadow-md">
          <span className="text-2xl text-accent-foreground">✓</span>
        </div>
        <div className="text-center">
          <h3 className="font-display text-2xl text-foreground">Llegaste a {destination}</h3>
        </div>
      </div>

      {/* Trip summary */}
      <div className="flex items-center justify-center gap-4">
        <div className="text-center">
          <p className="font-sans text-lg font-semibold text-foreground">{estimatedPrice}€</p>
          <p className="font-sans text-xs text-muted-foreground">total</p>
        </div>
        <div className="w-px h-8 bg-border" />
        <div className="text-center">
          <p className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Pagado
          </p>
          <p className="font-sans text-xs text-foreground">{paymentMethod}</p>
        </div>
      </div>

      {/* Expense registration */}
      <div className="rounded-xl border border-border p-4 flex flex-col gap-3">
        <p className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Registrar como gasto
        </p>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-base" aria-hidden>
            🚕
          </div>
          <div className="flex-1">
            <p className="font-sans text-sm font-semibold text-foreground">Transporte</p>
            <p className="font-sans text-xs text-muted-foreground">{destination}</p>
          </div>
          <span className="font-sans text-sm font-semibold text-foreground">{estimatedPrice}€</span>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="flex-1">
            Ahora no
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            loading={confirming}
            onClick={handleConfirm}
          >
            Confirmar gasto
          </Button>
        </div>
      </div>
      <Button variant="ghost" className="w-full mt-3" onClick={onBack}>
        Volver al itinerario
      </Button>
    </div>
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
  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Map fills remaining space */}
      <div className="flex-1 relative overflow-hidden">
        <SchematicMap state={state} />
      </div>

      {/* Bottom sheet — sits naturally at the bottom */}
      <div className="bg-background rounded-t-3xl px-5 pt-5 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        {state === 'incoming' && (
          <IncomingContent
            eta={eta} driverName={driverName} driverCar={driverCar}
            driverPlate={driverPlate} driverRating={driverRating}
            onCall={onCall} onCancel={onCancel}
          />
        )}
        {state === 'live' && (
          <LiveContent
            eta={eta} driverName={driverName} driverCar={driverCar}
            driverPlate={driverPlate} driverRating={driverRating}
            onCall={onCall}
          />
        )}
        {state === 'inprogress' && (
          <InProgressContent
            origin={origin} destination={destination}
            eta={eta} estimatedPrice={estimatedPrice} paymentMethod={paymentMethod}
            onMarkArrived={onMarkArrived}
          />
        )}
        {state === 'arrived' && (
          <ArrivedView
            destination={destination}
            estimatedPrice={estimatedPrice}
            paymentMethod={paymentMethod}
            onBack={onCancel}
          />
        )}
      </div>
    </div>
  )
}

// --- Mock Data ---
export const MOCK_CABIFY_TRACKER: Omit<CabifyTrackerProps, 'state'> = {
  origin: 'Hotel NH Finisterre · A Coruña',
  destination: 'MAD T4',
  driverName: 'Carlos M.',
  driverCar: 'BMW Serie 3 · Gris',
  driverPlate: '2847 KTL',
  driverRating: 4.9,
  eta: 6,
  estimatedPrice: 18,
  paymentMethod: 'Revolut Jungle',
}
