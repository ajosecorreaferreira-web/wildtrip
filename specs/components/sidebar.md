# Sidebar — Component Spec

## Metadata
- **Categoría:** Navigation / Layout
- **Estado:** Stable
- **Archivo:** `src/components/ui/sidebar.tsx`
- **Storybook:** Components/Sidebar

## Overview

### Cuándo usar
- Navegación principal de aplicaciones tipo dashboard
- Layouts con múltiples secciones que el usuario navega frecuentemente
- Herramientas con jerarquía clara de secciones

### Cuándo NO usar
- Sitios informativos / marketing → usar navbar horizontal
- Apps de 2-3 secciones → usar Tabs
- Contexto temporal (filtros, detalle) → usar Sheet lateral
- Móvil como layout base → en móvil el Sidebar se convierte en Sheet automáticamente

## Componentes exportados

| Componente | Rol |
|------------|-----|
| `SidebarProvider` | Context + estado open/collapsed, wrappea el layout |
| `Sidebar` | Contenedor principal con width variable |
| `SidebarHeader` | Zona superior (logo, branding) |
| `SidebarContent` | Zona scrollable central |
| `SidebarFooter` | Zona inferior (usuario, settings) |
| `SidebarGroup` | Agrupación lógica de items |
| `SidebarGroupLabel` | Título de grupo |
| `SidebarGroupContent` | Contenedor de items del grupo |
| `SidebarMenu` | `<ul>` de items de navegación |
| `SidebarMenuItem` | `<li>` individual |
| `SidebarMenuButton` | `<button>` o `<a>` de cada item — el elemento interactivo |
| `SidebarMenuAction` | Acción secundaria de un item (kebab menu) |
| `SidebarMenuSub` | Sub-menú anidado |
| `SidebarTrigger` | Toggle collapse/expand (usa `PanelLeft` icon) |
| `SidebarRail` | Área de arrastre para resize |
| `SidebarInset` | Contenedor del contenido principal (main) |

## Tokens usados
| Propiedad | Token |
|-----------|-------|
| Fondo sidebar | `--sidebar` |
| Texto sidebar | `--sidebar-foreground` |
| Item activo fondo | `--sidebar-primary` |
| Item activo texto | `--sidebar-primary-foreground` |
| Item hover fondo | `--sidebar-accent` |
| Item hover texto | `--sidebar-accent-foreground` |
| Borde sidebar | `--sidebar-border` |
| Focus ring | `--sidebar-ring` |

## Constantes de layout
```ts
SIDEBAR_WIDTH        = "16rem"  // 256px — expandida
SIDEBAR_WIDTH_MOBILE = "18rem"  // 288px — en Sheet móvil
SIDEBAR_WIDTH_ICON   = "3rem"   // 48px — colapsada (solo iconos)
SIDEBAR_KEYBOARD_SHORTCUT = "b" // Ctrl/Cmd + B para toggle
```

## Code example

```tsx
// ✅ Estructura correcta
<SidebarProvider>
  <Sidebar>
    <SidebarHeader>
      <div className="flex items-center gap-2 px-4 py-3">
        <Logo size={24} aria-hidden />
        <span className="font-semibold">Mi App</span>
      </div>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>General</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive>
                <a href="/dashboard">
                  <LayoutDashboard size={16} aria-hidden />
                  Dashboard
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/projects">
                  <FolderOpen size={16} aria-hidden />
                  Proyectos
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <User size={16} aria-hidden />
            Mi perfil
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>

  <SidebarInset>
    <main className="p-6">
      {/* contenido de la página */}
    </main>
  </SidebarInset>
</SidebarProvider>

// ❌ Incorrecto
<div className="w-64 bg-sidebar"> {/* usar el componente, no un div */}
<Sidebar style={{ width: '260px' }}> {/* no sobreescribir el width */}
```

## Comportamiento responsive
- **Desktop:** sidebar fija, colapsable a modo icon-only
- **Móvil:** sidebar se monta en un `Sheet` (drawer) automáticamente via `useIsMobile()`
- El trigger `SidebarTrigger` maneja ambos casos

## Accesibilidad
- `SidebarMenuButton` con `isActive` añade `aria-current="page"`
- Keyboard: `Ctrl+B` o `Cmd+B` hace toggle (configurable con `SIDEBAR_KEYBOARD_SHORTCUT`)
- Los iconos en items deben ser `aria-hidden` — el texto del label es el label accesible

## Cross-references
- `Sheet` — la sidebar en móvil usa Sheet internamente
- `Tooltip` — en modo colapsado, los SidebarMenuButton muestran Tooltip con el label
- `Button` — `SidebarTrigger` envuelve un `Button variant="ghost" size="icon"`
