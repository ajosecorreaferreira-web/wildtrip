import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useHaptics } from '@/hooks/useHaptics'

interface BottomNavItem {
  icon: React.ElementType
  label: string
  href: string
  badge?: number
}

interface BottomNavProps {
  items: BottomNavItem[]
  activeHref: string
}

export function BottomNav({ items, activeHref }: BottomNavProps) {
  const { haptic } = useHaptics()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-end border-t"
      style={{
        height: 'calc(var(--mobile-bottom-nav-height) + env(safe-area-inset-bottom))',
        paddingBottom: 'env(safe-area-inset-bottom)',
        backgroundColor: 'var(--background)',
        borderColor: 'var(--border)',
      }}
    >
      {items.slice(0, 5).map((item) => {
        const Icon = item.icon
        const isActive = item.href === activeHref

        return (
          <Link
            key={item.href}
            to={item.href}
            onClick={() => haptic('light')}
            className={cn(
              'relative flex flex-1 flex-col items-center justify-center gap-1',
              'transition-colors duration-[var(--mobile-duration-tap)]',
            )}
            style={{
              minHeight: 'var(--touch-target-min)',
              color: isActive ? 'var(--primary)' : 'var(--muted-foreground)',
            }}
            aria-current={isActive ? 'page' : undefined}
          >
            {isActive && (
              <span
                className="absolute top-0 rounded-full"
                style={{
                  width: 32,
                  height: 3,
                  backgroundColor: 'var(--primary)',
                }}
              />
            )}
            <div className="relative">
              <Icon size={24} />
              {item.badge !== undefined && item.badge > 0 && (
                <span
                  className="absolute -right-2 -top-1 flex items-center justify-center rounded-full text-[10px] font-semibold leading-none"
                  style={{
                    minWidth: 16,
                    height: 16,
                    padding: '0 3px',
                    backgroundColor: 'var(--destructive)',
                    color: 'var(--destructive-foreground)',
                  }}
                >
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </div>
            <span className="text-xs">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
