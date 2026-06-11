import * as React from 'react'
import { Info, AlertTriangle, CheckCircle, AlertCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type BannerType = 'info' | 'warning' | 'success' | 'urgent'

interface BannerConfig {
  icon: React.ElementType
  containerClass: string
  iconClass: string
  titleClass: string
}

const BANNER_CONFIG: Record<BannerType, BannerConfig> = {
  info: {
    icon: Info,
    containerClass: 'bg-[var(--info-muted)] border-[var(--info)]',
    iconClass: 'text-[var(--primary-text)]',
    titleClass: 'text-[var(--primary-text)]',
  },
  warning: {
    icon: AlertTriangle,
    containerClass: 'bg-[var(--warning-muted)] border-[var(--warning)]',
    iconClass: 'text-[var(--warning-text)]',
    titleClass: 'text-[var(--warning-text)]',
  },
  success: {
    icon: CheckCircle,
    containerClass: 'bg-[var(--success-muted)] border-[var(--success)]',
    iconClass: 'text-[var(--success-text)]',
    titleClass: 'text-[var(--success-text)]',
  },
  urgent: {
    icon: AlertCircle,
    containerClass: 'bg-[var(--destructive-muted)] border-destructive',
    iconClass: 'text-destructive',
    titleClass: 'text-destructive',
  },
}

export interface NotificationBannerProps {
  type?: BannerType
  title: string
  description?: string
  dismissible?: boolean
  action?: { label: string; onClick: () => void }
  className?: string
}

function NotificationBanner({
  type = 'info',
  title,
  description,
  dismissible = true,
  action,
  className,
}: NotificationBannerProps) {
  const [dismissed, setDismissed] = React.useState(false)

  if (dismissed) return null

  const config = BANNER_CONFIG[type]
  const Icon = config.icon

  return (
    <div
      className={cn(
        'sticky top-0 z-40 w-full border-b px-4 py-3 animate-fade-in',
        config.containerClass,
        className
      )}
      role="alert"
    >
      <div className="max-w-7xl mx-auto flex items-start gap-3">
        <Icon
          size={20}
          strokeWidth={1.5}
          className={cn('shrink-0 mt-0.5', config.iconClass)}
        />
        <div className="flex-1 min-w-0">
          <p className={cn('text-sm font-semibold', config.titleClass)}>{title}</p>
          {description && (
            <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
          )}
          {action && (
            <button
              onClick={action.onClick}
              className={cn(
                'text-sm font-medium mt-1 underline underline-offset-2',
                config.titleClass
              )}
            >
              {action.label}
            </button>
          )}
        </div>
        {dismissible && (
          <button
            onClick={() => setDismissed(true)}
            className="size-8 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors duration-150 shrink-0"
            aria-label="Cerrar"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        )}
      </div>
    </div>
  )
}

export { NotificationBanner }
