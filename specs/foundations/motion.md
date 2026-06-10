# Motion — Foundation

## Descripción
Sistema de animación basado en tokens CSS. Toda transición usa `var(--duration-*)` y `var(--ease-*)`. El arquetipo de motion del DS template es **funcional con energía sutil** — las animaciones confirman acciones, no son decorativas.

## Tokens de duración

| Token | Valor | Cuándo usar |
|-------|-------|-------------|
| `--duration-instant` | `0ms` | Estados de error, cambios que deben ser inmediatos |
| `--duration-fast` | `100ms` | **Hover, focus** — microinteracciones de estado |
| `--duration-base` | `200ms` | **Transiciones estándar** de componentes (open/close de dropdown, fade) |
| `--duration-slow` | `300ms` | Entrada de modales, sheets, sidebars |
| `--duration-slower` | `500ms` | Animaciones de onboarding, empty states, success confirmations |
| `--duration-dramatic` | `700ms` | Animaciones especiales de marca — usar con criterio |

## Tokens de easing

| Token | Curva | Cuándo usar |
|-------|-------|-------------|
| `--ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | Transiciones de estado genéricas |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Elementos que **entran** a la pantalla |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Elementos que **salen** de la pantalla |
| `--ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Hover de botones, confirmaciones con energía |
| `--ease-spring` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Microinteracciones con personalidad |
| `--ease-elegant` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Transiciones suaves premium |

## Patrones de uso

### Hover de botón (sutil, energético)
```css
transition: transform var(--duration-fast) var(--ease-bounce),
            background-color var(--duration-fast) var(--ease-default);

&:hover { transform: translateY(-1px) scale(1.02); }
&:active { transform: translateY(0) scale(0.98); }
```

### Fade de dropdown/popover
```css
/* Radix usa data-attributes — aprovechar con Tailwind */
data-[state=open]:animate-in
data-[state=closed]:animate-out
data-[state=closed]:fade-out-0
data-[state=open]:fade-in-0
duration-200
```

### Entrada de modal
```css
data-[state=open]:animate-in
data-[state=closed]:animate-out
data-[state=open]:fade-in-0
data-[state=open]:zoom-in-95
duration-200  /* --duration-base */
```

### Transición de color (hover de nav item)
```css
transition-colors  /* Tailwind shorthand */
/* o explícito: */
transition: color var(--duration-fast) var(--ease-default),
            background-color var(--duration-fast) var(--ease-default);
```

## Cuándo animar y cuándo NO

### Animar ✅
- Cambios de estado (hover, focus, active, disabled)
- Apertura/cierre de overlays (modal, dropdown, tooltip)
- Confirmaciones de acción (success state, checkmark)
- Transiciones entre vistas en SPAs

### NO animar ❌
- Carga de datos (usar skeleton, no spinner con fade)
- Errores de validación — deben ser instantáneos (`--duration-instant`)
- Más de 3 propiedades simultáneas — es ruido visual
- Loops infinitos sin interacción del usuario
- Elementos que se repiten en listas largas (performance)

## Accesibilidad
Respetar `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Tailwind maneja esto con `motion-reduce:transition-none` y `motion-reduce:transform-none`.

## NUNCA hacer

```css
/* ❌ Duración hardcodeada */
transition: all 0.3s ease;
animation-duration: 200ms;

/* ❌ Easing sin token */
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

/* ✅ Siempre tokens */
transition: transform var(--duration-fast) var(--ease-bounce);
```
