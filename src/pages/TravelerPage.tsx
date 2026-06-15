import { useNavigate, useSearchParams } from 'react-router-dom'
import { TravelerHome } from '@/components/wildtrip/traveler-home'
import { BottomNav } from '@/components/wildtrip/BottomNav'
import { MOCK_TIMELINE_DAYS_LEGACY } from '@/data/mock'

type URLState = 'empty' | 'upcoming' | 'active' | 'closing'
type HomeState = 'empty' | 'upcoming' | 'in_progress' | 'pending_expenses'

const STATE_MAP: Record<URLState, HomeState> = {
  empty:   'empty',
  upcoming: 'upcoming',
  active:  'in_progress',
  closing: 'pending_expenses',
}

export function TravelerPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const urlState = (searchParams.get('state') as URLState) ?? 'empty'
  const homeState: HomeState = STATE_MAP[urlState] ?? 'empty'

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 max-w-md mx-auto w-full px-4 pt-8 pb-24">
        <TravelerHome
          state={homeState}
          upcoming={{
            destination: 'A Coruña',
            startDate: 'lunes 15 jun',
            daysUntil: 0,
            purpose: 'Inditex Arteixo · Workshop',
          }}
          active={{
            destination: 'A Coruña',
            days: MOCK_TIMELINE_DAYS_LEGACY,
          }}
          pendingExpenses={{
            destination: 'A Coruña',
            endDate: '17 jun',
            expensesCount: 3,
          }}
          onNewTrip={() => navigate('/traveler/new-trip')}
          onUploadTicket={() => navigate('/traveler/ticket')}
          onOpenExpenses={() => navigate('/traveler/budget')}
        />
      </div>
      <BottomNav role="traveler" />
    </div>
  )
}
