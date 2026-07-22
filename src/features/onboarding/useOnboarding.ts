import { useCallback, useMemo, useState } from 'react'
import { MODE_QUESTION_ID, QUESTIONS } from './onboarding.questions'
import type { OnboardingAnswers, Question } from './onboarding.types'

/**
 * Bei Mehrfachauswahl schließen sich exklusive Optionen ("Noch nichts davon")
 * und normale Optionen gegenseitig aus. Liefert die aktuell gesperrten Options-IDs.
 */
function getBlockedIds(question: Question | undefined, selected: string[]): Set<string> {
  if (question?.multiple !== true) return new Set()

  const exclusive = question.options.filter((option) => option.exclusive === true)
  if (exclusive.length === 0 || selected.length === 0) return new Set()

  const isExclusiveSelected = exclusive.some((option) => selected.includes(option.id))
  const blocked = isExclusiveSelected
    ? question.options.filter((option) => option.exclusive !== true)
    : exclusive

  return new Set(blocked.map((option) => option.id))
}

/**
 * State-Maschine des Onboardings: welche Frage ist sichtbar, was wurde geantwortet,
 * darf weitergeklickt werden. Die Komponenten bleiben dadurch reine Darstellung.
 */
export function useOnboarding() {
  const [answers, setAnswers] = useState<OnboardingAnswers>({})
  const [stepIndex, setStepIndex] = useState(0)

  // Alle Folgefragen hängen am gewählten Pfad. Vorher steht die Gesamtzahl noch nicht fest.
  const isPathChosen = answers[MODE_QUESTION_ID] !== undefined

  const visibleQuestions = useMemo(
    () => QUESTIONS.filter((question) => question.showIf?.(answers) !== false),
    [answers],
  )

  const currentQuestion = visibleQuestions[stepIndex]
  const selectedIds = useMemo(
    () => (currentQuestion ? (answers[currentQuestion.id] ?? []) : []),
    [currentQuestion, answers],
  )
  const canContinue = selectedIds.length > 0
  const isLastStep = isPathChosen && stepIndex === visibleQuestions.length - 1

  const blockedIds = useMemo(
    () => getBlockedIds(currentQuestion, selectedIds),
    [currentQuestion, selectedIds],
  )

  const selectOption = useCallback(
    (optionId: string) => {
      if (!currentQuestion) return

      setAnswers((current) => {
        const previous = current[currentQuestion.id] ?? []

        if (currentQuestion.multiple !== true) {
          return { ...current, [currentQuestion.id]: [optionId] }
        }

        // Gesperrte Option ignorieren, falls sie doch ausgelöst wird (z. B. per Tastatur)
        if (getBlockedIds(currentQuestion, previous).has(optionId)) return current

        const next = previous.includes(optionId)
          ? previous.filter((id) => id !== optionId)
          : [...previous, optionId]

        return { ...current, [currentQuestion.id]: next }
      })
    },
    [currentQuestion],
  )

  const goNext = useCallback(() => {
    setStepIndex((current) => current + 1)
  }, [])

  const goBack = useCallback(() => {
    setStepIndex((current) => Math.max(0, current - 1))
  }, [])

  return {
    answers,
    currentQuestion,
    selectedIds,
    blockedIds,
    canContinue,
    isLastStep,
    stepIndex,
    /** null, solange der Pfad noch nicht gewählt ist – dann ist die Gesamtzahl unbekannt. */
    totalSteps: isPathChosen ? visibleQuestions.length : null,
    selectOption,
    goNext,
    goBack,
  }
}
