import { type PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react'
import type { Portfolio } from 'dev-folio-types'

import PortfolioContext, { type PortfolioContextType } from '~contexts/portfolio/PortfolioContext'

import SpinnerCentered from '~components/common/SpinnerCentered'

type Props = PropsWithChildren<{
  isDev?: boolean
  portfolio?: Portfolio
}>

function PortfolioProvider({ children, portfolio, isDev = false }: Props) {
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

  const portfolioContextValue = useMemo<PortfolioContextType>(() => ({
    portfolio: finalPortfolio!,
    isDev,
  }), [
    finalPortfolio,
    isDev,
  ])

  if (!finalPortfolio) {
    return (
      <SpinnerCentered />
    )
  }

  return (
    <PortfolioContext.Provider value={portfolioContextValue}>
      {children}
    </PortfolioContext.Provider>
  )
}

export default PortfolioProvider
