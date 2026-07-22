import type { OnboardingAnswers } from '@/features/onboarding/onboarding.types'

/** Version im Schlüssel: ändert sich das Format, ignorieren wir alte Stände automatisch. */
const KEYS = {
  answers: 'famora.answers.v1',
  completedTasks: 'famora.completed-tasks.v1',
} as const

/**
 * localStorage kann werfen – Safari im privaten Modus, volles Kontingent, deaktivierte Cookies.
 * Alles geht deshalb durch diese beiden Funktionen: Aufrufer bekommen Werte, nie Fehler.
 */
function read<T>(key: string, fallback: T, isValid: (value: unknown) => value is T): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback

    const parsed: unknown = JSON.parse(raw)
    return isValid(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

function write(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ohne Persistenz weiterarbeiten ist besser als die App abstürzen zu lassen.
  }
}

function isAnswers(value: unknown): value is OnboardingAnswers {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false

  return Object.values(value).every(
    (entry) => Array.isArray(entry) && entry.every((id) => typeof id === 'string'),
  )
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((id) => typeof id === 'string')
}

export function loadAnswers(): OnboardingAnswers {
  return read(KEYS.answers, {}, isAnswers)
}

export function saveAnswers(answers: OnboardingAnswers): void {
  write(KEYS.answers, answers)
}

/**
 * null bedeutet "noch nie gespeichert" – dann gibt das Onboarding den Ausgangszustand vor.
 * Ein leeres Array heißt dagegen: der Nutzer hat bewusst alles abgehakt.
 */
export function loadCompletedTaskIds(): string[] | null {
  return read<string[] | null>(KEYS.completedTasks, null, (value): value is string[] | null =>
    isStringArray(value),
  )
}

export function saveCompletedTaskIds(taskIds: string[]): void {
  write(KEYS.completedTasks, taskIds)
}

/** Nach einem erneuten Onboarding: der alte Fortschritt gehört zu alten Antworten. */
export function clearCompletedTaskIds(): void {
  try {
    localStorage.removeItem(KEYS.completedTasks)
  } catch {
    // Nicht löschen zu können ist kein Grund, den Onboarding-Abschluss scheitern zu lassen.
  }
}
