import { PortfolioProvider } from 'dev-folio-react'

import useUser from '~hooks/user/useUser'

function Portfolio() {
  const { user } = useUser()

  return (
    <PortfolioProvider portfolio={user?.portfolio}>
      Foo
    </PortfolioProvider>
  )
}

export default Portfolio
