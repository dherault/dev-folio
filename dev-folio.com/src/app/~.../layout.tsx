import type { PropsWithChildren } from 'react'

import AuthenticationBouncer from '~components/authentication/AuthenticationBouncer'
import OnboardingBouncer from '~components/onboarding/OnboardingBouncer'
import PortfolioProvider from '~components/portfolio/PortfolioProvider'
import PortfolioLayout from '~components/portfolio/layout/PortfolioLayout'

function Layout({ children }: PropsWithChildren) {
  return (
    <AuthenticationBouncer>
      <OnboardingBouncer>
        <PortfolioProvider>
          <PortfolioLayout>
            {children}
          </PortfolioLayout>
        </PortfolioProvider>
      </OnboardingBouncer>
    </AuthenticationBouncer>
  )
}

export default Layout
