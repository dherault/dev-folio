import { Portfolio, type PortfolioSectionId } from 'dev-folio-types'
import { type Dispatch, type SetStateAction, createContext } from 'react'

export type PortfolioContextType = {
  portfolio: Portfolio
  setPortfolio: Dispatch<SetStateAction<Portfolio>>
  edited: boolean
  setEdited: (edited: boolean) => void
  editedSection: PortfolioSectionId
  setEditedSection: (section: PortfolioSectionId) => void
}

export default createContext<PortfolioContextType>({
  portfolio: {} as Portfolio,
  setPortfolio: () => {},
  edited: false,
  setEdited: () => {},
  editedSection: 'hero',
  setEditedSection: () => {},
})
