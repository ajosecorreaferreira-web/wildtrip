import { BudgetDashboard } from '@/components/wildtrip/budget-dashboard'
import { BottomNav } from '@/components/wildtrip/BottomNav'
import { MOCK_CLIENT_BUDGETS, MOCK_MONTHLY_DATA, MOCK_EXPENSES } from '@/data/mock'

export function FinancePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 pb-24">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-normal tracking-tight text-foreground">
            Finanzas
          </h1>
          <p className="font-sans text-sm text-muted-foreground mt-1">
            Jungle Group · Jun 2026
          </p>
        </div>
        <BudgetDashboard
          role="finance"
          clientBudgets={MOCK_CLIENT_BUDGETS}
          monthlyData={MOCK_MONTHLY_DATA}
          expenses={MOCK_EXPENSES}
          onExport={() => console.log('Exportar')}
        />
      </div>
      <BottomNav role="finance" />
    </div>
  )
}
