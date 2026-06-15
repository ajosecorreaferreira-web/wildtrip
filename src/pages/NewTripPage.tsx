import { useNavigate } from 'react-router-dom'
import { TripWizard } from '@/components/wildtrip/trip-wizard'
import { MOCK_MANAGERS } from '@/data/mock'

export function NewTripPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto px-4 py-8">
      <TripWizard
        managers={MOCK_MANAGERS}
        onSubmit={async () => {
          await new Promise((r) => setTimeout(r, 1500))
          navigate('/traveler?state=upcoming')
        }}
        onCancel={() => navigate(-1)}
      />
    </div>
  )
}
