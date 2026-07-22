import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/button'
import { StickyCta } from '@/components/sticky-cta'
import { ROUTES } from '@/routes.constants'
import { HeroSection } from './hero-section'
import { PathsSection } from './paths-section'
import { StepsSection } from './steps-section'
import { TrustSection } from './trust-section'

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-dvh flex-col">
      <div className="mx-auto w-full max-w-2xl flex-1">
        <HeroSection />

        {/* Der Faden: eine durchgehende Linie hinter den Sektionen.
            Die Knoten der ThreadSections sitzen exakt darauf (left-3.5). */}
        <div className="relative px-5 pb-20">
          <span
            className="thread-line absolute top-0 bottom-0 left-3.5 w-px"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-16">
            <PathsSection />
            <StepsSection />
            <TrustSection />
          </div>
        </div>

        <footer className="border-t border-line px-5 py-8">
          <p className="text-sm leading-relaxed text-ink-soft">
            Famora ist keine Rechts-, Steuer- oder Finanzberatung. Wir strukturieren Aufgaben und
            Unterlagen – die Entscheidungen bleiben bei Ihnen.
          </p>
        </footer>
      </div>

      <StickyCta note="Kostenlos starten, keine Anmeldung nötig.">
        <Button fullWidth onClick={() => navigate(ROUTES.onboarding)}>
          Schritt für Schritt beginnen
        </Button>
      </StickyCta>
    </div>
  )
}
