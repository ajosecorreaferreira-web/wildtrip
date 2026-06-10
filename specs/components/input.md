# Input — Component Spec

## Metadata
- **Categoría:** Form
- **Estado:** Stable
- **Archivo:** `src/components/ui/input.tsx`
- **Storybook:** Components/Input

## Overview

### Cuándo usar
- Campo de texto de una sola línea
- Búsqueda, filtros
- Datos cortos: nombre, email, teléfono, contraseña, URL

### Cuándo NO usar
- Texto de múltiples líneas → usar `Textarea`
- Selección de opciones fijas → usar `Select`
- Fecha/hora → usar date picker (no incluido en base)
- Múltiples valores → usar un componente de tags/chips

## Anatomy
- **Root:** `<input>` nativo, `w-full` por defecto
- **Border:** `border border-input` → `--input` token
- **Background:** `bg-background` → `--background` token
- **Placeholder:** `placeholder:text-muted-foreground`
- **Focus ring:** `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
- **Label:** siempre usar `<Label>` de `src/components/ui/label.tsx` — nunca omitir

## Tokens usados
| Propiedad | Token |
|-----------|-------|
| Borde | `--input` |
| Fondo | `--background` |
| Texto | `--foreground` |
| Placeholder | `--muted-foreground` |
| Focus ring | `--ring` |
| Border radius | `rounded-md` → `--radius` |
| Height | `h-10` (40px) |
| Padding | `px-3 py-2` |

## Estados
| Estado | Comportamiento visual |
|--------|----------------------|
| `default` | Borde `--input`, fondo `--background` |
| `focus` | Ring 2px en `--ring` con offset 2px |
| `disabled` | `opacity-50`, `cursor-not-allowed` |
| `error` | Añadir `aria-invalid="true"` + borde `--destructive` via `className` |
| `readonly` | `readOnly` prop — sin ring de focus |

## Variantes de tipo
```tsx
<Input type="text" />      // texto libre
<Input type="email" />     // validación de formato email
<Input type="password" />  // enmascarado
<Input type="search" />    // búsqueda — considerar SearchInput wrapper
<Input type="number" />    // numérico
<Input type="tel" />       // teléfono
<Input type="url" />       // URL
```

## Code example

```tsx
// ✅ Correcto — siempre con Label
<div className="flex flex-col gap-2">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    placeholder="tu@email.com"
  />
</div>

// Con estado de error
<div className="flex flex-col gap-2">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    aria-invalid="true"
    aria-describedby="email-error"
    className="border-destructive focus-visible:ring-destructive"
  />
  <p id="email-error" className="text-sm text-destructive">
    Email inválido
  </p>
</div>

// Con icono (wrapper pattern)
<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
  <Input className="pl-9" placeholder="Buscar..." />
</div>

// ❌ Incorrecto
<Input style={{ border: '1px solid #ccc' }} />
<Input className="rounded-[8px]" />
<input type="text" />  {/* sin el componente del DS */}
```

## Accesibilidad
- Siempre `id` + `htmlFor` que conecten Label e Input
- En campos requeridos: `required` o `aria-required="true"`
- En errores: `aria-invalid="true"` + `aria-describedby` apuntando al mensaje de error
- Placeholder nunca reemplaza al Label

## Cross-references
- `Label` — requerido en todos los usos
- `Textarea` — para texto multilínea
- `Select` — para opciones fijas
