# Typography — Foundation

## Descripción
Sistema tipográfico con Geist Variable como fuente base. Escala modular usando las utilidades de Tailwind. Nunca se hardcodean tamaños de fuente fuera de la escala.

## Fuentes del sistema

| Token | Fuente | Uso |
|-------|--------|-----|
| `--font-sans` | `'Geist Variable', system-ui, sans-serif` | Todo el texto de UI |
| `--font-mono` | `'Geist Mono Variable', monospace` | Código, tokens, datos técnicos, montos |
| `--font-heading` | `var(--font-sans)` | Headings (mismo por defecto) |

```tsx
// Tailwind mapea estos tokens:
font-sans    → var(--font-sans)
font-mono    → var(--font-mono)
```

## Escala de tamaños

| Clase | px | Peso recomendado | Cuándo usar |
|-------|----|------------------|-------------|
| `text-xs` | 12px | `font-medium` | Captions, labels de badge, metadatos, helper text |
| `text-sm` | 14px | `font-medium` | **UI base** — botones, labels de input, texto de componentes |
| `text-base` | 16px | `font-normal` | Body copy, párrafos, descripciones |
| `text-lg` | 18px | `font-medium` | Subtítulos de sección, lead paragraphs |
| `text-xl` | 20px | `font-semibold` | Headings pequeños, títulos de card menores |
| `text-2xl` | 24px | `font-semibold` | Títulos de card, headings de dialog |
| `text-3xl` | 30px | `font-bold` | Headings de página |
| `text-4xl` | 36px | `font-bold` | Hero headings |
| `text-5xl`+ | 48px+ | `font-bold` | Display / marketing |

## Pesos disponibles (Geist Variable)

| Clase | Valor | Uso |
|-------|-------|-----|
| `font-normal` | 400 | Body copy |
| `font-medium` | 500 | UI labels, botones, captions |
| `font-semibold` | 600 | Headings de componentes, énfasis |
| `font-bold` | 700 | Headings de página |

## Patrones de uso

### Heading de página
```tsx
<h1 className="text-3xl font-bold tracking-tight">Título</h1>
```

### Heading de card / sección
```tsx
<h2 className="text-2xl font-semibold leading-none tracking-tight">Sección</h2>
```

### Descripción / helper text
```tsx
<p className="text-sm text-muted-foreground">Texto secundario</p>
```

### Label de input
```tsx
<label className="text-sm font-medium">Campo</label>
```

### Caption / metadato
```tsx
<span className="text-xs text-muted-foreground">hace 5 min</span>
```

### Código / valor técnico
```tsx
<code className="font-mono text-sm">API_KEY=...</code>
```

## Line height

Tailwind usa line-heights relativos por defecto. Para UI compacta:
- `leading-none` — headings sin saltos de línea
- `leading-tight` — headings con 2+ líneas
- `leading-normal` — body copy
- `leading-relaxed` — texto de lectura larga

## NUNCA hacer

```tsx
// ❌ font-size hardcodeado
<p style={{ fontSize: '14px' }}>
<p className="text-[14px]">

// ❌ line-height hardcodeado
<p style={{ lineHeight: '1.5' }}>

// ❌ font-weight fuera de los disponibles
<p className="font-[450]">

// ✅ Siempre en la escala
<p className="text-sm leading-normal">
```

## Personalización por cliente
Cambiar `--font-sans`, `--font-mono`, `--font-heading` en `src/index.css`. Nunca cambiar la escala de tamaños.
