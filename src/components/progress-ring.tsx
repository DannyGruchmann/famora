interface ProgressRingProps {
  /** Fortschritt in Prozent, 0–100 */
  rate: number
}

const RADIUS = 24
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function ProgressRing({ rate }: ProgressRingProps) {
  const offset = CIRCUMFERENCE * (1 - rate / 100)

  return (
    <svg width="58" height="58" viewBox="0 0 58 58" aria-hidden="true" className="shrink-0">
      <circle
        cx="29"
        cy="29"
        r={RADIUS}
        fill="none"
        stroke="var(--color-primary-soft)"
        strokeWidth="5"
      />
      <circle
        cx="29"
        cy="29"
        r={RADIUS}
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={offset}
        transform="rotate(-90 29 29)"
        className="transition-[stroke-dashoffset] duration-500"
      />
      <text
        x="29"
        y="33"
        textAnchor="middle"
        fontSize="13"
        fontWeight="600"
        fill="var(--color-primary)"
      >
        {rate}%
      </text>
    </svg>
  )
}
