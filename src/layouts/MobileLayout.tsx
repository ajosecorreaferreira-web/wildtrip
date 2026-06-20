import { Outlet } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface MobileLayoutProps {
  className?: string
}

export function MobileLayout({ className }: MobileLayoutProps) {
  return (
    <div
      className={cn(
        'relative flex min-h-screen flex-col bg-background',
        'max-w-[430px] mx-auto',
        className
      )}
    >
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
