import type { Task } from './dashboard.types'

interface TaskItemProps {
  task: Task
  onToggle: (taskId: string) => void
}

/**
 * Präsentations-Komponente: hält keinen eigenen State. Der Klick wird nach oben
 * an den Besitzer der Daten gemeldet ("lifting state up").
 */
export function TaskItem({ task, onToggle }: TaskItemProps) {
  return (
    <li>
      <label className="flex cursor-pointer items-start gap-3 py-2.5">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
          className="mt-0.5 size-5 shrink-0 cursor-pointer accent-primary"
        />
        <span
          className={`text-[0.95rem] leading-snug ${
            task.done ? 'text-ink-soft line-through' : 'text-ink'
          }`}
        >
          {task.title}
        </span>
      </label>
    </li>
  )
}
