# Color — Foundation

## Descripción
Sistema de color semántico basado en oklch. Todos los valores se expresan como tokens CSS; nunca se usan colores literales en componentes.

## Sistema de capas

```
Primitivos (oklch) → Tokens semánticos (--primary, --background...) → Clases Tailwind (bg-primary, text-foreground...)
```

Solo se trabaja con la capa de tokens semánticos y clases Tailwind. Los valores oklch primitivos solo viven en `src/index.css`.

## Paleta completa

### Neutrales
| Token | Light | Dark | Semántica |
|-------|-------|------|-----------|
| `--background` | `oklch(1 0 0)` | `oklch(0.06 0 0)` | Fondo de página |
| `--foreground` | `oklch(0.09 0 0)` | `oklch(0.96 0 0)` | Texto principal |
| `--muted` | `oklch(0.96 0 0)` | `oklch(0.15 0 0)` | Superficies de menor jerarquía |
| `--muted-foreground` | `oklch(0.50 0 0)` | `oklch(0.55 0 0)` | Texto secundario / desactivado |
| `--border` | `oklch(0.88 0 0)` | `oklch(0.20 0 0)` | Bordes de UI |

### Primario (marca)
| Token | Light | Dark | Semántica |
|-------|-------|------|-----------|
| `--primary` | `oklch(0.62 0.19 264)` | igual | Azul Dusty — acción principal |
| `--primary-foreground` | `oklch(1 0 0)` | igual | Texto sobre primario |
| `--primary-text` | `oklch(0.38 0.15 264)` | `oklch(0.75 0.15 264)` | Texto azul legible — 7.2:1 ratio |
| `--accent` | `oklch(0.96 0.03 264)` | `oklch(0.25 0.08 264)` | Hover con tinte primario |
| `--accent-foreground` | `oklch(0.38 0.15 264)` | `oklch(0.75 0.15 264)` | Texto sobre accent |

### Semánticos (no modificar)
| Token | Uso |
|-------|-----|
| `--destructive` | Eliminar, errores críticos |
| `--success` / `--success-muted` / `--success-text` | Estados positivos |
| `--warning` / `--warning-muted` / `--warning-text` | Advertencias |
| `--info` / `--info-muted` | Informativos |

## Ratios de contraste WCAG AA

| Combinación | Ratio | Uso |
|-------------|-------|-----|
| `--foreground` sobre `--background` | ~19:1 | ✅ Texto body |
| `--primary-text` sobre `--background` | ~7.2:1 | ✅ Texto primario |
| `--primary-foreground` sobre `--primary` | ~4.8:1 | ✅ Botón default |
| `--muted-foreground` sobre `--background` | ~4.6:1 | ✅ AA mínimo |
| `--primary` sobre `--background` | ~3.1:1 | ⚠️ Solo decorativo, no texto |

## Uso correcto

```tsx
// ✅ Siempre tokens semánticos
<div className="bg-background text-foreground">
<p className="text-muted-foreground">
<button className="bg-primary text-primary-foreground">

// ✅ Para texto con color de marca
<span className="text-primary-text">Ver detalles</span>

// ❌ Nunca valores directos
<div style={{ color: '#1a1a1a' }}>
<div className="bg-[oklch(0.62_0.19_264)]">
<div className="text-blue-600">   {/* clases de Tailwind no semánticas */}
```

## Excepciones permitidas
- `bg-black/80` en overlays de dialog (Radix lo necesita)
- `opacity-*` para estados disabled (no es un color, es opacidad)
- `ring-offset-background` en focus rings (necesario para el anillo de 2px)

## Personalización por cliente
Cambiar solo los tokens `--primary`, `--primary-foreground`, `--primary-text` en `src/index.css`. Los semánticos (`--destructive`, `--success`, etc.) no se tocan.
