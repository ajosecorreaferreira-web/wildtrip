import { Toaster, toast as sonnerToast } from 'sonner'
import { useHaptics } from '@/hooks/useHaptics'
import { useMobileDetect } from '@/hooks/useMobileDetect'

interface MobileToastProps {
  richColors?: boolean
  duration?: number
}

export function MobileToast({ richColors = true, duration = 4000 }: MobileToastProps) {
  const { isMobile } = useMobileDetect()

  return (
    <Toaster
      position={isMobile ? 'top-center' : 'bottom-right'}
      richColors={richColors}
      duration={duration}
      toastOptions={{
        style: isMobile
          ? {
              width: 'calc(100vw - 32px)',
              left: '50%',
              transform: 'translateX(-50%)',
            }
          : undefined,
      }}
    />
  )
}

type ToastType = 'default' | 'success' | 'error' | 'info' | 'warning'

interface MobileToastOptions {
  description?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

function useToastWithHaptics() {
  const { haptic } = useHaptics()

  function show(type: ToastType, message: string, options?: MobileToastOptions) {
    if (type === 'success') haptic('success')
    else if (type === 'error') haptic('error')
    else haptic('light')

    const toastOptions = {
      description: options?.description,
      duration: options?.duration,
      action: options?.action
        ? { label: options.action.label, onClick: options.action.onClick }
        : undefined,
    }

    switch (type) {
      case 'success': return sonnerToast.success(message, toastOptions)
      case 'error':   return sonnerToast.error(message, toastOptions)
      case 'info':    return sonnerToast.info(message, toastOptions)
      case 'warning': return sonnerToast.warning(message, toastOptions)
      default:        return sonnerToast(message, toastOptions)
    }
  }

  return {
    toast: (message: string, opts?: MobileToastOptions) => show('default', message, opts),
    success: (message: string, opts?: MobileToastOptions) => show('success', message, opts),
    error: (message: string, opts?: MobileToastOptions) => show('error', message, opts),
    info: (message: string, opts?: MobileToastOptions) => show('info', message, opts),
    warning: (message: string, opts?: MobileToastOptions) => show('warning', message, opts),
  }
}

export { useToastWithHaptics }
