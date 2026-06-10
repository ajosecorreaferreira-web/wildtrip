# Badge — Component Spec

## Metadata
- **Categoría:** Display
- **Estado:** Stable
- **Archivo:** `src/components/ui/badge.tsx`
- **Storybook:** Components/Badge

## Overview

### Cuándo usar
- Indicar estado de una entidad (activo, pendiente, archivado)
- Contar notificaciones o items sin leer
- Etiquetar categorías o tipos
- Mostrar versión, tier de plan, o rol de usuario

### Cuándo NO usar
- Para acciones (usar Button)
- Texto de más de 3 palabras (usar un tag o chip con más estructura)
- Más de 3-4 badges seguidos en la misma línea
- Como único indicador de error en un formulario (usar texto de error)

## Anatomy
- **Root:** `<div>` inline-flex con `rounded-full` y `border`
- Sin subcomponentes — composición directa con children
- Icono opcional: `size={12}` (no el default de 16)

## Tokens usados
| Variante | Fondo | Texto | Borde |
|----------|-------|-------|-------|
| `default` | `--primary` | `--primary-foreground` | transparent |
| `secondary` | `--secondary` | `--secondary-foreground` | transparent |
| `destructive` | `--destructive` | `--destructive-foreground` | transparent |
| `outline` | transparent | `--foreground` | `--border` |

| Propiedad | Valor |
|-----------|-------|
| Border radius | `rounded-full` |
| Padding | `px-2.5 py-0.5` |
| Font size | `text-xs` |
| Font weight | `font-semibold` |

## Variantes semánticas (extender en el proyecto)
Las variantes base del componente son genéricas. Para estados semánticos de un dominio específico, crear variantes adicionales o usar className:

```tsx
// Estados de ticket / tarea
<Badge className="bg-success-muted text-success-text border-transparent">Completado</Badge>
<Badge className="bg-warning-muted text-warning-text border-transparent">En revisión</Badge>
<Badge className="bg-info-muted text-info-foreground border-transparent">En progreso</Badge>
```

## Code example

```tsx
// ✅ Correcto
<Badge variant="default">Pro</Badge>
<Badge variant="secondary">Borrador</Badge>
<Badge variant="destructive">Suspendido</Badge>
<Badge variant="outline">Gratis</Badge>

// Con icono (usar size 12, no el default)
<Badge variant="secondary">
  <Circle size={8} className="fill-success text-success" aria-hidden />
  Activo
</Badge>

// Badge de count (notificaciones)
<Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-[10px]">
  3
</Badge>

// ❌ Incorrecto
<Badge style={{ backgroundColor: 'green' }}>Activo</Badge>
<Badge className="rounded-md">Tag</Badge>    {/* no cambiar el radius a no-pill */}
<Badge variant="default">
  <Button>Acción</Button>  {/* nunca interactivo dentro de badge */}
</Badge>
```

## Cross-references
- `Card` — los badges aparecen frecuentemente en CardHeader para indicar estado
- `Table` — columna de estado en DataTable usa Badge
- `Alert` — para mensajes de estado más prominentes que un badge
