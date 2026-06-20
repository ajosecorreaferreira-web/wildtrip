import { useNavigate } from 'react-router-dom'
import { TicketUploader } from '@/components/wildtrip/organisms/TicketUploader'
import { MOCK_TRIP_OPTIONS } from '@/data/mock'

export function TicketPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-background">
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
