import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { TooltipProvider } from '@/components/ui/tooltip'

import { TravelerPage }      from '@/pages/TravelerPage'
import { CountdownPage }     from '@/pages/CountdownPage'
import { NewTripPage }       from '@/pages/NewTripPage'
import { TicketPage }        from '@/pages/TicketPage'
import { RevolvedPage }      from '@/pages/RevolvedPage'
import { CabifyPage }        from '@/pages/CabifyPage'
import { HotelPage }         from '@/pages/HotelPage'
import { BudgetPage }        from '@/pages/BudgetPage'
import { TimelinePage }      from '@/pages/TimelinePage'
import { BoardingPassPage }  from '@/pages/BoardingPassPage'
import { ManagerPage }       from '@/pages/ManagerPage'
import { QuickApprovalPage } from '@/pages/QuickApprovalPage'
import { FinancePage }       from '@/pages/FinancePage'
import { CheckoutPage }      from '@/pages/CheckoutPage'
import { ExpenseReportPage } from '@/pages/ExpenseReportPage'
import { GastosPage }        from '@/pages/GastosPage'

function App() {
  return (
    <TooltipProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/"                      element={<Navigate to="/traveler" replace />} />
            <Route path="/traveler"              element={<TravelerPage />} />
            <Route path="/traveler/countdown"    element={<CountdownPage />} />
            <Route path="/traveler/new-trip"     element={<NewTripPage />} />
            <Route path="/traveler/ticket"       element={<TicketPage />} />
            <Route path="/traveler/ticket/revolut" element={<RevolvedPage />} />
            <Route path="/traveler/checkout"       element={<CheckoutPage />} />
            <Route path="/traveler/cabify"       element={<CabifyPage />} />
            <Route path="/traveler/hotel"        element={<HotelPage />} />
            <Route path="/traveler/budget"       element={<BudgetPage />} />
            <Route path="/traveler/timeline"     element={<TimelinePage />} />
            <Route path="/traveler/boarding-pass" element={<BoardingPassPage />} />
            <Route path="/traveler/expense-report" element={<ExpenseReportPage />} />
            <Route path="/traveler/gastos"         element={<GastosPage />} />
            <Route path="/manager"               element={<ManagerPage />} />
            <Route path="/manager/approve/:id"   element={<QuickApprovalPage />} />
            <Route path="/finance"               element={<FinancePage />} />
            <Route path="*"                      element={<Navigate to="/traveler" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  )
}

export default App
