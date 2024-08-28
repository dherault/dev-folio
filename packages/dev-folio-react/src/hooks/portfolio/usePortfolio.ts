import { useContext } from 'react'

import PortfolioContext from '~contexts/portfolio/PortfolioContext'

function usePortfolio() {
  return useContext(PortfolioContext)
}

export default usePortfolio
