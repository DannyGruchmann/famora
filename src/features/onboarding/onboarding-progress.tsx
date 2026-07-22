import { ArrowLeft } from 'lucide-react'

interface OnboardingProgressProps {
  stepIndex: number
  /** null, solange die Gesamtzahl der Fragen noch nicht feststeht */
  totalSteps: number | null
  onBack: () => void
}

export function OnboardingProgress({ stepIndex, totalSteps, onBack }: OnboardingProgressProps) {
  const rate = totalSteps === null ? 0 : Math.round(((stepIndex + 1) / totalSteps) * 100)

  return (
    <header className="sticky top-0 z-30 bg-base/90 backdrop-blur-sm">
      <div className="flex items-center gap-3 px-3 py-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Zurück"
          className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-soft"
        >
          <ArrowLeft className="size-5" />
        </button>

        <span className="text-sm text-ink-soft">
          {totalSteps === null ? 'Frage 1' : `Frage ${stepIndex + 1} von ${totalSteps}`}
        </span>
      </div>

      <div
        className="h-0.5 w-full bg-line"
        role="progressbar"
        aria-valuenow={rate}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Fortschritt im Onboarding"
      >
        <div
          className="h-full bg-primary transition-[width] duration-300"
          style={{ width: `${rate}%` }}
        />
      </div>
    </header>
  )
}
