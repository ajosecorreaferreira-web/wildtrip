import { useNavigate } from 'react-router-dom'
import { QuickApproval } from '@/components/wildtrip/organisms/QuickApproval'
import { MOCK_QUICK_APPROVAL_DATA } from '@/data/mock'

export function QuickApprovalPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto px-4 py-8">
      <QuickApproval
        {...MOCK_QUICK_APPROVAL_DATA}
        onApprove={async () => {
          await new Promise((r) => setTimeout(r, 1000))
          navigate('/manager')
        }}
        onReject={async () => {
          await new Promise((r) => setTimeout(r, 1000))
          navigate('/manager')
        }}
        onViewFull={() => navigate('/manager')}
      />
    </div>
  )
}
