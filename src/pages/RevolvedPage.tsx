import { useNavigate } from 'react-router-dom'
import { RevolvedExpenseConfirm } from '@/components/wildtrip/organisms/RevolvedExpenseConfirm'
import { MOCK_REVOLVED, MOCK_TRIP_OPTIONS } from '@/data/mock'

export function RevolvedPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen max-w-md mx-auto flex flex-col">
      <RevolvedExpenseConfirm
        amount={MOCK_REVOLVED.amount}
        merchant={MOCK_REVOLVED.merchant}
        location={MOCK_REVOLVED.location}
        date={MOCK_REVOLVED.date}
        cardLast4={MOCK_REVOLVED.cardLast4}
        suggestedCategory={MOCK_REVOLVED.suggestedCategory}
        trips={MOCK_TRIP_OPTIONS}
        activeTrip={MOCK_REVOLVED.activeTrip}
        onConfirm={async () => {
          await new Promise((r) => setTimeout(r, 1000))
          navigate('/traveler?state=active')
        }}
        onDismiss={() => navigate(-1)}
        className="flex-1"
      />
    </div>
  )
}
