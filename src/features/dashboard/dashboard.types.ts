export type Urgency = 'now' | 'week' | 'month' | 'later'

/** Aufgabe so, wie sie im Katalog steht – ohne Zustand. */
export interface TaskDefinition {
  id: string
  title: string
  urgency: Urgency
  /** Gilt beim ersten Öffnen als erledigt, wenn diese Onboarding-Option gewählt wurde */
  completedBy?: string
  /** Nur im Vorsorge-Pfad: Aufgabe erscheint nur, wenn dieser Bereich gewählt wurde */
  area?: string
}

/** Aufgabe mit abgeleitetem Zustand, so wie die UI sie sieht. */
export interface Task extends TaskDefinition {
  done: boolean
}

export interface Deadline {
  id: string
  title: string
  daysLeft: number
}

/** Alles, was sich zwischen Todesfall- und Vorsorge-Pfad unterscheidet. */
export interface DashboardPreset {
  /** Titel in der App-Bar */
  title: string
  urgencyLabels: Record<Urgency, string>
  tasks: TaskDefinition[]
  deadlines: Deadline[]
  /** Text der Dokumente-Sektion, im Vorsorge-Pfad anders gemeint */
  documentsHint: string
  familyHint: string
}
