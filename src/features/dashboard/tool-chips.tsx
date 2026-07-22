import { Camera, FileText, Sparkles, Users } from 'lucide-react'

interface Tool {
  id: string
  icon: typeof Camera
  label: string
}

const TOOLS: Tool[] = [
  { id: 'ai', icon: Sparkles, label: 'KI-Assistent' },
  { id: 'scan', icon: Camera, label: 'Scannen' },
  { id: 'invite', icon: Users, label: 'Einladen' },
  { id: 'templates', icon: FileText, label: 'Vorlagen' },
]

/** Bewusst horizontal scrollbar: mobil passen nicht alle Chips nebeneinander. */
export function ToolChips() {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 pb-1">
      {TOOLS.map((tool) => {
        const Icon = tool.icon

        return (
          <button
            key={tool.id}
            type="button"
            className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-sm text-ink transition-colors hover:bg-surface-soft"
          >
            <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
            {tool.label}
          </button>
        )
      })}
    </div>
  )
}
