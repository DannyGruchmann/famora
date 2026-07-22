import type { ReactNode } from 'react'

interface ThreadSectionProps {
  /** Kleines Label am Knotenpunkt, z. B. "Schritt 1" */
  label: string
  children: ReactNode
}

/**
 * Eine Station am "Faden" – der durchgehenden Linie, die sich durch die Landingpage zieht.
 * Die Linie selbst liegt in der Landingpage (left-3.5), der Knoten hier muss darauf zentriert
 * sitzen: left-[9px] + halbe Knotenbreite (5px) = 14px = left-3.5.
 */
export function ThreadSection({ label, children }: ThreadSectionProps) {
  return (
    <section className="relative pl-9">
      <span
        className="absolute left-[9px] top-1.5 size-2.5 rounded-full bg-primary ring-4 ring-base"
        aria-hidden="true"
      />
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">{label}</p>
      <div className="mt-4">{children}</div>
    </section>
  )
}
