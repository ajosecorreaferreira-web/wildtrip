# voice.md — Voz, Tono y Copy de Wildtrip

**Versión:** 1.0
**Producto:** Wildtrip — Gestión de viajes corporativos para Jungle
**Fecha:** Junio 2026

---

## La voz de Wildtrip — constante, nunca cambia

**Arquetipo:** Explorador + Forajido con toque Creador
**En una frase:** Un colega de Jungle que conoce bien las políticas de viaje y te las explica sin aburrirte.

### Los 3 pilares de la voz

**1. Sincero**
Dice lo que hay. Si un gasto no entra en política, lo dice. Si un viaje está fuera de presupuesto, lo dice. Sin rodeos, sin eufemismos, sin suavizadores innecesarios.

**2. Crudo**
Directo al punto. Sin preambles corporativos. Sin "estimado usuario". Sin "su solicitud ha sido recibida y está siendo procesada". Una frase donde caben dos palabras usa dos palabras.

**3. Profesional**
No soez, no informal en exceso. Los consultores de Jungle son personas muy capaces que respetan su tiempo y el de los demás. La app los trata como tal. Tuteo siempre, pero con respeto.

---

## Tono según contexto

| Situación | Tono | Ejemplo |
|-----------|------|---------|
| Onboarding / primer viaje | Cálido, orientador | "Tu primer viaje. Vamos a hacerlo fácil." |
| Flujo cotidiano | Neutro, funcional | "Añade el ticket" / "Confirma los datos" |
| Aprobación pendiente | Informativo, sin presión | "Sara tiene que aprobar esto. Suele tardar menos de una hora." |
| Viaje aprobado | Celebratorio, directo | "Aprobado. Buen viaje." |
| Nota de gastos cerrada | Satisfacción, seco | "Todo cuadra. Nota enviada a contabilidad." |
| Error de conexión | Honesto, con siguiente paso | "No pudimos conectar con TravelPerk. Revisa la conexión e inténtalo de nuevo." |
| Gasto fuera de política | Claro, sin culpa | "Este importe supera el límite diario de dietas (45€). Puedes enviarlo igualmente, pero necesitará aprobación manual." |
| Aprobación rechazada | Directo, con contexto | "Rechazado. Motivo: presupuesto agotado para este cliente. Habla con tu manager." |

---

## Palabras que usamos

```
viaje           (no "desplazamiento" ni "traslado de negocios")
ticket          (no "justificante" ni "factura simplificada")
nota de gastos  (no "informe de gastos" ni "expense report")
aprobar         (no "validar" ni "autorizar")
presupuesto     (específico — del viaje, del cliente, del mes)
límite          (claro — "tienes 45€ de dieta, quedan 12€")
pendiente       (no "en proceso de revisión")
listo           (no "completado satisfactoriamente")
tu manager      (no "el responsable jerárquico correspondiente")
```

## Palabras que nunca usamos

```
estimado/a usuario/a
su solicitud
ha sido procesada satisfactoriamente
en virtud de
de conformidad con
le informamos que
póngase en contacto con
diligenciar
cumplimentar
a la mayor brevedad posible
stakeholders
deliverables
end-to-end
sinergia
optimizar (para cosas que no son optimización real)
```

---

## Patrones de copy por tipo de elemento

### CTAs principales
```
✅ Directos, verbos de acción:
"Crear viaje"
"Añadir gasto"
"Enviar nota"
"Ver detalles"
"Aprobar"
"Rechazar"

❌ Genéricos o corporativos:
"Continuar"
"Proceder"
"Enviar solicitud"
"Confirmar operación"
```

### Estados de aprobación
```
✅ Claros y humanos:
"Pendiente de Sara García"
"Aprobado por Marcos"
"Rechazado — presupuesto agotado"
"Aprobación automática — dentro del presupuesto"

❌ Abstractos:
"En proceso de validación"
"Estado: PENDING_APPROVAL"
"Solicitud recibida"
```

### Mensajes de éxito
```
✅ Satisfactorios, sin exagerar:
"Viaje creado."
"Ticket añadido."
"Nota enviada."
"Aprobado. Buen viaje a Barcelona."

❌ Excesivos o corporativos:
"¡Enhorabuena! Has completado el proceso con éxito."
"Su solicitud ha sido registrada correctamente."
```

### Mensajes de error
```
✅ Honestos, con siguiente paso:
"No pudimos conectar con TravelPerk. Inténtalo de nuevo."
"Este ticket ya existe. ¿Es un duplicado?"
"Importe fuera del límite. Necesita aprobación manual."
"Algo falló por nuestra parte. Ya estamos en ello."

❌ Técnicos o vagos:
"Error 500"
"Ha ocurrido un error inesperado"
"Operación no permitida"
```

### Empty states
```
✅ Orientados a la acción, sin tristeza dramática:
"Sin viajes este mes. Cuando tengas uno, aparecerá aquí."
"Sin gastos pendientes. Todo en orden."
"Nada por aprobar. El equipo está al día."

❌ Condescendientes o vacíos:
"¡Empieza creando tu primer viaje!"
"No hay elementos que mostrar."
```

### Loading / estados de proceso
```
✅ Informativos, breves:
"Conectando con TravelPerk..."
"Generando nota de gastos..."
"Sincronizando con Revolut..."

❌ Genéricos:
"Cargando..."
"Por favor espere..."
"Procesando..."
```

### Notificaciones push (mobile)
```
✅ Concretas, accionables:
"Viaje a Madrid aprobado por Marcos."
"Ana García necesita que apruebes su viaje a Bilbao."
"Límite de dietas casi agotado: quedan 8€ de 45€."

❌ Genéricas:
"Tienes una notificación pendiente."
"Hay actividad en tu cuenta."
```

---

## Idioma

**Principal:** Español (España)
**Tecnicismos en inglés cuando es más natural:** check-in, ticket, budget, manager
**Sin Spanglish forzado** — si existe la palabra en español y suena natural, úsala

---

## Tono por rol de usuario

**Viajero:** Cercano, orientado a quitarle fricción. Le importa que sea rápido.

**Manager:** Informativo, al grano. No le hagas perder tiempo. Resumen ejecutivo de lo que tiene que aprobar.

**Administración/Finanzas:** Preciso, completo. Necesitan los datos correctos. Sin ambigüedad.

**RRHH:** Formal pero claro. Política aplicada, con enlace a la norma si procede.
