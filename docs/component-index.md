# component-index.md — Índice de Componentes de Wildtrip DS

**Versión:** 1.0
**Producto:** Wildtrip — Gestión de viajes corporativos para Jungle
**Fecha:** Junio 2026
**Stack:** React + Vite + TypeScript + Tailwind CSS v4 + shadcn/ui

---

## Cómo usar este documento

Este índice es la fuente de verdad para el equipo de diseño y desarrollo.
Para cada componente: qué hace, qué props recibe, en qué pantallas aparece, y cómo usarlo.

Antes de crear cualquier componente nuevo, comprueba aquí si ya existe o si uno existente puede adaptarse.

**Regla:** Si un componente no está en este índice, no existe en el DS.

---

## Resumen — 12 archivos, 20+ componentes exportados

| Archivo | Componentes | Pantallas |
|---------|-------------|-----------|
| `StatusBadge.tsx` | `StatusBadge` | Transversal |
| `TripCard.tsx` | `TripCard` | S1, S6, S19 |
| `ExpenseItem.tsx` | `ExpenseItem`, `ExpenseItemSkeleton` | S13, S16, S19, S21 |
| `ApprovalCard.tsx` | `ApprovalCard` | S7, S20 |
| `TicketUploader.tsx` | `TicketUploader` | S13–S18 |
| `DashboardManager.tsx` | `DashboardManager`, `QuickApproval` | S7, S20 |
| `TravelerHome.tsx` | `TravelerHome` | S1, S9, S12, S19 |
| `TripRequestWizard.tsx` | `TripRequestWizard`, `FlightCard`, `HotelCard`, `CabifyLegRow` | S2–S8 |
| `TripTimeline.tsx` | `TripTimeline` | S9 |
| `CabifyTracker.tsx` | `CabifyTracker`, `IncomingView`, `LiveMapView`, `InProgressView`, `RequestView` | S10, S11 |
| `HotelCheckin.tsx` | `HotelCheckin`, `BoardingPass` | S12 |
| `BudgetDashboard.tsx` | `ConsultantBudget`, `BudgetIncreaseRequest`, `FinanceDashboard` | S19–S21 |
| `NotificationBanner.tsx` | `NotificationBanner`, `BudgetMeter`, `useNotificationQueue` | Transversal |

---

## Componentes transversales

Estos componentes aparecen en múltiples flujos y pantallas. Son la base del sistema.

---

### `StatusBadge`
**Archivo:** `src/components/StatusBadge.tsx`
**Descripción:** Badge de estado. Siempre pill (999px). La decisión de diseño D-001.

**Props:**
```tsx
interface StatusBadgeProps {
  status:    TripStatus | ExpenseStatus
  size?:     'sm' | 'base'      // default: 'base'
  animate?:  boolean            // animación de entrada al cambiar estado
  className?: string
}
```

**Estados disponibles:**
```
TripStatus:    pending · approved · auto_approved · rejected
               in_progress · completed · draft

ExpenseStatus: pending · approved · rejected
               needs_review · duplicate
```

**Uso:**
```tsx
<StatusBadge status="approved" />
<StatusBadge status="pending" size="sm" animate />
```

**Dónde aparece:** TripCard, ExpenseItem, ApprovalCard, DashboardManager, TripTimeline, BudgetDashboard

---

### `BudgetMeter`
**Archivo:** `src/components/NotificationBanner.tsx`
**Descripción:** Barra de progreso de presupuesto. 4 variantes visuales.

**Props:**
```tsx
interface BudgetMeterProps {
  spent:      number
  total:      number
  variant?:   'default' | 'compact' | 'hero' | 'ring'
  label?:     string
  showSaved?: boolean
  className?: string
}
```

**Variantes:**
- `default` — barra horizontal con importes y estado
- `compact` — solo la barra, sin texto (para cards pequeñas)
- `hero`    — versión blanca para fondos azul marino
- `ring`    — círculo animado (para BudgetDashboard)

**Lógica de color automática:**
- Verde `bg-accent` → < 80% usado
- Ámbar `bg-warning` → 80-99% usado
- Rojo `bg-destructive` → excedido

**Uso:**
```tsx
<BudgetMeter spent={199} total={450} variant="hero" />
<BudgetMeter spent={42} total={45} variant="default" showSaved />
<BudgetMeter spent={390} total={450} variant="compact" />
<BudgetMeter spent={199} total={450} variant="ring" />
```

---

### `NotificationBanner`
**Archivo:** `src/components/NotificationBanner.tsx`
**Descripción:** Banner in-app para eventos en tiempo real. Autocierre configurable.

**Props:**
```tsx
interface NotificationBannerProps {
  notification:  AppNotification | null
  onDismiss:     () => void
  onAction?:     (actionId: string) => void
}
```

**Tipos de notificación:**
```
flight   → vuelo embarca, aterriza — fondo azul marino
cabify   → conductor llega, completado — fondo verde
approval → aprobación resuelta — fondo success
alert    → presupuesto, tickets pendientes — fondo amber
```

**Hook de cola:**
```tsx
const { current, dismiss, push, count } = useNotificationQueue()
```

**Catálogo predefinido:**
```tsx
WILDTRIP_NOTIFICATIONS.cabifyIncoming(driverName, eta, rideId)
WILDTRIP_NOTIFICATIONS.cabifyArrived(plate, rideId)
WILDTRIP_NOTIFICATIONS.flightBoarding(flightCode, gate)
WILDTRIP_NOTIFICATIONS.flightLanded(destination, tripId)
WILDTRIP_NOTIFICATIONS.tripApproved(destination, tripId)
WILDTRIP_NOTIFICATIONS.budgetIncreaseApproved(amount, tripId)
WILDTRIP_NOTIFICATIONS.budgetIncreaseRejected(tripId)
WILDTRIP_NOTIFICATIONS.budgetNearLimit(remaining, tripId)
WILDTRIP_NOTIFICATIONS.pendingTicket(count, tripId)
```

---

## Flujo 1 — Solicitud de viaje

### `TripRequestWizard`
**Archivo:** `src/components/TripRequestWizard.tsx`
**Descripción:** Wizard de 6 pasos para crear una solicitud de viaje completa.
**Pantallas cubre:** S2, S3, S4, S5, S6, S7, S8

**Estructura de 6 pasos:**
```
Paso 1 — Destino + fechas + cliente + motivo
Paso 2 — Vuelo de ida     (una sola decisión)
Paso 3 — Vuelo de vuelta  (una sola decisión)
Paso 4 — Hotel
Paso 5 — Trayectos Cabify (confirmar, ya generados)
Paso 6 — Resumen + solicitar aprobación
```

**Props:**
```tsx
interface TripRequestWizardProps {
  outboundFlights: FlightOption[]
  returnFlights:   FlightOption[]
  hotels:          HotelOption[]
  cabifyLegs:      CabifyLeg[]
  onSubmit:        (data: TripRequestSubmission) => Promise<void>
  onCancel:        () => void
}
```

**Subcomponentes exportados:**
- `FlightCard` — card de selección de vuelo
- `HotelCard` — card de selección de hotel
- `CabifyLegRow` — fila de trayecto Cabify

**Principio de diseño:** Una decisión por paso. Nunca vuelo ida + vuelta en la misma pantalla.

---

### `ApprovalCard`
**Archivo:** `src/components/ApprovalCard.tsx`
**Descripción:** Card de aprobación para el manager. 2 taps máximo.
**Pantallas cubre:** S7

**Props:**
```tsx
interface ApprovalCardProps {
  id:              string
  requesterName:   string
  requesterRole:   string
  destination:     string
  clientName:      string
  startDate:       string
  endDate:         string
  estimatedBudget: number
  reason:          string
  isWithinBudget:  boolean
  onApprove:       (id: string) => void
  onReject:        (id: string, reason: string) => void
  isLoading?:      boolean
}
```

**Flujo de rechazo:** El primer tap en "Rechazar" muestra el input de motivo. El segundo tap confirma. Nunca rechaza sin motivo.

---

### `TripCard`
**Archivo:** `src/components/TripCard.tsx`
**Descripción:** Card de viaje en listados. Incluye barra de presupuesto y estado.

**Props:**
```tsx
interface TripCardProps {
  id:            string
  destination:   string
  client:        string
  startDate:     string
  endDate:       string
  totalBudget:   number
  spentAmount:   number
  status:        TripStatus
  approverName?: string
  isNew?:        boolean
  onClick?:      () => void
}
```

---

## Flujo 2 — Durante el viaje

### `TravelerHome`
**Archivo:** `src/components/TravelerHome.tsx`
**Descripción:** Pantalla principal del viajero. 4 estados contextuales.
**Pantallas cubre:** S1, S9, S12, S19

**4 estados:**
```
none      → Sin viaje activo. CTA crear viaje.
upcoming  → Viaje próximo. Vuelo, cuenta atrás, Cabify al aeropuerto.
active    → En curso. Presupuesto, gastos Revolut auto, Cabify rápido.
closing   → Viaje terminado. Alerta cierre de nota, gastos pendientes.
```

**Props:**
```tsx
interface TravelerHomeProps {
  state:          TravelerHomeState
  trip?:          ActiveTrip
  todayExpenses?: TodayExpense[]
  summaryExpenses?: TripSummaryExpense[]
  pendingTickets?: number
  totalSpent?:    number
  savedAmount?:   number
  onCreateTrip:   () => void
  onAddExpense:   () => void
  onRequestCabify: () => void
  onCloseNote:    () => void
  onExpensePress: (id: string) => void
}
```

**Lógica Revolut:** Los gastos con `source: 'revolut_auto'` no muestran ningún CTA. Solo `cash_pending` activa la cámara. El consultor en movimiento no ve fricción innecesaria.

---

### `TripTimeline`
**Archivo:** `src/components/TripTimeline.tsx`
**Descripción:** Vista de itinerario día a día. Dos capas de información.
**Pantallas cubre:** S9

**Dos capas:**
```
Capa 1 — Logística (siempre visible):
  Vuelo, Cabify, hotel ordenados por hora.
  El evento activo está expandido por defecto.
  Tappable para ver detalle y acciones.

Capa 2 — Gastos del día (colapsado):
  Strip al pie: "3 gastos · 109€"
  Se expande sin abandonar la pantalla.
  Badge de alerta si hay gastos sin ticket.
```

**Props:**
```tsx
interface TripTimelineProps {
  destination:    string
  clientName:     string
  startDate:      string
  endDate:        string
  currentDay:     number
  totalDays:      number
  approvedBudget: number
  spentAmount:    number
  days:           TripDay[]
  onAddExpense:   () => void
}
```

**Mock data incluido:** `MOCK_TRIP_TIMELINE_PROPS` con el viaje de A Coruña completo.

---

### `CabifyTracker`
**Archivo:** `src/components/CabifyTracker.tsx`
**Descripción:** Seguimiento de trayecto en tiempo real. 4 superficies.
**Pantallas cubre:** S10, S11

**4 superficies:**
```
incoming   → Conductor en camino. ETA countdown. Datos del driver.
live       → Mapa en tiempo real post-recogida. WebSocket.
inprogress → Trayecto activo. Progreso de ruta. ETA al destino.
request    → Formulario para solicitar trayecto nuevo.
```

**WebSocket:**
```tsx
// Hook para actualizaciones en tiempo real
useRideWebSocket(rideId, onUpdate)
// En producción: wss://api.cabify.com/business/v3/rides/:id/track
// En desarrollo: simula posición con setInterval
```

**Mapa:** `MapPlaceholder` SVG en desarrollo. En producción sustituir por Mapbox GL JS — la firma del componente no cambia.

**Mock data incluido:** `MOCK_RIDE` con datos del trayecto de A Coruña.

---

### `HotelCheckin`
**Archivo:** `src/components/HotelCheckin.tsx`
**Descripción:** Tarjeta estilo boarding pass para check-in de hotel.
**Pantallas cubre:** S12

**3 niveles según capacidad del hotel:**
```
smart  → Check-in online + apertura NFC/BLE
qr     → QR de check-in + datos completos para recepción
basic  → Número de reserva + texto sugerido para recepción
```

**Geolocalización:**
```tsx
useHotelProximity(lat, lng, 200, onArrival)
// Dispara notificación cuando el consultor está a <200m
// Usa Geolocation API del browser — funciona en PWA sin app nativa
```

**Mock data incluido:**
```tsx
MOCK_RESERVATION_SMART   // NH Finisterre · nivel smart
MOCK_RESERVATION_QR      // AC Palacio del Carmen · nivel QR
MOCK_RESERVATION_BASIC   // Hotel Hesperia · nivel básico
```

---

## Flujo 3 — Registro de gasto

### `TicketUploader`
**Archivo:** `src/components/TicketUploader.tsx`
**Descripción:** El flujo más crítico de Wildtrip. 5 pasos de cámara a confirmación.
**Pantallas cubre:** S13, S14, S15, S16, S17, S18

**5 pasos:**
```
Paso 1 — Cámara / galería
Paso 2 — OCR procesando (loading)
Paso 3 — Confirmar datos extraídos (editables)
Paso 4 — Asociar viaje + categoría + método de pago
Paso 5 — Confirmación y éxito
```

**Contrato OCR:**
```tsx
interface OcrResult {
  businessName:    string   // "Restaurante Mar"
  businessNif:     string   // "B15234567"
  businessAddress: string   // "A Coruña"
  date:            string   // "2026-06-15"
  amount:          number   // 87.00
  vatAmount:       number   // 7.91
  vatRate:         number   // 10 (%)
  concept:         string
  raw:             string
}
```

**En desarrollo:** `mockOcrResult` simula la respuesta. Sustituir `onOcr` prop por la llamada real al backend.

**Campos fiscales España:** NIF, importe, IVA desglosado, fecha. Cumple los requisitos de la AEAT para ticket simplificado.

---

### `ExpenseItem`
**Archivo:** `src/components/ExpenseItem.tsx`
**Descripción:** Ítem de gasto en lista. Mobile-first, stagger de entrada.

**Props:**
```tsx
interface ExpenseItemProps {
  id:           string
  description:  string
  category:     ExpenseCategory
  amount:       number
  date:         string
  status:       ExpenseStatus
  hasTicket:    boolean
  isAnimated?:  boolean
  staggerIndex?: number    // 0-5, para entrada escalonada
  onClick?:     () => void
}
```

**Categorías:**
```
transport · flight · hotel · meal · other
```

**Incluye:** `ExpenseItemSkeleton` para estados de carga.

---

## Flujo 4 — Dashboards

### `DashboardManager` + `QuickApproval`
**Archivo:** `src/components/DashboardManager.tsx`
**Descripción:** Vista completa del manager + superficie desde notificación push.
**Pantallas cubre:** S7, S20

**`DashboardManager`** — dashboard completo:
- KPIs en grid 2×2 (pendientes, viajes activos, gastado, tiempo medio)
- Lista de solicitudes pendientes con `RequestCard`
- Historial reciente

**`QuickApproval`** — desde notificación push:
- Deep link: `wildtrip://approve/:requestId`
- Header azul marino con destino y quién pide
- 3 datos: fechas, presupuesto, disponible del cliente
- 2 taps para aprobar — sin abrir el dashboard completo
- Rechazo sin input de motivo (se registra "Rechazado desde notificación")

---

### `ConsultantBudget`
**Archivo:** `src/components/BudgetDashboard.tsx`
**Descripción:** Vista del consultor: presupuesto global + dieta diaria.
**Pantallas cubre:** S19

**Lógica de dos límites:**
```
GLOBAL  — flexible. El consultor mueve entre categorías.
          Si se supera → alerta + botón solicitar aumento.
          El consultor no ve el límite exacto, solo si está dentro/fuera.

DIETA   — fija por política (45€/día). No acumulable.
          Si se supera → warning pero sin opción de solicitar aumento.
          El exceso de dieta no se reembolsa — límite hard.
```

**Incluye `BudgetRing`** — indicador circular animado del porcentaje usado.

---

### `BudgetIncreaseRequest`
**Archivo:** `src/components/BudgetDashboard.tsx`
**Descripción:** Formulario de solicitud de aumento de presupuesto.

**Importes predefinidos:** 50€, 100€, 150€ + campo custom.
**Motivo:** Opcional — textarea libre.
**Resumen:** Muestra presupuesto actual, aumento pedido y nuevo total si aprueban.
**Envía:** Notificación push a finanzas/admin/RRHH.

---

### `FinanceDashboard`
**Archivo:** `src/components/BudgetDashboard.tsx`
**Descripción:** Vista de administración/finanzas/RRHH para solicitudes de aumento.
**Pantallas cubre:** S21

**Roles que la usan:** Administración, Finanzas, RRHH.
**KPIs:** Solicitudes pendientes, gasto total del mes, viajes activos.
**`IncreaseRequestCard`:** Mismo patrón de 2 taps que `ApprovalCard`.
- Aprobación: directa, con comentario opcional.
- Rechazo: requiere motivo obligatorio (trazabilidad).

**Mock data incluido:** `MOCK_FINANCE_REQUESTS` con 3 solicitudes de diferentes consultores.

---

## Instalación de dependencias

```bash
# Fuentes
npm install @fontsource/dm-serif-display
npm install @fontsource-variable/plus-jakarta-sans

# Iconos
npm install lucide-react

# Componentes base
npx shadcn@latest init
npx shadcn@latest add button input card badge ...

# Animaciones Tailwind
npm install tailwindcss-animate
```

---

## Convenciones del proyecto

### Colores — nunca hardcodeados
```tsx
// ✅ Correcto
className="bg-primary text-primary-foreground"
className="text-success-text bg-success-muted"

// ❌ Nunca
className="bg-[#0D1F4E]"
style={{ color: '#1D9E75' }}
className="text-green-600"
```

### Border radius — siempre del DS
```tsx
// ✅ Correcto
className="rounded-xl"    // 12px — componentes principales
className="rounded-full"  // pill — badges, chips
className="rounded-2xl"   // 16px — cards grandes

// ❌ Nunca
className="rounded-[8px]"
style={{ borderRadius: '10px' }}
```

### Iconos — siempre Lucide, siempre size=20
```tsx
// ✅ Correcto
import { Car } from 'lucide-react'
<Car size={20} aria-hidden="true" />

// ❌ Nunca
<Car size={18} color="#3B82F6" strokeWidth={2} />
```

### Alturas mínimas — accesibilidad táctil
```tsx
// Todo elemento interactivo en mobile: min-h-[44px]
className="min-h-[44px]"  // Botones, inputs, selects
```

### Motion — cotidiano rápido, celebraciones con spring
```tsx
// Interacciones cotidianas: 150-200ms, ease funcional
className="transition-all duration-[180ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"

// Momentos de éxito: animate-success-pop
className="animate-success-pop"  // Definida en index.css
```

---

## Mapa de pantallas → componentes

| Pantalla | Descripción | Componentes |
|----------|-------------|-------------|
| S1 | Home / Dashboard personal | `TravelerHome` (state: none/upcoming/active) |
| S2 | Nueva solicitud | `TripRequestWizard` paso 1 |
| S3 | Selección vuelo ida | `TripRequestWizard` paso 2 · `FlightCard` |
| S4 | Selección vuelo vuelta | `TripRequestWizard` paso 3 · `FlightCard` |
| S5 | Selección hotel | `TripRequestWizard` paso 4 · `HotelCard` |
| S6 | Trayectos Cabify | `TripRequestWizard` paso 5 · `CabifyLegRow` |
| S7 | Resumen + aprobación | `TripRequestWizard` paso 6 · `ApprovalCard` · `QuickApproval` |
| S8 | Confirmación | `TripRequestWizard` paso 7 · `NotificationBanner` |
| S9 | Timeline del viaje | `TripTimeline` · `TravelerHome` (state: active) |
| S10 | Notif. Cabify llega | `NotificationBanner` (type: cabify) · `CabifyTracker` (incoming) |
| S11 | Trayecto en curso | `CabifyTracker` (live/inprogress) |
| S12 | Check-in hotel | `HotelCheckin` · `TravelerHome` |
| S13 | Registro de gasto | `TicketUploader` · `TravelerHome` |
| S14 | Nueva transacción | `TicketUploader` paso 1 |
| S15 | Escanear ticket | `TicketUploader` paso 2 |
| S16 | Categorizar gasto | `TicketUploader` paso 3 |
| S17 | Asociar a viaje | `TicketUploader` paso 4 |
| S18 | Confirmación Revolut | `TicketUploader` paso 5 · `NotificationBanner` |
| S19 | Dashboard consultor | `TravelerHome` · `ConsultantBudget` · `TripCard` |
| S20 | Dashboard manager | `DashboardManager` · `QuickApproval` · `ApprovalCard` |
| S21 | Dashboard finanzas | `FinanceDashboard` · `BudgetDashboard` |

---

## Para el equipo de Paper / Figma

Cuando diseñes una pantalla nueva:

1. **Consulta este índice** — verifica si el componente ya existe
2. **Usa los tokens** — nunca valores arbitrarios de color, radio o spacing
3. **Respeta el arquetipo** — Explorador + Forajido + Creador. Ver `brand-personality.md`
4. **La prueba del Concur** — antes de añadir cualquier elemento pregunta: ¿Lo haría Concur? Si sí → reconsidera.
5. **Mobile-first siempre** — 90% del uso es móvil. Diseña en 390px primero.
6. **44px mínimo** — ningún elemento interactivo por debajo de 44px de área táctil.

---

*Generado por Dusty DS Generator · Junio 2026*
*Para actualizaciones: modificar este archivo y notificar al equipo*
