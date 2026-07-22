import { useState, type ReactNode } from 'react'
import { ChevronDown, type LucideIcon } from 'lucide-react'

interface SectionCardProps {
  icon: LucideIcon
  title: string
  subtitle: string
  defaultOpen?: boolean
  children: ReactNode
}

/**
 * Aufklappbare Sektion. Der offen/zu-State gehört in die Karte selbst –
 * kein anderes Bauteil muss davon wissen.
 */
export function SectionCard({
  icon: Icon,
  title,
  subtitle,
  defaultOpen = false,
  children,
}: SectionCardProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex w-full cursor-pointer items-center gap-3.5 p-4 text-left"
      >
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
          <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block font-medium text-ink">{title}</span>
          <span className="mt-0.5 block text-sm text-ink-muted">{subtitle}</span>
        </span>

        <ChevronDown
          className={`size-5 shrink-0 text-ink-soft transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {open && <div className="border-t border-line p-4">{children}</div>}
    </div>
  )
}
