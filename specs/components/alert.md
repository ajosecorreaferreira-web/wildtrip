# Alert — Component Spec

## Metadata
- **Categoría:** Feedback
- **Estado:** Stable
- **Archivo:** `src/components/ui/alert.tsx`
- **Storybook:** Components/Alert

## Overview

### Cuándo usar
- Mensajes de sistema inline que requieren atención del usuario
- Feedback de acciones completadas o fallidas (dentro de una página)
- Advertencias de configuración, limitaciones o estados importantes
- Banners informativos contextuales

### Cuándo NO usar
- Notificaciones efímeras (que desaparecen solas) → usar `Sonner` (toast)
- Errores de validación de campo → usar texto de error bajo el input
- Mensajes críticos que bloquean el flujo → usar `AlertDialog`
- Más de 1 alert prominente por vista

## Anatomy
```
<Alert>                      → <div role="alert"> root: border + rounded-lg + p-4
  {Icono opcional}           → Lucide, absolute left-4 top-4, size 16
  <AlertTitle>               → <h5> font-medium leading-none tracking-tight
  <AlertDescription>        → <div> text-sm con leading-relaxed en párrafos
</Alert>
```

Cuando hay icono, el componente ajusta automáticamente:
- `[&>svg~*]:pl-7` — desplaza el contenido de texto para no solapar el icono
- `[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4` — posiciona el icono

## Tokens usados
| Variante | Background | Texto | Borde |
|----------|-----------|-------|-------|
| `default` | `--background` | `--foreground` | `--border` |
| `destructive` | `--background` | `--destructive` | `--destructive/50` |

> Para alerts semánticos de éxito/warning/info, extender con className:

| Semántica | Classes adicionales |
|-----------|---------------------|
| Success | `bg-success-muted text-success-text border-success/30` |
| Warning | `bg-warning-muted text-warning-text border-warning/30` |
| Info | `bg-info-muted text-info-foreground border-info/30` |

## Code example

```tsx
// ✅ Alert informativo
<Alert>
  <Info size={16} aria-hidden />
  <AlertTitle>Información</AlertTitle>
  <AlertDescription>
    Los cambios se aplicarán en el próximo ciclo de facturación.
  </AlertDescription>
</Alert>

// ✅ Alert de error
<Alert variant="destructive">
  <AlertCircle size={16} aria-hidden />
  <AlertTitle>Error de autenticación</AlertTitle>
  <AlertDescription>
    No se pudo verificar tu identidad. Intenta nuevamente.
  </AlertDescription>
</Alert>

// ✅ Alert de éxito (semántico extendido)
<Alert className="bg-success-muted text-success-text border-success/30">
  <CheckCircle size={16} aria-hidden />
  <AlertTitle>¡Cambios guardados!</AlertTitle>
  <AlertDescription>Tu perfil ha sido actualizado correctamente.</AlertDescription>
</Alert>

// ✅ Alert de advertencia
<Alert className="bg-warning-muted text-warning-text border-warning/30">
  <AlertTriangle size={16} aria-hidden />
  <AlertTitle>Plan próximo a expirar</AlertTitle>
  <AlertDescription>
    Tu plan Pro expira en 3 días. Renueva para no perder el acceso.
  </AlertDescription>
</Alert>

// ❌ Incorrecto
<Alert style={{ backgroundColor: '#fef3c7' }}>   {/* hardcoded */}
<Alert variant="default">Sin título</Alert>        {/* siempre incluir AlertTitle */}
```

## Accesibilidad
- `role="alert"` está presente en el root — el screen reader lo anuncia automáticamente al aparecer
- Los iconos deben ser `aria-hidden` (el texto ya comunica el significado)
- No usar solo color para transmitir el tipo de alert — siempre incluir icono + texto

## Cross-references
- `Sonner` — para notificaciones toast (efímeras, no inline)
- `AlertDialog` — para confirmaciones que bloquean el flujo
- `Badge` — para indicadores de estado más compactos
