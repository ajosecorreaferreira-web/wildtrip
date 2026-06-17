import { cn } from '@/lib/utils'

export interface FlightRowProps {
  airline: string
  flightCode: string
  departure: string
  arrival: string
  origin: string
  destination: string
  duration: string
  direct: boolean
  price: number
  currency?: string
  selected?: boolean
  badge?: string
  badgeVariant?: 'success' | 'info'
  onClick?: () => void
}

export function FlightRow({
  airline,
  flightCode,
  departure,
  arrival,
  origin,
  destination,
  duration,
  direct,
  price,
  currency = '€',
  selected,
  badge,
  badgeVariant = 'success',
  onClick,
}: FlightRowProps) {
  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      className={cn(
        'relative rounded-xl bg-card px-4 py-3.5 transition-all duration-[180ms]',
        onClick && 'cursor-pointer',
        selected
          ? 'border-2 border-primary shadow-md'
          : 'border border-border hover:border-primary/30 hover:shadow-sm',
      )}
    >
      {/* Times + route */}
      <div className="flex items-center gap-3">
        {/* Departure */}
        <div className="shrink-0 w-12">
          <p className="font-sans text-base font-semibold text-foreground leading-none">
            {departure}
          </p>
          <p className="font-sans text-[10px] text-muted-foreground mt-1 uppercase tracking-wide">
            {origin}
          </p>
        </div>

        {/* Connection line */}
        <div className="flex-1 flex flex-col items-center gap-1 min-w-0">
          <div className="flex items-center w-full">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
            <div className="flex-1 h-px bg-border" />
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-sans text-[10px] text-muted-foreground">{duration}</span>
            {direct && (
              <span className="font-sans text-[9px] font-semibold text-success-text uppercase tracking-wide">
                Directo
              </span>
            )}
          </div>
        </div>

        {/* Arrival */}
        <div className="shrink-0 w-12 text-right">
          <p className="font-sans text-base font-semibold text-foreground leading-none">
            {arrival}
          </p>
          <p className="font-sans text-[10px] text-muted-foreground mt-1 uppercase tracking-wide">
            {destination}
          </p>
        </div>

        {/* Price + badge */}
        <div className="shrink-0 text-right min-w-[52px] ml-1">
          {badge && (
            <span
              className={cn(
                'block mb-1 px-1.5 py-0.5 rounded-full font-sans text-[9px] font-semibold uppercase tracking-wide',
                badgeVariant === 'success'
                  ? 'bg-success-muted text-success-text'
                  : 'bg-info-muted text-info',
              )}
            >
              {badge}
            </span>
          )}
          <p className="font-sans text-sm font-semibold text-foreground">
            {price}{currency}
          </p>
        </div>
      </div>

      {/* Airline footer */}
      <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-border">
        <span className="font-sans text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
          {airline}
        </span>
        <span className="font-sans text-[10px] text-muted-foreground">· {flightCode}</span>
        {!direct && (
          <span className="ml-auto font-sans text-[9px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded-full bg-warning-muted text-warning-text">
            Con escala
          </span>
        )}
      </div>
    </div>
  )
}

// --- Mock Data ---
export const MOCK_FLIGHTS: FlightRowProps[] = [
  {
    airline: 'IBERIA',
    flightCode: 'IB 3456',
    departure: '07:30',
    arrival: '08:45',
    origin: 'MAD',
    destination: 'LCG',
    duration: '1h 15m',
    direct: true,
    price: 89,
    badge: 'Recomendado',
    badgeVariant: 'success',
  },
  {
    airline: 'VUELING',
    flightCode: 'VY 6234',
    departure: '10:15',
    arrival: '11:30',
    origin: 'MAD',
    destination: 'LCG',
    duration: '1h 15m',
    direct: true,
    price: 67,
    badge: 'Más barato',
    badgeVariant: 'info',
    selected: true,
  },
  {
    airline: 'AIR EUROPA',
    flightCode: 'UX 1122',
    departure: '14:00',
    arrival: '16:40',
    origin: 'MAD',
    destination: 'LCG',
    duration: '2h 40m',
    direct: false,
    price: 54,
  },
]
