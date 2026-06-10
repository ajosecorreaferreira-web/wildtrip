# brand-personality.md — Personalidad de Marca Wildtrip

**Versión:** 1.0
**Producto:** Wildtrip — Gestión de viajes corporativos para Jungle
**Fecha:** Junio 2026

---

## El arquetipo de Wildtrip

**Arquetipo primario:** El Explorador
**Arquetipo secundario:** El Forajido
**Toque:** El Creador

**En una frase:** La app de viajes que no parece una app de viajes corporativos.

Wildtrip existe para que los consultores de Jungle puedan ir a Coruña a hacer un test de usuario sin perder dos horas gestionando el viaje. Es invisible cuando funciona, rápida cuando no.

---

## Las 8 dimensiones de Wildtrip

### 1. FORMA
**Decisión:** 12px en componentes principales + pill (999px) en badges, chips y tags

Coherente con la web de Jungle (botones pill) pero con más estructura que una web corporativa. Las formas redondeadas comunican accesibilidad sin infantilizar. Los pill en estados y etiquetas dan carácter.

```
Cards, inputs, botones principales: 12px
Badges de estado (Aprobado, Pendiente): pill
Chips de categoría de gasto: pill
Modales y sheets: 16-24px
```

### 2. COLOR
**Primario:** Azul marino Jungle `oklch(0.20 0.10 264)` — `#0D1F4E`
**Accent:** Verde selva `oklch(0.55 0.18 162)` — el toque Explorador/Jungle

El azul marino da autoridad y coherencia con la marca madre. El verde accent es el momento de vida — aparece en acciones de éxito, estados activos, focus rings. No es decorativo: tiene un propósito.

En dark mode, el verde pasa a ser el primario — la inversión es intencionada y diferenciadora.

### 3. TIPOGRAFÍA
**Display:** DM Serif Display — solo en titulares grandes, onboarding, estados vacíos inspiradores
**UI:** Plus Jakarta Sans Variable — todo lo demás

El contraste serif/sans hereda el espíritu editorial de wejungle.com. La serif aparece con moderación — en los momentos en los que la app respira, no en los flujos de tarea.

### 4. ESPACIADO Y DENSIDAD
**Densidad:** Media — mobile-first

Los consultores usan Wildtrip en movimiento. El espaciado tiene que ser generoso para el pulgar, pero no derrochar espacio — la información tiene que estar visible sin scroll excesivo.

Altura de elementos interactivos: 44px mínimo (área táctil WCAG).

### 5. ICONOGRAFÍA
**Librería:** Lucide React
**Stroke:** 1.5px
**Tamaño default:** 20px (más grande que el estándar de 16px — mejor en mobile)

### 6. SOMBRAS
Sombras con tinte azul marino — propias de Wildtrip, no genéricas. Comunican profundidad sin peso visual.

En momentos de éxito: glow verde `--glow-accent`.

### 7. MOTION
**Base:** Rápido y eficiente — duraciones 100-300ms, ease funcional
**Momentos especiales:** Spring y bounce — cuando se aprueba un viaje, cuando se cierra una nota de gastos, cuando todo cuadra

El motion cotidiano es invisible. El motion de celebración es memorable.

### 8. VOZ Y TONO
Ver `docs/voice.md`

---

## Lo que Wildtrip NO es

- No es Concur. No es SAP Concur. No es Expensify.
- No tiene pantallas que parezcan de 2015.
- No tiene formularios de 12 campos para subir un ticket de 8€.
- No habla como un departamento de finanzas.
- No usa jerga corporativa.
- No trata al consultor como si fuera un empleado de administración.

---

## Lo que Wildtrip SÍ es

- La herramienta que el equipo de Jungle se merece.
- Rápida como un vuelo de ida.
- Clara como un presupuesto cerrado.
- Con personalidad propia dentro del ecosistema Jungle.
