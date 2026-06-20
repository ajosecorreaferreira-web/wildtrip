import * as React from 'react'
import {
  ArrowLeft,
  Plane,
  Car,
  Utensils,
  Coffee,
  Check,
  Info,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button, BudgetBar } from '@/components/wildtrip/atoms'

interface ExpenseRowProps {
  icon: React.ReactNode
  iconBg?: string
  description: string
  sub: string
  amount: string
  hasTicket?: boolean
  noTicket?: boolean
  onAddTicket?: () => void
}

function ExpenseRow({
  icon,
  iconBg = 'bg-muted',
  description,
  sub,
  amount,
  hasTicket,
  noTicket,
  onAddTicket,
}: ExpenseRowProps) {
  return (
    <div className={cn(
      'flex items-start gap-3 py-3',
      noTicket && 'rounded-xl border border-warning bg-warning-muted px-3 -mx-3',
    )}>
      <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5', iconBg)}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-sans text-sm font-semibold text-foreground leading-snug">{description}</p>
            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
              <span className="font-sans text-xs text-muted-foreground">{sub}</span>
              {noTicket && (
                <span className="font-sans text-[10px] font-semibold uppercase tracking-wide text-warning-text bg-warning border-0 rounded-full px-2 py-0.5">
                  SIN TICKET
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end shrink-0">
            <span className="font-sans text-sm font-semibold text-foreground">{amount}</span>
            {hasTicket && (
              <Check size={14} strokeWidth={1.5} className="text-accent mt-0.5" />
            )}
          </div>
        </div>
        {noTicket && onAddTicket && (
          <button
            onClick={onAddTicket}
            className="mt-2 font-sans text-xs font-semibold text-warning-text underline underline-offset-2"
          >
            Añadir ticket →
          </button>
        )}
      </div>
    </div>
  )
}

function SectionHeader({ title }: { title: string }) {
  return (
    <p className="font-sans text-xs font-semibold text-muted-foreground uppercase tracking-wide pt-5 pb-1">
      {title}
    </p>
  )
}

export function ExpenseReportPage() {
  const navigate = useNavigate()
  const [isClosing, setIsClosing] = React.useState(false)
  const hasPendingTicket = true

  function handleClose() {
    setIsClosing(true)
    setTimeout(() => navigate('/traveler?state=closed'), 1500)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navy header */}
      <div className="bg-primary px-4 pt-12 pb-5 shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-primary-foreground/70 hover:text-primary-foreground mb-3 transition-colors"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          <span className="font-sans text-sm">Volver</span>
        </button>
        <p className="font-sans text-xs text-primary-foreground/60">Nota de gastos</p>
        <h1 className="font-display text-[22px] font-normal text-primary-foreground mt-0.5">
          Inditex A Coruña
        </h1>
        <p className="font-sans text-xs text-primary-foreground/50 mt-0.5">
          15–17 jun · 451€ total
        </p>
      </div>

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto pb-28 px-4">
        <SectionHeader title="Día 15 jun — Lunes" />
        <div className="divide-y divide-border">
          <ExpenseRow
            icon={<Plane size={18} strokeWidth={1.5} className="text-accent" />}
            iconBg="bg-accent/10"
            description="Vuelo ida + vuelta"
            sub="AUTO · Reservado"
            amount="274€"
            hasTicket
          />
          <ExpenseRow
            icon={<Car size={18} strokeWidth={1.5} className="text-muted-foreground" />}
            description="Cabify Casa→MAD T4"
            sub="AUTO · Revolut"
            amount="18,10€"
            hasTicket
          />
          <ExpenseRow
            icon={<Car size={18} strokeWidth={1.5} className="text-muted-foreground" />}
            description="Cabify LCG→NH Finisterre"
            sub="AUTO · Revolut"
            amount="22,40€"
            hasTicket
          />
        </div>

        <SectionHeader title="Día 16 jun — Martes" />
        <div className="divide-y divide-border">
          <ExpenseRow
            icon={<Car size={18} strokeWidth={1.5} className="text-muted-foreground" />}
            description="Cabify Hotel→Inditex"
            sub="AUTO · Revolut"
            amount="14,30€"
            hasTicket
          />
          <ExpenseRow
            icon={<Utensils size={18} strokeWidth={1.5} className="text-muted-foreground" />}
            description="Restaurante Domus"
            sub="Revolut *4821"
            amount="67,80€"
            hasTicket
          />
          <ExpenseRow
            icon={<Car size={18} strokeWidth={1.5} className="text-muted-foreground" />}
            description="Cabify Arteixo→Hotel"
            sub="AUTO · Revolut"
            amount="14,30€"
            hasTicket
          />
        </div>

        <SectionHeader title="Día 17 jun — Miércoles" />
        <div className="divide-y divide-border">
          <ExpenseRow
            icon={<Car size={18} strokeWidth={1.5} className="text-muted-foreground" />}
            description="Cabify Hotel→LCG"
            sub="AUTO · Revolut"
            amount="22,40€"
            hasTicket
          />
          <ExpenseRow
            icon={<Coffee size={18} strokeWidth={1.5} className="text-warning-text" />}
            iconBg="bg-warning-muted"
            description="Café LCG"
            sub="Efectivo"
            amount="3,50€"
            noTicket
            onAddTicket={() => navigate('/traveler/ticket')}
          />
          <ExpenseRow
            icon={<Plane size={18} strokeWidth={1.5} className="text-accent" />}
            iconBg="bg-accent/10"
            description="Vuelo VY8822 vuelta"
            sub="AUTO · Reservado"
            amount="87€"
            hasTicket
          />
          <ExpenseRow
            icon={<Car size={18} strokeWidth={1.5} className="text-muted-foreground" />}
            description="Cabify MAD T4→Casa"
            sub="AUTO · Revolut"
            amount="18,10€"
            hasTicket
          />
        </div>

        {/* Total card */}
        <div className="mt-4 bg-muted rounded-xl p-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-sans text-sm text-muted-foreground">Total gastado</span>
            <span className="font-sans text-xl font-bold text-foreground">451€</span>
          </div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-sans text-sm text-muted-foreground">Presupuesto</span>
            <span className="font-sans text-sm text-muted-foreground">560€</span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="font-sans text-sm text-muted-foreground">Ahorrado</span>
            <span className="font-sans text-sm font-semibold text-accent">109€</span>
          </div>
          <BudgetBar spent={451} total={560} variant="compact" />
        </div>

        {/* Info banner */}
        <div className="mt-3 rounded-xl p-3" style={{ backgroundColor: 'var(--info-muted)' }}>
          <div className="flex items-start gap-2">
            <Info size={16} strokeWidth={1.5} className="text-info shrink-0 mt-0.5" />
            <p className="font-sans text-sm text-foreground">
              El cargo va directamente a Jungle Group vía TravelPerk. No necesitas hacer nada más.
            </p>
          </div>
        </div>
      </main>

      {/* Sticky bottom CTA */}
      <div className="sticky-cta max-w-md mx-auto w-full">
        {hasPendingTicket ? (
          <Button
            variant="accent"
            size="lg"
            className="w-full"
            onClick={() => navigate('/traveler/ticket')}
          >
            Añadir ticket pendiente
          </Button>
        ) : (
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            loading={isClosing}
            onClick={handleClose}
          >
            Cerrar nota de gastos
          </Button>
        )}
      </div>
    </div>
  )
}
