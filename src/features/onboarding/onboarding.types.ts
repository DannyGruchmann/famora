/** Antworten: Frage-ID -> Liste gewählter Options-IDs (auch bei Einfachauswahl, dann mit 1 Eintrag) */
export type OnboardingAnswers = Record<string, string[]>

export interface AnswerOption {
  id: string
  label: string
  /** Optionaler Zusatz unter dem Label */
  hint?: string
  /** Bei Mehrfachauswahl: schließt alle anderen Optionen aus, z. B. "Noch nichts davon" */
  exclusive?: boolean
}

export interface Question {
  id: string
  /** Kleines Label über der Frage, z. B. "Ihre Situation" */
  eyebrow: string
  title: string
  hint?: string
  options: AnswerOption[]
  multiple?: boolean
  /** Frage nur zeigen, wenn diese Bedingung auf die bisherigen Antworten passt */
  showIf?: (answers: OnboardingAnswers) => boolean
}
