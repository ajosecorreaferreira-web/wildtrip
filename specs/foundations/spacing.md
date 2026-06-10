# Spacing — Foundation

## Descripción
Escala de espaciado basada en múltiplos de 4px. Se usa exclusivamente mediante clases Tailwind — nunca valores en píxeles directos en `style` prop.

## Escala base (4px grid)

| Clase | rem | px | Cuándo usar |
|-------|-----|----|-------------|
| `0` | 0 | 0px | Reset explícito |
| `px` | 1px | 1px | Bordes de 1px, ajustes de pixel |
| `0.5` | 0.125rem | 2px | Ajuste fino entre elementos muy densos |
| `1` | 0.25rem | 4px | Micro-gap: entre icono y badge, inner de chips tiny |
| `1.5` | 0.375rem | 6px | Gap entre items muy juntos, separación icon-label en sm |
| `2` | 0.5rem | 8px | Padding de badges, gap pequeño entre elementos |
| `2.5` | 0.625rem | 10px | Ajuste intermedio |
| `3` | 0.75rem | 12px | Padding de botones sm, gap entre items de nav |
| `3.5` | 0.875rem | 14px | Ajuste intermedio |
| `4` | 1rem | 16px | **Padding estándar de componentes** — gap entre elementos relacionados |
| `5` | 1.25rem | 20px | Padding intermedio |
| `6` | 1.5rem | 24px | **Padding de cards** — gap entre grupos de elementos |
| `7` | 1.75rem | 28px | Ajuste intermedio |
| `8` | 2rem | 32px | Secciones dentro de páginas, separación entre bloques |
| `10` | 2.5rem | 40px | Secciones medianas |
| `12` | 3rem | 48px | Secciones grandes |
| `16` | 4rem | 64px | Separación entre secciones principales |
| `20` | 5rem | 80px | Hero sections |
| `24` | 6rem | 96px | Espaciados de página máximos |

## Tokens de layout

```css
--container-max:     1280px;   /* max-width del wrapper principal */
--container-padding: 2rem;     /* padding lateral en móvil */
--grid-cols:         12;       /* columnas del grid */
--grid-gap:          1.5rem;   /* gap entre columnas */
```

## Patrones de uso

### Padding de componentes
```tsx
// Botón default
px-4 py-2   // h-10, p horizontal 16px

// Card
p-6         // 24px en todos lados

// Input
px-3 py-2   // 12px horizontal, 8px vertical

// Dialog/Modal
p-6         // 24px
```

### Gap entre elementos
```tsx
// Elementos del mismo grupo (icon + text, tag + tag)
gap-2   // 8px

// Items de lista, nav
gap-1   // 4px entre items compactos
gap-2   // 8px entre items con más respiro

// Secciones de un formulario
gap-4   // 16px entre campos

// Cards en un grid
gap-6   // 24px entre cards

// Secciones de página
gap-8 md:gap-12  // 32-48px
```

## NUNCA hacer

```tsx
// ❌ style prop con px
<div style={{ padding: '16px' }}>
<div style={{ marginTop: '24px' }}>
<div style={{ gap: '8px' }}>

// ❌ valores arbitrarios de Tailwind que rompen la escala
<div className="p-[18px]">
<div className="gap-[20px]">

// ✅ Siempre en la escala
<div className="p-4">      // 16px
<div className="mt-6">     // 24px
<div className="gap-2">    // 8px
```

## Densidad
La densidad predeterminada es **cómoda** (comfortable). Para interfaces de datos densos, usar una clase menor (p-3 en lugar de p-4) pero mantener la escala.
