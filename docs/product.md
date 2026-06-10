# product.md — Qué es Wildtrip

**Versión:** 1.0
**Fecha:** Junio 2026

---

## El producto en una frase

Wildtrip es la herramienta de gestión de viajes corporativos del grupo Jungle — diseñada para que los consultores puedan viajar sin perder el tiempo gestionando el viaje.

---

## El problema

Los consultores de Jungle viajan frecuentemente: presentaciones en cliente, tests de usuario, workshops, pitches. El proceso actual implica:

- Solicitar aprobación por email o Slack
- Reservar vuelo y hotel por separado
- Pagar Cabify de su bolsillo y guardarse el ticket
- Guardar tickets de comidas y taxis
- Rellenar una hoja de cálculo de gastos
- Enviarla al manager para que la revise
- Esperar a que contabilidad lo procese

El resultado: horas perdidas en gestión, tickets extraviados, adelantos de dinero personal, y un nivel de fricción incompatible con la cultura de Jungle.

---

## La solución

Wildtrip centraliza todo en una app mobile-first:

1. **Crear viaje** — destino, fechas, cliente asociado
2. **Reservar** — integración con TravelPerk (vuelos, hotel)
3. **Pagar trayectos** — integración con Cabify Business (cargo directo a la empresa)
4. **Gestionar gastos** — foto del ticket, OCR automático, categoría sugerida
5. **Aprobar** — flujo simplificado para managers
6. **Cerrar nota** — generación automática para contabilidad

---

## Las integraciones

| Servicio | Función |
|----------|---------|
| TravelPerk | Vuelos y hoteles — reserva y facturación directa |
| Cabify Business | Trayectos VTC — cargo directo sin adelanto |
| Revolut Business | Pagos con tarjeta corporativa + control de presupuesto |

---

## Los roles de usuario

| Rol | Qué hace en Wildtrip |
|-----|---------------------|
| **Viajero** | Crea viajes, reserva, sube tickets, ve su estado |
| **Manager** | Aprueba/rechaza viajes y gastos, ve desviaciones de presupuesto |
| **Administración** | Recibe notas completas, verifica justificantes, exporta |
| **RRHH** | Gestiona política de viajes y dietas, resuelve dudas |

Un mismo usuario puede tener varios roles.

---

## Las métricas de éxito

- Tiempo medio de creación de viaje: < 3 minutos
- Tiempo medio de subida de ticket: < 30 segundos
- Tiempo medio de aprobación por manager: < 24 horas
- Reducción de adelantos personales: > 80%
- Errores en notas de gastos: < 5%

---

## Lo que Wildtrip NO es

- No es una agencia de viajes — usa TravelPerk para las reservas
- No es una herramienta financiera — usa Revolut para los pagos
- No es Concur ni SAP — es la alternativa que Jungle se merece
- No es una app pública — es una herramienta interna del grupo

---

## Stack técnico

- **Frontend:** React + Vite + TypeScript
- **Estilos:** Tailwind CSS v4 + shadcn/ui
- **Mobile:** React Native (si se requiere app nativa) o PWA mobile-first
- **Backend:** A definir por el equipo tech
- **Integraciones:** TravelPerk API, Cabify Business API, Revolut Business API
