import * as React from 'react'
import { Wifi, CheckCircle2, Loader2, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/wildtrip/atoms'
import { BoardingPass } from '@/components/wildtrip/molecules'

export type CheckinLevel = 'smart' | 'qr' | 'basic'

export interface HotelCheckinProps {
  level: CheckinLevel
  hotelName: string
  hotelChain: string
  hotelStars: number
  checkinDate: string
  checkoutDate: string
  nights: number
  roomNumber?: string
  roomFloor?: string
  roomView?: string
  guestName: string
  confirmationNo: string
  totalCost: number
  checkoutTime: string
  nfcToken?: string
  qrData?: string
  onNfcUnlock?: () => Promise<boolean>
  onWebCheckin?: () => void
  onViewBoardingPass?: () => void
  className?: string
}

function formatEUR(n: number) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n)
}

// ─── Shared: top section ─────────────────────────────────────────────────────

function HotelTop({
  hotelName,
  hotelChain,
  hotelStars,
  guestName,
}: {
  hotelName: string
  hotelChain: string
  hotelStars: number
  guestName: string
}) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <p className="font-sans text-[10px] text-primary-foreground/60 uppercase tracking-widest font-semibold">
          {hotelChain}
        </p>
        <h3 className="font-display text-2xl text-primary-foreground leading-tight mt-0.5">
          {hotelName}
        </h3>
        <p className="font-sans text-xs text-primary-foreground/70 mt-1">
          {'★'.repeat(Math.min(5, hotelStars))}
        </p>
      </div>
      <div className="text-right shrink-0">
        <p className="font-sans text-[10px] text-primary-foreground/60 uppercase tracking-widest font-semibold">
          Huésped
        </p>
        <p className="font-sans text-sm font-semibold text-primary-foreground mt-0.5">
          {guestName}
        </p>
      </div>
    </div>
  )
}

// ─── Shared: dates grid ──────────────────────────────────────────────────────

function DatesGrid({
  checkinDate,
  checkoutDate,
  nights,
  checkoutTime,
}: {
  checkinDate: string
  checkoutDate: string
  nights: number
  checkoutTime: string
}) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {[
        { label: 'Check-in',   value: checkinDate },
        { label: 'Check-out',  value: checkoutDate },
        { label: 'Noches',     value: `${nights}n · ${checkoutTime}` },
      ].map(({ label, value }) => (
        <div key={label}>
          <p className="font-sans text-[10px] text-primary-foreground/60 uppercase tracking-wide font-semibold">
            {label}
          </p>
          <p className="font-sans text-sm font-semibold text-primary-foreground mt-0.5">
            {value}
          </p>
        </div>
      ))}
    </div>
  )
}

// ─── Flight Info Card (smart level only) ─────────────────────────────────────

function FlightInfoCard({
  onWebCheckin,
  onViewBoardingPass,
}: {
  onWebCheckin?: () => void
  onViewBoardingPass?: () => void
}) {
  return (
    <div className="rounded-2xl bg-muted p-4 flex flex-col gap-4">
      <div>
        <p className="font-sans text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mb-3">
          Vuelo de ida
        </p>
        <div className="flex items-end gap-3">
          <div>
            <p className="font-display text-2xl text-foreground leading-none">07:30</p>
            <p className="font-sans text-xs text-muted-foreground mt-1">MAD T4</p>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1 pb-1">
            <p className="font-sans text-[10px] text-muted-foreground">1h 15m · Directo</p>
            <div className="w-full border-t border-dashed border-border" />
            <p className="font-sans text-[10px] text-muted-foreground">IB 3456</p>
          </div>
          <div className="text-right">
            <p className="font-display text-2xl text-foreground leading-none">08:45</p>
            <p className="font-sans text-xs text-muted-foreground mt-1">LCG</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Terminal',  value: 'T4 Adolfo Suárez', accent: false },
          { label: 'Embarque',  value: '07:00',            accent: false },
          { label: 'Puerta',    value: 'B22',              accent: false },
          { label: 'Estado',    value: 'On time',          accent: true  },
        ].map(({ label, value, accent }) => (
          <div key={label}>
            <p className="font-sans text-[10px] text-muted-foreground uppercase tracking-wide font-semibold">
              {label}
            </p>
            {accent ? (
              <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-accent-soft font-sans text-xs font-semibold text-accent-text">
                {value}
              </span>
            ) : (
              <p className="font-sans text-sm font-semibold text-foreground mt-0.5">{value}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <Button variant="primary" className="w-full" onClick={onWebCheckin}>
          Hacer check-in online
        </Button>
        <Button variant="ghost" className="w-full" onClick={onViewBoardingPass}>
          Ver boarding pass
        </Button>
      </div>
    </div>
  )
}

// ─── Smart level (NFC) ───────────────────────────────────────────────────────

function NfcButton({ onUnlock }: { onUnlock?: () => Promise<boolean> }) {
  const [nfcState, setNfcState] = React.useState<'idle' | 'loading' | 'unlocked'>('idle')

  async function handleTap() {
    if (!onUnlock || nfcState !== 'idle') return
    setNfcState('loading')
    const success = await onUnlock()
    setNfcState(success ? 'unlocked' : 'idle')
  }

  return (
    <button
      onClick={handleTap}
      disabled={nfcState === 'loading' || nfcState === 'unlocked'}
      className={cn(
        'w-full flex flex-col items-center gap-2 py-4 rounded-xl transition-all duration-300',
        nfcState === 'idle' && 'bg-primary-foreground/10 hover:bg-primary-foreground/20 border border-primary-foreground/20',
        nfcState === 'loading' && 'bg-primary-foreground/10 border border-primary-foreground/20',
        nfcState === 'unlocked' && 'bg-accent border-transparent',
      )}
    >
      {nfcState === 'idle' && (
        <>
          <div className="relative">
            <Wifi size={28} strokeWidth={1.5} className="text-primary-foreground animate-ping absolute opacity-40" />
            <Wifi size={28} strokeWidth={1.5} className="text-primary-foreground relative" />
          </div>
          <p className="font-sans text-sm font-semibold text-primary-foreground">
            Toca para abrir la puerta
          </p>
        </>
      )}
      {nfcState === 'loading' && (
        <>
          <Loader2 size={28} strokeWidth={1.5} className="text-primary-foreground animate-wt-spin" />
          <p className="font-sans text-sm text-primary-foreground/70">Conectando…</p>
        </>
      )}
      {nfcState === 'unlocked' && (
        <>
          <CheckCircle2 size={28} strokeWidth={1.5} className="text-accent-foreground" />
          <p className="font-sans text-sm font-semibold text-accent-foreground">¡Puerta abierta!</p>
        </>
      )}
    </button>
  )
}

// ─── QR pattern (simulated) ──────────────────────────────────────────────────

function QrCode() {
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
  const size = 9
  const cell = 8
  return (
    <div className="flex flex-col items-center gap-3">
      <svg width={size * cell + 8} height={size * cell + 8} viewBox={`0 0 ${size * cell + 8} ${size * cell + 8}`}>
        <rect width="100%" height="100%" fill="white" rx="4" />
        {pattern.map((row, y) =>
          row.map((cell_, x) =>
            cell_ ? (
              <rect
                key={`${x}-${y}`}
                x={x * cell + 4}
                y={y * cell + 4}
                width={cell - 1}
                height={cell - 1}
                fill="var(--foreground)"
                rx="1"
              />
            ) : null
          )
        )}
      </svg>
      <p className="font-sans text-xs text-primary-foreground/70 text-center">
        Muestra este QR en recepción
      </p>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function HotelCheckin({
  level,
  hotelName,
  hotelChain,
  hotelStars,
  checkinDate,
  checkoutDate,
  nights,
  roomNumber,
  roomFloor,
  roomView,
  guestName,
  confirmationNo,
  totalCost,
  checkoutTime,
  onNfcUnlock,
  onWebCheckin,
  onViewBoardingPass,
  className,
}: HotelCheckinProps) {
  const topContent = (
    <HotelTop
      hotelName={hotelName}
      hotelChain={hotelChain}
      hotelStars={hotelStars}
      guestName={guestName}
    />
  )

  const smartBottom = (
    <div className="flex flex-col gap-4">
      <DatesGrid
        checkinDate={checkinDate}
        checkoutDate={checkoutDate}
        nights={nights}
        checkoutTime={checkoutTime}
      />
      {roomNumber && (
        <div className="rounded-xl bg-primary-foreground/10 px-4 py-3 flex items-center justify-between">
          <div>
            <p className="font-sans text-[10px] text-primary-foreground/60 uppercase tracking-wide font-semibold">
              Habitación
            </p>
            <p className="font-display text-3xl text-primary-foreground leading-none mt-1">
              {roomNumber}
            </p>
            {(roomFloor || roomView) && (
              <p className="font-sans text-xs text-primary-foreground/60 mt-1">
                {[roomFloor, roomView].filter(Boolean).join(' · ')}
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="font-sans text-[10px] text-primary-foreground/60 uppercase tracking-wide font-semibold">
              Total
            </p>
            <p className="font-sans text-sm font-semibold text-primary-foreground mt-0.5">
              {formatEUR(totalCost)}
            </p>
          </div>
        </div>
      )}
      <NfcButton onUnlock={onNfcUnlock} />
    </div>
  )

  const qrBottom = (
    <div className="flex flex-col gap-4">
      <DatesGrid
        checkinDate={checkinDate}
        checkoutDate={checkoutDate}
        nights={nights}
        checkoutTime={checkoutTime}
      />
      <QrCode />
      <div className="flex items-center justify-between">
        <p className="font-sans text-[10px] text-primary-foreground/60 uppercase tracking-wide font-semibold">
          Reserva
        </p>
        <p className="font-sans text-xs font-mono font-semibold text-primary-foreground">
          {confirmationNo}
        </p>
      </div>
    </div>
  )

  const basicBottom = (
    <div className="flex flex-col gap-4">
      <DatesGrid
        checkinDate={checkinDate}
        checkoutDate={checkoutDate}
        nights={nights}
        checkoutTime={checkoutTime}
      />
      <div className="rounded-xl bg-primary-foreground/10 px-4 py-3 text-center">
        <p className="font-sans text-[10px] text-primary-foreground/60 uppercase tracking-wide font-semibold mb-1">
          Número de reserva
        </p>
        <p className="font-mono text-2xl font-semibold text-primary-foreground tracking-wider">
          {confirmationNo}
        </p>
      </div>
    </div>
  )

  const bottomMap: Record<CheckinLevel, React.ReactNode> = {
    smart: smartBottom,
    qr: qrBottom,
    basic: basicBottom,
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <BoardingPass
        topContent={topContent}
        bottomContent={bottomMap[level]}
      />
      {level === 'smart' && (
        <FlightInfoCard
          onWebCheckin={onWebCheckin}
          onViewBoardingPass={onViewBoardingPass}
        />
      )}
      {level === 'basic' && (
        <div className="flex items-start gap-2 rounded-xl bg-warning-muted px-3 py-2.5">
          <AlertTriangle size={16} strokeWidth={1.5} className="text-warning-text shrink-0 mt-0.5" />
          <div>
            <p className="font-sans text-xs font-semibold text-warning-text">
              Este hotel no soporta check-in digital.
            </p>
            <p className="font-sans text-xs text-warning-text/80 mt-0.5 italic">
              "Tengo reserva a nombre de {guestName}, número {confirmationNo}."
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// --- Mock Data ---
export const MOCK_HOTEL_CHECKIN: Omit<HotelCheckinProps, 'level'> = {
  hotelName: 'NH Finisterre',
  hotelChain: 'NH Hotels',
  hotelStars: 4,
  checkinDate: '15 jun',
  checkoutDate: '17 jun',
  nights: 2,
  roomNumber: '412',
  roomFloor: 'Planta 4',
  roomView: 'Vista mar',
  guestName: 'Ana García',
  confirmationNo: 'NH-2026-84921',
  totalCost: 178,
  checkoutTime: '12:00',
  onNfcUnlock: async () => {
    await new Promise((r) => setTimeout(r, 1500))
    return true
  },
}
