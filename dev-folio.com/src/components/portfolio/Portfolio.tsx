import 'dev-folio-react/dist/style.css'
import {
  PortfolioContact,
  PortfolioFooter,
  PortfolioHero,
  PortfolioLayout,
  PortfolioProjects,
  PortfolioProvider,
  PortfolioSkills,
} from 'dev-folio-react'
import { useEffect } from 'react'
import type { PortfolioSectionId } from 'dev-folio-types'

import usePortfolio from '~hooks/portfolio/usePortfolio'
import useDebounce from '~hooks/common/useDebounce'
import usePrevious from '~hooks/common/usePrevious'

import calculateElementVisibilityPercentage from '~utils/ui/calculateElementVisibility'

import PortfolioContainer from '~components/portfolio/PortfolioContainer'

const sectionIds: PortfolioSectionId[] = [
  'hero',
  'skills',
  'projects',
  'contact',
]

function Portfolio() {
  const { portfolio, edited, editedSection, setEditedSection } = usePortfolio()

  const debouncedEdited = useDebounce(edited, 250) || edited
  const previousEdited = usePrevious(debouncedEdited)

  // Scroll to edited section
  useEffect(() => {
    if (debouncedEdited || !previousEdited) return

    document.getElementById(editedSection)?.scrollIntoView(true)
  }, [
    debouncedEdited,
    previousEdited,
    editedSection,
  ])

  // Change edited section based on scroll
  useEffect(() => {
    function handleWheel() {
      const [{ sectionId }] = sectionIds
      .map(sectionId => {
        const element = document.getElementById(sectionId)

        return ({
          sectionId,
          visibility: element ? calculateElementVisibilityPercentage(element) : 0,
        })
      })
      .sort((a, b) => b.visibility - a.visibility)

      setEditedSection(sectionId)
    }

    window.addEventListener('wheel', handleWheel)

    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [
    setEditedSection,
  ])

  return (
    <PortfolioContainer>
      <PortfolioLayout>
        <PortfolioProvider
          isDev
          portfolio={portfolio}
        >
          {(!debouncedEdited || editedSection === 'hero') && (
            <div id="hero">
              <PortfolioHero />
            </div>
          )}
          {(!debouncedEdited || editedSection === 'skills') && (
            <div id="skills">
              <PortfolioSkills />
            </div>
          )}
          {(!debouncedEdited || editedSection === 'projects') && (
            <div id="projects">
              <PortfolioProjects />
            </div>
          )}
          {(!debouncedEdited || editedSection === 'contact') && (
            <div id="contact">
              <PortfolioContact />
            </div>
          )}
          {!debouncedEdited && <PortfolioFooter />}
        </PortfolioProvider>
      </PortfolioLayout>
    </PortfolioContainer>
  )
}

export default Portfolio
