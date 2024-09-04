import type { PropsWithChildren } from 'react'

import AuthenticationBouncer from '~components/authentication/AuthenticationBouncer'
import OnboardingRedirect from '~components/onboarding/OnboardingRedirect'

function Layout({ children }: PropsWithChildren) {
  return (
    <AuthenticationBouncer>
      <OnboardingRedirect>
        {children}
      </OnboardingRedirect>
    </AuthenticationBouncer>
  )
}

export default Layout
