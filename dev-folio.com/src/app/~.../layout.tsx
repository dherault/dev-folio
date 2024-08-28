import type { PropsWithChildren } from 'react'

import AuthenticationBouncer from '~components/authentication/AuthenticationBouncer'
import PortfolioLayout from '~components/portfolio/PortfolioLayout'

function Layout({ children }: PropsWithChildren) {
  return (
    <AuthenticationBouncer>
      <PortfolioLayout>
        {children}
      </PortfolioLayout>
    </AuthenticationBouncer>
  )
}

export default Layout
