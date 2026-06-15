import { useNavigate } from 'react-router-dom'
import { Plane } from 'lucide-react'
import { Button } from '@/components/wildtrip/atoms'

export function CountdownPage() {
  const navigate = useNavigate()

  return (
    <div
      className="min-h-screen flex flex-col px-6 py-10 max-w-md mx-auto"
      style={{ background: 'oklch(0.08 0.04 264)' }}
    >
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

      {/* Actions */}
      <div className="flex flex-col gap-3 mt-8">
        <Button
          variant="accent"
          size="lg"
          className="w-full"
          onClick={() => navigate('/traveler/cabify')}
        >
          Ver tu Cabify
        </Button>
        <button
          onClick={() => navigate('/traveler/timeline')}
          className="w-full rounded-xl min-h-[44px] px-5 font-sans text-sm font-medium text-white/70 hover:text-white border border-white/20 hover:border-white/40 transition-colors duration-200"
        >
          Ver itinerario completo
        </button>
      </div>

      {/* Footer note */}
      <p className="font-sans text-xs text-center mt-auto pt-10" style={{ color: 'rgba(255,255,255,0.25)' }}>
        Wildtrip · A Coruña · Inditex Arteixo · 15-17 jun
      </p>
    </div>
  )
}
