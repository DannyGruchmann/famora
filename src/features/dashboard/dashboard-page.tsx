import { useNavigate } from 'react-router-dom'
import { CalendarClock, FolderOpen, ListChecks, Users } from 'lucide-react'
import { ROUTES } from '@/routes.constants'
import { DashboardAppBar } from './dashboard-app-bar'
import { ProgressHero } from './progress-hero'
import { SectionCard } from './section-card'
import { TaskItem } from './task-item'
import { ToolChips } from './tool-chips'
import { URGENCY_LABELS, URGENCY_ORDER } from './dashboard.data'
import { useDashboard } from './useDashboard'

export function DashboardPage() {
  const navigate = useNavigate()
  const { tasks, tasksByUrgency, deadlines, doneCount, completionRate, nextDeadline, toggleTask } =
    useDashboard()

  const openTaskCount = tasks.length - doneCount

  return (
    <div className="min-h-dvh pb-12">
      <DashboardAppBar title="Nachlass Familie" onBack={() => navigate(ROUTES.landing)} />

      <div className="mx-auto max-w-2xl">
        {/* -mt-12 zieht die Karte in den grünen Kopfbereich hinein */}
        <div className="-mt-12 px-4">
          <ProgressHero
            doneCount={doneCount}
            totalCount={tasks.length}
            completionRate={completionRate}
            nextDeadline={nextDeadline}
          />
        </div>

        <div className="pt-5">
          <ToolChips />
        </div>

        <div className="flex flex-col gap-3 px-4 pt-5">
          <SectionCard
            icon={ListChecks}
            title="Checkliste"
            subtitle={`${openTaskCount} offen, ${doneCount} erledigt`}
            defaultOpen
          >
            <div className="flex flex-col gap-5">
              {URGENCY_ORDER.map((urgency) => (
                <div key={urgency}>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
                    {URGENCY_LABELS[urgency]}
                  </p>
                  <ul className="mt-1">
                    {tasksByUrgency[urgency].map((task) => (
                      <TaskItem key={task.id} task={task} onToggle={toggleTask} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            icon={CalendarClock}
            title="Fristen"
            subtitle={`${deadlines.length} anstehend`}
          >
            <ul className="flex flex-col gap-3">
              {deadlines.map((deadline) => (
                <li key={deadline.id} className="flex items-center justify-between gap-3">
                  <span className="text-[0.95rem] text-ink">{deadline.title}</span>
                  <span className="shrink-0 text-sm text-ink-muted">
                    noch {deadline.daysLeft} Tage
                  </span>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard icon={FolderOpen} title="Dokumente" subtitle="Noch nichts abgelegt">
            <p className="text-sm leading-relaxed text-ink-muted">
              Legen Sie Sterbeurkunde, Testament und Verträge hier ab, damit alles an einem Ort
              liegt.
            </p>
          </SectionCard>

          <SectionCard icon={Users} title="Familie" subtitle="Noch niemand eingeladen">
            <p className="text-sm leading-relaxed text-ink-muted">
              Sie müssen das nicht allein tragen. Laden Sie Angehörige ein und verteilen Sie
              Aufgaben.
            </p>
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
