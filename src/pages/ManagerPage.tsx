import * as React from 'react'
import { DashboardManager } from '@/components/wildtrip/dashboard-manager'
import { BottomNav } from '@/components/wildtrip/BottomNav'
import { MOCK_MANAGER_KPI, MOCK_MANAGER_REQUESTS } from '@/data/mock'

export function ManagerPage() {
  const [requests, setRequests] = React.useState(MOCK_MANAGER_REQUESTS)

  async function handleApprove(id: string) {
    await new Promise((r) => setTimeout(r, 1000))
    setRequests((prev) => prev.filter((r) => r.id !== id))
  }

  async function handleReject(id: string, _reason: string) {
    await new Promise((r) => setTimeout(r, 1000))
    setRequests((prev) => prev.filter((r) => r.id !== id))
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="bg-primary px-4 py-4 shrink-0">
        <p className="font-sans text-xs text-primary-foreground/60">Panel de Manager</p>
        <h1 className="font-display text-2xl text-primary-foreground">Sara García</h1>
      </div>
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 pb-nav">
        <DashboardManager
          kpi={{
            ...MOCK_MANAGER_KPI,
            pendingApproval: requests.length,
          }}
          requests={requests}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
      <BottomNav role="manager" />
    </div>
  )
}
