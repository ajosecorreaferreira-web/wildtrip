import { cn } from '@/lib/utils'

export interface HotelCardProps {
  name: string
  stars: number
  description: string
  pricePerNight: number
  totalPrice: number
  nights: number
  selected?: boolean
  badge?: string
  badgeVariant?: 'success' | 'muted'
  onClick?: () => void
}

function formatEUR(n: number) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n)
}

export function HotelCard({
  name,
  stars,
  description,
  pricePerNight,
  totalPrice,
  nights,
  selected,
  badge,
  badgeVariant = 'success',
  onClick,
}: HotelCardProps) {
  const starsCount = Math.max(0, Math.min(5, Math.round(stars)))

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      className={cn(
        'relative rounded-xl bg-card px-4 py-4 transition-all duration-[180ms]',
        onClick && 'cursor-pointer',
        selected
          ? 'border-2 border-primary shadow-md'
          : 'border border-border hover:border-primary/30 hover:shadow-sm',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Hotel info */}
        <div className="flex-1 min-w-0">
          {badge && (
            <span
              className={cn(
                'inline-flex mb-2 px-2 py-0.5 rounded-full font-sans text-[9px] font-semibold uppercase tracking-wide',
                badgeVariant === 'success'
                  ? 'bg-success-muted text-success-text'
                  : 'bg-muted text-muted-foreground',
              )}
            >
              {badge}
            </span>
          )}
          <p className="font-sans text-sm font-semibold text-foreground leading-snug">{name}</p>
          <p
            className="font-sans text-xs text-warning mt-0.5 leading-none"
            aria-label={`${starsCount} estrellas`}
          >
            {'★'.repeat(starsCount)}
            <span className="text-border">{'★'.repeat(5 - starsCount)}</span>
          </p>
          <p className="font-sans text-xs text-muted-foreground mt-1.5 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Price */}
        <div className="shrink-0 text-right">
          <p className="font-sans text-base font-semibold text-foreground leading-none">
            {formatEUR(pricePerNight)}
          </p>
          <p className="font-sans text-[10px] text-muted-foreground mt-0.5">por noche</p>
          <p className="font-sans text-xs text-muted-foreground mt-2">
            {formatEUR(totalPrice)} · {nights}n
          </p>
        </div>
      </div>
    </div>
  )
}

// --- Mock Data ---
export const MOCK_HOTELS: HotelCardProps[] = [
  {
    name: 'NH Finisterre',
    stars: 4,
    description: 'Cerca oficinas Inditex · 0.3km · Desayuno incluido',
    pricePerNight: 89,
    totalPrice: 267,
    nights: 3,
    badge: 'Recomendado',
    badgeVariant: 'success',
  },
  {
    name: 'Meliá María Pita',
    stars: 4,
    description: 'Centro histórico · Vistas al mar · 1.2km oficinas',
    pricePerNight: 74,
    totalPrice: 222,
    nights: 3,
    badge: 'Más económico',
    badgeVariant: 'muted',
    selected: true,
  },
  {
    name: 'Apartamentos Marineda',
    stars: 3,
    description: 'Cocina equipada · Parking incluido · 2.1km oficinas',
    pricePerNight: 58,
    totalPrice: 174,
    nights: 3,
  },
]
