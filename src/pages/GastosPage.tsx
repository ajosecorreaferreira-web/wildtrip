import { useNavigate } from 'react-router-dom'
import { BarChart2, Plane, UtensilsCrossed, Car } from 'lucide-react'
import { BottomNav } from '@/components/wildtrip/BottomNav'

const SPENT = 312
const TOTAL = 560
const PCT = Math.round((SPENT / TOTAL) * 100)

const CATEGORIES = [
  {
    icon: Plane,
    label: 'Transporte',
    amount: 187,
    iconBg: 'bg-info-muted',
    barColor: 'bg-info',
  },
  {
    icon: UtensilsCrossed,
    label: 'Restaurante',
    amount: 67.80,
    iconBg: 'bg-warning-muted',
    barColor: 'bg-warning',
  },
  {
    icon: Car,
    label: 'Cabify',
    amount: 57.20,
    iconBg: 'bg-accent-soft',
    barColor: 'bg-accent',
  },
]

const LAST_EXPENSES = [
  {
    icon: UtensilsCrossed,
    label: 'Restaurante Domus',
    caption: 'A Coruña · hoy 13:45',
    amount: '-67,80€',
  },
  {
    icon: Car,
    label: 'Cabify · LCG→Arteixo',
    caption: 'hoy 09:05',
    amount: '-22,40€',
  },
]

export function GastosPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="bg-primary px-4 pt-12 pb-5 shrink-0 relative">
        <div className="pr-12">
          <p className="font-sans text-xs text-primary-foreground/60 uppercase tracking-wide">
            Viaje en curso
          </p>
          <h1 className="font-display text-[22px] font-normal text-primary-foreground mt-0.5">
            A Coruña · Día 2 de 3
          </h1>
        </div>

        <button
          onClick={() => navigate('/traveler/budget')}
          className="absolute top-12 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-primary-foreground hover:bg-white/20 transition-colors"
          aria-label="Ver presupuesto detallado"
        >
          <BarChart2 size={20} strokeWidth={1.5} />
        </button>

        <div className="mt-4 bg-white/10 border border-white/10 rounded-2xl p-4">
          <div className="flex justify-between">
            <span className="font-sans text-[10px] font-semibold uppercase tracking-widest text-primary-foreground/50">
              Gastado
            </span>
            <span className="font-sans text-[10px] font-semibold uppercase tracking-widest text-primary-foreground/50">
              Presupuesto
            </span>
          </div>
          <div className="flex items-baseline justify-between mt-0.5">
            <span className="font-display text-[32px] leading-tight text-primary-foreground">
              312 €
            </span>
            <span className="font-sans text-lg font-medium text-primary-foreground/70">
              560 €
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/20 overflow-hidden mt-2">
            <div
              className="h-full rounded-full bg-white/80 transition-all duration-[450ms]"
              style={{ width: `${PCT}%` }}
            />
          </div>
          <p className="font-sans text-xs text-primary-foreground/50 mt-1">
            248€ restantes · 1 día de viaje
          </p>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto pb-nav">
        <p className="font-sans text-sm font-semibold text-foreground px-4 mt-5 mb-0">
          Por categoría
        </p>
        <div className="px-4 divide-y divide-border">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon
            const catPct = Math.min((cat.amount / SPENT) * 100, 100)
            return (
              <div key={cat.label} className="flex items-center gap-3 py-3">
                <div className={`${cat.iconBg} rounded-lg p-1.5 shrink-0`}>
                  <Icon size={20} strokeWidth={1.5} className="text-foreground/60" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-sans text-sm text-foreground">{cat.label}</span>
                    <span className="font-sans text-sm font-bold text-foreground">
                      {cat.amount.toLocaleString('es-ES', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      })}€
                    </span>
                  </div>
                  <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full ${cat.barColor}`}
                      style={{ width: `${catPct}%` }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <p className="font-sans text-sm font-semibold text-foreground px-4 mt-5 mb-2">
          Últimos gastos
        </p>
        <div className="px-4 flex flex-col gap-2">
          {LAST_EXPENSES.map((exp) => {
            const Icon = exp.icon
            return (
              <div
                key={exp.label}
                className="bg-card border border-border rounded-xl p-3 flex items-center gap-3"
              >
                <div className="bg-muted rounded-lg p-2 shrink-0">
                  <Icon size={20} strokeWidth={1.5} className="text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-sm font-medium text-foreground leading-tight">
                    {exp.label}
                  </p>
                  <p className="font-sans text-xs text-muted-foreground mt-0.5">
                    {exp.caption}
                  </p>
                </div>
                <span className="font-sans text-sm font-semibold text-foreground shrink-0">
                  {exp.amount}
                </span>
              </div>
            )
          })}
        </div>
      </main>

      <BottomNav role="traveler" />
    </div>
  )
}
