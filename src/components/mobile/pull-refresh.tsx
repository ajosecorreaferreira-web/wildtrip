import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Loader2 } from 'lucide-react'
import { useHaptics } from '@/hooks/useHaptics'
import { useMobileDetect } from '@/hooks/useMobileDetect'

interface PullRefreshProps {
  onRefresh: () => Promise<void>
  children: React.ReactNode
  threshold?: number
}

export function PullRefresh({ onRefresh, children, threshold = 80 }: PullRefreshProps) {
  const { haptic } = useHaptics()
  const { isMobile } = useMobileDetect()
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const startYRef = useRef<number | null>(null)
  const thresholdHapticFiredRef = useRef(false)

  function onTouchStart(e: React.TouchEvent) {
    if (isRefreshing) return
    startYRef.current = e.touches[0].clientY
    thresholdHapticFiredRef.current = false
  }

  function onTouchMove(e: React.TouchEvent) {
    if (isRefreshing || startYRef.current === null) return
    const scrollEl = e.currentTarget as HTMLElement
    if (scrollEl.scrollTop > 0) return

    const delta = e.touches[0].clientY - startYRef.current
    if (delta <= 0) {
      setPullDistance(0)
      return
    }

    const clamped = Math.min(delta * 0.5, threshold * 1.5)
    setPullDistance(clamped)

    if (clamped >= threshold && !thresholdHapticFiredRef.current) {
      haptic('medium')
      thresholdHapticFiredRef.current = true
    }
  }

  async function onTouchEnd() {
    if (isRefreshing || startYRef.current === null) return
    startYRef.current = null

    if (pullDistance >= threshold) {
      setIsRefreshing(true)
      setPullDistance(0)
      try {
        await onRefresh()
      } finally {
        setIsRefreshing(false)
      }
    } else {
      setPullDistance(0)
    }
    thresholdHapticFiredRef.current = false
  }

  if (!isMobile) {
    return <>{children}</>
  }

  const indicatorOffset = isRefreshing ? 48 : Math.min(pullDistance, threshold)

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence>
        {(pullDistance > 0 || isRefreshing) && (
          <motion.div
            className="absolute inset-x-0 top-0 z-10 flex items-center justify-center"
            style={{ height: 48, color: 'var(--primary)' }}
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.15 }}
          >
            <Loader2 size={22} className="animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ y: indicatorOffset }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="overflow-y-auto"
        style={{ minHeight: '100%' }}
      >
        {children}
      </motion.div>
    </div>
  )
}
