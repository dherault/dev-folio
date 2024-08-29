import 'dev-folio-react/dist/style.css'
import {
  PortfolioHero,
  PortfolioLayout,
  PortfolioProvider,
} from 'dev-folio-react'

import useUser from '~hooks/user/useUser'

function Portfolio() {
  const { user } = useUser()

  return (
    <PortfolioLayout>
      <PortfolioProvider portfolio={user?.portfolio}>
        <PortfolioHero />
      </PortfolioProvider>
    </PortfolioLayout>
  )
}

export default Portfolio
