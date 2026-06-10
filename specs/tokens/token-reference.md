# token-reference.md — Mapa maestro de tokens

## Cómo usar este archivo
Antes de escribir cualquier valor CSS, consulta este archivo.
Si el valor que necesitas no tiene token, crea uno — nunca hardcodees.

---

## Color tokens

| Token | Valor (light) | Valor (dark) | Cuándo usar |
|-------|--------------|--------------|-------------|
| `--background` | `oklch(1 0 0)` | `oklch(0.06 0 0)` | Fondo de página, fondo de modales, fondo de sheets |
| `--foreground` | `oklch(0.09 0 0)` | `oklch(0.96 0 0)` | Texto principal, iconos sobre fondo de página |
| `--card` | `oklch(1 0 0)` | `oklch(0.10 0 0)` | Fondo de cards, paneles elevados |
| `--card-foreground` | `oklch(0.09 0 0)` | `oklch(0.96 0 0)` | Texto dentro de cards |
| `--popover` | `oklch(1 0 0)` | `oklch(0.10 0 0)` | Fondo de dropdowns, tooltips, popovers |
| `--popover-foreground` | `oklch(0.09 0 0)` | `oklch(0.96 0 0)` | Texto dentro de popovers |
| `--primary` | `oklch(0.62 0.19 264)` | igual | Botones CTA, estados activos, íconos de acento principal |
| `--primary-foreground` | `oklch(1 0 0)` | igual | Texto sobre fondo `--primary` |
| `--primary-text` | `oklch(0.38 0.15 264)` | `oklch(0.75 0.15 264)` | Texto azul sobre fondo blanco — ratio 7.2:1 — links, labels activos |
| `--secondary` | `oklch(0.96 0 0)` | `oklch(0.15 0 0)` | Botones secundarios, chips, fondos sutiles |
| `--secondary-foreground` | `oklch(0.09 0 0)` | `oklch(0.96 0 0)` | Texto sobre `--secondary` |
| `--muted` | `oklch(0.96 0 0)` | `oklch(0.15 0 0)` | Fondos desactivados, secciones de menor jerarquía |
| `--muted-foreground` | `oklch(0.50 0 0)` | `oklch(0.55 0 0)` | Texto secundario, placeholders, metadatos, captions |
| `--accent` | `oklch(0.96 0.03 264)` | `oklch(0.25 0.08 264)` | Hover states sutiles con tinte primario, fondos de item seleccionado |
| `--accent-foreground` | `oklch(0.38 0.15 264)` | `oklch(0.75 0.15 264)` | Texto sobre `--accent` |
| `--destructive` | `oklch(0.577 0.245 27)` | `oklch(0.704 0.191 22)` | Acciones de eliminar, errores críticos, estados peligrosos |
| `--destructive-foreground` | `oklch(1 0 0)` | igual | Texto sobre `--destructive` |
| `--success` | `oklch(0.55 0.15 162)` | `oklch(0.65 0.15 162)` | Fondo de badges de éxito, íconos de confirmación |
| `--success-foreground` | `oklch(1 0 0)` | igual | Texto sobre `--success` sólido |
| `--success-muted` | `oklch(0.95 0.04 162)` | `oklch(0.25 0.05 162)` | Fondo de alerts de éxito, chips de estado positivo |
| `--success-text` | `oklch(0.38 0.13 152)` | igual | Texto verde accesible sobre `--success-muted` |
| `--warning` | `oklch(0.65 0.15 75)` | `oklch(0.82 0.12 75)` | Fondo de badges de advertencia |
| `--warning-foreground` | `oklch(1 0 0)` | igual | Texto sobre `--warning` sólido |
| `--warning-muted` | `oklch(0.97 0.04 75)` | `oklch(0.25 0.05 70)` | Fondo de alerts de advertencia |
| `--warning-text` | `oklch(0.50 0.10 75)` | igual | Texto amarillo accesible sobre `--warning-muted` |
| `--info` | `oklch(0.55 0.15 262)` | `oklch(0.65 0.15 262)` | Fondo de badges informativos |
| `--info-foreground` | `oklch(1 0 0)` | igual | Texto sobre `--info` sólido |
| `--info-muted` | `oklch(0.95 0.04 262)` | `oklch(0.25 0.05 262)` | Fondo de alerts informativos |
| `--border` | `oklch(0.88 0 0)` | `oklch(0.20 0 0)` | Bordes de inputs, cards, separadores, dividers |
| `--input` | `oklch(0.88 0 0)` | `oklch(0.20 0 0)` | Borde específico de inputs (mismo valor que `--border`) |
| `--ring` | `var(--primary)` | igual | Focus ring de todos los elementos interactivos — NO cambiar |
| `--sidebar` | `oklch(0.96 0 0)` | `oklch(0.10 0 0)` | Fondo del sidebar |
| `--sidebar-foreground` | `oklch(0.09 0 0)` | `oklch(0.96 0 0)` | Texto en sidebar |
| `--sidebar-primary` | `var(--primary)` | igual | Item activo en sidebar |
| `--sidebar-primary-foreground` | `var(--primary-foreground)` | igual | Texto de item activo en sidebar |
| `--sidebar-accent` | `var(--accent)` | igual | Hover en items del sidebar |
| `--sidebar-accent-foreground` | `var(--accent-foreground)` | igual | Texto en hover de items del sidebar |
| `--sidebar-border` | `var(--border)` | `oklch(0.20 0 0)` | Borde del sidebar |
| `--sidebar-ring` | `var(--ring)` | igual | Focus ring en el sidebar |

### Colores que NO existen como token (usar siempre mediante clases Tailwind)
- Negro puro → usar `--foreground`
- Blanco puro → usar `--background` o `--primary-foreground`
- Grises → usar `--muted`, `--muted-foreground`, `--secondary`

---

## Border radius tokens

| Token | Valor | Cuándo usar |
|-------|-------|-------------|
| `--radius` | `0.375rem` (6px) | Base — referencia para calcular los demás |
| `--radius-sm` | `calc(--radius - 4px)` → 2px | Chips muy pequeños, badges inline, tags |
| `--radius-md` | `var(--radius)` → 6px | Botones, inputs, selects — componentes de form |
| `--radius-lg` | `calc(--radius + 4px)` → 10px | Cards, popovers, dropdowns, modales |
| `--radius-xl` | `calc(--radius + 8px)` → 14px | Sheets, drawers, contenedores grandes |

**Clases Tailwind equivalentes:**
- `rounded-sm` → `--radius-sm`
- `rounded-md` → `--radius-md`
- `rounded-lg` → `--radius-lg`
- `rounded-xl` → `--radius-xl`
- `rounded-full` → solo para avatares, badges circulares, píldoras

### NUNCA hacer:
```css
border-radius: 8px;      /* ❌ hardcodeado */
className="rounded-[8px]" /* ❌ valor arbitrario */
```

---

## Spacing tokens (Tailwind)

| Clase | Valor px | Cuándo usar |
|-------|----------|-------------|
| `p-1` / `gap-1` | 4px | Micro-espacios: entre icono y badge, inner padding de chips tiny |
| `p-2` / `gap-2` | 8px | Padding de badges, gap entre icon y label en botón sm |
| `p-3` / `gap-3` | 12px | Padding de botones sm, gap entre items de nav |
| `p-4` / `gap-4` | 16px | Padding estándar de componentes, gap entre elementos relacionados |
| `p-6` / `gap-6` | 24px | Padding de cards, gap entre grupos de elementos |
| `p-8` / `gap-8` | 32px | Secciones dentro de páginas, separación entre bloques |
| `p-12` | 48px | Secciones de hero, espaciado de página |
| `p-16` | 64px | Separación mayor entre secciones |

**Tokens de layout (definidos en CSS):**
| Token | Valor | Uso |
|-------|-------|-----|
| `--container-max` | 1280px | max-width del contenedor principal |
| `--container-padding` | 2rem | padding lateral del contenedor |
| `--grid-cols` | 12 | columnas del grid |
| `--grid-gap` | 1.5rem | gap del grid |

---

## Typography tokens

| Token | Valor | Uso |
|-------|-------|-----|
| `--font-sans` | `'Geist Variable', system-ui, sans-serif` | Tipografía base de toda la UI |
| `--font-mono` | `'Geist Mono Variable', monospace` | Código, valores técnicos, datos numéricos |
| `--font-heading` | `var(--font-sans)` | Headings — mismo que sans por defecto |

**Escala tipográfica Tailwind:**
| Clase | px | Uso |
|-------|----|-----|
| `text-xs` | 12px | Captions, labels de form, metadatos |
| `text-sm` | 14px | Texto de UI, body de componentes, botones |
| `text-base` | 16px | Body copy principal |
| `text-lg` | 18px | Subtítulos, leads |
| `text-xl` | 20px | Headings de sección pequeños |
| `text-2xl` | 24px | Headings de card, títulos de dialog |
| `text-3xl` | 30px | Headings de página |
| `text-4xl`+ | 36px+ | Hero headings |

---

## Shadow tokens

| Token | Valor | Cuándo usar |
|-------|-------|-------------|
| `--shadow-sm` | `none` | Sin sombra — usar border en su lugar |
| `--shadow-md` | `none` | Sin sombra — usar border en su lugar |
| `--shadow-lg` | `none` | Sin sombra — usar border en su lugar |

> El DS base usa sombras = none. Para elevar elementos se usa `border` + cambio de `bg`. Si el cliente necesita sombras, definir aquí los valores y nunca hardcodear `box-shadow`.

---

## Motion tokens

| Token | Valor | Cuándo usar |
|-------|-------|-------------|
| `--duration-instant` | `0ms` | Cambios que no deben verse como animación (estados de error) |
| `--duration-fast` | `100ms` | Hover, focus — microinteracciones de estado |
| `--duration-base` | `200ms` | Transiciones estándar de componentes |
| `--duration-slow` | `300ms` | Entrada de modales, sheets |
| `--duration-slower` | `500ms` | Animaciones de onboarding, empty states |
| `--duration-dramatic` | `700ms` | Animaciones especiales de marca |
| `--ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | Transiciones generales |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Elementos que entran a la pantalla |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Elementos que salen de la pantalla |
| `--ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Hover de botones, confirmaciones con energía |
| `--ease-spring` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Microinteracciones con personalidad |
| `--ease-elegant` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Transiciones suaves de alto nivel |

### NUNCA hacer:
```css
transition: all 0.3s ease;         /* ❌ valores hardcodeados */
animation-duration: 200ms;          /* ❌ usar var(--duration-base) */
transition-timing-function: ease-in; /* ❌ usar var(--ease-in) */
```
