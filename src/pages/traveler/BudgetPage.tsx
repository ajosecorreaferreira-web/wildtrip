import * as React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AlertTriangle, X, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button, BudgetBar } from '@/components/wildtrip/atoms'
import { BottomNav } from '@/components/wildtrip/BottomNav'

const SPENT = 312
const TOTAL = 560
const PCT = Math.round((SPENT / TOTAL) * 100)

const R = 40
const CIRCUMFERENCE = 2 * Math.PI * R
const STROKE_DASH = (PCT / 100) * CIRCUMFERENCE

interface Dieta {
  emoji: string
  label: string
  spent: number
  limit: number
  exceeded: boolean
}

const DIETAS: Dieta[] = [
  { emoji: '🌅', label: 'Desayuno',   spent: 0,      limit: 15,  exceeded: false },
  { emoji: '🍽️', label: 'Comida',     spent: 67.80,  limit: 35,  exceeded: true  },
  { emoji: '🌙', label: 'Cena',       spent: 0,      limit: 50,  exceeded: false },
  { emoji: '🚕', label: 'Transporte', spent: 105.80, limit: 150, exceeded: false },
]

function formatEUR(n: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n)
}

function RequestSheet({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate()
  const [amount, setAmount] = React.useState(30)
  const [note, setNote] = React.useState(
    'Comida de trabajo con Marc López y Sara Fernández · Inditex · 3 personas'
  )
  const CHIPS = [10, 20, 30, 50]

  return (
    <>
      <div className="fixed inset-0 bg-foreground/40 z-40" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto bg-background rounded-t-3xl px-5 pt-6 pb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-xl text-foreground">Solicitar ampliación</h2>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="w-8 h-8 flex items-center justify-center rounded-xl text-muted-foreground hover:bg-muted"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="mb-3">
          <p className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Importe
          </p>
          <div className="rounded-xl border border-border bg-card px-4 py-3">
            <span className="font-sans text-2xl font-semibold text-foreground">
              {amount},00€
            </span>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          {CHIPS.map((c) => (
            <button
              key={c}
              onClick={() => setAmount(c)}
              className={cn(
                'flex-1 py-2.5 rounded-xl font-sans text-sm font-semibold transition-all duration-[180ms]',
                amount === c
                  ? 'border-2 border-primary bg-secondary text-foreground'
                  : 'border border-border bg-card text-muted-foreground'
              )}
            >
              +{c}€
            </button>
          ))}
        </div>

        <div className="mb-4">
          <p className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Categoría
          </p>
          <div className="rounded-xl border border-border bg-card px-4 py-3">
            <span className="font-sans text-sm text-foreground">🍽️ Comida · Día 2</span>
          </div>
        </div>

        <div className="mb-5">
          <p className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Motivo
          </p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 font-sans text-sm text-foreground resize-none focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Button
            variant="accent"
            size="lg"
            className="w-full"
            onClick={() => navigate('/traveler/budget')}
          >
            Enviar solicitud
          </Button>
          <Button variant="ghost" size="base" className="w-full" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </div>
    </>
  )
}

const CATEGORIES = [
  { emoji: '✈️', label: 'Vuelos',       amount: 274 },
  { emoji: '🚕', label: 'Cabify',       amount: 105.80 },
  { emoji: '🍽️', label: 'Restaurantes', amount: 67.80 },
  { emoji: '☕', label: 'Otros',        amount: 3.50 },
]

function SummaryView() {
  const navigate = useNavigate()
  const total = CATEGORIES.reduce((acc, c) => acc + c.amount, 0)
  const pct = Math.round((total / 560) * 10) / 10

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="bg-primary px-4 pt-12 pb-5 shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-primary-foreground/70 hover:text-primary-foreground mb-3 transition-colors"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          <span className="font-sans text-sm">Volver</span>
        </button>
        <p className="font-sans text-xs text-primary-foreground/60">Post-viaje</p>
        <h1 className="font-display text-[22px] font-normal text-primary-foreground mt-0.5">
          A Coruña · Completado
        </h1>
      </div>

      <main className="flex-1 overflow-y-auto pb-nav px-4">
        <div className="rounded-2xl p-5 mt-4" style={{ backgroundColor: 'oklch(0.14 0.08 264)' }}>
          <p className="font-sans text-xs font-semibold uppercase tracking-wide text-primary-foreground/50">
            Gastado
          </p>
          <p className="font-display text-[40px] text-primary-foreground leading-tight">
            451€
          </p>
          <p className="font-sans text-xs text-primary-foreground/50 mt-0.5 uppercase tracking-wide">
            Presupuesto · 560€
          </p>
          <BudgetBar spent={451} total={560} variant="compact" className="mt-3" />
          <p className="font-sans text-xs text-accent mt-2">
            109€ ahorrados · Viaje completado
          </p>
          <span className="inline-flex items-center font-sans text-xs font-semibold text-accent bg-accent/20 rounded-full px-3 py-1 mt-3">
            ✓ Viaje completado
          </span>
        </div>

        <p className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-wide mt-6 mb-3">
          Por categoría
        </p>

        <div className="flex flex-col gap-0 divide-y divide-border">
          {CATEGORIES.map((cat) => (
            <div key={cat.label} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <span className="text-xl leading-none">{cat.emoji}</span>
                <span className="font-sans text-sm text-foreground">{cat.label}</span>
              </div>
              <span className="font-sans text-sm font-semibold text-foreground">
                {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 }).format(cat.amount)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 pt-3 border-t border-border">
          <p className="font-sans text-xs text-muted-foreground text-right">
            451€ · {pct}% del presupuesto
          </p>
        </div>

        <Button variant="ghost" size="base" className="w-full mt-4">
          Descargar informe PDF
        </Button>
      </main>

      <BottomNav role="traveler" />
    </div>
  )
}

export function BudgetPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const isRequesting = searchParams.get('request') === 'true'
  const view = searchParams.get('view')

  if (view === 'summary') {
    return <SummaryView />
  }

  const exceeded = DIETAS.find((d) => d.exceeded)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navy header */}
      <div className="bg-primary px-4 pt-12 pb-6 shrink-0">
        <h1 className="font-display text-2xl font-normal text-primary-foreground">
          Mi presupuesto
        </h1>
        <p className="font-sans text-xs text-primary-foreground/60 mt-0.5">
          A Coruña · Día 2 de 3
        </p>
      </div>

      <main className="flex-1 overflow-y-auto pb-nav">
        {/* Ring + stats */}
        <div className="flex flex-col items-center pt-8 pb-6 px-4">
          <div className="relative inline-flex items-center justify-center mb-3">
            <svg width="120" height="120" viewBox="0 0 100 100" className="-rotate-90" aria-hidden>
              <circle cx="50" cy="50" r={R} fill="none" stroke="var(--border)" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r={R}
                fill="none"
                stroke="var(--warning)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${STROKE_DASH} ${CIRCUMFERENCE}`}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="font-sans text-lg font-semibold text-foreground">312€</span>
              <span className="font-sans text-[10px] text-muted-foreground">gastados</span>
            </div>
          </div>
          <p className="font-sans text-xs font-semibold text-warning-text">{PCT}% · cerca del límite</p>

          <div className="mt-5 text-center">
            <p className="font-sans text-[22px] font-bold text-foreground leading-tight">248€ disponibles</p>
            <p className="font-sans text-xs text-muted-foreground mt-1">1 día más de viaje</p>
          </div>
        </div>

        <div className="mx-4 h-px bg-border mb-5" />

        {/* Límites por dieta */}
        <div className="px-4 mb-4">
          <p className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Límites por dieta
          </p>
          <div className="flex flex-col gap-3">
            {DIETAS.map((d) => (
              <div key={d.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-sans text-sm text-foreground">
                    {d.emoji} {d.label}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {d.exceeded && (
                      <span className="font-sans text-[9px] font-semibold uppercase tracking-wide text-destructive bg-destructive/10 rounded-full px-2 py-0.5">
                        Superado
                      </span>
                    )}
                    <span className={cn(
                      'font-sans text-xs font-semibold',
                      d.exceeded ? 'text-destructive' : 'text-muted-foreground'
                    )}>
                      {formatEUR(d.spent)} / {formatEUR(d.limit)}
                    </span>
                  </div>
                </div>
                <BudgetBar spent={d.spent} total={d.limit} variant="compact" />
              </div>
            ))}
          </div>
        </div>

        {/* Warning banner */}
        {exceeded && (
          <div className="mx-4 mb-5 rounded-xl border border-warning bg-warning-muted px-4 py-3">
            <div className="flex items-start gap-2 mb-0.5">
              <AlertTriangle size={16} strokeWidth={1.5} className="text-warning-text shrink-0 mt-0.5" />
              <p className="font-sans text-sm font-semibold text-warning-text">
                {exceeded.emoji} {exceeded.label} superada en {formatEUR(exceeded.spent - exceeded.limit)}
              </p>
            </div>
            <p className="font-sans text-xs text-muted-foreground pl-6">
              Límite diario: {formatEUR(exceeded.limit)} · Gastado hoy: {formatEUR(exceeded.spent)}
            </p>
            <div className="mt-2 pl-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-warning-text hover:bg-warning-muted -ml-2"
                onClick={() => navigate('/traveler/budget?request=true')}
              >
                Solicitar ampliación
              </Button>
            </div>
          </div>
        )}
      </main>

      <BottomNav role="traveler" />

      {isRequesting && <RequestSheet onClose={() => navigate('/traveler/budget')} />}
    </div>
  )
}
