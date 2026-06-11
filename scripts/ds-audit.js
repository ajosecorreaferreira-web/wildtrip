#!/usr/bin/env node
// scripts/ds-audit.js — Wildtrip DS Audit completo (5 dimensiones)

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ─── Estado global ────────────────────────────────────────────────────────────

const RESULTS = {
  errors: [],
  warnings: [],
  filesScanned: 0,
  dimensions: {
    tokens: { ok: true, label: 'Tokens: sin hardcoding' },
    atomic: { ok: true, label: 'Atómica: construido sobre shadcn' },
    a11y: { ok: true, label: 'Accesibilidad: imágenes con alt, botones con labels' },
    icons: { ok: true, label: 'Iconos: tamaños y atributos correctos' },
    motion: { ok: true, label: 'Motion: sin duraciones hardcodeadas' },
  }
}

function addError(dimension, file, line, message, suggest) {
  RESULTS.errors.push({ dimension, file, line, message, suggest })
  RESULTS.dimensions[dimension].ok = false
  RESULTS.dimensions[dimension].label = RESULTS.dimensions[dimension].label.replace(/^.*?: /, `${RESULTS.dimensions[dimension].label.split(':')[0]}: `)
}

function addWarning(dimension, file, line, message, suggest) {
  RESULTS.warnings.push({ dimension, file, line, message, suggest })
  if (RESULTS.dimensions[dimension].ok) {
    RESULTS.dimensions[dimension].ok = null // null = warning (no error)
  }
}

// ─── Utilidades ───────────────────────────────────────────────────────────────

const IGNORE = ['node_modules', '.git', 'dist', '.storybook', 'storybook-static', 'coverage', 'stories']
const TOKEN_SOURCE_FILES = ['index.css']
const ICON_SIZE_SCALE = new Set([12, 14, 16, 20, 24, 32, 48])

function walk(dir, exts = /\.(tsx?|css)$/) {
  const files = []
  try {
    fs.readdirSync(dir).forEach(file => {
      if (IGNORE.some(ig => file === ig)) return
      const full = path.join(dir, file)
      if (fs.statSync(full).isDirectory()) {
        files.push(...walk(full, exts))
      } else if (exts.test(file)) {
        files.push(full)
      }
    })
  } catch { /* dirs sin acceso */ }
  return files
}

function relPath(filePath) {
  return filePath.replace(process.cwd() + path.sep, '')
}

function readLines(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8').split('\n')
  } catch {
    return []
  }
}

function isComment(line) {
  const t = line.trim()
  return t.startsWith('//') || t.startsWith('*') || t.startsWith('/*') || t.startsWith('<!--')
}

// ─── Dimensión 1: TOKENS ──────────────────────────────────────────────────────
// Reutiliza los mismos patrones de token-audit.js

const TOKEN_PATTERNS = [
  {
    pattern: /#[0-9a-fA-F]{3,8}\b/g,
    type: 'error',
    message: 'Color hex hardcodeado',
    suggest: 'Usar token CSS: var(--primary), var(--foreground), var(--destructive), etc.'
  },
  {
    pattern: /\brgba?\s*\([^)]+\)/g,
    type: 'error',
    message: 'Color rgb/rgba hardcodeado',
    suggest: 'Usar token CSS con opacidad: bg-primary/80, text-foreground/50, etc.'
  },
  {
    pattern: /\boklch\s*\([^)]+\)/g,
    type: 'error',
    message: 'Color oklch directo en componente',
    suggest: 'Los valores oklch solo van en src/index.css como tokens. Usar var(--token) en componentes.'
  },
  {
    pattern: /border-radius\s*:\s*[\d.]+px/g,
    type: 'error',
    message: 'border-radius hardcodeado en px',
    suggest: 'Usar clase Tailwind: rounded-xl | rounded-2xl | rounded-3xl | rounded-full'
  },
  {
    pattern: /border-radius\s*:\s*[\d.]+rem/g,
    type: 'error',
    message: 'border-radius hardcodeado en rem',
    suggest: 'Usar clase Tailwind: rounded-xl o var(--radius) en CSS custom'
  },
  {
    pattern: /className=["'][^"']*rounded-\[[\d.]+(?:px|rem)[^\]]*\][^"']*["']/g,
    type: 'error',
    message: 'Border-radius arbitrario en Tailwind',
    suggest: 'Usar: rounded-xl | rounded-2xl | rounded-3xl | rounded-full'
  },
  {
    pattern: /style=\{\{[^}]*(?:color|background|backgroundColor)\s*:[^}]*["']#[0-9a-fA-F]/g,
    type: 'error',
    message: 'Color hex en inline style',
    suggest: 'Usar className con token Tailwind: bg-primary, text-foreground, etc.'
  },
  {
    pattern: /style=\{\{[^}]*(?:color|background|backgroundColor)\s*:[^}]*["'](?:rgb|oklch)/g,
    type: 'error',
    message: 'Color directo en inline style',
    suggest: 'Usar className con token Tailwind: bg-primary, text-foreground, etc.'
  },
  {
    pattern: /style=\{\{[^}]*(?:fontSize)\s*:\s*["']?[\d.]+px/g,
    type: 'error',
    message: 'font-size hardcodeado en px',
    suggest: 'Usar clase Tailwind: text-xs | text-sm | text-base | text-lg | text-xl | text-2xl...'
  },
  {
    pattern: /font-size\s*:\s*[\d.]+px/g,
    type: 'error',
    message: 'font-size hardcodeado en CSS',
    suggest: 'Usar clase Tailwind: text-xs | text-sm | text-base | text-lg | text-xl...'
  },
  {
    pattern: /style=\{\{[^}]*(?:padding|margin|gap)\s*:\s*["']?[\d.]+px/g,
    type: 'warning',
    message: 'Espaciado en px en inline style',
    suggest: 'Usar clase Tailwind: p-4, m-6, gap-2, etc. (escala de 4px)'
  }
]

function auditTokens(filePath, lines) {
  const isTokenSource = TOKEN_SOURCE_FILES.some(f => filePath.endsWith(f))
  const rel = relPath(filePath)

  lines.forEach((line, idx) => {
    if (isComment(line) || line.includes('@import') || line.includes('fontsource')) return

    TOKEN_PATTERNS.forEach(({ pattern, type, message, suggest }) => {
      if (isTokenSource && message.includes('oklch')) return
      pattern.lastIndex = 0
      const matches = line.match(pattern)
      if (matches) {
        const fn = type === 'error' ? addError : addWarning
        fn('tokens', rel, idx + 1, `${message} → ${matches[0].slice(0, 60)}`, suggest)
      }
    })
  })
}

// ─── Dimensión 2: FILOSOFÍA ATÓMICA ──────────────────────────────────────────

function auditAtomic(filePath, content) {
  // Solo aplica a componentes en src/components/wildtrip/ — no a ui/ (capa base), hooks, lib, ni entrypoints
  const normalized = filePath.replace(/\\/g, '/')
  if (!normalized.includes('/src/components/wildtrip/')) return

  // Excluir barrel exports
  const base = path.basename(filePath)
  if (base === 'index.ts' || base === 'index.tsx') return

  const rel = relPath(filePath)
  const hasUIImports = content.includes("from '@/components/ui/")
  const hasWildtripImports = content.includes("from '@/components/wildtrip/")

  if (!hasUIImports && !hasWildtripImports) {
    addWarning(
      'atomic',
      rel,
      null,
      'Componente sin imports del DS — posible violación atómica',
      "Construir sobre componentes base de @/components/ui/ o reutilizar @/components/wildtrip/"
    )
  }
}

// ─── Dimensión 3: ACCESIBILIDAD ───────────────────────────────────────────────

const A11Y_PATTERNS = [
  {
    // <img sin alt= (alt="" es válido, alt={...} también)
    pattern: /<img(?![^>]*\balt\s*=)[^>]*>/g,
    type: 'error',
    message: 'img sin alt — falla WCAG 1.1.1',
    suggest: 'Añadir alt="" si es decorativa, o alt="descripción" si es informativa'
  },
  {
    // onClick en <div sin role="button"
    pattern: /<div\b(?=[^>]*\bonClick\b)(?![^>]*\brole\s*=\s*["']button["'])[^>]*>/g,
    type: 'error',
    message: 'div con onClick sin role="button" — no accesible por teclado',
    suggest: 'Añadir role="button" tabIndex={0} onKeyDown handler, o usar <button> directamente'
  },
  {
    // onClick en <span sin role="button"
    pattern: /<span\b(?=[^>]*\bonClick\b)(?![^>]*\brole\s*=\s*["']button["'])[^>]*>/g,
    type: 'error',
    message: 'span con onClick sin role="button" — no accesible por teclado',
    suggest: 'Añadir role="button" tabIndex={0} onKeyDown handler, o usar <button> directamente'
  },
  {
    // Elemento interactivo con h-8 (32px) — menor al mínimo táctil
    pattern: /className="[^"]*\bh-8\b[^"]*"[^>]*(?:onClick|href)/g,
    type: 'warning',
    message: 'Elemento interactivo posiblemente menor a 44px táctil (h-8 = 32px)',
    suggest: 'Usar min-h-[44px] o h-11 en elementos táctiles (WCAG 2.5.5)'
  },
  {
    // Elemento interactivo con h-6 (24px)
    pattern: /className="[^"]*\bh-6\b[^"]*"[^>]*(?:onClick|href)/g,
    type: 'warning',
    message: 'Elemento interactivo posiblemente menor a 44px táctil (h-6 = 24px)',
    suggest: 'Usar min-h-[44px] o h-11 en elementos táctiles (WCAG 2.5.5)'
  }
]

// Detectar iconos Lucide sin aria-hidden cuando están solos (sin texto hermano visible)
// Patrón heurístico: <SomeIcon sin aria-hidden y dentro de un button sin aria-label
const ICON_A11Y_PATTERN = /<(?:button|Button)\b(?![^>]*\baria-label\b)(?![^>]*\baria-labelledby\b)[^>]*>\s*(?:\{[^}]+\}|\s)*<[A-Z][a-zA-Z]+Icon[^/]*/g

function auditA11y(filePath, content, lines) {
  const rel = relPath(filePath)

  // Escanear línea a línea para ubicación exacta
  lines.forEach((line, idx) => {
    if (isComment(line)) return

    A11Y_PATTERNS.forEach(({ pattern, type, message, suggest }) => {
      pattern.lastIndex = 0
      if (pattern.test(line)) {
        const fn = type === 'error' ? addError : addWarning
        fn('a11y', rel, idx + 1, message, suggest)
      }
    })
  })

  // Detectar botones icon-only sin aria-label (multi-línea, buscar en bloque de contenido)
  const iconOnlyButtonPattern = /<(?:button|Button)\b([^>]*)>([\s\S]{0,200}?)<\/(?:button|Button)>/g
  let match
  while ((match = iconOnlyButtonPattern.exec(content)) !== null) {
    const attrs = match[1]
    const inner = match[2]

    const hasAriaLabel = /\baria-label\b/.test(attrs)
    const hasAriaLabelledBy = /\baria-labelledby\b/.test(attrs)
    const hasTitle = /\btitle\b/.test(attrs)

    // Contenido visible: texto que no sean componentes o JSX
    const strippedInner = inner
      .replace(/<[^>]+>/g, '')  // quitar tags
      .replace(/\{[^}]+\}/g, '') // quitar expresiones JSX
      .trim()

    const isIconOnly = strippedInner.length === 0

    if (isIconOnly && !hasAriaLabel && !hasAriaLabelledBy && !hasTitle) {
      // Calcular línea aproximada del match
      const lineNum = content.slice(0, match.index).split('\n').length
      addWarning(
        'a11y',
        rel,
        lineNum,
        'Botón aparentemente icon-only sin aria-label',
        'Añadir aria-label="descripción de la acción" al elemento button'
      )
    }
  }
}

// ─── Dimensión 4: ICONOS LUCIDE ──────────────────────────────────────────────

function auditIcons(filePath, lines) {
  const rel = relPath(filePath)

  lines.forEach((line, idx) => {
    if (isComment(line)) return

    // strokeWidth distinto de 1.5
    const strokePattern = /strokeWidth=\{(?!1\.5\})[^}]+\}/g
    strokePattern.lastIndex = 0
    if (strokePattern.test(line)) {
      addWarning(
        'icons',
        rel,
        idx + 1,
        `strokeWidth de Lucide no es 1.5 → ${line.match(/strokeWidth=\{[^}]+\}/)?.shift()?.slice(0, 40)}`,
        'Usar strokeWidth={1.5} (default del DS) — no sobreescribir salvo necesidad explícita documentada'
      )
    }

    // Tamaños fuera de escala
    const sizePattern = /\bsize=\{(\d+)\}/g
    let sizeMatch
    while ((sizeMatch = sizePattern.exec(line)) !== null) {
      const sz = parseInt(sizeMatch[1], 10)
      if (!ICON_SIZE_SCALE.has(sz)) {
        addWarning(
          'icons',
          rel,
          idx + 1,
          `Tamaño de icono fuera de escala DS: size={${sz}}`,
          `Usar tamaños válidos: ${[...ICON_SIZE_SCALE].join(', ')}px`
        )
      }
    }

    // Color hardcodeado en icono (color="..." o fill="..." que no sea currentColor/none/transparent)
    const colorPattern = /(?:color|fill)=["'](?!currentColor|none|transparent|inherit)[^"']+["']/g
    colorPattern.lastIndex = 0
    const colorMatch = line.match(colorPattern)
    if (colorMatch && /<[A-Z][a-zA-Z]+\s/.test(line)) {
      addError(
        'icons',
        rel,
        idx + 1,
        `Color hardcodeado en icono → ${colorMatch[0].slice(0, 50)}`,
        'Usar currentColor — el icono hereda el color del texto padre'
      )
    }

    // Iconos decorativos sin aria-hidden (heurístico: icon dentro de botón con texto visible)
    // Solo detectar aria-hidden={false} explícito en iconos donde no debería
    const ariaHiddenFalse = /aria-hidden=\{false\}/g
    ariaHiddenFalse.lastIndex = 0
    if (ariaHiddenFalse.test(line) && /<[A-Z][a-zA-Z]+Icon/.test(line)) {
      addWarning(
        'icons',
        rel,
        idx + 1,
        'Icono con aria-hidden={false} explícito — los iconos decorativos deben ser aria-hidden={true}',
        'Si el icono es decorativo usar aria-hidden={true}; si es informativo añadir un <span className="sr-only"> con descripción'
      )
    }
  })
}

// ─── Dimensión 5: MOTION ─────────────────────────────────────────────────────

const MOTION_PATTERNS = [
  {
    // Duraciones CSS hardcodeadas en propiedades transition/animation (no tokens)
    pattern: /(?:transition|animation)[^;{]*\b(?:0\.\d+s|\d+(?:\.\d+)?s|\d{2,}ms)\b(?![^;]*var\(--duration)/g,
    type: 'warning',
    message: 'Duración de transición hardcodeada en CSS',
    suggest: 'Usar token: var(--duration-fast) | var(--duration-base) | var(--duration-slow)'
  },
  {
    // Tailwind duration-[Xms] arbitrario
    pattern: /duration-\[\d+ms\]/g,
    type: 'warning',
    message: 'duration-[Xms] arbitrario en Tailwind className',
    suggest: 'Usar tokens de duración del DS o clases Tailwind estándar: duration-100, duration-200, duration-300'
  },
  {
    // delay-[Xms] arbitrario
    pattern: /delay-\[\d+ms\]/g,
    type: 'warning',
    message: 'delay-[Xms] arbitrario en Tailwind className',
    suggest: 'Usar delay estándar de Tailwind o coordinar con el equipo si se necesita un nuevo token'
  },
  {
    // Animaciones con bounce en contextos de error/rechazo (keyword detection)
    pattern: /bounce[^)'"]*(?:error|reject|fail|deni)/gi,
    type: 'warning',
    message: 'Animación bounce en contexto de error/rechazo',
    suggest: 'DS prohíbe bounce en errores — usar ease funcional o sin animación'
  }
]

function auditMotion(filePath, lines) {
  const rel = relPath(filePath)

  lines.forEach((line, idx) => {
    if (isComment(line)) return

    MOTION_PATTERNS.forEach(({ pattern, type, message, suggest }) => {
      pattern.lastIndex = 0
      const matches = line.match(pattern)
      if (matches) {
        const fn = type === 'error' ? addError : addWarning
        fn('motion', rel, idx + 1, `${message} → ${matches[0].slice(0, 60)}`, suggest)
      }
    })
  })
}

// ─── RUNNER PRINCIPAL ─────────────────────────────────────────────────────────

function auditFile(filePath) {
  const lines = readLines(filePath)
  if (!lines.length) return

  const content = lines.join('\n')
  const isTokenSource = TOKEN_SOURCE_FILES.some(f => filePath.endsWith(f))

  // Tokens — todos los archivos excepto fuente de tokens para oklch
  auditTokens(filePath, lines)

  // Las siguientes dimensiones solo aplican a archivos TSX/TS (no CSS)
  if (!/\.(tsx?)$/.test(filePath)) return

  // Atómica — solo componentes wildtrip
  auditAtomic(filePath, content)

  // Accesibilidad
  auditA11y(filePath, content, lines)

  // Iconos
  auditIcons(filePath, lines)

  // Motion
  auditMotion(filePath, lines)
}

function run() {
  const srcDir = path.join(process.cwd(), 'src')

  if (!fs.existsSync(srcDir)) {
    console.error('❌ No se encontró el directorio src/. Ejecuta desde la raíz del proyecto.')
    process.exit(1)
  }

  const files = walk(srcDir)
  RESULTS.filesScanned = files.length
  files.forEach(auditFile)

  // ─── Reporte ────────────────────────────────────────────────────────────────

  const errors = RESULTS.errors
  const warnings = RESULTS.warnings

  console.log('\n🔍 WILDTRIP DS AUDIT — REPORTE COMPLETO\n')

  console.log('📊 RESUMEN')
  console.log(`  Archivos escaneados: ${RESULTS.filesScanned}`)
  console.log(`  ❌ Errores críticos: ${errors.length}`)
  console.log(`  ⚠️  Warnings:        ${warnings.length}`)
  console.log(`  ✅ Dimensiones auditadas: 5\n`)

  if (errors.length > 0) {
    console.log('❌ ERRORES CRÍTICOS (bloquean CI)\n')
    errors.forEach(v => {
      const loc = v.line ? `:${v.line}` : ''
      console.log(`  [${v.dimension}] ${v.file}${loc}`)
      console.log(`  → ${v.message}`)
      console.log(`  → Solución: ${v.suggest}\n`)
    })
  }

  if (warnings.length > 0) {
    console.log('⚠️  WARNINGS (revisar antes del merge)\n')
    warnings.forEach(v => {
      const loc = v.line ? `:${v.line}` : ''
      console.log(`  [${v.dimension}] ${v.file}${loc}`)
      console.log(`  → ${v.message}`)
      console.log(`  → Solución: ${v.suggest}\n`)
    })
  }

  // Dimensiones
  console.log('📋 DIMENSIONES')
  const dimEntries = Object.entries(RESULTS.dimensions)
  dimEntries.forEach(([, dim]) => {
    const hasErrors = errors.some(e => e.dimension === dim.label.split(':')[0].toLowerCase())
    // Buscar por clave
  })

  Object.entries(RESULTS.dimensions).forEach(([key, dim]) => {
    const dimErrors = errors.filter(e => e.dimension === key)
    const dimWarnings = warnings.filter(w => w.dimension === key)
    if (dimErrors.length > 0) {
      console.log(`  ❌ ${dim.label.split(':').slice(1).join(':').trim()} — ${dimErrors.length} error(es)`)
    } else if (dimWarnings.length > 0) {
      console.log(`  ⚠️  ${dim.label.split(':').slice(1).join(':').trim()} — ${dimWarnings.length} warning(s)`)
    } else {
      const label = dim.label.split(':').slice(1).join(':').trim()
      console.log(`  ✅ ${label}`)
    }
  })

  console.log('')

  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ Sin violaciones. El DS está limpio.\n')
  } else if (errors.length === 0) {
    console.log('✅ Sin errores críticos. Revisa los warnings antes del merge.\n')
  }

  process.exit(errors.length > 0 ? 1 : 0)
}

run()
