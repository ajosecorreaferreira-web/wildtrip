# CLAUDE.md — DS Template

> ⚠️ Este es el template base del DS Generator de Dusty.
> Antes de usar Claude Code en este proyecto, completa los archivos de docs/
> usando el DS Generator: claude.ai → Project "DS Generator"

## Stack técnico
- React + Vite + TypeScript
- Tailwind CSS v4
- shadcn/ui (Radix UI base)
- Lucide React (stroke: currentColor, strokeWidth: 1.5)
- Geist Variable (tipografía default — cambiar según cliente)
- Storybook v10 con addon-a11y

## Estado del proyecto
- [ ] Archivos docs/ completados con DS Generator
- [ ] Tokens personalizados en src/index.css
- [ ] Componentes adicionales instalados
- [ ] Storybook configurado
- [ ] Deploy en Vercel

## Documentación
Lee siempre estos archivos antes de generar cualquier cosa:
- Producto → docs/product.md
- Voz → docs/voice.md
- Audiencia → docs/audience.md
- Decisiones → docs/design-decisions.md
- No hacer → docs/dont-do.md
- Personalidad → docs/brand-personality.md
- Motion → docs/motion.md
- Sonido → docs/sound.md
- Referencias → docs/references.md

## Filosofía
- Filosofía atómica — construir siempre sobre componentes del DS
- Sin colores hardcodeados — siempre tokens CSS
- Border-radius: usar --radius siempre
- Accesibilidad WCAG AA mínimo
- Iconos: Lucide, stroke: currentColor, strokeWidth: 1.5

## Reglas LLM-ready (metodología Hardik Pandya / Atlassian)

### Antes de escribir cualquier código:
1. Lee `specs/tokens/token-reference.md` — mapa de todos los tokens
2. Lee el spec del componente en `specs/components/[nombre].md`
3. Si el componente no tiene spec, créalo antes de implementarlo
4. Lee la foundation relevante en `specs/foundations/[foundation].md`

### Tokens — reglas absolutas:
- NUNCA valores hex directos (`#...`) — siempre `var(--token)`
- NUNCA valores `rgb()` / `rgba()` / `oklch()` en componentes — solo en `src/index.css`
- NUNCA border-radius numérico — siempre clase semántica Tailwind (`rounded-md`, `rounded-lg`, etc.)
- NUNCA colores en inline style — siempre `className` con token
- NUNCA `strokeWidth` en iconos Lucide — el default 1.5 es correcto
- NUNCA `font-size` en px — siempre `text-sm`, `text-base`, etc.
- NUNCA duraciones hardcodeadas — siempre `var(--duration-fast)`, `var(--duration-base)`, etc.

### Después de escribir código:
Ejecutar `npm run audit:tokens` para verificar que no hay violaciones.
CI falla con exit code 1 si hay errores de tokens.

### Specs disponibles
- **Foundations:** `specs/foundations/` → color, spacing, typography, radius, motion, sound
- **Tokens:** `specs/tokens/token-reference.md` → mapa maestro
- **Componentes:** `specs/components/` → button, input, card, badge, dialog, alert, select, textarea, sidebar, datatable
