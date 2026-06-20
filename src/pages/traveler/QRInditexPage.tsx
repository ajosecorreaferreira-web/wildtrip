import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Building2, MapPin, Clock, User } from 'lucide-react'

function QrSvg() {
  const pattern = [
    [1,1,1,1,1,1,1, 0, 1,0,1, 0, 1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1, 0, 0,1,0, 0, 1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1, 0, 1,0,1, 0, 1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1, 0, 0,1,0, 0, 1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1, 0, 1,0,1, 0, 1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1, 0, 0,1,0, 0, 1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1, 0, 1,0,1, 0, 1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0, 0, 0,1,0, 0, 0,0,0,0,0,0,0],
    [1,1,0,1,0,1,1, 0, 1,0,1, 0, 1,1,0,1,0,1,1],
    [0,1,0,0,1,0,0, 1, 0,1,0, 1, 0,0,1,0,0,1,0],
    [1,0,0,1,0,0,1, 0, 1,0,1, 0, 1,0,0,1,0,0,1],
    [0,0,1,0,1,0,0, 1, 0,1,0, 1, 0,1,0,0,1,0,0],
    [1,1,1,1,1,1,1, 0, 1,0,1, 1, 0,1,0,1,0,1,0],
    [1,0,0,0,0,0,1, 0, 0,1,0, 0, 1,0,1,0,1,0,1],
    [1,0,1,1,1,0,1, 0, 1,0,1, 1, 0,1,0,1,0,1,0],
    [1,0,1,1,1,0,1, 1, 0,1,0, 0, 1,0,1,0,1,0,1],
    [1,0,1,1,1,0,1, 0, 1,0,1, 1, 0,1,0,1,0,1,0],
    [1,0,0,0,0,0,1, 0, 0,1,0, 0, 1,0,1,0,1,0,1],
    [1,1,1,1,1,1,1, 0, 1,0,1, 1, 0,1,0,1,0,1,0],
  ]
  const cell = 9
  const padding = 5
  const total = 19 * cell + padding * 2

  return (
    <svg width={200} height={200} viewBox={`0 0 ${total} ${total}`} xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="white" rx="8" />
      {pattern.map((row, y) =>
        row.map((c, x) =>
          c ? (
            <rect
              key={`${x}-${y}`}
              x={x * cell + padding}
              y={y * cell + padding}
              width={cell - 1}
              height={cell - 1}
              style={{ fill: 'var(--color-primary)' }}
              rx="1"
            />
          ) : null
        )
      )}
    </svg>
  )
}

export function QRInditexPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-screen bg-primary overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-4 shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-white/70"
        >
          <ArrowLeft size={20} strokeWidth={1.5} />
          <span className="font-sans text-sm">Volver</span>
        </button>
        <span className="font-sans text-xs text-white/60 uppercase tracking-widest">Acceso</span>
        <div className="w-16" />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto flex flex-col items-center px-5 pb-safe">
        <p className="font-sans text-[11px] uppercase tracking-widest text-white/40 mt-12">
          INDITEX
        </p>
        <h1 className="font-display text-[28px] text-white text-center mt-1">Arteixo</h1>
        <p className="font-sans text-xs text-white/50">Polígono de Sabón · A Coruña</p>

        <div className="bg-white rounded-2xl p-4 mt-8">
          <QrSvg />
        </div>

        <p className="font-sans text-[12px] text-white/40 mt-3">
          Escanea en la entrada principal
        </p>

        <div className="mt-4 px-3 py-1.5 rounded-full bg-success/20 border border-success/30">
          <span className="font-sans text-xs font-semibold text-success">
            ● Válido hoy · 15 jun · 09:00 – 19:00
          </span>
        </div>

        <div className="w-full rounded-xl border border-white/10 p-4 mt-6 flex flex-col gap-3 bg-white/[0.08]">
          <div className="flex items-center gap-3">
            <Building2 size={16} strokeWidth={1.5} className="text-white/40 shrink-0" />
            <span className="font-sans text-sm text-white">Inditex Arteixo HQ</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={16} strokeWidth={1.5} className="text-white/40 shrink-0" />
            <span className="font-sans text-sm text-white">Polígono de Sabón, Arteixo, A Coruña</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={16} strokeWidth={1.5} className="text-white/40 shrink-0" />
            <span className="font-sans text-sm text-white">Entrada: 09:00 · Salida: 18:00</span>
          </div>
          <div className="flex items-center gap-3">
            <User size={16} strokeWidth={1.5} className="text-white/40 shrink-0" />
            <span className="font-sans text-sm text-white">Ana García · Jungle Studio</span>
          </div>
        </div>

        <p className="font-sans text-[11px] text-white/25 mt-6 mb-6 text-center">
          Acceso gestionado por Wildtrip · Jungle Group
        </p>
      </div>
    </div>
  )
}
