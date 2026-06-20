import { BottomSheet } from './bottom-sheet'
import { useHaptics } from '@/hooks/useHaptics'
import { cn } from '@/lib/utils'

interface ActionSheetItem {
  label: string
  icon?: React.ElementType
  variant?: 'default' | 'destructive'
  onPress: () => void
}

interface ActionSheetProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  items: ActionSheetItem[]
  cancelLabel?: string
}

export function ActionSheet({
  isOpen,
  onClose,
  title,
  description,
  items,
  cancelLabel = 'Cancelar',
}: ActionSheetProps) {
  const { haptic } = useHaptics()

  function handleItemPress(item: ActionSheetItem) {
    haptic('light')
    item.onPress()
    onClose()
  }

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      snapPoints={[0.9, 0]}
      initialSnap={0}
      title={title}
      description={description}
    >
      <div className="flex flex-col pb-2">
        {items.map((item, i) => {
          const Icon = item.icon
          return (
            <button
              key={i}
              onClick={() => handleItemPress(item)}
              className={cn(
                'flex w-full items-center gap-3 px-4 text-left transition-colors',
                'border-b last:border-b-0',
                item.variant === 'destructive'
                  ? 'active:bg-destructive/5'
                  : 'active:bg-muted',
              )}
              style={{
                minHeight: 56,
                borderColor: 'var(--border)',
                color: item.variant === 'destructive' ? 'var(--destructive)' : 'var(--foreground)',
              }}
            >
              {Icon && <Icon size={20} />}
              <span className="text-base">{item.label}</span>
            </button>
          )
        })}

        <div className="mt-2 border-t" style={{ borderColor: 'var(--border)' }} />

        <button
          onClick={() => { haptic('light'); onClose() }}
          className="flex w-full items-center justify-center px-4 font-semibold active:bg-muted"
          style={{
            minHeight: 56,
            color: 'var(--foreground)',
          }}
        >
          {cancelLabel}
        </button>
      </div>
    </BottomSheet>
  )
}
