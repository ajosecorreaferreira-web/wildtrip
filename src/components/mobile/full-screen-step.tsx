import { useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MobileHeader } from './mobile-header'
import { useHaptics } from '@/hooks/useHaptics'

interface FullScreenStepProps {
  currentStep: number
  totalSteps: number
  title: string
  description?: string
  children: React.ReactNode
  onNext: () => void
  onBack?: () => void
  nextLabel?: string
  nextDisabled?: boolean
  isLoading?: boolean
}

export function FullScreenStep({
  currentStep,
  totalSteps,
  title,
  description,
  children,
  onNext,
  onBack,
  nextLabel = 'Continuar',
  nextDisabled = false,
  isLoading = false,
}: FullScreenStepProps) {
  const { haptic } = useHaptics()
  const prevStep = useRef(currentStep)
  const direction = currentStep > prevStep.current ? 1 : -1
  prevStep.current = currentStep

  function handleNext() {
    if (nextDisabled || isLoading) return
    haptic('medium')
    onNext()
  }

  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="flex h-full flex-col" style={{ backgroundColor: 'var(--background)' }}>
      <div>
        <div className="h-1 w-full" style={{ backgroundColor: 'var(--muted)' }}>
          <motion.div
            className="h-full"
            style={{ backgroundColor: 'var(--primary)' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
        <MobileHeader
          title={title}
          subtitle={`${currentStep} de ${totalSteps}`}
          onBack={onBack}
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentStep}
            initial={{ x: direction * 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -60, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.32, 0.72, 0, 1],
            }}
            className="h-full px-4 py-6"
          >
            {description && (
              <p className="mb-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                {description}
              </p>
            )}
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        className="border-t px-4 py-3"
        style={{
          paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))',
          borderColor: 'var(--border)',
          backgroundColor: 'var(--background)',
        }}
      >
        <Button
          onClick={handleNext}
          disabled={nextDisabled || isLoading}
          className="w-full"
          style={{ minHeight: 'var(--touch-target-min)' }}
        >
          {isLoading && <Loader2 size={16} className="animate-spin" />}
          {nextLabel}
        </Button>
      </div>
    </div>
  )
}
