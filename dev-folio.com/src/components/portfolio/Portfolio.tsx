import { useEffect } from 'react'
import {
  PortfolioAbout,
  PortfolioContact,
  PortfolioFooter,
  PortfolioLayout,
  PortfolioProjects,
  PortfolioProvider,
  PortfolioTechnologies,
} from 'dev-folio-react'
import 'dev-folio-react/dist/style.css'
import { portfolioSections } from 'dev-folio-types'

import usePortfolio from '~hooks/portfolio/usePortfolio'

import calculateElementVisibilityPercentage from '~utils/ui/calculateElementVisibility'

import PortfolioContainer from '~components/portfolio/PortfolioContainer'
import PortfolioEmpty from '~components/portfolio/PortfolioEmpty'

function Portfolio() {
  const {
    portfolio,
    editedSection,
    debouncedEdited,
    setEditedSection,
  } = usePortfolio()

  // Change edited section based on scroll
  useEffect(() => {
    function handleWheel() {
      const [{ sectionId }] = portfolioSections
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
          {(!debouncedEdited || editedSection === 'about') && (
            <div id="about">
              <PortfolioAbout />
            </div>
          )}
          {debouncedEdited && editedSection === 'about' && !portfolio.sections.includes('about') && (
            <div id="about">
              <PortfolioEmpty />
            </div>
          )}
          {(!debouncedEdited || editedSection === 'technologies') && portfolio.sections.includes('technologies') && (
            <div id="technologies">
              <PortfolioTechnologies />
            </div>
          )}
          {debouncedEdited && editedSection === 'technologies' && !portfolio.sections.includes('technologies') && (
            <div id="technologies">
              <PortfolioEmpty />
            </div>
          )}
          {(!debouncedEdited || editedSection === 'projects') && portfolio.sections.includes('projects') && (
            <div id="projects">
              <PortfolioProjects />
            </div>
          )}
          {debouncedEdited && editedSection === 'projects' && !portfolio.sections.includes('projects') && (
            <div id="technologies">
              <PortfolioEmpty />
            </div>
          )}
          {(!debouncedEdited || editedSection === 'contact') && portfolio.sections.includes('contact') && (
            <div id="contact">
              <PortfolioContact />
            </div>
          )}
          {debouncedEdited && editedSection === 'contact' && !portfolio.sections.includes('contact') && (
            <div id="technologies">
              <PortfolioEmpty />
            </div>
          )}
          {!debouncedEdited && <PortfolioFooter />}
        </PortfolioProvider>
      </PortfolioLayout>
    </PortfolioContainer>
  )
}

export default Portfolio
