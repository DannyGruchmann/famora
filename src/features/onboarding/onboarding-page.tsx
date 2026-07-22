import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/button'
import { StickyCta } from '@/components/sticky-cta'
import { ROUTES } from '@/routes.constants'
import { AnswerOptionButton } from './answer-option-button'
import { OnboardingProgress } from './onboarding-progress'
import { useOnboarding } from './useOnboarding'

export function OnboardingPage() {
  const navigate = useNavigate()
  const {
    currentQuestion,
    selectedIds,
    blockedIds,
    canContinue,
    isLastStep,
    stepIndex,
    totalSteps,
    selectOption,
    goNext,
    goBack,
  } = useOnboarding()

  const handleBack = () => {
    if (stepIndex === 0) {
      navigate(ROUTES.landing)
      return
    }
    goBack()
  }

  const handleContinue = () => {
    if (isLastStep) {
      navigate(ROUTES.dashboard)
      return
    }
    goNext()
  }

  if (!currentQuestion) return null

  return (
    <div className="flex min-h-dvh flex-col">
      <OnboardingProgress stepIndex={stepIndex} totalSteps={totalSteps} onBack={handleBack} />

      <main className="mx-auto w-full max-w-lg flex-1 px-5 pt-10 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">
          {currentQuestion.eyebrow}
        </p>

        <h1 className="mt-3 text-[2rem] leading-tight text-ink">{currentQuestion.title}</h1>

        {currentQuestion.hint !== undefined && (
          <p className="mt-3 leading-relaxed text-ink-muted">{currentQuestion.hint}</p>
        )}

        <div className="mt-8 flex flex-col gap-3">
          {currentQuestion.options.map((option) => (
            <AnswerOptionButton
              key={option.id}
              option={option}
              selected={selectedIds.includes(option.id)}
              disabled={blockedIds.has(option.id)}
              onSelect={selectOption}
            />
          ))}
        </div>
      </main>

      <StickyCta>
        <Button fullWidth disabled={!canContinue} onClick={handleContinue}>
          {isLastStep ? 'Meine Checkliste öffnen' : 'Weiter'}
        </Button>
      </StickyCta>
    </div>
  )
}
