# motion.md — Sistema de Motion de Wildtrip

**Versión:** 1.0
**Producto:** Wildtrip — Gestión de viajes corporativos para Jungle
**Fecha:** Junio 2026

---

## Arquetipo de motion: El Directo con momentos del Forajido

**Principio:** El motion cotidiano es invisible. El motion de celebración es memorable.

El 90% de las interacciones en Wildtrip son tareas: subir un ticket, aprobar un gasto, crear un viaje. Para esas, el motion es funcional — rápido, sin dramatismo, sin distraer al consultor que lleva el móvil en la mano en la T4.

El 10% restante son momentos: el viaje se aprueba, la nota de gastos cuadra, se completa el onboarding. Para esos, el motion puede sorprender — un spring, un pop, una animación que hace que cerrar una nota se sienta como cerrar un caso bien resuelto.

---

## Tokens de motion

```css
/* Duraciones */
--duration-fast:     100ms;   /* Hover, focus, microinteracciones */
--duration-base:     180ms;   /* Transiciones estándar */
--duration-slow:     300ms;   /* Entradas de paneles, modales */
--duration-slower:   450ms;   /* Transiciones de página */
--duration-dramatic: 650ms;   /* Celebraciones — aprobación, cierre de nota */

/* Easings funcionales */
--ease-default:  cubic-bezier(0.4, 0, 0.2, 1);
--ease-out:      cubic-bezier(0, 0, 0.2, 1);
--ease-in:       cubic-bezier(0.4, 0, 1, 1);

/* Easings de personalidad */
--ease-spring:   cubic-bezier(0.175, 0.885, 0.32, 1.275);  /* Éxito, confirmación */
--ease-bounce:   cubic-bezier(0.34, 1.56, 0.64, 1);        /* Celebración máxima */
--ease-elegant:  cubic-bezier(0.25, 0.46, 0.45, 0.94);     /* Transiciones suaves */
```

---

## Microinteracciones por componente

### Botón primario
```css
/* Hover — lift sutil */
.btn-primary {
  transition: transform var(--duration-fast) var(--ease-out),
              background-color var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
.btn-primary:active {
  transform: translateY(0) scale(0.98);
}
```

### Botón de aprobación (momento especial)
```css
/* Cuando se pulsa Aprobar — el gesto importa */
.btn-approve:active {
  transform: scale(0.96);
  transition-duration: 80ms;
}
/* Post-aprobación: el check aparece con spring */
.btn-approve.approved {
  animation: wt-success-pop var(--duration-dramatic) var(--ease-spring) forwards;
}
```

### Cards de viaje / gasto
```css
.card-trip {
  transition: transform var(--duration-base) var(--ease-elegant),
              box-shadow var(--duration-base) var(--ease-elegant);
}
.card-trip:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
}
```

### Badge de estado — cambio de estado
```css
/* Cuando un badge cambia de Pendiente a Aprobado */
.badge-status {
  transition: background-color var(--duration-slow) var(--ease-out),
              color var(--duration-slow) var(--ease-out);
}
/* El nuevo estado entra con un pequeño pop */
.badge-status.just-changed {
  animation: wt-success-pop 400ms var(--ease-spring);
}
```

### Sheet / drawer (mobile)
```css
/* Entra desde abajo — el patrón natural en mobile */
@keyframes sheet-enter {
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}
.sheet {
  animation: sheet-enter var(--duration-slow) var(--ease-elegant) forwards;
}
```

### Lista de gastos — entrada escalonada
```css
/* Cada item entra con delay progresivo */
.expense-item {
  animation: wt-list-item var(--duration-slow) var(--ease-out) forwards;
  opacity: 0;
}
.expense-item:nth-child(1) { animation-delay: 0ms; }
.expense-item:nth-child(2) { animation-delay: 40ms; }
.expense-item:nth-child(3) { animation-delay: 80ms; }
.expense-item:nth-child(4) { animation-delay: 120ms; }
.expense-item:nth-child(5) { animation-delay: 160ms; }
/* Resto sin delay — evitar fatiga */
.expense-item:nth-child(n+6) { animation-delay: 160ms; }
```

---

## Momentos de celebración — el 10%

### Viaje aprobado
```
Animación: wt-success-pop en el badge + glow verde en la card
Duración: 650ms
Sonido: Si está activo — arpegio 3 notas ascendentes
Vibración (mobile): pattern [50, 50, 50] — patrón triple corto
```

### Nota de gastos cerrada y enviada
```
Animación: Check dibujado (stroke-dashoffset) + fade out del formulario + entrada del estado "Enviada"
Duración: 800ms total
Copy: "Todo cuadra. Nota enviada a contabilidad."
```

### Onboarding completado
```
Animación: Confetti mínimo (10-15 partículas, verde y azul marino, 1.2s)
Duración: 1200ms
Copy: "Ya estás listo. Tu primer viaje cuando quieras."
```

### Aprobación automática (dentro del presupuesto)
```
Animación: Badge cambia a verde con spring + micro-vibración (mobile)
Duración: 400ms
Copy: "Aprobación automática — dentro del presupuesto."
```

---

## Transiciones de pantalla (mobile)

```css
/* Navegación hacia adelante — slide desde la derecha */
.screen-enter {
  animation: screen-slide-in var(--duration-slower) var(--ease-elegant) forwards;
}
@keyframes screen-slide-in {
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
}

/* Volver — slide hacia la derecha */
.screen-exit {
  animation: screen-slide-out var(--duration-slow) var(--ease-in) forwards;
}
@keyframes screen-slide-out {
  from { transform: translateX(0); opacity: 1; }
  to   { transform: translateX(30%); opacity: 0; }
}
```

---

## Lo que NO se anima en Wildtrip

❌ Texto corrido — nunca kinetic typography en flujos de tarea
❌ Transiciones de más de 300ms en acciones cotidianas
❌ Bounce en mensajes de error — el contexto manda, los errores son directos
❌ Animaciones decorativas en la sidebar o navegación principal
❌ Loading spinners que duran más de lo que dura la carga real

---

## Accesibilidad

```css
@media (prefers-reduced-motion: reduce) {
  /* Desactivar todas las decorativas */
  .animate-success-pop,
  .animate-fade-in,
  .animate-list-item {
    animation: none;
  }

  /* Mantener las funcionales — feedback de estado */
  .badge-status {
    transition: background-color 0ms, color 0ms;
  }
}
```
