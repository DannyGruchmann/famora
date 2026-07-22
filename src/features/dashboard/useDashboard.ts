import { useCallback, useMemo, useState } from 'react'
import { INITIAL_DEADLINES, INITIAL_TASKS, URGENCY_ORDER } from './dashboard.data'
import type { Deadline, Task, Urgency } from './dashboard.types'

export function useDashboard() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)

  const toggleTask = useCallback((taskId: string) => {
    // State nie mutieren: neues Array bauen, sonst erkennt React die Änderung nicht.
    setTasks((current) =>
      current.map((task) => (task.id === taskId ? { ...task, done: !task.done } : task)),
    )
  }, [])

  const tasksByUrgency = useMemo(() => {
    const grouped = {} as Record<Urgency, Task[]>
    for (const urgency of URGENCY_ORDER) {
      grouped[urgency] = tasks.filter((task) => task.urgency === urgency)
    }
    return grouped
  }, [tasks])

  const doneCount = useMemo(() => tasks.filter((task) => task.done).length, [tasks])

  const completionRate = tasks.length === 0 ? 0 : Math.round((doneCount / tasks.length) * 100)

  const nextDeadline: Deadline | null = useMemo(() => {
    const sorted = [...INITIAL_DEADLINES].sort((a, b) => a.daysLeft - b.daysLeft)
    return sorted[0] ?? null
  }, [])

  return {
    tasks,
    tasksByUrgency,
    deadlines: INITIAL_DEADLINES,
    doneCount,
    completionRate,
    nextDeadline,
    toggleTask,
  }
}
