import { cn } from '@/lib/utils'
import { StatusBadge } from '@/components/wildtrip/atoms'

export interface CabifyLegRowProps {
  origin: string
  destination: string
  day: string
  time: string
  estimatedPrice: number
  duration?: string
  auto?: boolean
  className?: string
}

export function CabifyLegRow({
  origin,
  destination,
  day,
  time,
  estimatedPrice,
  duration,
  auto,
  className,
}: CabifyLegRowProps) {
  return (
    <div className={cn('flex items-center gap-3 py-2', className)}>
      {/* Emoji icon */}
      <div
        className="w-8 h-8 rounded-lg bg-accent-soft shrink-0 flex items-center justify-center text-base"
        aria-hidden
      >
        🚕
      </div>

      {/* Route + metadata */}
      <div className="flex-1 min-w-0">
        <p className="font-sans text-[13px] font-semibold text-foreground leading-snug truncate">
          {origin}
          <span className="mx-1 text-muted-foreground font-normal">→</span>
          {destination}
        </p>
        <p className="font-sans text-xs text-muted-foreground mt-0.5">
          {day} · {time}
          {duration && (
            <span className="ml-1 text-muted-foreground/70">{duration}</span>
          )}
        </p>
      </div>

      {/* Right: badge + price */}
      <div className="shrink-0 flex flex-col items-end gap-1">
        {auto && <StatusBadge status="auto" size="sm" />}
        <p className="font-sans text-sm font-semibold text-foreground">
          ~{estimatedPrice}€
        </p>
      </div>
    </div>
  )
}

// --- Mock Data ---
export const MOCK_CABIFY_LEGS: CabifyLegRowProps[] = [
  {
    origin: 'Casa · Madrid',
    destination: 'MAD T4',
    day: 'Lunes 15 jun',
    time: '06:00',
    estimatedPrice: 18,
    duration: '~35 min',
    auto: true,
  },
  {
    origin: 'Hotel NH Finisterre',
    destination: 'Inditex HQ · A Coruña',
    day: 'Martes 16 jun',
    time: '09:00',
    estimatedPrice: 8,
    duration: '~12 min',
  },
  {
    origin: 'LCG Aeropuerto',
    destination: 'Casa · Madrid',
    day: 'Miércoles 17 jun',
    time: '19:30',
    estimatedPrice: 22,
    duration: '~40 min',
    auto: true,
  },
]
