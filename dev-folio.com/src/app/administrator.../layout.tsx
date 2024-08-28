import type { PropsWithChildren } from 'react'

import AdministratorBouncer from '~components/administrator/AdministratorBouncer'
import AdministratorLayout from '~components/administrator/AdministratorLayout'
import AppLayout from '~components/common/AppLayout'

function Layout({ children }: PropsWithChildren) {
  return (
    <AdministratorBouncer>
      <AppLayout>
        <AdministratorLayout>
          {children}
        </AdministratorLayout>
      </AppLayout>
    </AdministratorBouncer>
  )
}

export default Layout
