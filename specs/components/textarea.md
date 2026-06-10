# Textarea — Component Spec

## Metadata
- **Categoría:** Form
- **Estado:** Stable
- **Archivo:** `src/components/ui/textarea.tsx`
- **Storybook:** Components/Textarea

## Overview

### Cuándo usar
- Texto largo de múltiples líneas: descripción, comentario, bio, mensaje
- Contenido que puede variar en longitud
- Campos donde el usuario necesita ver contexto mientras escribe

### Cuándo NO usar
- Una sola línea de texto → usar `Input`
- Texto enriquecido (bold, links, listas) → usar editor rich-text
- Código → usar un editor de código con syntax highlighting
- Más de 500 palabras de contenido esperado → considerar un editor dedicado

## Anatomy
- **Root:** `<textarea>` nativo, `w-full`
- **Min-height:** `min-h-[80px]` (80px como mínimo, crece con el contenido)
- **Resize:** por defecto es resizable verticalmente (comportamiento nativo)
- Mismos tokens de estilo que `Input` — coherencia visual garantizada

## Tokens usados
| Propiedad | Token |
|-----------|-------|
| Borde | `--input` |
| Fondo | `--background` |
| Texto | `--foreground` |
| Placeholder | `--muted-foreground` |
| Focus ring | `--ring` |
| Border radius | `rounded-md` → `--radius` |
| Min height | `min-h-[80px]` |
| Padding | `px-3 py-2` |

## Estados
| Estado | Comportamiento visual |
|--------|----------------------|
| `default` | Borde `--input`, fondo `--background` |
| `focus` | Ring 2px en `--ring` con offset 2px |
| `disabled` | `opacity-50`, `cursor-not-allowed` |
| `error` | `aria-invalid="true"` + `className="border-destructive"` |

## Code example

```tsx
// ✅ Correcto — con Label
<div className="flex flex-col gap-2">
  <Label htmlFor="description">Descripción</Label>
  <Textarea
    id="description"
    placeholder="Describe tu proyecto..."
    rows={4}
  />
</div>

// Con contador de caracteres
<div className="flex flex-col gap-2">
  <div className="flex justify-between">
    <Label htmlFor="bio">Bio</Label>
    <span className="text-xs text-muted-foreground">{bio.length}/160</span>
  </div>
  <Textarea
    id="bio"
    value={bio}
    onChange={e => setBio(e.target.value)}
    maxLength={160}
    rows={3}
  />
</div>

// Con estado de error
<div className="flex flex-col gap-2">
  <Label htmlFor="comment">Comentario</Label>
  <Textarea
    id="comment"
    aria-invalid="true"
    aria-describedby="comment-error"
    className="border-destructive focus-visible:ring-destructive"
  />
  <p id="comment-error" className="text-sm text-destructive">
    El comentario es obligatorio
  </p>
</div>

// Sin resize (cuando el tamaño es fijo)
<Textarea className="resize-none" rows={6} />

// ❌ Incorrecto
<textarea className="border rounded p-2 w-full">  {/* usar el componente */}
<Textarea style={{ minHeight: '100px' }}>         {/* usar rows prop */}
<Textarea className="rounded-[8px]">              {/* hardcoded radius */}
```

## Accesibilidad
- Siempre `id` + `htmlFor` para conectar Label y Textarea
- `aria-invalid="true"` + `aria-describedby` en estados de error
- `rows` para indicar el tamaño esperado del contenido
- No eliminar `resize` sin justificación — el usuario puede necesitar más espacio

## Cross-references
- `Input` — para texto de una sola línea
- `Label` — requerido en todos los usos
