# Select — Component Spec

## Metadata
- **Categoría:** Form
- **Estado:** Stable
- **Archivo:** `src/components/ui/select.tsx`
- **Dependencia:** `@radix-ui/react-select`
- **Storybook:** Components/Select

## Overview

### Cuándo usar
- Selección de una opción de una lista de 4+ opciones
- Opciones que necesitan un label descriptivo
- Filtros de tabla o lista con opciones predefinidas
- Configuración de preferencias del usuario

### Cuándo NO usar
- Menos de 3 opciones → usar `RadioGroup` (visible, sin click extra)
- Selección múltiple → usar `Checkbox` group o un multi-select custom
- Opciones que el usuario puede crear → usar Combobox
- Búsqueda dentro de opciones → usar Combobox con búsqueda

## Anatomy
```
<Select>                         → Root Radix (estado open/close, valor)
  <SelectTrigger>                → <button> h-10 w-full, flex, border input
    <SelectValue>                → muestra el placeholder o valor seleccionado
    <ChevronDown>                → icono de apertura, automático
  </SelectTrigger>
  <SelectContent>                → Portal → Popover con opciones
    <SelectGroup>                → agrupación opcional con label
      <SelectLabel>              → título del grupo
      <SelectItem>               → opción individual con check al seleccionar
    </SelectGroup>
    <SelectSeparator>            → línea divisoria entre grupos
  </SelectContent>
</Select>
```

## Tokens usados
| Propiedad | Token |
|-----------|-------|
| Trigger borde | `--input` |
| Trigger fondo | `--background` |
| Trigger texto | `--foreground` |
| Trigger placeholder | `--muted-foreground` |
| Focus ring | `--ring` |
| Popover fondo | `--popover` |
| Popover texto | `--popover-foreground` |
| Item hover fondo | `--accent` |
| Item hover texto | `--accent-foreground` |
| Separador | `--muted` |
| Border radius trigger | `rounded-md` |
| Border radius content | `rounded-md` |
| Check icon | `--foreground` |

## Code example

```tsx
// ✅ Correcto — con Label
<div className="flex flex-col gap-2">
  <Label htmlFor="country">País</Label>
  <Select>
    <SelectTrigger id="country">
      <SelectValue placeholder="Selecciona un país" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="mx">México</SelectItem>
      <SelectItem value="co">Colombia</SelectItem>
      <SelectItem value="ar">Argentina</SelectItem>
    </SelectContent>
  </Select>
</div>

// Con grupos
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Selecciona una zona" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>América del Norte</SelectLabel>
      <SelectItem value="mx">México</SelectItem>
      <SelectItem value="us">Estados Unidos</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>América del Sur</SelectLabel>
      <SelectItem value="co">Colombia</SelectItem>
      <SelectItem value="ar">Argentina</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>

// Controlado
<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Claro</SelectItem>
    <SelectItem value="dark">Oscuro</SelectItem>
    <SelectItem value="system">Sistema</SelectItem>
  </SelectContent>
</Select>

// ❌ Incorrecto
<select className="border rounded p-2">  {/* usar el componente del DS */}
<Select>
  <SelectTrigger style={{ borderColor: '#ccc' }}> {/* hardcoded */}
```

## Accesibilidad
- `id` en `SelectTrigger` + `htmlFor` en `Label` para conectarlos
- Radix maneja `aria-expanded`, `aria-haspopup`, navegación con teclado
- Las opciones deshabilitadas usan `disabled` prop en `SelectItem`
- El check de opción seleccionada es automático (Radix + `SelectPrimitive.ItemIndicator`)

## Cross-references
- `RadioGroup` — cuando hay 2-3 opciones y el espacio lo permite (siempre visible)
- `Label` — requerido en todos los usos de Select en formularios
- `Input` — para campos de texto libre
