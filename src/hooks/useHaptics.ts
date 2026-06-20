// Hook para haptic feedback — funciona en Android PWA
// iOS Safari: sin soporte. iOS PWA instalada: soporte limitado.

type HapticPattern = 'light' | 'medium' | 'heavy' | 'success' | 'error'

const HAPTIC_PATTERNS: Record<HapticPattern, number[]> = {
  light:   [10],
  medium:  [20],
  heavy:   [30, 10, 30],
  success: [10, 50, 10],
  error:   [30, 20, 30, 20, 30],
}

export function useHaptics() {
  const isSupported = typeof navigator !== 'undefined' && 'vibrate' in navigator

  function haptic(pattern: HapticPattern = 'light') {
    if (!isSupported) return
    navigator.vibrate(HAPTIC_PATTERNS[pattern])
  }

  return { haptic, isSupported }
}
