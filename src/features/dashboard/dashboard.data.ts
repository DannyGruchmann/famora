import {
  MODE_AFTER_DEATH,
  MODE_PREPARE,
  OPTION,
  type OnboardingMode,
} from '@/features/onboarding/onboarding.questions'
import type { DashboardPreset, Urgency } from './dashboard.types'

export const URGENCY_ORDER: Urgency[] = ['now', 'week', 'month', 'later']

/** Seed-Daten, bis Supabase angebunden ist. */
const AFTER_DEATH: DashboardPreset = {
  title: 'Nachlass Familie',
  urgencyLabels: {
    now: 'Sofort',
    week: 'Diese Woche',
    month: 'Diesen Monat',
    later: 'Später',
  },
  tasks: [
    {
      id: 'd-certificate',
      title: 'Totenschein vom Arzt ausstellen lassen',
      urgency: 'now',
      completedBy: OPTION.doneCertificate,
    },
    {
      id: 'd-funeral',
      title: 'Bestattungsinstitut beauftragen',
      urgency: 'now',
      completedBy: OPTION.doneFuneral,
    },
    { id: 'd-inform', title: 'Angehörige und Arbeitgeber informieren', urgency: 'now' },
    {
      id: 'd-registry',
      title: 'Sterbeurkunde beim Standesamt beantragen',
      urgency: 'week',
      completedBy: OPTION.doneRegistry,
    },
    { id: 'd-insurance', title: 'Krankenkasse und Rentenversicherung melden', urgency: 'week' },
    { id: 'd-contracts', title: 'Laufende Verträge kündigen', urgency: 'month' },
    { id: 'd-inheritance', title: 'Erbschein beantragen, falls nötig', urgency: 'month' },
    { id: 'd-digital', title: 'Digitale Konten schließen', urgency: 'later' },
  ],
  deadlines: [
    { id: 'd1', title: 'Sterbeurkunde beantragen', daysLeft: 2 },
    { id: 'd2', title: 'Meldung an die Rentenversicherung', daysLeft: 9 },
    { id: 'd3', title: 'Erbschaft annehmen oder ausschlagen', daysLeft: 34 },
  ],
  documentsHint:
    'Legen Sie Sterbeurkunde, Testament und Verträge hier ab, damit alles an einem Ort liegt.',
  familyHint:
    'Sie müssen das nicht allein tragen. Laden Sie Angehörige ein und verteilen Sie Aufgaben.',
}

/**
 * Vorsorge kennt keine laufenden Fristen – deshalb keine Deadlines und ruhigere Labels
 * statt "Sofort" und "Diese Woche". Jede Aufgabe hängt an einem der Bereiche aus dem
 * Onboarding und erscheint nur, wenn dieser gewählt wurde.
 */
const PREPARE: DashboardPreset = {
  title: 'Meine Vorsorge',
  urgencyLabels: {
    now: 'Zuerst',
    week: 'Als Nächstes',
    month: 'Wenn Sie Zeit haben',
    later: 'Irgendwann',
  },
  tasks: [
    {
      id: 'p-documents-collect',
      title: 'Wichtige Dokumente an einem Ort sammeln',
      urgency: 'now',
      area: OPTION.focusDocuments,
    },
    {
      id: 'p-documents-power',
      title: 'Vorsorgevollmacht und Patientenverfügung prüfen',
      urgency: 'week',
      area: OPTION.focusDocuments,
    },
    {
      id: 'p-contracts-list',
      title: 'Versicherungen und Verträge auflisten',
      urgency: 'week',
      area: OPTION.focusContracts,
    },
    {
      id: 'p-contracts-check',
      title: 'Bezugsberechtigte in den Policen prüfen',
      urgency: 'month',
      area: OPTION.focusContracts,
    },
    {
      id: 'p-digital-accounts',
      title: 'Digitale Konten und Abos auflisten',
      urgency: 'now',
      area: OPTION.focusDigital,
    },
    {
      id: 'p-digital-access',
      title: 'Notfallzugang im Passwortmanager einrichten',
      urgency: 'month',
      area: OPTION.focusDigital,
    },
    {
      id: 'p-wishes-funeral',
      title: 'Wünsche zur Bestattung festhalten',
      urgency: 'month',
      area: OPTION.focusWishes,
    },
    {
      id: 'p-wishes-message',
      title: 'Persönliche Nachricht an die Familie hinterlegen',
      urgency: 'later',
      area: OPTION.focusWishes,
    },
  ],
  deadlines: [],
  documentsHint:
    'Legen Sie Vollmachten, Policen und Zugangsdaten hier ab, damit Ihre Familie sie im Ernstfall findet.',
  familyHint:
    'Vorsorge wirkt nur, wenn jemand davon weiß. Laden Sie die Menschen ein, die im Ernstfall handeln sollen.',
}

export const PRESETS: Record<OnboardingMode, DashboardPreset> = {
  [MODE_AFTER_DEATH]: AFTER_DEATH,
  [MODE_PREPARE]: PREPARE,
}
