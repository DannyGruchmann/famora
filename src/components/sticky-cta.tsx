import type { ReactNode } from 'react'

interface StickyCtaProps {
  children: ReactNode
  /** Optionaler Hinweis über dem Button, z. B. "Kostenlos, ohne Anmeldung" */
  note?: string
}

/**
 * Hält die Primäraktion mobil im Daumenbereich am unteren Rand.
 * pb-[env(safe-area-inset-bottom)] verhindert, dass die iPhone-Home-Indicator-Leiste
 * den Button überdeckt.
 */
export function StickyCta({ children, note }: StickyCtaProps) {
  return (
    <div className="sticky bottom-0 z-40 border-t border-line bg-base/90 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-sm">
      <div className="mx-auto max-w-md">
        {children}
        {note !== undefined && (
          <p className="mt-2 text-center text-xs text-ink-soft">{note}</p>
        )}
      </div>
    </div>
  )
}
