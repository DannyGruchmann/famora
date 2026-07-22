import { ArrowLeft, User } from 'lucide-react'

interface DashboardAppBarProps {
  title: string
  onBack: () => void
}

export function DashboardAppBar({ title, onBack }: DashboardAppBarProps) {
  return (
    <header className="bg-primary px-3 pt-3 pb-16 text-white">
      <div className="mx-auto flex max-w-2xl items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          aria-label="Zurück"
          className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-white/10"
        >
          <ArrowLeft className="size-5" />
        </button>

        <span className="truncate px-2 font-medium">{title}</span>

        <button
          type="button"
          aria-label="Konto öffnen"
          className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-white/10"
        >
          <User className="size-5" />
        </button>
      </div>
    </header>
  )
}
