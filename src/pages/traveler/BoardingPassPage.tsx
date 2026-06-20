import { useNavigate, useSearchParams } from 'react-router-dom'
import { Plane } from 'lucide-react'
import { BoardingPass } from '@/components/wildtrip/molecules'

function QrSvg() {
  const pattern = [
    [1,1,1,0,1,0,1,1,1],
    [1,0,1,0,0,0,1,0,1],
    [1,0,1,0,1,0,1,0,1],
    [0,0,0,1,0,1,0,0,0],
    [1,1,0,0,1,0,0,1,1],
    [0,0,0,1,0,1,0,0,0],
    [1,0,1,0,1,0,1,0,1],
    [1,0,1,0,0,0,1,0,1],
    [1,1,1,0,1,0,1,1,1],
  ]
  const cell = 12
  const size = 9
  const total = size * cell + 8
  return (
    <svg width={total} height={total} viewBox={`0 0 ${total} ${total}`}>
      <rect width="100%" height="100%" fill="white" rx="6" />
      {pattern.map((row, y) =>
        row.map((c, x) =>
          c ? (
            <rect
              key={`${x}-${y}`}
              x={x * cell + 4}
              y={y * cell + 4}
              width={cell - 1}
              height={cell - 1}
              fill="oklch(0.20 0.10 264)"
              rx="1"
            />
          ) : null
        )
      )}
    </svg>
  )
}

export function BoardingPassPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const isReturn = searchParams.get('flight') === 'return'

  const flight = isReturn
    ? {
        airline:      'Vueling · VY 8822',
        date:         'Mié, 17 jun',
        originCode:   'LCG',
        originName:   'A Coruña - Alvedro',
        destCode:     'MAD',
        destName:     'Adolfo Suárez T4',
        sale:         '19:30',
        llega:        '20:40',
        puerta:       'B08',
        asiento:      '11A',
        vuelo:        'VY 8822 · Vueling',
        clase:        'Economy',
        confirmLabel: '✓ Confirmado · On time',
      }
    : {
        airline:      'Iberia',
        date:         'Lun, 15 jun',
        originCode:   'MAD',
        originName:   'Adolfo Suárez T4',
        destCode:     'LCG',
        destName:     'A Coruña - Alvedro',
        sale:         '07:30',
        llega:        '08:45',
        puerta:       'B22',
        asiento:      '14C',
        vuelo:        'IB 3456 · Iberia',
        clase:        'Economy',
        confirmLabel: '✓ Confirmado · On time',
      }

  const topContent = (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-sans text-[10px] text-primary-foreground/60 uppercase tracking-widest font-semibold">
            Aerolínea
          </p>
          <p className="font-sans text-sm font-semibold text-primary-foreground mt-0.5">
            {flight.airline}
          </p>
        </div>
        <p className="font-sans text-xs text-primary-foreground/60">{flight.date}</p>
      </div>

      <div className="flex items-end gap-3">
        <div className="flex-1">
          <p className="font-display text-5xl text-primary-foreground leading-none">
            {flight.originCode}
          </p>
          <p className="font-sans text-xs text-primary-foreground/60 mt-1.5">
            {flight.originName}
          </p>
        </div>
        <div className="pb-6 flex flex-col items-center gap-1">
          <Plane size={18} strokeWidth={1.5} className="text-primary-foreground/50 rotate-90" />
          <p className="font-sans text-[10px] text-primary-foreground/40">
            {isReturn ? '1h 10m' : '1h 15m'}
          </p>
        </div>
        <div className="flex-1 text-right">
          <p className="font-display text-5xl text-primary-foreground leading-none">
            {flight.destCode}
          </p>
          <p className="font-sans text-xs text-primary-foreground/60 mt-1.5">
            {flight.destName}
          </p>
        </div>
      </div>
    </div>
  )

  const bottomContent = (
    <div className="flex flex-col gap-5">
      {/* 4-col grid */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Sale',    value: flight.sale    },
          { label: 'Llega',   value: flight.llega   },
          { label: 'Puerta',  value: flight.puerta  },
          { label: 'Asiento', value: flight.asiento },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="font-sans text-[10px] text-primary-foreground/60 uppercase tracking-wide font-semibold">
              {label}
            </p>
            <p className="font-sans text-sm font-semibold text-primary-foreground mt-0.5">{value}</p>
          </div>
        ))}
      </div>

      {/* Passenger rows */}
      <div className="flex flex-col gap-2">
        {[
          { label: 'Pasajero', value: 'Ana García'  },
          { label: 'Clase',    value: flight.clase  },
          { label: 'Vuelo',    value: flight.vuelo  },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between">
            <p className="font-sans text-xs text-primary-foreground/60">{label}</p>
            <p className="font-sans text-xs font-semibold text-primary-foreground">{value}</p>
          </div>
        ))}
      </div>

      {/* QR */}
      <div className="flex flex-col items-center gap-2 pt-1">
        <QrSvg />
        <p className="font-sans text-xs text-primary-foreground/60 text-center">
          Escanea en el aeropuerto
        </p>
      </div>

      {/* Status badge */}
      <div className="flex justify-center">
        <span className="px-3 py-1.5 rounded-full bg-accent-soft font-sans text-xs font-semibold text-accent-text">
          {flight.confirmLabel}
        </span>
      </div>
    </div>
  )

  return (
    <div className="h-screen bg-[oklch(0.08_0.04_264)] flex flex-col max-w-md mx-auto">
      <div className="flex-1 overflow-y-auto px-5">
        <div className="flex flex-col justify-center min-h-full py-6">

          {/* Nav row */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate(-1)}
              className="font-sans text-sm text-white/50 hover:text-white/80 transition-colors"
            >
              ← Volver
            </button>
            <p
              className="font-sans text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              Boarding pass
            </p>
          </div>

          <BoardingPass topContent={topContent} bottomContent={bottomContent} />

          <div className="flex flex-col gap-2 mt-5">
            <button className="w-full rounded-xl min-h-[44px] px-5 font-sans text-sm font-medium text-white/70 hover:text-white border border-white/20 hover:border-white/40 transition-colors duration-200">
              Añadir a Apple Wallet
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-full rounded-xl min-h-[44px] px-5 font-sans text-sm font-medium text-white/70 hover:text-white border border-white/20 hover:border-white/40 transition-colors duration-200"
            >
              {isReturn ? 'Abrir en app Vueling' : 'Abrir en app Iberia'}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
