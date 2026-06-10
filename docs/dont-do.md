# dont-do.md — Lo que NO hacer en Wildtrip

**Versión:** 1.0
**Producto:** Wildtrip — Gestión de viajes corporativos para Jungle
**Fecha:** Junio 2026

---

## Universales — nunca en ningún DS

❌ Colores hardcodeados — siempre `var(--token)`
❌ Border-radius hardcodeado — siempre `var(--radius)`
❌ Iconos con color o stroke hardcodeado — siempre `currentColor` y stroke 1.5
❌ Animar `width`, `height`, `top`, `left` — siempre `transform` y `opacity`
❌ Ignorar `prefers-reduced-motion`
❌ Elementos interactivos sin estado de focus visible
❌ Ratio de contraste menor a 4.5:1 para texto normal
❌ Botones icon-only sin `aria-label` o Tooltip

---

## Específico de Wildtrip

### Comunicación — nunca

❌ **Jerga corporativa de viajes y gastos**
Nunca: "justificante fiscal", "diligenciar el gasto", "nota de gasto debidamente cumplimentada", "importe devengado", "en virtud de la política vigente".

❌ **Tono de app bancaria**
Wildtrip no es un banco. No habla como uno. "Su transacción ha sido procesada" → "Ticket añadido."

❌ **Urgencia falsa**
No "¡Recuerda enviar tu nota de gastos!" con exclamación. Las personas adultas saben que tienen que enviar sus gastos.

❌ **Emojis en mensajes de estado o error**
Los estados de aprobación, rechazo o error no llevan emojis. Los momentos de celebración sí pueden tener un elemento visual especial, pero nunca un emoji de texto.

❌ **Segunda persona formal (usted)**
Siempre tuteo. Siempre.

❌ **Copy condescendiente en empty states**
No "¡Empieza creando tu primer viaje! 🚀". → "Sin viajes este mes."

### Diseño — nunca

❌ **Look "Concur" o "SAP"**
Sin tablas de datos con densidad de hoja de cálculo. Sin formularios de 15 campos en una sola pantalla. Sin interfaces que parezcan construidas en 2012.

❌ **Azul corporativo genérico (#0070F3, #1890FF)**
El azul de Wildtrip es el azul marino Jungle. No el azul tech de moda.

❌ **Sidebar clara en desktop**
La sidebar es azul marino oscuro. Es parte de la identidad. No se sustituye por gris.

❌ **Serif en elementos pequeños**
DM Serif Display solo en `font-size >= 24px`. Nunca en labels, badges, inputs, mensajes de error o navegación.

❌ **Pill radius en componentes principales**
El pill es para badges y chips. Los botones, cards e inputs usan 12px. No mezclar.

❌ **Sombras genéricas (rgba(0,0,0,0.1))**
Las sombras de Wildtrip tienen tinte azul marino. Son propias de la marca.

❌ **Verde como color primario en light mode**
El verde es accent y success. El primario en light mode es el azul marino. En dark mode sí es el primario — esa inversión es intencionada.

### Flujos — nunca

❌ **Formularios de más de 5 campos visibles a la vez en mobile**
Los formularios se dividen en pasos. El consultor en el aeropuerto no quiere scroll vertical infinito.

❌ **Aprobaciones que requieren más de 2 taps**
Ver solicitud → Aprobar → Listo. Máximo 2 acciones.

❌ **Subida de ticket con más fricción que hacer una foto**
El flujo de subir un ticket tiene que ser: foto → confirma importe → categoría → listo. Sin más.

❌ **Notificaciones sin acción clara**
Cada notificación lleva al lugar exacto donde actuar. No a un dashboard genérico.

### Arquetipos que Wildtrip NO es

❌ No es El Gobernante — no hay autoridad fría, no hay distancia
❌ No es El Confiable corporativo — no es Atlassian, no es SAP
❌ No es El Inocente — no es una app de bienestar, no tiene pasteles
❌ No es El Jester puro — el humor existe pero no es lo primero

---

## La prueba del "¿Lo usaría Concur?"

Antes de añadir cualquier elemento, pregunta: ¿Esto lo haría Concur o SAP?

Si la respuesta es sí → reconsidera.
Si la respuesta es no → probablemente vas por buen camino.
