import type { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

import useUser from '~hooks/user/useUser'

function OnboardingRedirect({ children }: PropsWithChildren) {
  const { user } = useUser()

  if (user?.portfolio.subdomain) {
    return (
      <Navigate
        replace
        to="/~"
      />
    )
  }

  return children as JSX.Element
}

export default OnboardingRedirect
