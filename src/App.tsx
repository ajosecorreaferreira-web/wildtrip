import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { TooltipProvider } from '@/components/ui/tooltip'
import { TravelerHome } from '@/components/wildtrip/traveler-home'
import { DashboardManager } from '@/components/wildtrip/dashboard-manager'
import { BudgetDashboard } from '@/components/wildtrip/budget-dashboard'
import { TripWizard } from '@/components/wildtrip/trip-wizard'
import { TicketUploader } from '@/components/wildtrip/ticket-uploader'
import { TripTimeline } from '@/components/wildtrip/trip-timeline'
import { CabifyTracker } from '@/components/wildtrip/cabify-tracker'
import { HotelCheckin } from '@/components/wildtrip/hotel-checkin'

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_MANAGERS = [
  { id: '1', name: 'Sara García', role: 'Manager Studio' },
  { id: '2', name: 'Luis Martín', role: 'Manager Tech' },
]

const MOCK_HOTEL = {
  name: 'NH Finisterre',
  address: 'Paseo del Parrote 2, A Coruña',
  checkIn: '2026-06-15',
  checkOut: '2026-06-18',
  confirmationCode: 'WLD-3891',
}

const MOCK_TIMELINE_DAYS = [
  {
    date: '2026-06-15',
    label: 'Lunes 15',
    events: [
      {
        id: 'e1',
        type: 'flight' as const,
        title: 'Vuelo MAD → LCG',
        time: '07:45',
        location: 'T4 · Puerta 23',
        status: 'in_progress' as const,
      },
      {
        id: 'e2',
        type: 'cabify' as const,
        title: 'Cabify al hotel',
        time: '11:30',
        status: 'pending' as const,
      },
      {
        id: 'e3',
        type: 'hotel' as const,
        title: 'NH Finisterre',
        time: '14:00',
        location: 'A Coruña',
        status: 'pending' as const,
      },
    ],
  },
]

const MOCK_TRIPS = [
  { id: 't1', destination: 'A Coruña', dates: '15–18 jun' },
  { id: 't2', destination: 'Barcelona', dates: '22–24 jun' },
]

const MOCK_KPI = {
  activeTrips: 4,
  pendingApproval: 2,
  budgetConsumed: 12400,
  budgetTotal: 20000,
  currency: 'EUR',
}

const MOCK_REQUESTS = [
  {
    id: 'r1',
    urgency: 'high' as const,
    consultora: 'jungle_studio' as const,
    trip: {
      destination: 'París',
      traveler: 'Elena Vidal',
      startDate: '2026-06-20',
      endDate: '2026-06-23',
      requestedAmount: 1850,
      clientBudget: 2000,
      currency: 'EUR',
    },
  },
]

const MOCK_CLIENT_BUDGETS = [
  { clientName: 'Zara Home', spent: 8400, total: 12000, currency: 'EUR' },
  { clientName: 'BBVA', spent: 4000, total: 8000, currency: 'EUR' },
]

const MOCK_MONTHLY = [
  { month: 'Abr', amount: 9200 },
  { month: 'May', amount: 11800 },
  { month: 'Jun', amount: 12400 },
]

const MOCK_EXPENSES = [
  {
    id: 'x1',
    date: '2026-06-15',
    traveler: 'Elena Vidal',
    destination: 'París',
    amount: 87,
    category: 'meal',
  },
  {
    id: 'x2',
    date: '2026-06-14',
    traveler: 'Marcos Ruiz',
    destination: 'A Coruña',
    amount: 320,
    category: 'hotel',
  },
]

// ─── Páginas ──────────────────────────────────────────────────────────────────

function noop() {}

function App() {
  return (
    <TooltipProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Navigate to="/traveler" replace />} />

            <Route path="/traveler" element={<TravelerHome state="empty" className="p-4 max-w-md mx-auto pt-8" />} />

            <Route
              path="/traveler/new-trip"
              element={
                <TripWizard
                  managers={MOCK_MANAGERS}
                  onCancel={noop}
                  className="p-4 max-w-md mx-auto pt-8"
                />
              }
            />

            <Route
              path="/traveler/timeline"
              element={
                <TripTimeline
                  days={MOCK_TIMELINE_DAYS}
                  className="p-4 max-w-md mx-auto pt-8"
                />
              }
            />

            <Route
              path="/traveler/cabify"
              element={
                <CabifyTracker
                  origin="Oficina Jungle, Madrid"
                  destination="Aeropuerto T4"
                  className="p-4 max-w-md mx-auto pt-8"
                />
              }
            />

            <Route
              path="/traveler/hotel"
              element={
                <HotelCheckin
                  hotel={MOCK_HOTEL}
                  className="p-4 max-w-md mx-auto pt-8"
                />
              }
            />

            <Route
              path="/traveler/ticket"
              element={
                <TicketUploader
                  trips={MOCK_TRIPS}
                  className="p-4 max-w-md mx-auto pt-8"
                />
              }
            />

            <Route
              path="/manager"
              element={
                <DashboardManager
                  kpi={MOCK_KPI}
                  requests={MOCK_REQUESTS}
                  onApprove={async () => {}}
                  onReject={async () => {}}
                  className="p-4 max-w-2xl mx-auto pt-8"
                />
              }
            />

            <Route
              path="/finance"
              element={
                <BudgetDashboard
                  role="finance"
                  clientBudgets={MOCK_CLIENT_BUDGETS}
                  monthlyData={MOCK_MONTHLY}
                  expenses={MOCK_EXPENSES}
                  className="p-4 max-w-2xl mx-auto pt-8"
                />
              }
            />

            <Route path="*" element={<Navigate to="/traveler" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  )
}

export default App
