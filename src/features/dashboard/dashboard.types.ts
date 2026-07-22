export type Urgency = 'now' | 'week' | 'month' | 'later'

export interface Task {
  id: string
  title: string
  urgency: Urgency
  done: boolean
}

export interface Deadline {
  id: string
  title: string
  daysLeft: number
}
