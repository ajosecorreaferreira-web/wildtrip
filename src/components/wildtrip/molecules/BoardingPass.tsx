import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BoardingPassProps {
  topContent: React.ReactNode
  bottomContent: React.ReactNode
  className?: string
}

export function BoardingPass({ topContent, bottomContent, className }: BoardingPassProps) {
  return (
    /*
     * No overflow-hidden on the wrapper — the notch circles extend beyond the
     * card edge (-ml-2.5 / -mr-2.5) and must not be clipped.
     */
    <div
      className={cn(
        'bg-primary text-primary-foreground rounded-2xl relative',
        'shadow-lg',
        className,
      )}
    >
      {/* Top section */}
      <div className="px-6 py-5">
        {topContent}
      </div>

      {/* Notched separator */}
      <div className="flex items-center">
        {/* Left notch — bg-background creates the "bite" illusion */}
        <div className="w-5 h-5 rounded-full bg-background shrink-0 -ml-2.5 z-10" />

        {/* Dashed tear line */}
        <div className="flex-1 border-t border-dashed border-primary-foreground/20" />

        {/* Right notch */}
        <div className="w-5 h-5 rounded-full bg-background shrink-0 -mr-2.5 z-10" />
      </div>

      {/* Bottom section */}
      <div className="px-6 py-4">
        {bottomContent}
      </div>
    </div>
  )
}

// --- Mock Data ---
export const MOCK_BOARDING_PASS = {
  topContent: (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-sans text-[10px] text-primary-foreground/60 uppercase tracking-widest font-semibold">
          Origen
        </p>
        <p className="font-display text-4xl text-primary-foreground leading-none mt-1">
          MAD
        </p>
        <p className="font-sans text-xs text-primary-foreground/70 mt-1">
          Madrid Barajas
        </p>
      </div>
      <div className="text-center text-primary-foreground/40">
        <p className="font-sans text-xs">IB 3456</p>
        <p className="font-sans text-lg">→</p>
        <p className="font-sans text-xs">1h 15m</p>
      </div>
      <div className="text-right">
        <p className="font-sans text-[10px] text-primary-foreground/60 uppercase tracking-widest font-semibold">
          Destino
        </p>
        <p className="font-display text-4xl text-primary-foreground leading-none mt-1">
          LCG
        </p>
        <p className="font-sans text-xs text-primary-foreground/70 mt-1">
          A Coruña
        </p>
      </div>
    </div>
  ),
  bottomContent: (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-sans text-[10px] text-primary-foreground/60 uppercase tracking-wide font-semibold">
          Embarque
        </p>
        <p className="font-sans text-sm font-semibold text-primary-foreground mt-0.5">
          07:10
        </p>
      </div>
      <div>
        <p className="font-sans text-[10px] text-primary-foreground/60 uppercase tracking-wide font-semibold">
          Salida
        </p>
        <p className="font-sans text-sm font-semibold text-primary-foreground mt-0.5">
          07:30
        </p>
      </div>
      <div>
        <p className="font-sans text-[10px] text-primary-foreground/60 uppercase tracking-wide font-semibold">
          Puerta
        </p>
        <p className="font-sans text-sm font-semibold text-primary-foreground mt-0.5">
          C22
        </p>
      </div>
      <div className="text-right">
        <p className="font-sans text-[10px] text-primary-foreground/60 uppercase tracking-wide font-semibold">
          Asiento
        </p>
        <p className="font-sans text-sm font-semibold text-primary-foreground mt-0.5">
          14A
        </p>
      </div>
    </div>
  ),
}
