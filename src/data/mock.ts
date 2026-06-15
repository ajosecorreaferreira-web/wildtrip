// ─── Central Mock Data — Ana García → A Coruña → Inditex Arteixo ────────────

import type { TimelineDay as LegacyTimelineDay } from '@/components/wildtrip/trip-timeline'
import type { TimelineDay as OrgTimelineDay } from '@/components/wildtrip/organisms/TripTimeline'
import type { TripOption } from '@/components/wildtrip/organisms/TicketUploader'
import type { WizardManager } from '@/components/wildtrip/trip-wizard'
import type { ClientBudget, MonthlyData, ExpenseRow } from '@/components/wildtrip/budget-dashboard'

// ─── Trip ──────────────────────────────────────────────────────────────────────

export const MOCK_TRIP_ID = 'trip-acoruna-2026'

export const MOCK_TRIP_OPTION: TripOption = {
  id: MOCK_TRIP_ID,
  destination: 'A Coruña',
  dateRange: '15–17 jun',
  isActive: true,
  budget: 560,
  available: 248,
}

export const MOCK_TRIP_OPTIONS: TripOption[] = [
  MOCK_TRIP_OPTION,
  {
    id: 'trip-barcelona-2026',
    destination: 'Barcelona',
    dateRange: '22–24 jun',
    isActive: false,
    budget: 900,
    available: 900,
  },
]

// ─── Flights ───────────────────────────────────────────────────────────────────

export const MOCK_FLIGHT_IDA = {
  airline: 'IBERIA',
  flightCode: 'IB 3456',
  departure: '07:30',
  arrival: '08:45',
  origin: 'MAD',
  destination: 'LCG',
  terminal: 'T4',
  duration: '1h 15m',
  direct: true,
  price: 187,
  badge: 'Recomendado',
  badgeVariant: 'success' as const,
  selected: true,
}

export const MOCK_FLIGHT_VUELTA = {
  airline: 'VUELING',
  flightCode: 'VY 8822',
  departure: '19:30',
  arrival: '20:40',
  origin: 'LCG',
  destination: 'MAD',
  duration: '1h 10m',
  direct: true,
  price: 87,
  selected: true,
}

// ─── Hotel ─────────────────────────────────────────────────────────────────────

export const MOCK_HOTEL = {
  hotelName: 'NH Finisterre',
  hotelChain: 'NH Hotels',
  hotelStars: 4,
  checkinDate: '15 jun',
  checkoutDate: '17 jun',
  nights: 2,
  roomNumber: '412',
  roomFloor: 'Planta 4',
  roomView: 'Vista mar',
  guestName: 'Ana García',
  confirmationNo: 'NH-2026-84921',
  totalCost: 178,
  checkoutTime: '12:00',
  pricePerNight: 89,
}

// ─── Cabify ────────────────────────────────────────────────────────────────────

export const MOCK_CABIFY = {
  driverName: 'Carlos M.',
  driverCar: 'BMW Serie 3',
  driverPlate: '2847 KTL',
  driverRating: 4.9,
  eta: 8,
  estimatedPrice: 28,
  paymentMethod: 'Revolut Jungle',
}

// ─── Budget ────────────────────────────────────────────────────────────────────

export const MOCK_BUDGET = {
  total: 560,
  spent: 312,
  available: 248,
  tripDays: 3,
  currentDay: 2,
}

// ─── Manager ───────────────────────────────────────────────────────────────────

export const MOCK_MANAGER: WizardManager = {
  id: 'sara-garcia',
  name: 'Sara García',
  role: 'Manager Studio',
}

export const MOCK_MANAGERS: WizardManager[] = [
  MOCK_MANAGER,
  { id: 'luis-martin', name: 'Luis Martín', role: 'Manager Tech' },
]

// ─── Revolved Expense ──────────────────────────────────────────────────────────

export const MOCK_REVOLVED = {
  amount: 67.8,
  merchant: 'Restaurante Domus',
  location: 'A Coruña',
  date: 'Mar 16 jun · 13:47',
  cardLast4: '4821',
  suggestedCategory: 'meal' as const,
  activeTrip: MOCK_TRIP_ID,
}

// ─── Timeline — Organism format ────────────────────────────────────────────────

export const MOCK_TIMELINE_DAYS_ORG: OrgTimelineDay[] = [
  {
    date: '2026-06-15',
    label: 'Lun 15',
    events: [
      {
        id: 'ev-1',
        type: 'cabify',
        title: 'Cabify Casa → MAD T4',
        time: '06:00',
        status: 'completed',
        detail: 'Carlos M. · BMW Serie 3',
      },
      {
        id: 'ev-2',
        type: 'flight',
        title: 'IB 3456 · MAD → LCG',
        time: '07:30',
        location: 'T4 · Puerta C22',
        status: 'completed',
      },
      {
        id: 'ev-3',
        type: 'cabify',
        title: 'Cabify LCG → Inditex Arteixo',
        time: '09:10',
        status: 'active',
        detail: 'Carlos M. · BMW Serie 3 · 2847 KTL',
        actionLabel: 'Ver Cabify',
      },
      {
        id: 'ev-4',
        type: 'hotel',
        title: 'Check-in NH Finisterre',
        time: '14:00',
        location: 'A Coruña',
        status: 'upcoming',
      },
    ],
  },
  {
    date: '2026-06-16',
    label: 'Mar 16',
    events: [
      {
        id: 'ev-5',
        type: 'work',
        title: 'Workshop Inditex Arteixo',
        time: '09:00',
        location: 'Arteixo · Sala Atlántico',
        status: 'upcoming',
      },
      {
        id: 'ev-6',
        type: 'meal',
        title: 'Comida equipo',
        time: '14:00',
        status: 'upcoming',
      },
    ],
  },
  {
    date: '2026-06-17',
    label: 'Mié 17',
    events: [
      {
        id: 'ev-7',
        type: 'hotel',
        title: 'Check-out NH Finisterre',
        time: '12:00',
        status: 'upcoming',
      },
      {
        id: 'ev-8',
        type: 'flight',
        title: 'VY 8822 · LCG → MAD',
        time: '19:30',
        status: 'upcoming',
      },
    ],
  },
]

// ─── Timeline — Legacy format (used by TravelerHome) ──────────────────────────

export const MOCK_TIMELINE_DAYS_LEGACY: LegacyTimelineDay[] = [
  {
    date: '2026-06-15',
    label: 'Lun 15',
    events: [
      {
        id: 'l-ev-1',
        type: 'cabify',
        title: 'Cabify LCG → Inditex Arteixo',
        time: '09:10',
        status: 'in_progress',
        ctaLabel: 'Ver Cabify',
      },
      {
        id: 'l-ev-2',
        type: 'hotel',
        title: 'Check-in NH Finisterre',
        time: '14:00',
        location: 'A Coruña',
        status: 'pending',
      },
    ],
  },
]

// ─── Manager KPI & Requests ────────────────────────────────────────────────────

export const MOCK_MANAGER_KPI = {
  activeTrips: 4,
  pendingApproval: 1,
  budgetConsumed: 4820,
  budgetTotal: 7100,
  currency: 'EUR',
}

export const MOCK_MANAGER_REQUESTS = [
  {
    id: 'req-001',
    urgency: 'high' as const,
    consultora: 'jungle_studio' as const,
    trip: {
      destination: 'A Coruña',
      traveler: 'Ana García',
      startDate: '15 jun 2026',
      endDate: '17 jun 2026',
      requestedAmount: 560,
      clientBudget: 2000,
      currency: 'EUR',
    },
  },
]

// ─── Finance / Budget Dashboard ────────────────────────────────────────────────

export const MOCK_CLIENT_BUDGETS: ClientBudget[] = [
  { clientName: 'Inditex', spent: 3120, total: 5000, currency: 'EUR' },
  { clientName: 'BBVA', spent: 1700, total: 2500, currency: 'EUR' },
  { clientName: 'Telefónica', spent: 890, total: 2000, currency: 'EUR' },
]

export const MOCK_MONTHLY_DATA: MonthlyData[] = [
  { month: 'Mar', amount: 6400 },
  { month: 'Abr', amount: 7800 },
  { month: 'May', amount: 9200 },
  { month: 'Jun', amount: 4820 },
]

export const MOCK_EXPENSES: ExpenseRow[] = [
  { id: 'x1', date: '15 jun', traveler: 'Ana García',   destination: 'A Coruña',  amount: 187,  category: 'vuelo' },
  { id: 'x2', date: '15 jun', traveler: 'Ana García',   destination: 'A Coruña',  amount: 178,  category: 'hotel' },
  { id: 'x3', date: '14 jun', traveler: 'Marcos Ruiz',  destination: 'Barcelona', amount: 320,  category: 'hotel' },
  { id: 'x4', date: '13 jun', traveler: 'Elena Vidal',  destination: 'Madrid',    amount: 87,   category: 'comida' },
  { id: 'x5', date: '12 jun', traveler: 'Sara López',   destination: 'Bilbao',    amount: 245,  category: 'vuelo' },
]

// ─── Quick Approval (organism) ────────────────────────────────────────────────

export const MOCK_QUICK_APPROVAL_DATA = {
  requestId: 'req-001',
  requesterName: 'Ana García',
  requesterAvatar: 'AG',
  destination: 'A Coruña · Inditex Arteixo',
  dateRange: '15–17 jun 2026',
  breakdown: {
    flights: 274,
    hotel: 178,
    cabify: 108,
  },
  totalAmount: 560,
  clientBudget: 2000,
  clientBudgetPct: 28,
}
