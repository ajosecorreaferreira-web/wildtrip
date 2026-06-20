import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { HotelCheckin } from '@/components/wildtrip/organisms/HotelCheckin'
import type { CheckinLevel } from '@/components/wildtrip/organisms/HotelCheckin'
import { MOCK_HOTEL } from '@/data/mock'
import { cn } from '@/lib/utils'

const TABS: { id: CheckinLevel; label: string }[] = [
  { id: 'smart', label: 'NFC' },
  { id: 'qr',    label: 'QR' },
  { id: 'basic', label: 'Básico' },
]

export function HotelPage() {
  const navigate = useNavigate()
  const [level, setLevel] = React.useState<CheckinLevel>('smart')

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto px-4 py-8 flex flex-col gap-5">
      {/* Level tabs */}
      <div className="flex gap-1 rounded-xl bg-muted p-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setLevel(tab.id)}
            className={cn(
              'flex-1 rounded-lg min-h-[36px] font-sans text-sm font-medium transition-all duration-150',
              level === tab.id
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <HotelCheckin
        level={level}
        hotelName={MOCK_HOTEL.hotelName}
        hotelChain={MOCK_HOTEL.hotelChain}
        hotelStars={MOCK_HOTEL.hotelStars}
        checkinDate={MOCK_HOTEL.checkinDate}
        checkoutDate={MOCK_HOTEL.checkoutDate}
        nights={MOCK_HOTEL.nights}
        roomNumber={MOCK_HOTEL.roomNumber}
        roomFloor={MOCK_HOTEL.roomFloor}
        roomView={MOCK_HOTEL.roomView}
        guestName={MOCK_HOTEL.guestName}
        confirmationNo={MOCK_HOTEL.confirmationNo}
        totalCost={MOCK_HOTEL.totalCost}
        checkoutTime={MOCK_HOTEL.checkoutTime}
        onNfcUnlock={async () => {
          await new Promise((r) => setTimeout(r, 1500))
          return true
        }}
        onWebCheckin={() => {}}
        onViewBoardingPass={() => navigate('/traveler/boarding-pass')}
      />
    </div>
  )
}
