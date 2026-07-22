import type { OnboardingAnswers, Question } from './onboarding.types'

export const MODE_QUESTION_ID = 'mode'
export const MODE_AFTER_DEATH = 'after-death'
export const MODE_PREPARE = 'prepare'

const DONE_QUESTION_ID = 'done'
const FOCUS_QUESTION_ID = 'prepare-focus'

export type OnboardingMode = typeof MODE_AFTER_DEATH | typeof MODE_PREPARE

/**
 * Options-IDs, auf die andere Features verweisen (das Dashboard baut daraus seine Liste).
 * Umbenennen bricht bereits gespeicherte Antworten – dann Storage-Version hochzählen.
 */
export const OPTION = {
  doneCertificate: 'certificate',
  doneFuneral: 'funeral',
  doneRegistry: 'registry',
  doneNothing: 'nothing',
  focusDocuments: 'documents',
  focusContracts: 'contracts',
  focusDigital: 'digital',
  focusWishes: 'wishes',
} as const

/** null, solange die Einstiegsfrage nicht beantwortet ist. */
export function getMode(answers: OnboardingAnswers): OnboardingMode | null {
  const selected = answers[MODE_QUESTION_ID]?.[0]
  if (selected === MODE_AFTER_DEATH || selected === MODE_PREPARE) return selected
  return null
}

/** Was laut Onboarding schon erledigt ist – Options-IDs der Frage "Was ist schon erledigt?". */
export function getCompletedOptionIds(answers: OnboardingAnswers): string[] {
  return answers[DONE_QUESTION_ID] ?? []
}

/** Welche Vorsorge-Bereiche gewählt wurden. */
export function getFocusAreaIds(answers: OnboardingAnswers): string[] {
  return answers[FOCUS_QUESTION_ID] ?? []
}

function isAfterDeath(answers: OnboardingAnswers): boolean {
  return getMode(answers) === MODE_AFTER_DEATH
}

function isPreparing(answers: OnboardingAnswers): boolean {
  return getMode(answers) === MODE_PREPARE
}

/**
 * Fragen sind Daten, kein JSX. Neue Frage = neuer Eintrag hier,
 * ohne dass eine Komponente angefasst werden muss.
 */
export const QUESTIONS: Question[] = [
  {
    id: MODE_QUESTION_ID,
    eyebrow: 'Ihr Einstieg',
    title: 'Weshalb sind Sie hier?',
    hint: 'Es gibt keine falsche Antwort. Sie können später jederzeit wechseln.',
    options: [
      {
        id: MODE_AFTER_DEATH,
        label: 'Jemand ist gestorben',
        hint: 'Ich muss jetzt Dinge regeln.',
      },
      {
        id: MODE_PREPARE,
        label: 'Ich möchte vorsorgen',
        hint: 'Damit meine Familie später weiß, was zu tun ist.',
      },
    ],
  },
  {
    id: 'relation',
    eyebrow: 'Ihre Situation',
    title: 'Wen haben Sie verloren?',
    hint: 'Das bestimmt, welche Fristen und Ansprüche für Sie gelten.',
    showIf: isAfterDeath,
    options: [
      { id: 'partner', label: 'Meine Partnerin oder meinen Partner' },
      { id: 'parent', label: 'Mutter oder Vater' },
      { id: 'child', label: 'Mein Kind' },
      { id: 'other', label: 'Jemand anderen' },
    ],
  },
  {
    id: 'elapsed',
    eyebrow: 'Zeit',
    title: 'Wie lange ist das her?',
    hint: 'Manche Fristen laufen ab dem Todestag – deshalb fragen wir das.',
    showIf: isAfterDeath,
    options: [
      { id: 'days', label: 'Wenige Tage', hint: 'Die dringenden Dinge stehen noch an.' },
      { id: 'weeks', label: 'Einige Wochen' },
      { id: 'months', label: 'Mehrere Monate oder länger' },
    ],
  },
  {
    id: DONE_QUESTION_ID,
    eyebrow: 'Stand',
    title: 'Was ist schon erledigt?',
    hint: 'Mehrfachauswahl. Was Sie hier abhaken, blenden wir aus Ihrer Liste aus.',
    multiple: true,
    showIf: isAfterDeath,
    options: [
      { id: OPTION.doneCertificate, label: 'Totenschein liegt vor' },
      { id: OPTION.doneFuneral, label: 'Bestattung ist beauftragt' },
      { id: OPTION.doneRegistry, label: 'Sterbeurkunde ist beantragt' },
      { id: OPTION.doneNothing, label: 'Noch nichts davon', exclusive: true },
    ],
  },
  {
    id: 'support',
    eyebrow: 'Unterstützung',
    title: 'Stehen Sie damit allein da?',
    hint: 'Wenn nicht, können Sie Aufgaben später in der Familie verteilen.',
    showIf: isAfterDeath,
    options: [
      { id: 'alone', label: 'Ja, ich regle das allein' },
      { id: 'family', label: 'Nein, Familie hilft mit' },
      { id: 'unsure', label: 'Das weiß ich noch nicht' },
    ],
  },
  {
    id: FOCUS_QUESTION_ID,
    eyebrow: 'Vorsorge',
    title: 'Womit möchten Sie anfangen?',
    hint: 'Mehrfachauswahl. Sie können jederzeit weitere Bereiche ergänzen.',
    multiple: true,
    showIf: isPreparing,
    options: [
      { id: OPTION.focusDocuments, label: 'Wichtige Dokumente hinterlegen' },
      { id: OPTION.focusContracts, label: 'Verträge und Versicherungen' },
      { id: OPTION.focusDigital, label: 'Digitale Konten und Passwörter' },
      { id: OPTION.focusWishes, label: 'Meine Wünsche festhalten' },
    ],
  },
  {
    id: 'prepare-who',
    eyebrow: 'Vorsorge',
    title: 'Wer soll das im Ernstfall sehen?',
    showIf: isPreparing,
    options: [
      { id: 'partner', label: 'Meine Partnerin oder mein Partner' },
      { id: 'children', label: 'Meine Kinder' },
      { id: 'nobody-yet', label: 'Das entscheide ich später' },
    ],
  },
]
