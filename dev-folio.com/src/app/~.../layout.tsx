import type { PropsWithChildren } from 'react'

import AuthenticationBouncer from '~components/authentication/AuthenticationBouncer'
import OnboardingBouncer from '~components/onboarding/OnboardingBouncer'
import PortfolioLayout from '~components/portfolio/PortfolioLayout'

function Layout({ children }: PropsWithChildren) {
  return (
    <AuthenticationBouncer>
      <OnboardingBouncer>
        <PortfolioLayout>
          {children}
        </PortfolioLayout>
      </OnboardingBouncer>
    </AuthenticationBouncer>
  )
}

export default Layout
