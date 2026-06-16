import { useNavigate, useSearchParams } from 'react-router-dom'
import { Plane } from 'lucide-react'
import { Button } from '@/components/wildtrip/atoms'

export function CountdownPage() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const day = params.get('day') === '3' ? 3 : 1

  if (day === 3) {
    return (
      <div className="min-h-screen bg-[oklch(0.08_0.04_264)] flex flex-col max-w-md mx-auto">
        <div className="flex-1 overflow-y-auto px-6 py-10 pb-4">
          {/* Time */}
          <div className="mt-8">
            <p className="font-display text-[72px] text-white leading-none tracking-tight">
              08:15
            </p>
            <p className="font-sans text-sm mt-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Miércoles, 17 de junio · Último día
            </p>
          </div>

          {/* Divider */}
          <div className="mt-8 mb-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }} />

          {/* Label */}
          <p
            className="font-sans text-[10px] font-semibold uppercase tracking-widest mb-4"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            Próximos eventos
          </p>

          {/* Event cards */}
          <div className="flex flex-col gap-3">
            {/* Checkout */}
            <div
              className="rounded-xl px-4 py-3.5 border flex items-center justify-between gap-3"
              style={{
                background: 'rgba(245, 158, 11, 0.10)',
                borderColor: 'rgba(245, 158, 11, 0.20)',
              }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xl shrink-0" aria-hidden>🏨</span>
                <div className="min-w-0">
                  <p className="font-sans text-sm font-semibold text-white leading-snug">
                    Checkout NH Finisterre
                  </p>
                  <p className="font-sans text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Hoy antes de las 12:00 · Prepagado ✓
                  </p>
                </div>
              </div>
            </div>

            {/* Vuelo vuelta */}
            <div
              className="rounded-xl px-4 py-3.5 border flex items-center justify-between gap-3"
              style={{
                background: 'rgba(255,255,255,0.08)',
                borderColor: 'rgba(255,255,255,0.10)',
              }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Plane size={20} strokeWidth={1.5} className="text-accent shrink-0" />
                <div className="min-w-0">
                  <p className="font-sans text-sm font-semibold text-white leading-snug">
                    VY 8822 · Vueling
                  </p>
                  <p className="font-sans text-xs mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    19:30 LCG → 20:40 MAD
                  </p>
                </div>
              </div>
              <p className="font-sans text-sm font-semibold text-accent shrink-0">19:30</p>
            </div>
          </div>

          {/* Footer */}
          <p className="font-sans text-xs text-center mt-10 pb-2" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Wildtrip · A Coruña · Inditex Arteixo · 15-17 jun
          </p>
        </div>

        {/* Sticky CTAs */}
        <div className="sticky-cta-navy flex flex-col gap-3">
          <Button
            variant="accent"
            size="lg"
            className="w-full"
            onClick={() => navigate('/traveler/boarding-pass?flight=return')}
          >
            Ver boarding pass vuelta
          </Button>
          <button
            onClick={() => navigate('/traveler/timeline')}
            className="w-full rounded-xl min-h-[44px] px-5 font-sans text-sm font-medium text-white/70 hover:text-white border border-white/20 hover:border-white/40 transition-colors duration-200"
          >
            Ver itinerario
          </button>
        </div>
      </div>
    )
  }

  // ─── Day 1 (default) ─────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[oklch(0.08_0.04_264)] flex flex-col max-w-md mx-auto">
      <div className="flex-1 overflow-y-auto px-6 py-10 pb-4">
      {/* Time */}
      <div className="mt-8">
        <p className="font-display text-[72px] text-white leading-none tracking-tight">
          06:20
        </p>
        <p className="font-sans text-sm mt-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Lunes, 15 de junio
        </p>
      </div>

      {/* Divider */}
      <div className="mt-8 mb-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }} />

      {/* Label */}
      <p
        className="font-sans text-[10px] font-semibold uppercase tracking-widest mb-4"
        style={{ color: 'rgba(255,255,255,0.4)' }}
      >
        Próximos eventos
      </p>

      {/* Event cards */}
      <div className="flex flex-col gap-3">
        {/* Cabify */}
        <div
          className="rounded-xl px-4 py-3.5 border flex items-center justify-between gap-3"
          style={{
            background: 'rgba(255,255,255,0.06)',
            borderColor: 'rgba(255,255,255,0.10)',
          }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xl shrink-0" aria-hidden>🚕</span>
            <div className="min-w-0">
              <p className="font-sans text-sm font-semibold text-white leading-snug">
                Tu Cabify · Sale en 25 min
              </p>
              <p className="font-sans text-xs mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Carlos M. · BMW Serie 3 · 2847 KTL
              </p>
            </div>
          </div>
          <p className="font-sans text-sm font-semibold text-white shrink-0">06:45</p>
        </div>

        {/* Vuelo */}
        <div
          className="rounded-xl px-4 py-3.5 border flex items-center justify-between gap-3"
          style={{
            background: 'rgba(255,255,255,0.06)',
            borderColor: 'rgba(255,255,255,0.10)',
          }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <Plane size={20} strokeWidth={1.5} className="text-accent shrink-0" />
            <div className="min-w-0">
              <p className="font-sans text-sm font-semibold text-white leading-snug">
                IB 3456 · Iberia
              </p>
              <p className="font-sans text-xs mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.5)' }}>
                MAD T4 → A Coruña LCG · 1h 15m
              </p>
            </div>
          </div>
          <p className="font-sans text-sm font-semibold text-accent shrink-0">07:30</p>
        </div>

        {/* Checkout */}
        <div
          className="rounded-xl px-4 py-3.5 border flex items-center justify-between gap-3"
          style={{
            background: 'rgba(245, 158, 11, 0.10)',
            borderColor: 'rgba(245, 158, 11, 0.20)',
          }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xl shrink-0" aria-hidden>🏨</span>
            <div className="min-w-0">
              <p className="font-sans text-sm font-semibold text-white leading-snug">
                Checkout NH Finisterre
              </p>
              <p className="font-sans text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Hoy antes de las 12:00
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <p className="font-sans text-xs text-center mt-10 pb-2" style={{ color: 'rgba(255,255,255,0.25)' }}>
        Wildtrip · A Coruña · Inditex Arteixo · 15-17 jun
      </p>
      </div>

      {/* Sticky CTAs */}
      <div className="sticky-cta-navy flex flex-col gap-3">
        <Button
          variant="accent"
          size="lg"
          className="w-full"
          onClick={() => navigate('/traveler/cabify')}
        >
          Ver tu Cabify
        </Button>
        <button
          onClick={() => navigate('/traveler/boarding-pass')}
          className="w-full rounded-xl min-h-[44px] px-5 font-sans text-sm font-medium text-white/70 hover:text-white border border-white/20 hover:border-white/40 transition-colors duration-200"
        >
          Ver boarding pass
        </button>
        <button
          onClick={() => navigate('/traveler/timeline')}
          className="w-full rounded-xl min-h-[44px] px-5 font-sans text-sm font-medium text-white/40 hover:text-white/70 transition-colors duration-200"
        >
          Ver itinerario completo
        </button>
      </div>
    </div>
  )
}
