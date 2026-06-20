import { useNavigate } from 'react-router-dom'
import { TripWizard } from '@/components/wildtrip/trip-wizard'

export function NewTripPage() {
  const navigate = useNavigate()
  return <TripWizard onCancel={() => navigate(-1)} />
}
