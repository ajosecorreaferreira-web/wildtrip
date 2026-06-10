# Radius — Foundation

## Descripción
El border-radius es una de las dimensiones más características del arquetipo visual de un cliente. Se controla con un único token raíz (`--radius`) del cual se derivan todos los demás. **Nunca se usan valores numéricos directos.**

## Token raíz

```css
--radius: 0.375rem; /* 6px — valor por defecto del DS template */
```

Cambiar este valor en `src/index.css` afecta automáticamente a todo el sistema.

## Escala derivada

| Token CSS | Cálculo | Valor (default) | Clase Tailwind |
|-----------|---------|-----------------|----------------|
| `--radius-sm` | `calc(var(--radius) - 4px)` | 2px | `rounded-sm` |
| `--radius-md` | `var(--radius)` | 6px | `rounded-md` |
| `--radius-lg` | `calc(var(--radius) + 4px)` | 10px | `rounded-lg` |
| `--radius-xl` | `calc(var(--radius) + 8px)` | 14px | `rounded-xl` |

## Arquetipos de --radius por cliente

| Valor | Arquetipo | Personalidad |
|-------|-----------|--------------|
| `0px` | Geométrico / técnico | Preciso, serio, corporativo |
| `0.25rem` (4px) | Ligeramente redondeado | Profesional, moderno |
| `0.375rem` (6px) | **Default DS** | Neutral, versátil |
| `0.5rem` (8px) | Amigable | Accesible, friendly |
| `1rem` (16px) | Muy redondeado | Playful, consumer |
| `9999px` | Pill total | Ultra-friendly, apps móviles |

## Cuándo usar cada clase

| Clase | Cuándo |
|-------|--------|
| `rounded-sm` | Badges inline muy pequeños, tags de código, chips compactos |
| `rounded-md` | **Botones, inputs, selects, textareas, checkboxes** — todos los controles de form |
| `rounded-lg` | Cards, popovers, dropdowns, tooltips grandes, alert banners |
| `rounded-xl` | Sheets laterales, drawers, contenedores de onboarding |
| `rounded-full` | Avatares, badges circulares, píldoras de status, toggle switches |
| `rounded-none` | Separadores inline, tablas sin bordes redondeados |

## Excepciones permitidas
- `rounded-full` para avatares y badges píldora — siempre ha sido así
- `rounded-none` en `rounded-t-*` o `rounded-b-*` para elementos que se acoplan a otro (ej: tabs que se pegan a un card)
- `sm:rounded-lg` en DialogContent de Radix (responsive — en móvil sin radius)

## NUNCA hacer

```tsx
// ❌ Valor numérico hardcodeado
<div className="rounded-[8px]">
<div style={{ borderRadius: '8px' }}>
<div className="rounded-[0.5rem]">

// ✅ Siempre clase semántica
<div className="rounded-md">  // componentes de form
<div className="rounded-lg">  // cards y containers
<div className="rounded-full"> // avatares, píldoras
```

## Verificación rápida
Si estás a punto de escribir `rounded-[` o `border-radius:`, para y consulta esta tabla. El valor correcto siempre tiene clase semántica.
