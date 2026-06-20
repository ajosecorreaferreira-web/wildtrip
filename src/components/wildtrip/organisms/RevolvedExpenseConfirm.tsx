import * as React from 'react'
import { X, ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/wildtrip/atoms'
import { EXPENSE_EMOJIS } from '@/components/wildtrip/molecules'
import type { ExpenseCategory } from '@/components/wildtrip/molecules'
import type { TripOption } from '@/components/wildtrip/organisms/TicketUploader'

export interface RevolvedConfirmData {
  category: ExpenseCategory
  tripId: string
  note?: string
}

export interface RevolvedExpenseConfirmProps {
  amount: number
  merchant: string
  location?: string
  date: string
  cardLast4: string
  suggestedCategory: ExpenseCategory
  trips: TripOption[]
  activeTrip?: string
  onConfirm: (data: RevolvedConfirmData) => Promise<void>
  onDismiss: () => void
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

export function RevolvedExpenseConfirm({
  amount,
  merchant,
  location,
  date,
  cardLast4,
  suggestedCategory,
  trips,
  activeTrip,
  onConfirm,
  onDismiss,
  className,
}: RevolvedExpenseConfirmProps) {
  const [category, setCategory] = React.useState<ExpenseCategory>(suggestedCategory)
  const [tripId, setTripId] = React.useState(activeTrip ?? trips[0]?.id ?? '')
  const [confirming, setConfirming] = React.useState(false)
  const [confirmed, setConfirmed] = React.useState(false)

  const selectedTrip = trips.find((t) => t.id === tripId)

  const amountFormatted = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)

  async function handleConfirm() {
    setConfirming(true)
    try {
      await onConfirm({ category, tripId })
      setConfirmed(true)
    } finally {
      setConfirming(false)
    }
  }

  if (confirmed) {
    return (
      <div className={cn('flex flex-col h-full bg-background', className)}>
        <div className="flex-1 flex flex-col items-center justify-center gap-4 animate-success-pop">
          <div className="text-4xl" aria-hidden>{EXPENSE_EMOJIS[category]}</div>
          <p className="font-display text-2xl text-foreground">Guardado.</p>
          <p className="font-sans text-sm text-muted-foreground">{merchant} · {amountFormatted}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col h-full bg-background', className)}>
      {/* Compact navy header */}
      <div className="h-[60px] bg-primary flex items-center justify-between px-5 shrink-0">
        <p className="font-sans text-sm font-semibold text-primary-foreground">
          Nuevo gasto · Revolut
        </p>
        <button
          onClick={onDismiss}
          aria-label="Cerrar"
          className="w-8 h-8 flex items-center justify-center rounded-xl text-primary-foreground/60 hover:text-primary-foreground"
        >
          <X size={16} strokeWidth={1.5} />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Hero amount */}
        <div className="flex flex-col items-center gap-2 px-5 py-8">
          <p className="font-display text-5xl text-foreground leading-none">{amountFormatted}</p>
          <p className="font-sans text-sm font-semibold text-foreground mt-1">{merchant}</p>
          <p className="font-sans text-xs text-muted-foreground">
            {date}
            {location && ` · ${location}`}
            {` · ****${cardLast4}`}
          </p>
        </div>

        <div className="mx-5 h-px bg-border" />

        {/* Category grid */}
        <div className="px-5 pt-6 pb-4">
          <p className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Categoría
          </p>
          <div className="grid grid-cols-5 gap-2">
            {CATEGORY_OPTIONS.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  'relative flex flex-col items-center gap-1.5 p-3 rounded-xl cursor-pointer transition-all duration-[var(--duration-base)]',
                  category === cat
                    ? 'border-2 border-primary bg-primary/10'
                    : 'border border-border bg-background hover:bg-muted',
                )}
              >
                {category === cat && (
                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                    <Check size={10} className="text-primary-foreground" />
                  </div>
                )}
                <span className="text-2xl" aria-hidden>{EXPENSE_EMOJIS[cat]}</span>
                <span className="font-sans text-xs font-medium text-muted-foreground leading-none">
                  {CATEGORY_LABELS[cat]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Trip selector */}
        <div className="px-5 pb-8">
          <p className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Viaje
          </p>
          <div className="relative">
            <select
              value={tripId}
              onChange={(e) => setTripId(e.target.value)}
              className={cn(
                'w-full rounded-xl border border-border bg-card px-3 py-3 font-sans text-sm text-foreground',
                'appearance-none focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20',
              )}
            >
              {trips.map((trip) => (
                <option key={trip.id} value={trip.id}>
                  {trip.destination} · {trip.dateRange}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              strokeWidth={1.5}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
          </div>
          {selectedTrip && (
            <p className="font-sans text-xs text-muted-foreground mt-1.5 pl-1">
              {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(selectedTrip.available)} disponibles
            </p>
          )}
        </div>
      </div>

      {/* Sticky bottom */}
      <div className="sticky-cta border-t border-border px-5 pt-4">
        <Button
          variant="accent"
          size="lg"
          className="w-full"
          loading={confirming}
          onClick={handleConfirm}
        >
          Confirmar gasto
        </Button>
        <p className="font-sans text-[10px] text-muted-foreground text-center mt-2.5">
          El ticket digital ya está guardado en Revolut.
        </p>
      </div>
    </div>
  )
}

// --- Mock Data ---
export const MOCK_REVOLVED_CONFIRM: Omit<RevolvedExpenseConfirmProps, 'onConfirm' | 'onDismiss'> = {
  amount: 67.8,
  merchant: 'Restaurante Domus',
  location: 'A Coruña',
  date: 'Mar 16 jun · 13:47',
  cardLast4: '4821',
  suggestedCategory: 'meal',
  activeTrip: 'trip-1',
  trips: [
    { id: 'trip-1', destination: 'A Coruña', dateRange: '15–17 jun', isActive: true, budget: 1200, available: 550 },
    { id: 'trip-2', destination: 'Barcelona', dateRange: '22–24 jun', isActive: false, budget: 900, available: 900 },
  ],
}
