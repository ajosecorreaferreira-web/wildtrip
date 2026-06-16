import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { CabifyTracker } from '@/components/wildtrip/organisms/CabifyTracker'
import type { TrackerState } from '@/components/wildtrip/organisms/CabifyTracker'
import { MOCK_CABIFY } from '@/data/mock'

const STATE_SEQUENCE: TrackerState[] = ['incoming', 'live', 'inprogress']

export function CabifyPage() {
  const navigate = useNavigate()
  const [state, setState] = React.useState<TrackerState>('incoming')
  const [eta, setEta] = React.useState(MOCK_CABIFY.eta)

  React.useEffect(() => {
    const idx = STATE_SEQUENCE.indexOf(state)
    if (idx < STATE_SEQUENCE.length - 1) {
      const timer = setTimeout(() => {
        setState(STATE_SEQUENCE[idx + 1])
        setEta((e) => Math.max(1, e - 3))
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [state])

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#F2EFE9]">
      <div className="flex-1 relative overflow-hidden">
      <CabifyTracker
        className="h-full"
        state={state}
        origin="LCG · Aeropuerto A Coruña"
        destination="Inditex Arteixo"
        driverName={MOCK_CABIFY.driverName}
        driverCar={MOCK_CABIFY.driverCar}
        driverPlate={MOCK_CABIFY.driverPlate}
        driverRating={MOCK_CABIFY.driverRating}
        eta={eta}
        estimatedPrice={MOCK_CABIFY.estimatedPrice}
        paymentMethod={MOCK_CABIFY.paymentMethod}
        onCall={() => {}}
        onCancel={() => navigate('/traveler/timeline')}
        onMarkArrived={() => setState('arrived')}
      />
      </div>
    </div>
  )
}
