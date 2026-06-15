import { cn } from '@/lib/utils'

export interface StepperProps {
  steps: number
  current: number
  className?: string
}

export function Stepper({ steps, current, className }: StepperProps) {
  return (
    <div
      className={cn('flex gap-1', className)}
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={1}
      aria-valuemax={steps}
      aria-label={`Paso ${current} de ${steps}`}
    >
      {Array.from({ length: steps }, (_, i) => {
        const index = i + 1
        const isCompleted = index < current
        const isActive = index === current
        return (
          <div
            key={i}
            className={cn(
              'h-[3px] flex-1 rounded-full transition-colors duration-300',
              isCompleted
                ? 'bg-accent'
                : isActive
                ? 'bg-primary'
                : 'bg-border'
            )}
          />
        )
      })}
    </div>
  )
}

// --- Mock Data ---
export const MOCK_STEPPER_STATES = [
  { steps: 4, current: 1, label: 'Destino' },
  { steps: 4, current: 2, label: 'Fechas' },
  { steps: 4, current: 3, label: 'Hotel' },
  { steps: 4, current: 4, label: 'Confirmación' },
]
