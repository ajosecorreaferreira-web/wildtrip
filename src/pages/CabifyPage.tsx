import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { CabifyTracker } from '@/components/wildtrip/organisms/CabifyTracker'
import type { TrackerState } from '@/components/wildtrip/organisms/CabifyTracker'
import { Button } from '@/components/wildtrip/atoms'
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
    <div className="flex flex-col min-h-screen bg-background max-w-md mx-auto">
      <CabifyTracker
        className="flex-1"
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
      />

      {state === 'incoming' && (
        <div className="sticky-cta">
          <Button
            variant="ghost"
            size="base"
            className="w-full"
            onClick={() => navigate('/traveler/timeline')}
          >
            Cancelar
          </Button>
        </div>
      )}

      {state === 'inprogress' && (
        <div className="sticky-cta">
          <Button
            variant="accent"
            size="base"
            className="w-full"
            onClick={() => setState('arrived')}
          >
            Ya llegué
          </Button>
        </div>
      )}

      {state === 'arrived' && (
        <div className="sticky-cta">
          <Button
            variant="ghost"
            size="base"
            className="w-full"
            onClick={() => navigate('/traveler/timeline')}
          >
            Volver al itinerario
          </Button>
        </div>
      )}
    </div>
  )
}
