import { useNavigate } from 'react-router-dom'
import { TicketUploader } from '@/components/wildtrip/organisms/TicketUploader'
import { MOCK_TRIP_OPTIONS } from '@/data/mock'

export function TicketPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto px-4 py-8">
      <TicketUploader
        trips={MOCK_TRIP_OPTIONS}
        onComplete={async () => {
          await new Promise((r) => setTimeout(r, 1000))
          navigate('/traveler?state=active')
        }}
        onCancel={() => navigate(-1)}
      />
    </div>
  )
}
