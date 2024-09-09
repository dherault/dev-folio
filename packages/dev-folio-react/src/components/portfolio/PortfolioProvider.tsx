import { type PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import type { Portfolio } from 'dev-folio-types'

import PortfolioContext, { type PortfolioContextType } from '~contexts/portfolio/PortfolioContext'

import SpinnerCentered from '~components/common/SpinnerCentered'
import { ThemeProvider } from '~components/ui/ThemeProvider'

type Props = PropsWithChildren<{
  portfolio?: Portfolio
  isDev?: boolean
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
      {!isDev && portfolio?.name && (
        <Helmet>
          <title>
            {portfolio.name}
            's portfolio
          </title>
        </Helmet>
      )}
      <ThemeProvider theme={portfolio?.theme}>
        {children}
      </ThemeProvider>
    </PortfolioContext.Provider>
  )
}

export default PortfolioProvider
