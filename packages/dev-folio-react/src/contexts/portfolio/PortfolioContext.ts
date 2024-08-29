import { createContext } from 'react'
import type { Portfolio } from 'dev-folio-types'

export type PortfolioContextType = {
  portfolio: Portfolio
  isDev: boolean
}

export default createContext<PortfolioContextType>({
  portfolio: {} as Portfolio,
  isDev: false,
})
