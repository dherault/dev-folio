import { Portfolio } from 'dev-folio-types'
import { type Dispatch, type SetStateAction, createContext } from 'react'

export type PortfolioContextType = {
  portfolio: Portfolio
  setPortfolio: Dispatch<SetStateAction<Portfolio>>
  edited: boolean
  setEdited: Dispatch<SetStateAction<boolean>>
}

export default createContext<PortfolioContextType>({
  portfolio: {} as Portfolio,
  setPortfolio: () => {},
  edited: false,
  setEdited: () => {},
})
