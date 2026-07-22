import type { Deadline, Task, Urgency } from './dashboard.types'

export const URGENCY_ORDER: Urgency[] = ['now', 'week', 'month', 'later']

export const URGENCY_LABELS: Record<Urgency, string> = {
  now: 'Sofort',
  week: 'Diese Woche',
  month: 'Diesen Monat',
  later: 'Später',
}

/** Seed-Daten, bis Supabase angebunden ist. */
export const INITIAL_TASKS: Task[] = [
  { id: 't1', title: 'Totenschein vom Arzt ausstellen lassen', urgency: 'now', done: true },
  { id: 't2', title: 'Bestattungsinstitut beauftragen', urgency: 'now', done: false },
  { id: 't3', title: 'Angehörige und Arbeitgeber informieren', urgency: 'now', done: false },
  { id: 't4', title: 'Sterbeurkunde beim Standesamt beantragen', urgency: 'week', done: false },
  { id: 't5', title: 'Krankenkasse und Rentenversicherung melden', urgency: 'week', done: false },
  { id: 't6', title: 'Laufende Verträge kündigen', urgency: 'month', done: false },
  { id: 't7', title: 'Erbschein beantragen, falls nötig', urgency: 'month', done: false },
  { id: 't8', title: 'Digitale Konten schließen', urgency: 'later', done: false },
]

export const INITIAL_DEADLINES: Deadline[] = [
  { id: 'd1', title: 'Sterbeurkunde beantragen', daysLeft: 2 },
  { id: 'd2', title: 'Meldung an die Rentenversicherung', daysLeft: 9 },
  { id: 'd3', title: 'Erbschaft annehmen oder ausschlagen', daysLeft: 34 },
]
