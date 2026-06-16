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
  className?: string
}

// ─── Schematic SVG Map ────────────────────────────────────────────────────────

function SchematicMap({
  state,
  destination,
}: {
  state: TrackerState
  destination: string
}) {
  const carPositions: Record<TrackerState, { x: number; y: number }> = {
    incoming:   { x: 80,  y: 180 },
    live:       { x: 160, y: 140 },
    inprogress: { x: 240, y: 110 },
    arrived:    { x: 310, y: 80  },
  }

  const car = carPositions[state]

  return (
    <svg
      viewBox="0 0 390 220"
      className="w-full h-full"
      style={{ background: '#F0EDE8' }}
      aria-label="Mapa esquemático de ruta"
      role="img"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Street blocks */}
      <rect x="0"   y="60"  width="390" height="20" fill="#D8D4CF" opacity="0.8" rx="2" />
      <rect x="0"   y="120" width="390" height="16" fill="#D8D4CF" opacity="0.6" rx="2" />
      <rect x="0"   y="170" width="390" height="14" fill="#D8D4CF" opacity="0.5" rx="2" />
      <rect x="60"  y="0"   width="20"  height="220" fill="#D8D4CF" opacity="0.5" rx="2" />
      <rect x="180" y="0"   width="16"  height="220" fill="#D8D4CF" opacity="0.4" rx="2" />
      <rect x="310" y="0"   width="16"  height="220" fill="#D8D4CF" opacity="0.4" rx="2" />

      {/* Route polyline */}
      <polyline
        points={`${car.x},${car.y} ${car.x + 60},${car.y - 30} 310,80`}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeDasharray="6 4"
        strokeLinecap="round"
      />

      {/* Destination pin */}
      <circle cx="310" cy="80" r="8" fill="var(--primary)" />
      <circle cx="310" cy="80" r="4" fill="var(--primary-foreground)" />

      {/* Car dot with pulse */}
      <circle cx={car.x} cy={car.y} r="14" fill="var(--accent)" opacity="0.2">
        <animate attributeName="r" values="14;20;14" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.2;0;0.2" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx={car.x} cy={car.y} r="8" fill="var(--accent)" />
      <circle cx={car.x} cy={car.y} r="4" fill="var(--accent-foreground)" />

      {/* Destination label */}
      <text
        x="310"
        y="60"
        textAnchor="middle"
        fontSize="9"
        fill="var(--primary)"
        fontWeight="600"
        fontFamily="system-ui"
      >
        {destination.slice(0, 10)}
      </text>
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
}: {
  origin: string
  destination: string
  eta: number
  estimatedPrice: number
  paymentMethod: string
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
    </div>
  )
}

function ArrivedView({
  destination,
  estimatedPrice,
  paymentMethod,
}: {
  destination: string
  estimatedPrice: number
  paymentMethod: string
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
  className,
}: CabifyTrackerProps) {
  return (
    <div className={cn('flex flex-col flex-1', className)}>
      {/* Map */}
      <div className="min-h-[55vh] overflow-hidden" style={{ background: '#F0EDE8' }}>
        <SchematicMap state={state} destination={destination} />
      </div>

      {/* Bottom sheet */}
      <div className="bg-background rounded-t-3xl -mt-6 px-5 py-5 flex-1">
        {state === 'incoming' && (
          <IncomingContent
            eta={eta} driverName={driverName} driverCar={driverCar}
            driverPlate={driverPlate} driverRating={driverRating}
            onCall={onCall}
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
          />
        )}
        {state === 'arrived' && (
          <ArrivedView
            destination={destination}
            estimatedPrice={estimatedPrice}
            paymentMethod={paymentMethod}
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
