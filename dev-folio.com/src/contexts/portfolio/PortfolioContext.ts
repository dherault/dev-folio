import { Portfolio, type PortfolioSectionId } from 'dev-folio-types'
import { type Dispatch, type SetStateAction, createContext } from 'react'

export type PortfolioContextType = {
  portfolio: Portfolio
  setPortfolio: Dispatch<SetStateAction<Portfolio>>
  edited: boolean
  setEdited: (edited: boolean) => void
  editedSection: PortfolioSectionId
  setEditedSection: (section: PortfolioSectionId) => void
  debouncedEdited: boolean
}

export default createContext<PortfolioContextType>({
  portfolio: {} as Portfolio,
  setPortfolio: () => {},
  edited: false,
  setEdited: () => {},
  editedSection: 'about',
  setEditedSection: () => {},
  debouncedEdited: false,
})
