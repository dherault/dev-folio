import 'dev-folio-react/dist/style.css'
import {
  PortfolioHero,
  PortfolioLayout,
  PortfolioProvider,
} from 'dev-folio-react'

import usePortfolio from '~hooks/portfolio/usePortfolio'

import PortfolioContainer from '~components/portfolio/PortfolioContainer'

function Portfolio() {
  const { portfolio } = usePortfolio()

  return (
    <PortfolioContainer>
      <PortfolioLayout>
        <PortfolioProvider
          isDev
          portfolio={portfolio}
        >
          <PortfolioHero />
        </PortfolioProvider>
      </PortfolioLayout>
    </PortfolioContainer>
  )
}

export default Portfolio
