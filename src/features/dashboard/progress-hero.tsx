import { Clock } from 'lucide-react'
import { ProgressRing } from '@/components/progress-ring'
import type { Deadline } from './dashboard.types'

interface ProgressHeroProps {
  doneCount: number
  totalCount: number
  completionRate: number
  nextDeadline: Deadline | null
}

export function ProgressHero({
  doneCount,
  totalCount,
  completionRate,
  nextDeadline,
}: ProgressHeroProps) {
  return (
    <section className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
            Gesamtfortschritt
          </p>
          <h2 className="mt-2 text-2xl leading-tight text-ink">
            {doneCount} von {totalCount} Aufgaben erledigt
          </h2>
        </div>

        <ProgressRing rate={completionRate} />
      </div>

      {nextDeadline !== null && (
        <div className="mt-5 flex items-center gap-3 rounded-xl bg-accent-soft px-3.5 py-3">
          <Clock className="size-5 shrink-0 text-danger" strokeWidth={1.75} aria-hidden="true" />
          <p className="text-sm leading-snug text-ink">
            <span className="font-medium">Nächste Frist:</span> {nextDeadline.title} – noch{' '}
            <span className="font-medium text-danger">{nextDeadline.daysLeft} Tage</span>
          </p>
        </div>
      )}
    </section>
  )
}
