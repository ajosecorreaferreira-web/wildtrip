import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, X, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button, Input, Stepper, BudgetBar } from '@/components/wildtrip/atoms'
import { FlightRow, HotelCard, CabifyLegRow } from '@/components/wildtrip/molecules'

export interface TripWizardProps {
  onCancel?: () => void
}

const STEP_META = [
  { caption: 'Nueva solicitud',   title: '¿A dónde vas?',              sub: null },
  { caption: 'Vuelo de ida',      title: 'MAD → LCG',                  sub: 'Lunes 15 jun · Barajas T4' },
  { caption: 'Vuelo de vuelta',   title: 'LCG → MAD',                  sub: 'Miércoles 17 jun' },
  { caption: 'Hotel',             title: 'A Coruña · 2 noches',        sub: '15-17 jun' },
  { caption: 'Desplazamientos',   title: 'Generados automáticamente',  sub: null },
  { caption: 'Resumen',           title: 'Revisa antes de enviar',     sub: null },
]

const FLIGHTS_OUT = [
  {
    id: 'IB3456', airline: 'IBERIA', flightCode: 'IB 3456',
    departure: '07:30', arrival: '08:45', origin: 'MAD', destination: 'LCG',
    duration: '1h 15m', direct: true, price: 187,
    badge: 'Más barato', badgeVariant: 'success' as const,
  },
  {
    id: 'VY8821', airline: 'VUELING', flightCode: 'VY 8821',
    departure: '10:15', arrival: '11:25', origin: 'MAD', destination: 'LCG',
    duration: '1h 10m', direct: true, price: 143,
  },
  {
    id: 'IB3462', airline: 'IBERIA', flightCode: 'IB 3462',
    departure: '14:10', arrival: '15:20', origin: 'MAD', destination: 'LCG',
    duration: '1h 10m', direct: true, price: 201,
    badge: 'Último vuelo útil', badgeVariant: 'info' as const,
  },
]

const FLIGHTS_RETURN = [
  {
    id: 'IB3467', airline: 'IBERIA', flightCode: 'IB 3467',
    departure: '17:00', arrival: '18:10', origin: 'LCG', destination: 'MAD',
    duration: '1h 10m', direct: true, price: 99,
    badge: 'Recomendado', badgeVariant: 'success' as const,
  },
  {
    id: 'VY8822', airline: 'VUELING', flightCode: 'VY 8822',
    departure: '19:30', arrival: '20:40', origin: 'LCG', destination: 'MAD',
    duration: '1h 10m', direct: true, price: 87,
    badge: 'Más barato', badgeVariant: 'success' as const,
  },
  {
    id: 'IB3471', airline: 'IBERIA', flightCode: 'IB 3471',
    departure: '21:10', arrival: '22:20', origin: 'LCG', destination: 'MAD',
    duration: '1h 10m', direct: true, price: 124,
  },
]

const HOTELS = [
  {
    id: 'nh-finisterre', name: 'NH Finisterre', stars: 4,
    description: 'Centro · 8km de Arteixo',
    pricePerNight: 89, totalPrice: 178, nights: 2,
    badge: 'Recomendado', badgeVariant: 'success' as const,
  },
  {
    id: 'melia', name: 'Meliá María Pita', stars: 4,
    description: 'Centro · 9km de Arteixo',
    pricePerNight: 105, totalPrice: 210, nights: 2,
  },
  {
    id: 'hesperia', name: 'Hotel Hesperia A Coruña', stars: 3,
    description: 'Centro · 7km de Arteixo',
    pricePerNight: 67, totalPrice: 134, nights: 2,
    badge: 'Más económico', badgeVariant: 'muted' as const,
  },
]

const CABIFY_LEGS = [
  { origin: 'Casa · Madrid',        destination: 'MAD T4',              day: 'Lun 15 jun', time: '06:00', estimatedPrice: 18, auto: true },
  { origin: 'Aeropuerto LCG',       destination: 'NH Finisterre',       day: 'Lun 15 jun', time: '09:00', estimatedPrice: 22, auto: true },
  { origin: 'NH Finisterre',        destination: 'Inditex Arteixo',     day: 'Mar 16 jun', time: '08:30', estimatedPrice: 14, auto: true },
  { origin: 'Inditex Arteixo',      destination: 'NH Finisterre',       day: 'Mar 16 jun', time: '18:00', estimatedPrice: 14, auto: true },
  { origin: 'NH Finisterre',        destination: 'Aeropuerto LCG',      day: 'Mié 17 jun', time: '17:30', estimatedPrice: 22, auto: true },
  { origin: 'MAD T4',               destination: 'Casa · Madrid',       day: 'Mié 17 jun', time: '21:00', estimatedPrice: 18, auto: true },
]

const SUGGESTIONS = [
  { label: 'A Coruña, España',   caption: 'Capital de Galicia' },
  { label: 'Arteixo, A Coruña', caption: 'Polígono de Sabón' },
]

function ctaLabel(airline: string, time: string) {
  const name = airline.charAt(0) + airline.slice(1).toLowerCase()
  return `Continuar con ${name} ${time} ›`
}

export function TripWizard({ onCancel }: TripWizardProps) {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [destination, setDestination] = useState('A Coruña')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedFlightOut, setSelectedFlightOut] = useState('IB3456')
  const [selectedFlightReturn, setSelectedFlightReturn] = useState('VY8822')
  const [selectedHotel, setSelectedHotel] = useState('nh-finisterre')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const meta = STEP_META[step - 1]
  const flightOut    = FLIGHTS_OUT.find(f => f.id === selectedFlightOut)!
  const flightReturn = FLIGHTS_RETURN.find(f => f.id === selectedFlightReturn)!
  const hotel        = HOTELS.find(h => h.id === selectedHotel)!
  const total        = flightOut.price + flightReturn.price + hotel.totalPrice + 108

  async function handleSubmit() {
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 1500))
    navigate('/traveler?state=upcoming')
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">

      {/* ── Fixed navy header ── */}
      <div className="bg-primary px-4 pt-4 pb-3 shrink-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-sans text-xs text-primary-foreground/60">
              Paso {step} de 6 · {meta.caption}
            </p>
            <h1 className="font-display text-[22px] leading-tight text-primary-foreground mt-0.5">
              {meta.title}
            </h1>
            {meta.sub && (
              <p className="font-sans text-xs text-primary-foreground/60 mt-0.5">
                {meta.sub}
              </p>
            )}
          </div>
          {step === 1 && onCancel && (
            <button
              onClick={onCancel}
              aria-label="Cerrar"
              className="w-9 h-9 rounded-full flex items-center justify-center text-primary-foreground/60 hover:text-primary-foreground hover:bg-white/10 transition-colors shrink-0 mt-0.5"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          )}
        </div>
        <Stepper steps={6} current={step} invert className="mt-3" />
      </div>

      {/* ── Scrollable content ── */}
      <div className="flex-1 overflow-y-auto px-4 py-6 pb-24">

        {/* Paso 1 — Destino */}
        {step === 1 && (
          <div className="space-y-4">
            <p className="font-sans text-[13px] text-muted-foreground">
              Ciudad o lugar de trabajo
            </p>
            <div className="relative">
              <Input
                iconLeft={<MapPin size={16} strokeWidth={1.5} />}
                value={destination}
                onChange={e => setDestination(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                placeholder="Ej. A Coruña, España"
                autoFocus
              />
              {showSuggestions && destination.trim() && (
                <div className="mt-1 rounded-xl border border-border bg-card overflow-hidden">
                  {SUGGESTIONS.map((s, i) => (
                    <button
                      key={i}
                      onMouseDown={() => {
                        setDestination(s.label)
                        setShowSuggestions(false)
                      }}
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted transition-colors',
                        i < SUGGESTIONS.length - 1 && 'border-b border-border'
                      )}
                    >
                      <span className="text-base" aria-hidden>📍</span>
                      <div>
                        <p className="font-sans text-sm text-foreground">{s.label}</p>
                        <p className="font-sans text-xs text-muted-foreground">{s.caption}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Paso 2 — Vuelo ida */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <button className="flex-1 rounded-full px-4 py-2 font-sans text-sm font-semibold bg-primary text-primary-foreground">
                Lun 15 jun
              </button>
              <button className="flex-1 rounded-full px-4 py-2 font-sans text-sm font-medium border border-border text-foreground hover:bg-muted transition-colors">
                Mié 17 jun
              </button>
            </div>
            <div className="space-y-3">
              {FLIGHTS_OUT.map(f => (
                <FlightRow
                  key={f.id}
                  airline={f.airline}
                  flightCode={f.flightCode}
                  departure={f.departure}
                  arrival={f.arrival}
                  origin={f.origin}
                  destination={f.destination}
                  duration={f.duration}
                  direct={f.direct}
                  price={f.price}
                  badge={f.badge}
                  badgeVariant={f.badgeVariant}
                  selected={selectedFlightOut === f.id}
                  onClick={() => setSelectedFlightOut(f.id)}
                />
              ))}
            </div>
            <p className="font-sans text-xs text-muted-foreground text-center">
              Precios vía TravelPerk · tarifa corporativa Jungle
            </p>
          </div>
        )}

        {/* Paso 3 — Vuelo vuelta */}
        {step === 3 && (
          <div className="space-y-3">
            {FLIGHTS_RETURN.map(f => (
              <FlightRow
                key={f.id}
                airline={f.airline}
                flightCode={f.flightCode}
                departure={f.departure}
                arrival={f.arrival}
                origin={f.origin}
                destination={f.destination}
                duration={f.duration}
                direct={f.direct}
                price={f.price}
                badge={f.badge}
                badgeVariant={f.badgeVariant}
                selected={selectedFlightReturn === f.id}
                onClick={() => setSelectedFlightReturn(f.id)}
              />
            ))}
          </div>
        )}

        {/* Paso 4 — Hotel */}
        {step === 4 && (
          <div className="space-y-3">
            {HOTELS.map(h => (
              <HotelCard
                key={h.id}
                name={h.name}
                stars={h.stars}
                description={h.description}
                pricePerNight={h.pricePerNight}
                totalPrice={h.totalPrice}
                nights={h.nights}
                badge={h.badge}
                badgeVariant={h.badgeVariant}
                selected={selectedHotel === h.id}
                onClick={() => setSelectedHotel(h.id)}
              />
            ))}
          </div>
        )}

        {/* Paso 5 — Cabify */}
        {step === 5 && (
          <div>
            <span className="inline-flex px-2.5 py-1 rounded-full font-sans text-[10px] font-semibold uppercase tracking-wide bg-success-muted text-success-text">
              Automático · basado en tu vuelo y hotel
            </span>
            <p className="font-sans text-sm text-muted-foreground mt-3 mb-4">
              Wildtrip calculó estos trayectos. Puedes editarlos.
            </p>
            <div className="rounded-xl border border-border bg-card overflow-hidden px-3 divide-y divide-border">
              {CABIFY_LEGS.map((leg, i) => (
                <CabifyLegRow key={i} {...leg} />
              ))}
            </div>
            <div className="flex justify-between items-center py-3 border-t border-border mt-2">
              <span className="font-sans text-sm text-muted-foreground">Total Cabify estimado</span>
              <span className="font-sans text-sm font-semibold text-foreground">~108€</span>
            </div>
          </div>
        )}

        {/* Paso 6 — Resumen */}
        {step === 6 && (
          <div className="space-y-4">
            <p className="font-sans text-xs text-muted-foreground">
              A Coruña · Inditex Arteixo
            </p>

            {/* Filas resumen */}
            <div className="rounded-xl border border-border bg-card overflow-hidden divide-y divide-border">
              <div className="flex justify-between items-center px-4 py-3 gap-3">
                <span className="font-sans text-sm text-foreground">
                  ✈️ Vuelo ida · {flightOut.flightCode} · {flightOut.departure} MAD→LCG
                </span>
                <span className="font-sans text-sm font-semibold text-foreground shrink-0">
                  {flightOut.price}€
                </span>
              </div>
              <div className="flex justify-between items-center px-4 py-3 gap-3">
                <span className="font-sans text-sm text-foreground">
                  ✈️ Vuelo vuelta · {flightReturn.flightCode} · {flightReturn.departure} LCG→MAD
                </span>
                <span className="font-sans text-sm font-semibold text-foreground shrink-0">
                  {flightReturn.price}€
                </span>
              </div>
              <div className="flex justify-between items-center px-4 py-3 gap-3">
                <span className="font-sans text-sm text-foreground">
                  🏨 {hotel.name} · 2 noches
                </span>
                <span className="font-sans text-sm font-semibold text-foreground shrink-0">
                  {hotel.totalPrice}€
                </span>
              </div>
              <div className="flex justify-between items-center px-4 py-3 gap-3">
                <span className="font-sans text-sm text-foreground">
                  🚕 Cabify · 6 trayectos
                </span>
                <span className="font-sans text-sm font-semibold text-foreground shrink-0">
                  ~108€
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex justify-between items-center">
              <span className="font-sans text-sm text-muted-foreground">Total estimado</span>
              <span className="font-display text-2xl text-primary">{total}€</span>
            </div>

            {/* Presupuesto */}
            <div className="bg-muted rounded-xl p-4 space-y-2">
              <p className="font-sans text-xs text-muted-foreground">Presupuesto Inditex: 2.000€</p>
              <BudgetBar variant="compact" spent={total} total={2000} />
              <p className="font-sans text-xs text-muted-foreground text-right">
                {total}€ · {Math.round((total / 2000) * 100)}% del presupuesto
              </p>
            </div>

            {/* Banner info */}
            <div className="bg-info-muted rounded-xl p-4 flex gap-3">
              <Info
                size={16}
                strokeWidth={1.5}
                className="text-info shrink-0 mt-0.5"
              />
              <p className="font-sans text-sm text-foreground">
                Al enviar, Sara García recibirá una notificación push.{' '}
                Suele aprobar en menos de 30 minutos.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── Sticky CTA ── */}
      <div className="sticky-cta">
        {step === 1 && (
          <Button
            variant="primary"
            className="w-full"
            disabled={!destination.trim()}
            onClick={() => setStep(2)}
          >
            Siguiente ›
          </Button>
        )}
        {step === 2 && (
          <Button variant="primary" className="w-full" onClick={() => setStep(3)}>
            {ctaLabel(flightOut.airline, flightOut.departure)}
          </Button>
        )}
        {step === 3 && (
          <Button variant="primary" className="w-full" onClick={() => setStep(4)}>
            {ctaLabel(flightReturn.airline, flightReturn.departure)}
          </Button>
        )}
        {step === 4 && (
          <Button variant="primary" className="w-full" onClick={() => setStep(5)}>
            Ver desplazamientos ›
          </Button>
        )}
        {step === 5 && (
          <div className="space-y-2">
            <Button variant="primary" className="w-full" onClick={() => setStep(6)}>
              Ver resumen ›
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => setStep(6)}>
              Saltar este paso
            </Button>
          </div>
        )}
        {step === 6 && (
          <Button
            variant="accent"
            size="lg"
            className="w-full"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            ✈ Enviar solicitud a Sara García
          </Button>
        )}
      </div>
    </div>
  )
}
