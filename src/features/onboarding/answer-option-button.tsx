import { Check } from 'lucide-react'
import type { AnswerOption } from './onboarding.types'

interface AnswerOptionButtonProps {
  option: AnswerOption
  selected: boolean
  /** Durch eine sich ausschließende Auswahl gesperrt */
  disabled?: boolean
  onSelect: (optionId: string) => void
}

export function AnswerOptionButton({
  option,
  selected,
  disabled = false,
  onSelect,
}: AnswerOptionButtonProps) {
  const stateClasses = selected
    ? 'border-primary bg-primary-soft'
    : disabled
      ? 'border-line bg-surface opacity-45'
      : 'border-line bg-surface hover:border-sage'

  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={() => onSelect(option.id)}
      className={`flex w-full cursor-pointer items-center gap-4 rounded-2xl border p-5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed ${stateClasses}`}
    >
      <span className="min-w-0 flex-1">
        <span className="block font-medium text-ink">{option.label}</span>
        {option.hint !== undefined && (
          <span className="mt-1 block text-sm text-ink-muted">{option.hint}</span>
        )}
      </span>

      <span
        className={`flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
          selected ? 'border-primary bg-primary text-white' : 'border-line-strong'
        }`}
        aria-hidden="true"
      >
        {selected && <Check className="size-3.5" strokeWidth={3} />}
      </span>
    </button>
  )
}
