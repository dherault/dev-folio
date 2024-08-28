import { type PropsWithChildren, useCallback, useEffect, useState } from 'react'
import type { Portfolio } from 'dev-folio-types'

import PortfolioContext from '~contexts/portfolio/PortfolioContext'

import SpinnerCentered from '~components/common/SpinnerCentered'

type Props = PropsWithChildren<{
  portfolio?: Portfolio
}>

function PortfolioProvider({ children, portfolio }: Props) {
  const [fetchedPortfolio, setFetchedPortfolio] = useState<Portfolio | null>(null)

  const finalPortfolio = portfolio ?? fetchedPortfolio

  const fetchRemotePortfolio = useCallback(async () => {
    try {
      const response = await fetch('/portfolio.json')
      const data = await response.json()

      setFetchedPortfolio(data)
    }
    catch (error) {
      console.error('Failed to fetch portfolio', error)
    }
  }, [])

  useEffect(() => {
    if (portfolio) return

    fetchRemotePortfolio()
  }, [
    portfolio,
    fetchRemotePortfolio,
  ])

  if (!finalPortfolio) {
    return (
      <SpinnerCentered />
    )
  }

  return (
    <PortfolioContext.Provider value={finalPortfolio}>
      <pre>
        {JSON.stringify(finalPortfolio, null, 2)}
      </pre>
      {children}
    </PortfolioContext.Provider>
  )
}

export default PortfolioProvider
