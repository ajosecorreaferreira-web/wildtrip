# WILDTRIP — CLAUDE.md

> Fuente de verdad para Claude Code. Lee este archivo antes de tocar cualquier componente.
> Producto: Wildtrip — Gestión de viajes corporativos para el grupo Jungle
> Arquetipo: Explorador + Forajido + toque Creador

---

## Stack

- **Framework:** React + Vite + TypeScript
- **Estilos:** Tailwind CSS v4 + shadcn/ui
- **Fuentes:** DM Serif Display + Plus Jakarta Sans Variable
- **Color model:** oklch
- **Iconos:** Lucide React (size=20, strokeWidth=1.5, currentColor)
- **Animaciones:** CSS custom + tw-animate-css

---

## Personalidad de marca

**Wildtrip NO es Concur. NO es SAP. NO es una app corporativa gris.**

Es una herramienta de viajes corporativos para creativos, diseñadores, estrategas y tecnólogos del grupo Jungle. Tiene que sentirse como una app que alguien de Jungle diseñó para sí mismo.

**Regla de oro:** Antes de cualquier decisión de diseño, pregunta: ¿Lo haría Concur? Si sí → reconsidera.

---

## Tokens de color

Todos los colores en `src/index.css`. **Nunca uses hex, rgb ni valores arbitrarios.**

| Token | Uso |
|-------|-----|
| `--background` | Fondo de página (blanco azulado) |
| `--foreground` | Texto principal (azul marino oscuro) |
| `--primary` | Azul marino Jungle — acciones principales |
| `--accent` | Verde selva — éxito, estados activos, focus |
| `--accent-soft` | Verde muy suave — fondos de badges de éxito |
| `--muted-foreground` | Texto secundario, metadata, captions |
| `--destructive` | Errores, rechazos, acciones irreversibles |
| `--success` | Confirmaciones, aprobaciones |
| `--warning` | Presupuesto casi agotado, advertencias |
| `--sidebar` | Azul marino — sidebar desktop siempre oscura |

**En dark mode:** `--primary` cambia a verde. `--accent` también. No hardcodear ninguno.

---

## Border radius

| Uso | Clase Tailwind | Valor |
|-----|---------------|-------|
| Badges, chips, tags de estado | `rounded-full` | 999px — PILL |
| Botones, inputs, cards pequeñas | `rounded-xl` | 12px |
| Cards grandes, paneles | `rounded-2xl` | 16px |
| Modales, sheets | `rounded-3xl` | 24px |
| Avatars | `rounded-full` | 50% |

**Nunca** `rounded-none` ni `rounded-sm` en Wildtrip — rompe con la personalidad.

---

## Tipografía

```tsx
/* Display — solo en titulares >= 24px */
<h1 className="font-display text-4xl font-normal leading-tight tracking-tight">
  Tu viaje a Barcelona
</h1>

/* UI — todo lo demás */
<p className="font-sans text-base font-normal">
  Pendiente de aprobación
</p>

/* Label de estado */
<span className="font-sans text-xs font-semibold uppercase tracking-widest">
  Aprobado
</span>
```

**Regla:** `font-display` solo si `text-2xl` o mayor. Nunca en labels, badges, mensajes de error ni formularios.

---

## Reglas y convenciones

- Solo tokens CSS para colores — nunca `text-gray-500`, `bg-zinc-900` ni hex directos
- Dark mode via clase `.dark` en el html
- Iconos: `lucide-react`, `size={20}`, `currentColor` — nunca color o strokeWidth custom
- Componentes en PascalCase, un componente por archivo
- Props tipadas con TypeScript `interface`, no `type`
- Usa `cn()` de `lib/utils` para clases condicionales
- No inline styles salvo valores dinámicos imposibles en Tailwind
- No crear tokens de color sin añadirlos antes en `src/index.css`
- No modificar archivos en `src/components/ui/` directamente

---

## Alturas de componentes interactivos

```
Botones mobile:  min 44px (área táctil WCAG)
Botones desktop: 40px base, 48px large
Inputs:          44px siempre (mobile-first)
Badges:          24px (solo visual, el área táctil viene del padre)
```

---

## Motion — reglas

```
Cotidiano (hover, focus, transiciones):  100-300ms, ease funcional
Celebraciones (aprobado, nota cerrada):  450-650ms, ease-spring
NUNCA bounce en errores o rechazos
NUNCA más de 300ms en acciones de formulario
SIEMPRE respetar prefers-reduced-motion
```

---

## Voz — reglas para microcopy

```
✅ "Viaje aprobado."
✅ "Ticket añadido."
✅ "Algo falló. Inténtalo de nuevo."
✅ "Pendiente de Sara García."

❌ "Su solicitud ha sido procesada satisfactoriamente."
❌ "Ha ocurrido un error inesperado."
❌ "¡Enhorabuena! Has completado el proceso."
❌ "Estimado usuario."
```

Tuteo siempre. Crudo, directo, profesional. Sin corporativismo.

---

## Roles de usuario — impacto en componentes

```
VIAJERO:  ve sus viajes, sube tickets, crea notas de gastos
MANAGER:  ve solicitudes del equipo, aprueba/rechaza, ve presupuesto
ADMIN:    ve notas completas, exporta, verifica justificantes
RRHH:     gestiona política, ve límites de dietas
```

Los componentes de aprobación (`ApprovalCard`, botones Aprobar/Rechazar) solo se renderizan para el rol MANAGER. No mostrar UI que el usuario no puede usar.

---

## Grid y layout

- **Contenedor máximo:** 1280px (`max-w-7xl`)
- **Padding:** 32px desktop / 16px mobile
- **Columnas:** 12 desktop / 4 mobile
- **Gap:** 24px (`gap-6`)
- **Sidebar desktop:** 240px fija, azul marino oscuro

---

## Documentación extendida

- Producto → `docs/product.md`
- Voz y tono → `docs/voice.md`
- Personalidad de marca → `docs/brand-personality.md`
- Decisiones de diseño → `docs/design-decisions.md`
- Lista negra → `docs/dont-do.md`
- Motion → `docs/motion.md`
