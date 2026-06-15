import { useNavigate, useSearchParams } from 'react-router-dom'
import { BudgetDashboard } from '@/components/wildtrip/budget-dashboard'
import { BottomNav } from '@/components/wildtrip/BottomNav'
import { Button } from '@/components/wildtrip/atoms'
import { MOCK_BUDGET, MOCK_TRIP_OPTION } from '@/data/mock'

export function BudgetPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const isOver = searchParams.get('over') === 'true'
  const isRequesting = searchParams.get('request') === 'true'

  const consultantBudgets = [
    { clientName: 'Inditex Arteixo', spent: MOCK_BUDGET.spent, total: MOCK_BUDGET.total, currency: 'EUR' },
  ]

  const consultantMonthly = [
    { month: 'Abr', amount: 420 },
    { month: 'May', amount: 380 },
    { month: 'Jun', amount: MOCK_BUDGET.spent },
  ]

  const consultantExpenses = [
    { id: 'b1', date: '15 jun', traveler: 'Ana García', destination: 'A Coruña', amount: 187, category: 'vuelo' },
    { id: 'b2', date: '15 jun', traveler: 'Ana García', destination: 'A Coruña', amount: 178, category: 'hotel' },
    { id: 'b3', date: '15 jun', traveler: 'Ana García', destination: 'A Coruña', amount: 28,  category: 'cabify' },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 max-w-md mx-auto w-full px-4 py-8 pb-24 space-y-5">
        <div>
          <h1 className="font-display text-3xl font-normal tracking-tight text-foreground">
            Presupuesto
          </h1>
          <p className="font-sans text-sm text-muted-foreground mt-1">
            {MOCK_TRIP_OPTION.destination} · Día {MOCK_BUDGET.currentDay} de {MOCK_BUDGET.tripDays}
          </p>
        </div>

        {isOver && !isRequesting && (
          <div className="rounded-xl border border-warning bg-warning-muted px-4 py-3 flex items-center justify-between gap-3">
            <p className="font-sans text-sm font-semibold text-warning-text">
              Presupuesto superado.
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/traveler/budget?over=true&request=true')}
            >
              Solicitar aumento
            </Button>
          </div>
        )}

        {isRequesting && (
          <div className="rounded-xl border border-accent bg-accent-soft px-4 py-3">
            <p className="font-sans text-sm font-semibold text-accent-text">
              Solicitud enviada a Sara García.
            </p>
            <p className="font-sans text-xs text-muted-foreground mt-0.5">
              Recibirás confirmación en breve.
            </p>
          </div>
        )}

        <BudgetDashboard
          role="consultant"
          clientBudgets={consultantBudgets}
          monthlyData={consultantMonthly}
          expenses={consultantExpenses}
        />
      </div>
      <BottomNav role="traveler" />
    </div>
  )
}
