#!/usr/bin/env node
// scripts/token-audit.js — Dusty DS Token Audit

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const VIOLATIONS = {
  errors: [],
  warnings: []
}

// Patrones a detectar
const PATTERNS = [
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
    suggest: 'Usar clase Tailwind: rounded-sm | rounded-md | rounded-lg | rounded-xl | rounded-full'
  },
  {
    pattern: /border-radius\s*:\s*[\d.]+rem/g,
    type: 'error',
    message: 'border-radius hardcodeado en rem',
    suggest: 'Usar clase Tailwind: rounded-md, o var(--radius) en CSS custom'
  },
  {
    pattern: /className=["'][^"']*rounded-\[[\d.]+(?:px|rem)[^\]]*\][^"']*["']/g,
    type: 'error',
    message: 'Border-radius arbitrario en Tailwind',
    suggest: 'Usar: rounded-sm | rounded-md | rounded-lg | rounded-xl | rounded-full'
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
    pattern: /(?:transition|animation)[^;]*\b(?:0\.\d+s|\d+00ms|\d{3,}ms)\b(?![^;]*var\(--duration)/g,
    type: 'warning',
    message: 'Duración de transición hardcodeada',
    suggest: 'Usar token: var(--duration-fast) | var(--duration-base) | var(--duration-slow)'
  },
  {
    pattern: /strokeWidth=\{(?!1\.5\})[^}]+\}/g,
    type: 'warning',
    message: 'strokeWidth de Lucide no es 1.5',
    suggest: 'Lucide usa strokeWidth={1.5} como default — no sobreescribir salvo necesidad explícita'
  },
  {
    pattern: /style=\{\{[^}]*(?:padding|margin|gap)\s*:\s*["']?[\d.]+px/g,
    type: 'warning',
    message: 'Espaciado en px en inline style',
    suggest: 'Usar clase Tailwind de espaciado: p-4, m-6, gap-2, etc. (escala de 4px)'
  }
]

// Directorios a ignorar
const IGNORE = [
  'node_modules',
  '.git',
  'dist',
  '.storybook',
  'storybook-static',
  'coverage',
  'stories'  // boilerplate de Storybook, no son componentes del DS
]

// Archivos que pueden contener valores primitivos oklch (fuente de verdad de tokens)
const TOKEN_SOURCE_FILES = [
  'index.css'
]

// Escanear un archivo
function scanFile(filePath) {
  let content
  try {
    content = fs.readFileSync(filePath, 'utf8')
  } catch {
    return
  }

  const lines = content.split('\n')

  lines.forEach((line, index) => {
    const trimmed = line.trim()
    // Ignorar comentarios e imports de fuentes
    if (
      trimmed.startsWith('//') ||
      trimmed.startsWith('*') ||
      trimmed.startsWith('/*') ||
      trimmed.includes('@import') ||
      trimmed.includes('fontsource')
    ) {
      return
    }

    const isTokenSource = TOKEN_SOURCE_FILES.some(f => filePath.endsWith(f))

    PATTERNS.forEach(({ pattern, type, message, suggest }) => {
      // src/index.css es la fuente de verdad de tokens — permitir oklch allí
      if (isTokenSource && message.includes('oklch')) return

      pattern.lastIndex = 0
      const matches = line.match(pattern)
      if (matches) {
        const bucket = type === 'error' ? 'errors' : 'warnings'
        VIOLATIONS[bucket].push({
          file: filePath.replace(process.cwd() + path.sep, ''),
          line: index + 1,
          value: matches[0].slice(0, 80),
          message,
          suggest
        })
      }
    })
  })
}

// Recorrer directorio recursivamente
function walk(dir) {
  const files = []
  try {
    fs.readdirSync(dir).forEach(file => {
      if (IGNORE.some(ig => file === ig)) return
      const full = path.join(dir, file)
      if (fs.statSync(full).isDirectory()) {
        files.push(...walk(full))
      } else if (/\.(tsx?|css)$/.test(file)) {
        files.push(full)
      }
    })
  } catch {
    // ignorar dirs sin acceso
  }
  return files
}

function audit() {
  const srcDir = path.join(process.cwd(), 'src')

  if (!fs.existsSync(srcDir)) {
    console.error('❌ No se encontró el directorio src/. Ejecuta desde la raíz del proyecto.')
    process.exit(1)
  }

  const files = walk(srcDir)
  files.forEach(scanFile)

  const hasErrors = VIOLATIONS.errors.length > 0
  const hasWarnings = VIOLATIONS.warnings.length > 0

  console.log('\n🔍 DUSTY TOKEN AUDIT\n')
  console.log(`Archivos escaneados: ${files.length}`)
  console.log(`Errores:  ${VIOLATIONS.errors.length}`)
  console.log(`Warnings: ${VIOLATIONS.warnings.length}\n`)

  if (hasErrors) {
    console.log('❌ ERRORES (deben corregirse antes del merge):\n')
    VIOLATIONS.errors.forEach(v => {
      console.log(`  📄 ${v.file}:${v.line}`)
      console.log(`     Encontrado: ${v.value}`)
      console.log(`     Problema:   ${v.message}`)
      console.log(`     Solución:   ${v.suggest}\n`)
    })
  }

  if (hasWarnings) {
    console.log('⚠️  WARNINGS (revisar pero no bloquean CI):\n')
    VIOLATIONS.warnings.forEach(v => {
      console.log(`  📄 ${v.file}:${v.line}`)
      console.log(`     Problema:   ${v.message}`)
      console.log(`     Solución:   ${v.suggest}\n`)
    })
  }

  if (!hasErrors && !hasWarnings) {
    console.log('✅ Sin violaciones de tokens. El DS está limpio.\n')
  } else if (!hasErrors) {
    console.log('✅ Sin errores críticos. Revisa los warnings antes de hacer merge.\n')
  }

  process.exit(hasErrors ? 1 : 0)
}

audit()
