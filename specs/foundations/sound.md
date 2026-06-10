# Sound — Foundation

## Descripción
Los earcons (sonidos de UI) son opcionales y se activan solo si el cliente los requiere. Por defecto el DS template es **silencioso**. Esta guía documenta cuándo y cómo implementar sonido si es parte del arquetipo del cliente.

## Estado por defecto
**Sin sonido.** El DS template no incluye audio en su configuración base.

## Cuándo considerar earcons

Solo si el cliente cumple alguno de estos criterios:
- App de productividad con muchas acciones rápidas (Slack, Notion-style)
- Producto orientado a gaming o entretenimiento
- Herramienta de trading / alertas en tiempo real
- El cliente lo especifica explícitamente en `docs/sound.md`

## Categorías de earcons (si se implementan)

| Categoría | Momento de uso | Duración máx |
|-----------|----------------|--------------|
| Confirmación | Acción completada exitosamente | 300ms |
| Error | Acción fallida o validación | 200ms |
| Notificación | Nuevo mensaje / alerta entrante | 400ms |
| Destructivo | Antes de eliminar algo (warning) | 300ms |
| Éxito mayor | Onboarding completado, milestone | 500ms |

## Principios de diseño sonoro

1. **Sutil sobre obvio** — si el usuario no puede ignorarlo, es demasiado alto
2. **Complementa la animación** — sonido sin feedback visual es confuso
3. **Nunca en loops** — ni música de fondo, ni sonidos repetitivos
4. **Respetar preferencias del sistema** — si el usuario tiene el sistema en silencio, la app también
5. **Máximo 1 earcon por acción** — no múltiples sonidos simultáneos

## Implementación

```tsx
// Respetar preferencias del usuario
const soundEnabled = !window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Usar Web Audio API, no <audio> tags para earcons cortos
const audioCtx = new AudioContext()

// O usar una librería como use-sound
import useSound from 'use-sound'
const [playConfirm] = useSound('/sounds/confirm.mp3', { volume: 0.25 })
```

## Archivos de sonido (si el cliente los requiere)

Colocar en `public/sounds/`:
- `confirm.mp3` — acción exitosa
- `error.mp3` — fallo / error
- `notification.mp3` — alerta entrante
- `delete.mp3` — warning de acción destructiva

## NUNCA hacer
- Sonido autoplay al cargar la página
- Música de fondo
- Sonidos de hover (demasiado ruidoso)
- Sonidos sin control de volumen o mute por parte del usuario
- Sonidos que no se pueden desactivar en ajustes
