import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  iconLeft?: React.ReactNode
}

export function Input({ label, error, iconLeft, id, className, ...props }: InputProps) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-foreground font-sans"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {iconLeft && (
          <span className="absolute left-3 text-muted-foreground pointer-events-none flex items-center">
            {iconLeft}
          </span>
        )}
        <input
          id={inputId}
          className={cn(
            'w-full min-h-11 rounded-xl border bg-background text-foreground font-sans text-sm',
            'transition-all duration-[180ms] ease-[var(--ease-default)]',
            'placeholder:text-muted-foreground',
            'focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20',
            iconLeft ? 'pl-9 pr-3 py-2.5' : 'px-3 py-2.5',
            error
              ? 'border-destructive focus:ring-destructive/20 focus:border-destructive'
              : 'border-border',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs font-medium text-destructive font-sans" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

// --- Mock Data ---
export const MOCK_INPUT_STATES = {
  default:   { label: 'Destino',    placeholder: 'Ciudad o aeropuerto' },
  withIcon:  { label: 'Buscar',     placeholder: 'Barcelona, Madrid…' },
  withError: { label: 'Email',      placeholder: 'tu@empresa.com', error: 'Introduce un email válido.' },
  disabled:  { label: 'ID de viaje', placeholder: 'WT-2024-001', disabled: true },
}
