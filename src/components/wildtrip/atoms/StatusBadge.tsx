import { cn } from '@/lib/utils'

export type StatusBadgeStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'in_progress'
  | 'draft'
  | 'auto'
  | 'no_ticket'
  | 'completed'

export type StatusBadgeSize = 'sm' | 'base'

export interface StatusBadgeProps {
  status: StatusBadgeStatus
  size?: StatusBadgeSize
  className?: string
}

const STATUS_CONFIG: Record<StatusBadgeStatus, { label: string; classes: string }> = {
  pending:     { label: 'Pendiente',  classes: 'bg-warning-muted text-warning-text' },
  approved:    { label: 'Aprobado',   classes: 'bg-success-muted text-success-text' },
  rejected:    { label: 'Rechazado',  classes: 'bg-destructive-muted text-destructive' },
  in_progress: { label: 'En curso',   classes: 'bg-info-muted text-info' },
  draft:       { label: 'Borrador',   classes: 'bg-muted text-muted-foreground' },
  auto:        { label: 'AUTO',       classes: 'bg-success-muted text-success-text' },
  no_ticket:   { label: 'SIN TICKET', classes: 'bg-warning-muted text-warning-text' },
  completed:   { label: 'Completado', classes: 'bg-success-muted text-success-text' },
}

const SIZE_CLASSES: Record<StatusBadgeSize, string> = {
  sm:   'px-2 py-0.5 text-[9px] tracking-[0.06em]',
  base: 'px-2.5 py-1 text-[10px] tracking-[0.08em]',
}

export function StatusBadge({ status, size = 'base', className }: StatusBadgeProps) {
  const { label, classes } = STATUS_CONFIG[status]
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-sans font-semibold uppercase',
        classes,
        SIZE_CLASSES[size],
        className
      )}
    >
      {label}
    </span>
  )
}

// --- Mock Data ---
export const MOCK_STATUS_BADGES: { status: StatusBadgeStatus }[] = [
  { status: 'pending' },
  { status: 'approved' },
  { status: 'rejected' },
  { status: 'in_progress' },
  { status: 'draft' },
  { status: 'auto' },
  { status: 'no_ticket' },
  { status: 'completed' },
]
