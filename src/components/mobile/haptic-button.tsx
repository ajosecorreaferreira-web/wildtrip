import { Button } from '@/components/ui/button'
import { useHaptics } from '@/hooks/useHaptics'

type HapticPattern = 'light' | 'medium' | 'heavy' | 'success' | 'error'

interface HapticButtonProps extends React.ComponentProps<typeof Button> {
  hapticPattern?: HapticPattern
}

function resolveHapticPattern(
  variant: HapticButtonProps['variant'],
  override?: HapticPattern,
): HapticPattern {
  if (override) return override
  if (variant === 'destructive') return 'heavy'
  if (variant === 'default' || variant === undefined) return 'medium'
  return 'light'
}

export function HapticButton({
  hapticPattern,
  onClick,
  variant,
  style,
  ...props
}: HapticButtonProps) {
  const { haptic } = useHaptics()
  const pattern = resolveHapticPattern(variant, hapticPattern)

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    haptic(pattern)
    onClick?.(e)
  }

  return (
    <Button
      variant={variant}
      onClick={handleClick}
      style={{ minHeight: 'var(--touch-target-min)', ...style }}
      {...props}
    />
  )
}
