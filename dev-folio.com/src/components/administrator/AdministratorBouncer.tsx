import type { PropsWithChildren } from 'react'

import useUser from '~hooks/user/useUser'

import CenteredSpinner from '~components/common/CenteredSpinner'
import NotFound from '~components/common/NotFound'

function AdministratorBouncer({ children }: PropsWithChildren) {
  const { user, loading } = useUser()

  if (loading) {
    return (
      <CenteredSpinner />
    )
  }

  if (!user?.isAdministrator) {
    return (
      <NotFound />
    )
  }

  return children as JSX.Element
}

export default AdministratorBouncer
