import { useRef, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { motion } from 'motion/react'
import { useHaptics } from '@/hooks/useHaptics'
import { cn } from '@/lib/utils'

interface SwipeAction {
  label: string
  icon: React.ElementType
  color: 'destructive' | 'success' | 'warning' | 'primary'
  onPress: () => void
  haptic?: 'light' | 'medium' | 'heavy'
}

interface SwipeListItemProps {
  children: React.ReactNode
  leftActions?: SwipeAction[]
  rightActions?: SwipeAction[]
  onSwipeComplete?: (direction: 'left' | 'right') => void
}

const REVEAL_THRESHOLD = 80
const EXECUTE_THRESHOLD = 200

const colorMap: Record<SwipeAction['color'], string> = {
  destructive: 'var(--destructive)',
  success: 'var(--success)',
  warning: 'var(--warning)',
  primary: 'var(--primary)',
}

const fgColorMap: Record<SwipeAction['color'], string> = {
  destructive: 'var(--destructive-foreground)',
  success: 'var(--success-foreground)',
  warning: 'var(--warning-foreground)',
  primary: 'var(--primary-foreground)',
}

export function SwipeListItem({
  children,
  leftActions = [],
  rightActions = [],
  onSwipeComplete,
}: SwipeListItemProps) {
  const { haptic } = useHaptics()
  const [offsetX, setOffsetX] = useState(0)
  const [isExecuting, setIsExecuting] = useState(false)
  const revealedRef = useRef(false)

  const maxLeft = leftActions.length * 72
  const maxRight = rightActions.length * 72

  function clampOffset(delta: number) {
    if (delta > 0) return Math.min(delta, leftActions.length ? maxLeft + 20 : 0)
    if (delta < 0) return Math.max(delta, rightActions.length ? -(maxRight + 20) : 0)
    return 0
  }

  const handlers = useSwipeable({
    onSwiping({ deltaX }) {
      const clamped = clampOffset(deltaX)
      setOffsetX(clamped)
      const revealed = Math.abs(clamped) >= REVEAL_THRESHOLD
      if (revealed && !revealedRef.current) {
        haptic('light')
        revealedRef.current = true
      }
      if (!revealed) revealedRef.current = false
    },
    onSwipedLeft({ absX }) {
      if (absX >= EXECUTE_THRESHOLD && rightActions.length > 0) {
        const action = rightActions[0]
        haptic(action.haptic ?? 'medium')
        setIsExecuting(true)
        setTimeout(() => {
          action.onPress()
          onSwipeComplete?.('left')
          setOffsetX(0)
          setIsExecuting(false)
        }, 200)
      } else {
        setOffsetX(rightActions.length ? -maxRight : 0)
      }
      revealedRef.current = false
    },
    onSwipedRight({ absX }) {
      if (absX >= EXECUTE_THRESHOLD && leftActions.length > 0) {
        const action = leftActions[0]
        haptic(action.haptic ?? 'medium')
        setIsExecuting(true)
        setTimeout(() => {
          action.onPress()
          onSwipeComplete?.('right')
          setOffsetX(0)
          setIsExecuting(false)
        }, 200)
      } else {
        setOffsetX(leftActions.length ? maxLeft : 0)
      }
      revealedRef.current = false
    },
    trackMouse: false,
    preventScrollOnSwipe: true,
  })

  function dismiss() {
    setOffsetX(0)
    revealedRef.current = false
  }

  return (
    <div className="relative overflow-hidden" style={{ minHeight: 'var(--touch-target-min)' }}>
      {leftActions.length > 0 && (
        <div className="absolute inset-y-0 left-0 flex">
          {leftActions.map((action, i) => {
            const Icon = action.icon
            return (
              <button
                key={i}
                onClick={() => { haptic(action.haptic ?? 'medium'); action.onPress(); dismiss() }}
                className="flex items-center justify-center gap-1 px-4"
                style={{ backgroundColor: colorMap[action.color], color: fgColorMap[action.color] }}
              >
                <Icon size={20} />
                <span className="text-xs font-medium">{action.label}</span>
              </button>
            )
          })}
        </div>
      )}

      {rightActions.length > 0 && (
        <div className="absolute inset-y-0 right-0 flex">
          {rightActions.map((action, i) => {
            const Icon = action.icon
            return (
              <button
                key={i}
                onClick={() => { haptic(action.haptic ?? 'medium'); action.onPress(); dismiss() }}
                className="flex items-center justify-center gap-1 px-4"
                style={{ backgroundColor: colorMap[action.color], color: fgColorMap[action.color] }}
              >
                <Icon size={20} />
                <span className="text-xs font-medium">{action.label}</span>
              </button>
            )
          })}
        </div>
      )}

      <motion.div
        {...handlers}
        animate={{ x: offsetX, scale: isExecuting ? 0.95 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative"
        style={{ backgroundColor: 'var(--background)', zIndex: 1 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

interface SwipeListProps {
  children: React.ReactNode
  className?: string
}

export function SwipeList({ children, className }: SwipeListProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      {children}
    </div>
  )
}
