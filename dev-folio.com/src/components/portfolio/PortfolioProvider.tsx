import { type PropsWithChildren, useMemo, useState } from 'react'

import PortfolioContext, { PortfolioContextType } from '~contexts/portfolio/PortfolioContext'

import useThrottledEffect from '~hooks/common/useThrottledEffect'
import useUser from '~hooks/user/useUser'

function PortfolioProvider({ children }: PropsWithChildren) {
  const { user, updateUser } = useUser()
  const [portfolio, setPortfolio] = useState(user!.portfolio)
  const [edited, setEdited] = useState(false)

  useThrottledEffect(() => {
    updateUser({ portfolio })
  }, 300, [
    portfolio,
    updateUser,
  ])
  const portfolioContextValue = useMemo<PortfolioContextType>(() => ({
    portfolio,
    setPortfolio,
    edited,
    setEdited,
  }), [
    portfolio,
    edited,
  ])

  return (
    <PortfolioContext.Provider value={portfolioContextValue}>
      {children}
    </PortfolioContext.Provider>
  )
}

export default PortfolioProvider
