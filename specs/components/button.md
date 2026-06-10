# Button — Component Spec

## Metadata
- **Categoría:** Action
- **Estado:** Stable
- **Archivo:** `src/components/ui/button.tsx`
- **Storybook:** Components/Button

## Overview

### Cuándo usar
- Acción principal de una pantalla (CTA)
- Confirmación en modales y dialogs
- Submit de formularios
- Acciones secundarias dentro de una vista

### Cuándo NO usar
- Navegación entre páginas → usar `<a>` o `<Link>`
- Más de 1 botón `default` (primario) en la misma vista
- Como contenedor de otros componentes interactivos
- Para mostrar información (no es un badge ni un chip)

## Anatomy
- **Root:** `<button>` nativo con `role="button"` implícito
- **Label:** texto del botón — siempre presente salvo en `size="icon"`
- **Icon (opcional):** Lucide icon, `size={16}`, siempre `aria-hidden`
- **Slot (asChild):** cuando se necesita renderizar otro elemento como root

## Tokens usados
| Propiedad | Token |
|-----------|-------|
| Fondo default | `--primary` |
| Texto default | `--primary-foreground` |
| Fondo secondary | `--secondary` |
| Texto secondary | `--secondary-foreground` |
| Fondo outline (hover) | `--accent` |
| Texto outline (hover) | `--accent-foreground` |
| Borde outline | `--input` |
| Focus ring | `--ring` |
| Border radius | `rounded-md` → `--radius` |
| Transición | `transition-colors` → `--duration-base` |

## Variantes
| Variante | Cuándo usar |
|----------|-------------|
| `default` | Acción principal — máximo 1 por vista |
| `secondary` | Acciones secundarias relevantes |
| `outline` | Alternativas, cancelar, acciones de menor peso |
| `ghost` | Acciones en toolbars, nav items, botones discretos |
| `destructive` | Eliminar, acciones irreversibles — requiere confirmación |
| `link` | Parece enlace pero dispara una acción (no navega) |

## Tamaños
| Size prop | Height | Padding | Text | Uso |
|-----------|--------|---------|------|-----|
| `sm` | `h-9` (36px) | `px-3` | `text-sm` | Acciones secundarias, tablas, listas |
| `default` | `h-10` (40px) | `px-4` | `text-sm` | Uso estándar |
| `lg` | `h-11` (44px) | `px-8` | `text-sm` | CTAs prominentes |
| `icon` | `h-10 w-10` | sin padding | — | Solo icono — siempre con Tooltip |

## Estados
| Estado | Comportamiento visual |
|--------|----------------------|
| `default` | Fondo `--primary`, texto `--primary-foreground` |
| `hover` | `bg-primary/90` (10% más transparente) |
| `focus-visible` | `ring-2 ring-ring ring-offset-2` |
| `active` | Handled by browser/Radix |
| `disabled` | `opacity-50`, `pointer-events-none`, sin hover |

## Code example

```tsx
// ✅ Correcto
<Button variant="default">Guardar cambios</Button>

<Button variant="outline" size="sm">Cancelar</Button>

<Button variant="destructive">
  <Trash size={16} aria-hidden />
  Eliminar cuenta
</Button>

// Solo icono — siempre con Tooltip
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="ghost" size="icon">
      <Settings size={16} aria-hidden />
      <span className="sr-only">Configuración</span>
    </Button>
  </TooltipTrigger>
  <TooltipContent>Configuración</TooltipContent>
</Tooltip>

// asChild para links que parecen botones
<Button asChild variant="default">
  <a href="/dashboard">Ir al dashboard</a>
</Button>

// ❌ Incorrecto
<Button style={{ background: '#3B82F6' }}>Guardar</Button>
<Button className="rounded-[8px]">Click</Button>
<Button variant="default">
  <Button variant="outline">Anidado</Button>  {/* nunca anidar */}
</Button>
```

## Cross-references
- `Tooltip` — requerido cuando se usa `size="icon"`
- `AlertDialog` — para confirmar acciones `destructive`
- `Dialog` — para flujos que requieren más contexto antes de confirmar
