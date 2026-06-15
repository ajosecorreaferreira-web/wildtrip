import { cn } from '@/lib/utils'

export type AvatarSize = 'sm' | 'base' | 'lg'

export interface AvatarProps {
  name: string
  size?: AvatarSize
  color?: string
  className?: string
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const SIZE_CLASSES: Record<AvatarSize, string> = {
  sm:   'w-8 h-8 text-[11px]',
  base: 'w-10 h-10 text-sm',
  lg:   'w-12 h-12 text-base',
}

export function Avatar({ name, size = 'base', color, className }: AvatarProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-full shrink-0 select-none',
        'bg-primary text-primary-foreground font-sans font-semibold',
        SIZE_CLASSES[size],
        className
      )}
      style={color ? { backgroundColor: color } : undefined}
      aria-label={name}
      role="img"
    >
      {getInitials(name)}
    </div>
  )
}

// --- Mock Data ---
export const MOCK_AVATARS: { name: string; size: AvatarSize; color?: string }[] = [
  { name: 'Sara García',    size: 'base' },
  { name: 'Carlos Martín', size: 'base' },
  { name: 'Ana López',     size: 'sm' },
  { name: 'José Correa',   size: 'lg', color: 'var(--accent)' },
]
