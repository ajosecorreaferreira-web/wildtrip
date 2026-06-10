# DataTable — Component Spec

## Metadata
- **Categoría:** Data Display
- **Estado:** Pattern (no es un componente único, es una composición)
- **Archivos:** `src/components/ui/table.tsx` + patrón de implementación
- **Storybook:** Components/DataTable

## Overview

### Cuándo usar
- Mostrar colecciones de datos estructurados (usuarios, pedidos, productos)
- Cuando el usuario necesita comparar datos entre filas
- Cuando hay acciones por fila (editar, eliminar, ver detalle)
- Cuando se necesita ordenar, filtrar o paginar datos

### Cuándo NO usar
- Listas simples sin columnas múltiples → usar `<ul>` con cards
- 2-3 items sin interacción → usar Card con lista simple
- Datos de configuración key-value → usar una lista de descripción
- Datos que se leen de izquierda a derecha en flujo → usar Card

## Anatomy (componentes del DS)
```
<div className="relative w-full overflow-auto">   ← wrapper scrollable
  <Table>                                          ← <table> w-full text-sm
    <TableHeader>                                  ← <thead>
      <TableRow>                                   ← <tr> con border-b
        <TableHead>                                ← <th> h-12 px-4, text-muted-foreground
      </TableRow>
    </TableHeader>
    <TableBody>                                    ← <tbody>
      <TableRow>                                   ← <tr> hover:bg-muted/50
        <TableCell>                                ← <td> p-4
      </TableRow>
    </TableBody>
    <TableFooter>                                  ← <tfoot> bg-muted/50
    <TableCaption>                                 ← <caption> text-muted-foreground
  </Table>
</div>
```

## Tokens usados
| Elemento | Token |
|----------|-------|
| Header texto | `--muted-foreground` |
| Header height | `h-12` (48px) |
| Row hover | `--muted/50` |
| Row selected | `--muted` |
| Cell padding | `p-4` (16px) |
| Footer fondo | `--muted/50` |
| Border (rows) | `--border` via `border-b` |
| Font size | `text-sm` |

## Patrón de DataTable completa

```tsx
// Estructura recomendada para tablas con funcionalidad
interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
}

// Barra de herramientas sobre la tabla
<div className="flex items-center justify-between gap-4 py-4">
  <Input
    placeholder="Filtrar..."
    className="max-w-sm"
  />
  <Button variant="outline" size="sm">
    <Download size={16} aria-hidden />
    Exportar
  </Button>
</div>

// Tabla
<div className="rounded-md border">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[40px]">
          <Checkbox aria-label="Seleccionar todos" />
        </TableHead>
        <TableHead>Nombre</TableHead>
        <TableHead>Estado</TableHead>
        <TableHead className="text-right">Acciones</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map(row => (
        <TableRow key={row.id} data-state={selected ? 'selected' : undefined}>
          <TableCell>
            <Checkbox aria-label={`Seleccionar ${row.name}`} />
          </TableCell>
          <TableCell className="font-medium">{row.name}</TableCell>
          <TableCell>
            <Badge variant="secondary">{row.status}</Badge>
          </TableCell>
          <TableCell className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal size={16} aria-hidden />
                  <span className="sr-only">Acciones</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Editar</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>

// Paginación
<div className="flex items-center justify-between py-4">
  <p className="text-sm text-muted-foreground">
    Mostrando 1-10 de 100 resultados
  </p>
  <div className="flex gap-2">
    <Button variant="outline" size="sm" disabled>Anterior</Button>
    <Button variant="outline" size="sm">Siguiente</Button>
  </div>
</div>
```

## Accesibilidad
- `<Table>` usa elementos HTML semánticos nativos (thead, tbody, th, td)
- `<th>` implica `scope="col"` — añadir explícitamente para tablas complejas
- Checkboxes de fila necesitan `aria-label` descriptivo
- Acciones con `DropdownMenu` necesitan `<span className="sr-only">` en el trigger
- Para tablas ordenables: `aria-sort="ascending"` / `"descending"` en `TableHead`
- Tabla en contenedor scrollable: añadir `role="region"` y `aria-label` al wrapper

## Cross-references
- `Badge` — estados de entidad en columnas
- `Checkbox` — selección múltiple de filas
- `DropdownMenu` — acciones por fila
- `Button` — paginación y acciones de toolbar
- `Input` — filtro de búsqueda
