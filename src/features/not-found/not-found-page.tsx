import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/button'
import { ROUTES } from '@/routes.constants'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl text-ink">Diese Seite gibt es nicht.</h1>
      <p className="mt-3 max-w-sm leading-relaxed text-ink-muted">
        Vielleicht hat sich ein Tippfehler eingeschlichen. Gehen Sie zurück zum Anfang.
      </p>
      <div className="mt-8">
        <Button onClick={() => navigate(ROUTES.landing)}>Zur Startseite</Button>
      </div>
    </main>
  )
}
