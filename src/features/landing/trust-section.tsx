import { Lock, Server, UserX } from 'lucide-react'
import { ThreadSection } from '@/components/thread-section'

interface TrustPoint {
  icon: typeof Lock
  title: string
  description: string
}

const TRUST_POINTS: TrustPoint[] = [
  {
    icon: Server,
    title: 'Server in Deutschland',
    description: 'Ihre Daten verlassen die EU nicht.',
  },
  {
    icon: Lock,
    title: 'Verschlüsselt gespeichert',
    description: 'Dokumente liegen in einem privaten, verschlüsselten Bereich.',
  },
  {
    icon: UserX,
    title: 'Kein Weiterverkauf',
    description: 'Keine Werbung, kein Datenhandel. Nie.',
  },
]

export function TrustSection() {
  return (
    <ThreadSection label="Vertrauen">
      <h2 className="text-2xl text-ink">Ihre Daten bleiben Ihre.</h2>

      <ul className="mt-5 flex flex-col gap-4">
        {TRUST_POINTS.map((point) => {
          const Icon = point.icon

          return (
            <li key={point.title} className="flex items-start gap-3.5">
              <Icon className="mt-0.5 size-5 shrink-0 text-sage" strokeWidth={1.75} aria-hidden="true" />
              <span>
                <span className="block text-[0.95rem] font-medium text-ink">{point.title}</span>
                <span className="block text-sm text-ink-muted">{point.description}</span>
              </span>
            </li>
          )
        })}
      </ul>
    </ThreadSection>
  )
}
