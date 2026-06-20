import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useHaptics } from '@/hooks/useHaptics'

interface MobileHeaderProps {
  title: string
  subtitle?: string
  onBack?: () => void
  action?: React.ReactNode
  transparent?: boolean
}

export function MobileHeader({ title, subtitle, onBack, action, transparent = false }: MobileHeaderProps) {
  const { haptic } = useHaptics()

  const showSpacer = (!!onBack && !action) || (!onBack && !!action)

  return (
    <header
      className={cn(
        'sticky top-0 z-40 flex items-center px-2',
        !transparent && 'border-b',
      )}
      style={{
        height: 'calc(var(--mobile-header-height) + env(safe-area-inset-top))',
        paddingTop: 'env(safe-area-inset-top)',
        backgroundColor: transparent ? 'transparent' : 'var(--background)',
        borderColor: 'var(--border)',
      }}
    >
      {onBack ? (
        <button
          onClick={() => { haptic('light'); onBack() }}
          className="flex shrink-0 items-center justify-center"
          style={{
            minWidth: 'var(--touch-target-min)',
            minHeight: 'var(--touch-target-min)',
            color: 'var(--foreground)',
          }}
          aria-label="Volver"
        >
          <ChevronLeft size={24} />
        </button>
      ) : showSpacer ? (
        <div style={{ minWidth: 'var(--touch-target-min)' }} className="shrink-0" />
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col items-center">
        <h1
          className="truncate text-base font-semibold"
          style={{ color: 'var(--foreground)' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="truncate text-xs" style={{ color: 'var(--muted-foreground)' }}>
            {subtitle}
          </p>
        )}
      </div>

      {action ? (
        <div
          className="flex shrink-0 items-center justify-end"
          style={{ minWidth: 'var(--touch-target-min)', minHeight: 'var(--touch-target-min)' }}
        >
          {action}
        </div>
      ) : showSpacer ? (
        <div style={{ minWidth: 'var(--touch-target-min)' }} className="shrink-0" />
      ) : null}
    </header>
  )
}
