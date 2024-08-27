import type { PropsWithChildren } from 'react'

import AuthenticationBouncer from '~components/authentication/AuthenticationBouncer'
import AppLayout from '~components/common/AppLayout'

function Layout({ children }: PropsWithChildren) {
  return (
    <AuthenticationBouncer>
      <AppLayout>
        {children}
      </AppLayout>
    </AuthenticationBouncer>
  )
}

export default Layout
