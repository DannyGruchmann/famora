import { ThreadSection } from '@/components/thread-section'

interface Step {
  number: string
  title: string
  description: string
}

const STEPS: Step[] = [
  {
    number: '01',
    title: 'Ein paar ruhige Fragen',
    description:
      'Keine Formulare. Eine Frage nach der anderen, damit wir Ihre Situation verstehen.',
  },
  {
    number: '02',
    title: 'Ihre persönliche Checkliste',
    description:
      'Sortiert nach Dringlichkeit: was heute zählt, was diese Woche, was später Zeit hat.',
  },
  {
    number: '03',
    title: 'Gemeinsam abarbeiten',
    description:
      'Aufgaben in der Familie verteilen, Dokumente ablegen, Fristen im Blick behalten.',
  },
]

export function StepsSection() {
  return (
    <ThreadSection label="So läuft es ab">
      <h2 className="text-2xl text-ink">Drei Schritte, mehr nicht.</h2>

      <ol className="mt-6 flex flex-col gap-7">
        {STEPS.map((step) => (
          <li key={step.number}>
            <span className="font-heading text-sm text-accent">{step.number}</span>
            <h3 className="mt-1 text-lg text-ink">{step.title}</h3>
            <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-muted">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </ThreadSection>
  )
}
