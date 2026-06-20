import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { useHaptics } from '@/hooks/useHaptics'
import { SwipeListItem } from './swipe-list'

interface SwipeAction {
  label: string
  icon: React.ElementType
  color: 'destructive' | 'success' | 'warning' | 'primary'
  onPress: () => void
  haptic?: 'light' | 'medium' | 'heavy'
}

interface MobileCardProps {
  children: React.ReactNode
  onPress?: () => void
  onLongPress?: () => void
  swipeActions?: SwipeAction[]
  className?: string
}

const LONG_PRESS_DELAY = 500

export function MobileCard({ children, onPress, onLongPress, swipeActions, className }: MobileCardProps) {
  const { haptic } = useHaptics()
  const [pressing, setPressing] = useState(false)
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const didLongPress = useRef(false)

  function onPointerDown() {
    if (!onPress && !onLongPress) return
    didLongPress.current = false
    setPressing(true)

    if (onLongPress) {
      longPressTimer.current = setTimeout(() => {
        didLongPress.current = true
        haptic('medium')
        onLongPress()
        setPressing(false)
      }, LONG_PRESS_DELAY)
    }
  }

  function onPointerUp() {
    setPressing(false)
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
  }

  function onPointerCancel() {
    setPressing(false)
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
  }

  function handleClick() {
    if (didLongPress.current) return
    onPress?.()
  }

  const card = (
    <motion.div
      animate={{ scale: pressing && onPress ? 0.98 : 1 }}
      transition={{ duration: 0.1, ease: 'easeOut' }}
      onClick={handleClick}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      className={cn(
        'rounded-[var(--radius)] border p-4',
        (onPress || onLongPress) && 'cursor-pointer select-none',
        className,
      )}
      style={{
        minHeight: 64,
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
        color: 'var(--card-foreground)',
      }}
    >
      {children}
    </motion.div>
  )

  if (swipeActions && swipeActions.length > 0) {
    return (
      <SwipeListItem rightActions={swipeActions}>
        {card}
      </SwipeListItem>
    )
  }

  return card
}
