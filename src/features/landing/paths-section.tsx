import { Link } from 'react-router-dom'
import { ArrowRight, HeartHandshake, ShieldCheck } from 'lucide-react'
import { ThreadSection } from '@/components/thread-section'
import { ROUTES } from '@/routes.constants'

interface PathOption {
  id: string
  icon: typeof HeartHandshake
  title: string
  description: string
}

const PATH_OPTIONS: PathOption[] = [
  {
    id: 'after-death',
    icon: HeartHandshake,
    title: 'Jemand ist gestorben',
    description: 'Wir sortieren mit Ihnen, was sofort zählt – und was warten kann.',
  },
  {
    id: 'prepare',
    icon: ShieldCheck,
    title: 'Ich möchte vorsorgen',
    description: 'Legen Sie in Ruhe ab, was Ihre Familie im Ernstfall wissen muss.',
  },
]

export function PathsSection() {
  return (
    <ThreadSection label="Ihr Einstieg">
      <h2 className="text-2xl text-ink">Wo stehen Sie gerade?</h2>

      <div className="mt-5 flex flex-col gap-3">
        {PATH_OPTIONS.map((option) => {
          const Icon = option.icon

          return (
            <Link
              key={option.id}
              to={ROUTES.onboarding}
              className="group flex items-start gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-sage focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Icon className="size-5" strokeWidth={1.75} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block font-medium text-ink">{option.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-ink-muted">
                  {option.description}
                </span>
              </span>

              <ArrowRight
                className="mt-3 size-4 shrink-0 text-ink-soft transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          )
        })}
      </div>
    </ThreadSection>
  )
}
