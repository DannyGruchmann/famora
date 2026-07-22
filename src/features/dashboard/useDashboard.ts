import { useCallback, useMemo, useState } from 'react'
import {
  getCompletedOptionIds,
  getFocusAreaIds,
  getMode,
} from '@/features/onboarding/onboarding.questions'
import type { OnboardingAnswers } from '@/features/onboarding/onboarding.types'
import {
  loadAnswers,
  loadCompletedTaskIds,
  saveCompletedTaskIds,
} from '@/features/profile/profile.storage'
import { PRESETS, URGENCY_ORDER } from './dashboard.data'
import type { DashboardPreset, Task, Urgency } from './dashboard.types'

/** Aufgaben, die das Onboarding beim ersten Öffnen bereits als erledigt meldet. */
function getSeedCompletedIds(preset: DashboardPreset, answers: OnboardingAnswers): string[] {
  const chosen = new Set(getCompletedOptionIds(answers))

  return preset.tasks
    .filter((task) => task.completedBy !== undefined && chosen.has(task.completedBy))
    .map((task) => task.id)
}

export function useDashboard() {
  // Einmal beim Mount lesen: die Antworten ändern sich nicht, solange das Dashboard offen ist.
  const [answers] = useState<OnboardingAnswers>(loadAnswers)

  const mode = getMode(answers)
  const preset = mode === null ? null : PRESETS[mode]

  // Nur die Aufgaben der gewählten Bereiche – ohne Bereich (Todesfall-Pfad) sind immer dabei.
  const definitions = useMemo(() => {
    if (preset === null) return []

    const focusAreas = getFocusAreaIds(answers)
    return preset.tasks.filter((task) => task.area === undefined || focusAreas.includes(task.area))
  }, [preset, answers])

  /**
   * Die abgehakten IDs sind die einzige Wahrheit. Das Onboarding setzt nur den Startwert –
   * danach entscheidet der Nutzer, sonst ließe sich eine vorab erledigte Aufgabe nie öffnen.
   */
  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    const stored = loadCompletedTaskIds()
    if (stored !== null) return stored
    return preset === null ? [] : getSeedCompletedIds(preset, answers)
  })

  const toggleTask = useCallback((taskId: string) => {
    setCompletedIds((current) => {
      // State nie mutieren: neues Array bauen, sonst erkennt React die Änderung nicht.
      const next = current.includes(taskId)
        ? current.filter((id) => id !== taskId)
        : [...current, taskId]

      saveCompletedTaskIds(next)
      return next
    })
  }, [])

  const tasks: Task[] = useMemo(
    () => definitions.map((task) => ({ ...task, done: completedIds.includes(task.id) })),
    [definitions, completedIds],
  )

  const tasksByUrgency = useMemo(() => {
    const grouped = {} as Record<Urgency, Task[]>
    for (const urgency of URGENCY_ORDER) {
      grouped[urgency] = tasks.filter((task) => task.urgency === urgency)
    }
    return grouped
  }, [tasks])

  const doneCount = useMemo(() => tasks.filter((task) => task.done).length, [tasks])

  const completionRate = tasks.length === 0 ? 0 : Math.round((doneCount / tasks.length) * 100)

  const nextDeadline = useMemo(() => {
    if (preset === null) return null

    const sorted = [...preset.deadlines].sort((a, b) => a.daysLeft - b.daysLeft)
    return sorted[0] ?? null
  }, [preset])

  return {
    /** null, wenn noch kein Onboarding durchlaufen wurde – die Seite leitet dann weiter. */
    preset,
    tasks,
    tasksByUrgency,
    deadlines: preset?.deadlines ?? [],
    doneCount,
    completionRate,
    nextDeadline,
    toggleTask,
  }
}
