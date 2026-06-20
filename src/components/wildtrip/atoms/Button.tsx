import * as React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost'
export type ButtonSize = 'sm' | 'base' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]',
  secondary:
    'bg-secondary text-secondary-foreground hover:opacity-90',
  accent:
    'bg-accent text-accent-foreground hover:-translate-y-px hover:shadow-md',
  ghost:
    'bg-transparent border border-border text-foreground hover:bg-muted',
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm:   'h-8 px-3 text-sm gap-1.5',
  base: 'h-11 px-4 text-sm gap-2',
  lg:   'h-12 px-6 text-base gap-2',
}

export function Button({
  variant = 'primary',
  size = 'base',
  loading = false,
  iconLeft,
  iconRight,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading
  return (
    <button
      disabled={isDisabled}
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-sans font-semibold',
        'transition-all duration-[var(--duration-base)] ease-[var(--ease-default)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <Loader2 size={16} strokeWidth={1.5} className="animate-wt-spin" />
      ) : (
        <>
          {iconLeft}
          {children}
          {iconRight}
        </>
      )}
    </button>
  )
}

// --- Mock Data ---
export const MOCK_BUTTON_VARIANTS: { variant: ButtonVariant; label: string }[] = [
  { variant: 'primary',   label: 'Confirmar viaje' },
  { variant: 'secondary', label: 'Cancelar' },
  { variant: 'accent',    label: 'Aprobar solicitud' },
  { variant: 'ghost',     label: 'Ver detalles' },
]
