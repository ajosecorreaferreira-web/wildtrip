# Dialog — Component Spec

## Metadata
- **Categoría:** Overlay
- **Estado:** Stable
- **Archivo:** `src/components/ui/dialog.tsx`
- **Dependencia:** `@radix-ui/react-dialog`
- **Storybook:** Components/Dialog

## Overview

### Cuándo usar
- Confirmar acciones destructivas o irreversibles
- Formularios cortos que no justifican una página nueva
- Detalle de un item sin salir del contexto actual
- Flujos de 1-3 pasos que requieren atención completa

### Cuándo NO usar
- Para mostrar solo un mensaje de confirmación simple → usar `AlertDialog`
- Formularios largos (más de 5-6 campos) → usar página dedicada o Sheet
- Navegar a otro recurso → usar Link
- Contenido que el usuario necesita ver mientras usa el dialog → usar Sheet lateral

## Anatomy
```
<Dialog>                        → Root (estado open/close)
  <DialogTrigger>               → Elemento que abre el dialog
  <DialogContent>               → Overlay + panel centrado z-50
    <DialogClose>               → X button (top-right, automático)
    <DialogHeader>
      <DialogTitle>             → text-lg font-semibold — requerido
      <DialogDescription>      → text-sm text-muted-foreground
    </DialogHeader>
    {/* contenido */}
    <DialogFooter>              → flex justify-end gap-2
      <DialogClose asChild>
        <Button variant="outline">Cancelar</Button>
      </DialogClose>
      <Button>Confirmar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Tokens usados
| Propiedad | Token |
|-----------|-------|
| Overlay | `bg-black/80` |
| Fondo panel | `--background` |
| Borde panel | `--border` |
| Fondo botón close (data-open) | `--accent` |
| Texto botón close (data-open) | `--muted-foreground` |
| Focus ring | `--ring` |
| Border radius | `sm:rounded-lg` |
| Max width | `max-w-lg` (512px) |
| Padding | `p-6` |

## Estados de animación
Usa Tailwind `animate-in` / `animate-out` con data-attributes de Radix:
- Entrada: `fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%]`
- Salida: `fade-out-0 zoom-out-95 slide-out-to-left-1/2 slide-out-to-top-[48%]`
- Duración: `duration-200` (`--duration-base`)

## Code example

```tsx
// ✅ Correcto
<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Editar perfil</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Editar perfil</DialogTitle>
      <DialogDescription>
        Actualiza tu información. Los cambios se guardan automáticamente.
      </DialogDescription>
    </DialogHeader>
    <div className="flex flex-col gap-4 py-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Nombre</Label>
        <Input id="name" defaultValue="José" />
      </div>
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancelar</Button>
      </DialogClose>
      <Button type="submit">Guardar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// ❌ Incorrecto
<Dialog>
  <DialogContent className="max-w-[90vw]">  {/* demasiado ancho */}
  <DialogContent style={{ backgroundColor: '#fff' }}> {/* hardcoded */}
```

## Accesibilidad
- `DialogTitle` es **obligatorio** — si no quieres mostrarlo visualmente, usar `<span className="sr-only">`
- `DialogDescription` es recomendado para dar contexto al screen reader
- El foco se atrapa automáticamente dentro del dialog (Radix)
- `Escape` cierra el dialog automáticamente
- Al cerrar, el foco regresa al trigger

## Cross-references
- `AlertDialog` — para confirmaciones simples de una sola acción (Radix separa estos casos)
- `Sheet` — cuando el contenido es muy largo o debe mantenerse visible al costado
- `Button` — siempre `asChild` en `DialogClose` para mantener los estilos del botón
