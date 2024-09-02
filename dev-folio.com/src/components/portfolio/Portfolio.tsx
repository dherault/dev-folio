import { useEffect } from 'react'
import {
  PortfolioContact,
  PortfolioFooter,
  PortfolioHero,
  PortfolioLayout,
  PortfolioProjects,
  PortfolioProvider,
  PortfolioSkills,
} from 'dev-folio-react'
import 'dev-folio-react/dist/style.css'
import type { PortfolioSectionId } from 'dev-folio-types'

import usePortfolio from '~hooks/portfolio/usePortfolio'

import calculateElementVisibilityPercentage from '~utils/ui/calculateElementVisibility'

import PortfolioContainer from '~components/portfolio/PortfolioContainer'

const sectionIds: PortfolioSectionId[] = [
  'hero',
  'skills',
  'projects',
  'contact',
]

function Portfolio() {
  const { portfolio, editedSection, edited, debouncedEdited, setEditedSection } = usePortfolio()
  const finalEdited = debouncedEdited || edited

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
          {(!finalEdited || editedSection === 'hero') && (
            <div id="hero">
              <PortfolioHero />
            </div>
          )}
          {(!finalEdited || editedSection === 'skills') && (
            <div id="skills">
              <PortfolioSkills />
            </div>
          )}
          {(!finalEdited || editedSection === 'projects') && (
            <div id="projects">
              <PortfolioProjects />
            </div>
          )}
          {(!finalEdited || editedSection === 'contact') && (
            <div id="contact">
              <PortfolioContact />
            </div>
          )}
          {!finalEdited && <PortfolioFooter />}
        </PortfolioProvider>
      </PortfolioLayout>
    </PortfolioContainer>
  )
}

export default Portfolio
