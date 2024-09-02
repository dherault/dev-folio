import type { PortfolioSectionId } from 'dev-folio-types'
import { type PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import PortfolioContext, { PortfolioContextType } from '~contexts/portfolio/PortfolioContext'

import useThrottledEffectNoInitial from '~hooks/common/useThrottledEffectNoInitial'
import useUser from '~hooks/user/useUser'

const MODE_SEARCH_PARAMETER_KEY = 'mode'
const MODE_EDIT = 'edit'
const MODE_PREVIEW = 'preview'

const SECTION_SEARCH_PARAMETER_KEY = 'section'

function PortfolioProvider({ children }: PropsWithChildren) {
  const { user, updateUser } = useUser()
  const [searchParams, setSearchParams] = useSearchParams()

  const edited = searchParams.get(MODE_SEARCH_PARAMETER_KEY) === MODE_EDIT
  const editedSection = (searchParams.get(SECTION_SEARCH_PARAMETER_KEY) as PortfolioSectionId) ?? 'hero'

  const [portfolio, setPortfolio] = useState(user!.portfolio)

  const setEdited = useCallback((edited: boolean) => {
    setSearchParams(x => {
      x.set(MODE_SEARCH_PARAMETER_KEY, edited ? MODE_EDIT : MODE_PREVIEW)

      return x
    })
  }, [
    setSearchParams,
  ])

  const setEditedSection = useCallback((section: PortfolioSectionId) => {
    setSearchParams(x => {
      x.set(SECTION_SEARCH_PARAMETER_KEY, section)

      return x
    })
  }, [
    setSearchParams,
  ])

  useThrottledEffectNoInitial(() => {
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
    editedSection,
    setEditedSection,
  }), [
    portfolio,
    edited,
    setEdited,
    editedSection,
    setEditedSection,
  ])

  return (
    <PortfolioContext.Provider value={portfolioContextValue}>
      {children}
    </PortfolioContext.Provider>
  )
}

export default PortfolioProvider
