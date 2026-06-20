import { useEffect } from 'react'
import { Sheet } from 'react-modal-sheet'
import { useHaptics } from '@/hooks/useHaptics'

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  snapPoints?: number[]
  initialSnap?: number
  title?: string
  description?: string
}

export function BottomSheet({
  isOpen,
  onClose,
  children,
  snapPoints = [0.9, 0.5, 0],
  initialSnap = 1,
  title,
  description,
}: BottomSheetProps) {
  const { haptic } = useHaptics()

  useEffect(() => {
    if (isOpen) haptic('light')
  }, [isOpen])

  function handleClose() {
    haptic('light')
    onClose()
  }

  return (
    <Sheet
      isOpen={isOpen}
      onClose={handleClose}
      snapPoints={snapPoints}
      initialSnap={initialSnap}
      tweenConfig={{ ease: 'easeOut', duration: 0.35 }}
    >
      <Sheet.Container
        style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
        className="border-t"
      >
        <Sheet.Header>
          <div
            className="mx-auto mt-2 rounded-full"
            style={{
              width: 36,
              height: 'var(--mobile-sheet-handle)',
              backgroundColor: 'var(--border)',
            }}
          />
          {(title || description) && (
            <div className="px-4 pb-2 pt-3">
              {title && (
                <h2 className="text-base font-semibold" style={{ color: 'var(--foreground)' }}>
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  {description}
                </p>
              )}
            </div>
          )}
        </Sheet.Header>
        <Sheet.Content disableDrag={false}>{children}</Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={handleClose} className="!bg-black/50" />
    </Sheet>
  )
}
