import type { OnboardingAnswers, Question } from './onboarding.types'

export const MODE_QUESTION_ID = 'mode'
export const MODE_AFTER_DEATH = 'after-death'
export const MODE_PREPARE = 'prepare'

function isAfterDeath(answers: OnboardingAnswers): boolean {
  return answers[MODE_QUESTION_ID]?.includes(MODE_AFTER_DEATH) === true
}

function isPreparing(answers: OnboardingAnswers): boolean {
  return answers[MODE_QUESTION_ID]?.includes(MODE_PREPARE) === true
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
    id: 'done',
    eyebrow: 'Stand',
    title: 'Was ist schon erledigt?',
    hint: 'Mehrfachauswahl. Was Sie hier abhaken, blenden wir aus Ihrer Liste aus.',
    multiple: true,
    showIf: isAfterDeath,
    options: [
      { id: 'certificate', label: 'Totenschein liegt vor' },
      { id: 'funeral', label: 'Bestattung ist beauftragt' },
      { id: 'registry', label: 'Sterbeurkunde ist beantragt' },
      { id: 'nothing', label: 'Noch nichts davon', exclusive: true },
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
    id: 'prepare-focus',
    eyebrow: 'Vorsorge',
    title: 'Womit möchten Sie anfangen?',
    hint: 'Mehrfachauswahl. Sie können jederzeit weitere Bereiche ergänzen.',
    multiple: true,
    showIf: isPreparing,
    options: [
      { id: 'documents', label: 'Wichtige Dokumente hinterlegen' },
      { id: 'contracts', label: 'Verträge und Versicherungen' },
      { id: 'digital', label: 'Digitale Konten und Passwörter' },
      { id: 'wishes', label: 'Meine Wünsche festhalten' },
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
