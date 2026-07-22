import { Route, Routes } from 'react-router-dom'
import { DashboardPage } from '@/features/dashboard/dashboard-page'
import { LandingPage } from '@/features/landing/landing-page'
import { NotFoundPage } from '@/features/not-found/not-found-page'
import { OnboardingPage } from '@/features/onboarding/onboarding-page'
import { ROUTES } from '@/routes.constants'

export function App() {
  return (
    <Routes>
      <Route path={ROUTES.landing} element={<LandingPage />} />
      <Route path={ROUTES.onboarding} element={<OnboardingPage />} />
      <Route path={ROUTES.dashboard} element={<DashboardPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
