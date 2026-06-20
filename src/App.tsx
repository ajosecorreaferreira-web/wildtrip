import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useMobileDetect } from '@/hooks/useMobileDetect'

import { MobileLayout }  from '@/layouts/MobileLayout'
import { DesktopLayout } from '@/layouts/DesktopLayout'

import {
  TravelerPage,
  CountdownPage,
  NewTripPage,
  TicketPage,
  RevolvedPage,
  CabifyPage,
  HotelPage,
  BudgetPage,
  TimelinePage,
  BoardingPassPage,
  ExpenseReportPage,
  GastosPage,
  QRInditexPage,
  CheckoutPage,
} from '@/pages/traveler'

import { ManagerPage, QuickApprovalPage } from '@/pages/manager'
import { FinancePage }                    from '@/pages/finance'

const sharedRoutes = (
  <>
    <Route path="/"                        element={<Navigate to="/traveler" replace />} />
    <Route path="/traveler"                element={<TravelerPage />} />
    <Route path="/traveler/countdown"      element={<CountdownPage />} />
    <Route path="/traveler/new-trip"       element={<NewTripPage />} />
    <Route path="/traveler/ticket"         element={<TicketPage />} />
    <Route path="/traveler/ticket/revolut" element={<RevolvedPage />} />
    <Route path="/traveler/checkout"       element={<CheckoutPage />} />
    <Route path="/traveler/cabify"         element={<CabifyPage />} />
    <Route path="/traveler/hotel"          element={<HotelPage />} />
    <Route path="/traveler/budget"         element={<BudgetPage />} />
    <Route path="/traveler/timeline"       element={<TimelinePage />} />
    <Route path="/traveler/boarding-pass"  element={<BoardingPassPage />} />
    <Route path="/traveler/expense-report" element={<ExpenseReportPage />} />
    <Route path="/traveler/gastos"         element={<GastosPage />} />
    <Route path="/traveler/qr-inditex"     element={<QRInditexPage />} />
    <Route path="/manager"                 element={<ManagerPage />} />
    <Route path="/manager/approve/:id"     element={<QuickApprovalPage />} />
    <Route path="/finance"                 element={<FinancePage />} />
    <Route path="*"                        element={<Navigate to="/traveler" replace />} />
  </>
)

function AppRoutes() {
  const { isMobile, isTablet } = useMobileDetect()

  if (isMobile || isTablet) {
    return (
      <Routes>
        <Route element={<MobileLayout />}>
          {sharedRoutes}
        </Route>
      </Routes>
    )
  }

  return (
    <Routes>
      <Route element={<DesktopLayout />}>
        {sharedRoutes}
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <TooltipProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  )
}

export default App
