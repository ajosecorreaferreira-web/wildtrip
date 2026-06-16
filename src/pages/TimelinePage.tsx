import { useNavigate } from 'react-router-dom'
import { TripTimeline } from '@/components/wildtrip/organisms/TripTimeline'
import { BottomNav } from '@/components/wildtrip/BottomNav'
import { MOCK_TIMELINE_DAYS_ORG, MOCK_BUDGET } from '@/data/mock'

export function TimelinePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 max-w-md mx-auto w-full px-4 pt-4 pb-nav">
        <TripTimeline
          days={MOCK_TIMELINE_DAYS_ORG}
          currentDay={MOCK_BUDGET.currentDay}
          destination="A Coruña"
          approvedBudget={MOCK_BUDGET.total}
          spentAmount={MOCK_BUDGET.spent}
          onAddExpense={() => navigate('/traveler/ticket')}
        />
      </div>
      <BottomNav role="traveler" />
    </div>
  )
}
