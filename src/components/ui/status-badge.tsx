import * as React from 'react'
import { cn } from '@/lib/utils'

export type StatusBadgeStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'auto_approved'
  | 'in_progress'
  | 'completed'
  | 'draft'
  | 'needs_review'
  | 'duplicate'

interface StatusConfig {
  label: string
  className: string
}

const STATUS_CONFIG: Record<StatusBadgeStatus, StatusConfig> = {
  pending: {
    label: 'Pendiente',
    className: 'bg-[var(--warning-muted)] text-[var(--warning-text)]',
  },
  approved: {
    label: 'Aprobado',
    className: 'bg-[var(--success-muted)] text-[var(--success-text)]',
  },
  rejected: {
    label: 'Rechazado',
    className: 'bg-[var(--destructive-muted)] text-destructive',
  },
  auto_approved: {
    label: 'Auto-aprobado',
    className: 'bg-[var(--accent-soft)] text-[var(--accent-text)]',
  },
  in_progress: {
    label: 'En curso',
    className: 'bg-[var(--info-muted)] text-[var(--primary-text)]',
  },
  completed: {
    label: 'Completado',
    className: 'bg-secondary text-[var(--primary-text)]',
  },
  draft: {
    label: 'Borrador',
    className: 'bg-muted text-muted-foreground',
  },
  needs_review: {
    label: 'En revisión',
    className: 'bg-[var(--warning-muted)] text-[var(--warning-text)] border border-[var(--warning-text)]',
  },
  duplicate: {
    label: 'Duplicado',
    className: 'bg-muted text-muted-foreground opacity-60',
  },
}

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: StatusBadgeStatus
}

function StatusBadge({ status, className, ...props }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-0.5',
        'text-xs font-semibold uppercase tracking-widest whitespace-nowrap',
        config.className,
        className
      )}
      {...props}
    >
      <span className="size-1.5 rounded-full bg-current shrink-0" aria-hidden="true" />
      {config.label}
    </span>
  )
}

export { StatusBadge }
