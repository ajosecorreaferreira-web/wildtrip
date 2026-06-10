# Card — Component Spec

## Metadata
- **Categoría:** Layout / Container
- **Estado:** Stable
- **Archivo:** `src/components/ui/card.tsx`
- **Storybook:** Components/Card

## Overview

### Cuándo usar
- Agrupar información relacionada en una unidad visual
- Mostrar entidades (usuario, producto, proyecto, tarea)
- Secciones de formulario
- Paneles de configuración o detalle
- Items de un grid o lista de contenido

### Cuándo NO usar
- Como wrapper de toda la página (usar layout directo)
- Cartas anidadas — máximo 1 nivel de profundidad
- Para mostrar una sola línea de texto (usar un `<p>` o una `<li>`)
- Como botón o elemento interactivo principal (usar `asChild` solo cuando sea necesario)

## Anatomy
```
<Card>                    → <div> root: borde + rounded-lg + bg-card
  <CardHeader>            → espacio p-6 con flex-col gap-1.5
    <CardTitle>           → text-2xl font-semibold tracking-tight
    <CardDescription>    → text-sm text-muted-foreground
  </CardHeader>
  <CardContent>           → p-6 pt-0
  <CardFooter>            → flex items-center p-6 pt-0
</Card>
```

## Tokens usados
| Propiedad | Token |
|-----------|-------|
| Fondo | `--card` |
| Texto | `--card-foreground` |
| Borde | `--border` |
| Border radius | `rounded-lg` → `calc(--radius + 4px)` |
| Sombra | `shadow-sm` → `none` (usar borde) |
| Header padding | `p-6` (24px) |
| Content padding | `p-6 pt-0` |
| Footer padding | `p-6 pt-0` |

## Composición

### Card básica
```tsx
<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descripción opcional</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Contenido principal</p>
  </CardContent>
</Card>
```

### Card con footer (acciones)
```tsx
<Card>
  <CardHeader>
    <CardTitle>Configuración de cuenta</CardTitle>
  </CardHeader>
  <CardContent>
    {/* formulario */}
  </CardContent>
  <CardFooter className="justify-end gap-2">
    <Button variant="outline">Cancelar</Button>
    <Button>Guardar</Button>
  </CardFooter>
</Card>
```

### Card interactiva (clickeable)
```tsx
<Card className="cursor-pointer transition-colors hover:bg-accent">
  <CardContent className="p-4">
    {/* contenido */}
  </CardContent>
</Card>
```

## Code example

```tsx
// ✅ Correcto
<Card>
  <CardHeader>
    <CardTitle>Plan Pro</CardTitle>
    <CardDescription>Para equipos que necesitan más</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-3xl font-bold">$29<span className="text-sm font-normal text-muted-foreground">/mes</span></p>
  </CardContent>
  <CardFooter>
    <Button className="w-full">Elegir Plan Pro</Button>
  </CardFooter>
</Card>

// ❌ Incorrecto
<Card style={{ backgroundColor: '#fff', borderRadius: '12px' }}>
<Card className="rounded-[12px]">
<Card>
  <Card>  {/* nunca anidar cards */}
  </Card>
</Card>
```

## Cross-references
- `Badge` — para estados de la card (activo, nuevo, etc.)
- `Separator` — para dividir secciones dentro de CardContent
- `Button` — en CardFooter para acciones
