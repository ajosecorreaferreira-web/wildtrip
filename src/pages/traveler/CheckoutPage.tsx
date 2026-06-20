import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Star } from 'lucide-react'

export function CheckoutPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-background">

      {/* Navy header */}
      <div className="bg-primary px-4 pt-12 pb-5">
        <p className="font-sans text-xs text-primary-foreground/60">
          Check-out · 17 jun · 12:00
        </p>
        <h1 className="font-display text-2xl text-primary-foreground mt-0.5">
          NH Finisterre
        </h1>
        <p className="font-sans text-sm text-primary-foreground/60 mt-0.5">
          A Coruña
        </p>
      </div>

      {/* Body */}
      <div className="flex-1 px-4 pt-5 pb-32 overflow-y-auto">

        {/* Success card */}
        <div className="rounded-xl bg-success-muted p-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={20} strokeWidth={1.5} className="text-success-text shrink-0" />
            <p className="font-sans text-sm font-semibold text-success-text">
              Check-out completado
            </p>
          </div>
          <p className="font-sans text-xs mt-1.5 text-success/70">
            Factura enviada a TravelPerk · Jungle Group
          </p>
        </div>

        {/* Info rows */}
        <div className="mt-5 flex flex-col divide-y divide-border">
          {[
            { label: 'Check-in',  value: '15 jun · 14:00'              },
            { label: 'Check-out', value: '17 jun · 12:00'              },
            { label: 'Noches',    value: '2 · NH Finisterre'           },
            { label: 'Importe',   value: '178€ · factura directa TravelPerk' },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-3.5">
              <p className="font-sans text-sm text-muted-foreground">{label}</p>
              <p className="font-sans text-sm font-semibold text-foreground text-right max-w-[55%]">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Badge */}
        <div className="mt-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success-muted font-sans text-xs font-semibold text-success-text">
            ✓ Sin cargo adicional
          </span>
        </div>
      </div>

      {/* Sticky CTAs */}
      <div className="sticky-cta flex flex-col gap-2">
        <button
          className="w-full rounded-xl min-h-[44px] px-5 font-sans text-sm font-medium text-foreground border border-border hover:bg-muted transition-colors"
          onClick={() => {}}
        >
          Ver factura
        </button>
        <button
          className="w-full rounded-xl min-h-[44px] px-5 font-sans text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1.5"
          onClick={() => navigate(-1)}
        >
          <Star size={14} strokeWidth={1.5} />
          <Star size={14} strokeWidth={1.5} />
          <Star size={14} strokeWidth={1.5} />
          <span className="ml-1">Valorar hotel</span>
        </button>
      </div>
    </div>
  )
}
