# design-decisions.md — Decisiones de Diseño de Wildtrip

**Versión:** 1.0
**Producto:** Wildtrip — Gestión de viajes corporativos para Jungle
**Fecha:** Junio 2026

---

## D-001 — Border radius: 12px + pill en elementos secundarios

**Decisión:** `--radius: 0.75rem` (12px) en componentes principales. `border-radius: 999px` en badges de estado, chips de categoría y tags.

**Porqué:** La web de Jungle usa pill en sus botones. Wildtrip hereda ese lenguaje pero necesita más estructura — es una herramienta, no una web editorial. 12px da carácter sin ser blando. El pill en badges y chips crea contraste visual entre elementos de estado y elementos de acción.

**Alternativa rechazada:** 8px — neutro, sin personalidad. 0px — demasiado sharp para una app mobile que maneja emociones (aprobaciones, gastos, viajes).

---

## D-002 — Color primario: Azul marino Jungle `oklch(0.20 0.10 264)`

**Decisión:** El azul marino de la identidad corporativa de Jungle como color primario de la app.

**Porqué:** Wildtrip es una herramienta interna de Jungle. La coherencia con la identidad madre genera confianza y pertenencia. El consultor que abre Wildtrip reconoce inmediatamente que es "suya".

**Decisión complementaria:** Verde selva `oklch(0.55 0.18 162)` como accent. El verde es coherente con "Jungle" semánticamente, funciona como color de éxito, y diferencia los estados activos del primario azul.

**Dark mode:** En dark, el verde pasa a ser el primario. Inversión intencionada — el azul marino como fondo ya está presente; el verde como acción activa es más legible y más vivo.

**Accesibilidad:** El azul marino sobre fondo claro supera ratio 7:1. El verde accent como texto usa `--accent-text` (versión oscurecida) para cumplir WCAG AA.

---

## D-003 — Tipografía: DM Serif Display + Plus Jakarta Sans Variable

**Decisión:** Dos familias. DM Serif Display para titulares grandes y momentos editoriales. Plus Jakarta Sans Variable para toda la UI.

**Porqué:** La web de wejungle.com mezcla serif editorial con sans limpia. Wildtrip hereda ese espíritu. La serif aparece con moderación — en onboarding, en empty states inspiradores, en el nombre del viaje en la vista de detalle. La sans hace el trabajo pesado.

**Regla de uso:** La serif solo en `font-size >= 2xl` (24px). Nunca en labels, badges, formularios ni mensajes de error.

**Alternativa rechazada:** Solo Plus Jakarta Sans — eficiente pero sin la personalidad editorial que distingue Wildtrip de Concur.

---

## D-004 — Mobile-first con área táctil 44px

**Decisión:** Altura mínima de elementos interactivos: 44px en mobile. Los inputs base son 44px, no 36px.

**Porqué:** El 90% del uso es desde el móvil, en movimiento — aeropuerto, taxi, entre reuniones. Un consultor con el pulgar necesita elementos que no falle al pulsar. 44px es el mínimo de WCAG 2.5.5 para áreas táctiles.

**Impacto:** Los botones base son 40px en desktop, 44px en mobile. Los inputs son 44px siempre.

---

## D-005 — Sidebar oscura en desktop (azul marino)

**Decisión:** La sidebar en desktop usa el azul marino como fondo, no el gris suave estándar.

**Porqué:** Coherencia con la identidad de Jungle (dark navy como color dominante en su web). Crea separación visual clara entre la navegación y el contenido. El verde accent como estado activo en sidebar es muy legible sobre el azul oscuro.

**Alternativa rechazada:** Sidebar clara — funcional pero genérica, sin la personalidad de Jungle.

---

## D-006 — Motion: directo en cotidiano, spring en éxito

**Decisión:** Duraciones 100-300ms y ease funcional para interacciones cotidianas. Spring y bounce reservados para momentos de éxito (viaje aprobado, nota cerrada, onboarding completado).

**Porqué:** El consultor en el aeropuerto no quiere que la app le entretenga mientras sube un ticket. Quiere que sea rápido. Pero cuando el viaje se aprueba automáticamente, ese momento merece ser memorable.

**Regla:** Ninguna animación cotidiana supera 300ms. Las celebraciones pueden llegar a 650ms.

---

## D-007 — Sonido: OFF por defecto

**Decisión:** El sistema de sonido está desactivado por defecto. El usuario puede activarlo en Settings.

**Porqué:** Los consultores de Jungle trabajan en oficinas abiertas, reuniones y espacios compartidos. Un sonido inesperado al aprobar un gasto en una reunión con un cliente es inapropiado. El sonido es una mejora optional, no una característica base.

**Cuando activarlo:** Principalmente para notificaciones push cuando la app está en background.

---

## D-008 — Espacio de color: oklch

**Decisión:** Todos los tokens de color en oklch.

**Porqué:** Perceptualmente uniforme, mejor interpolación para transiciones de color, preparado para pantallas P3. El azul marino y el verde selva se comportan consistentemente en todos los dispositivos.

---

## D-009 — Focus ring: verde accent, no azul primario

**Decisión:** `--ring: oklch(0.55 0.18 162)` — el verde accent como color de focus, no el azul marino.

**Porqué:** El azul marino como focus ring sobre el azul marino de fondo o la sidebar sería invisible. El verde crea contraste alto y es coherente con la identidad de Jungle. Diferenciador respecto al estándar azul de todos los browsers.

---

## D-010 — Roles de usuario: una sola app, vistas diferentes

**Decisión:** Una sola app con vistas y permisos por rol (Viajero, Manager, Administración, RRHH). No apps separadas.

**Porqué:** El consultor de Jungle es viajero un día y manager de otro. La app se adapta al contexto del usuario, no al contrario. La navegación cambia según el rol activo.

**Implicación de DS:** Los componentes de aprobación (cards con Aprobar/Rechazar) solo aparecen en la vista Manager. Los componentes de subida de ticket solo en la vista Viajero. La sidebar muestra ítems según el rol.
