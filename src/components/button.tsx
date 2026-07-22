import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  fullWidth?: boolean
  children: ReactNode
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-hover',
  secondary: 'border border-line-strong bg-surface text-ink hover:bg-surface-soft',
  ghost: 'text-ink-muted hover:text-ink hover:bg-surface-soft',
}

export function Button({
  variant = 'primary',
  fullWidth = false,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const width = fullWidth ? 'w-full' : ''

  return (
    <button
      type="button"
      className={`inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-full px-7 text-base font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40 ${VARIANT_CLASSES[variant]} ${width} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
