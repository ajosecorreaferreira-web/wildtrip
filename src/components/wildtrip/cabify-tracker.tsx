import * as React from 'react'
import { Car, MapPin, Clock, CheckCircle, Loader2, Navigation } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type TrackerState = 'requesting' | 'coming' | 'en_route' | 'arrived'

export interface CabifyTrackerProps {
  origin: string
  destination: string
  onArrived?: () => void
  className?: string
}

const STATE_LABELS: Record<TrackerState, string> = {
  requesting: 'Buscando conductor...',
  coming: 'El conductor está en camino',
  en_route: 'En ruta',
  arrived: 'Has llegado',
}

function RequestingState() {
  return (
    <div className="flex flex-col items-center gap-4 py-8 animate-fade-in">
      <div className="size-16 rounded-full bg-[var(--accent-soft)] flex items-center justify-center">
        <Loader2 size={32} strokeWidth={1.5} className="text-[var(--accent-text)] animate-spin" />
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-foreground">Buscando conductor...</p>
        <p className="text-xs text-muted-foreground mt-1">Conectando con Cabify</p>
      </div>
    </div>
  )
}

function ComingState({
  eta,
  driverName,
  plate,
}: {
  eta: number
  driverName: string
  plate: string
}) {
  const [remaining, setRemaining] = React.useState(eta)

  React.useEffect(() => {
    if (remaining <= 0) return
    const t = setInterval(() => setRemaining((n) => Math.max(n - 1, 0)), 60000)
    return () => clearInterval(t)
  }, [remaining])

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Map placeholder */}
      <div className="h-32 rounded-xl bg-secondary flex items-center justify-center relative overflow-hidden">
        <div className="flex flex-col items-center gap-2">
          <Navigation size={20} strokeWidth={1.5} className="text-[var(--accent-text)]" />
          <p className="text-xs text-muted-foreground">Vista de mapa</p>
        </div>
      </div>

      {/* Driver card */}
      <div className="flex items-center gap-4 rounded-xl border bg-muted/40 px-4 py-3">
        <div className="size-10 rounded-full bg-[var(--accent-soft)] flex items-center justify-center shrink-0">
          <Car size={20} strokeWidth={1.5} className="text-[var(--accent-text)]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">{driverName}</p>
          <p className="text-xs text-muted-foreground">{plate}</p>
        </div>
        <div className="flex flex-col items-end shrink-0">
          <p className="text-xl font-semibold text-foreground tabular-nums">{remaining}</p>
          <p className="text-xs text-muted-foreground">min</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock size={20} strokeWidth={1.5} className="shrink-0" />
        <span>Llega en aproximadamente {remaining} min</span>
      </div>
    </div>
  )
}

function EnRouteState({ origin, destination }: { origin: string; destination: string }) {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="h-32 rounded-xl bg-secondary flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Navigation size={20} strokeWidth={1.5} className="text-[var(--accent-text)]" />
          <p className="text-xs text-muted-foreground">En ruta</p>
        </div>
      </div>
      <div className="space-y-2 pl-1">
        <div className="flex items-center gap-3 text-sm">
          <span className="size-2 rounded-full bg-[var(--accent)] shrink-0" />
          <span className="text-muted-foreground">{origin}</span>
        </div>
        <div className="ml-[3px] w-px h-5 bg-border" aria-hidden="true" />
        <div className="flex items-center gap-3 text-sm">
          <MapPin size={16} strokeWidth={1.5} className="text-destructive shrink-0" />
          <span className="font-medium text-foreground">{destination}</span>
        </div>
      </div>
    </div>
  )
}

function ArrivedState({
  destination,
  onArrived,
}: {
  destination: string
  onArrived?: () => void
}) {
  return (
    <div className="flex flex-col items-center gap-5 py-6 animate-success-pop">
      <div className="size-16 rounded-full bg-[var(--success-muted)] flex items-center justify-center">
        <CheckCircle size={32} strokeWidth={1.5} className="text-[var(--success-text)]" />
      </div>
      <div className="text-center">
        <p className="text-base font-semibold text-[var(--success-text)]">Has llegado.</p>
        <p className="text-sm text-muted-foreground mt-1">{destination}</p>
      </div>
      {onArrived && (
        <Button onClick={onArrived} className="rounded-xl min-h-[44px] px-8">
          Cerrar
        </Button>
      )}
    </div>
  )
}

const STATES: TrackerState[] = ['requesting', 'coming', 'en_route', 'arrived']
const STATE_NUMS: Record<TrackerState, string> = {
  requesting: '1',
  coming: '2',
  en_route: '3',
  arrived: '4',
}

function CabifyTracker({ origin, destination, onArrived, className }: CabifyTrackerProps) {
  const [state, setState] = React.useState<TrackerState>('requesting')

  React.useEffect(() => {
    const t = setTimeout(() => setState('coming'), 2200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className={cn('rounded-2xl border bg-card p-5', className)}
      style={{ boxShadow: 'var(--shadow-md)' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="size-9 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center shrink-0">
          <Car size={20} strokeWidth={1.5} className="text-[var(--accent-text)]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">{STATE_LABELS[state]}</p>
          <p className="text-xs text-muted-foreground truncate">
            {origin} → {destination}
          </p>
        </div>
      </div>

      {state === 'requesting' && <RequestingState />}
      {state === 'coming' && (
        <ComingState eta={8} driverName="Carlos M." plate="1234 ABC" />
      )}
      {state === 'en_route' && (
        <EnRouteState origin={origin} destination={destination} />
      )}
      {state === 'arrived' && (
        <ArrivedState destination={destination} onArrived={onArrived} />
      )}

      {/* Step controls for demo */}
      {state !== 'arrived' && (
        <div className="flex gap-2 mt-4 pt-4 border-t border-border">
          {STATES.map((s) => (
            <button
              key={s}
              onClick={() => setState(s)}
              className={cn(
                'flex-1 text-xs rounded-lg py-2 transition-colors duration-150',
                state === s
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-secondary'
              )}
            >
              {STATE_NUMS[s]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export { CabifyTracker }
