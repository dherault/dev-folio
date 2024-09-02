import { useCallback, useMemo } from 'react'
import { type Technology, type TechnologyCategory, technologies, technologyCategories, technologyCategoryLabels } from 'dev-folio-types'

import usePortfolio from '~hooks/portfolio/usePortfolio'

import TechnologyCard from '~components/portfolio/technologies/TechnologyCard'

function PortfolioTechnologies() {
  const { portfolio } = usePortfolio()

  const technologiessByCategory = useMemo(() => (
    portfolio.technologyIds.reduce((acc, technologyId) => {
      const skill = technologies.find(t => t.id === technologyId)

      if (!skill) return acc

      if (!acc[skill.category]) {
        acc[skill.category] = []
      }

      acc[skill.category].push(skill)

      return acc
    }, {} as Record<TechnologyCategory, Technology[]>)
  ), [
    portfolio.technologyIds,
  ])

  const sortedCategories = useMemo(() => (
    (Object.keys(technologiessByCategory) as TechnologyCategory[]).sort((a, b) => technologyCategories.indexOf(a) - technologyCategories.indexOf(b))
  ), [
    technologiessByCategory,
  ])

  const renderUngrouped = useCallback(() => (
    sortedCategories.map(category => (
      <article key={category}>
        <h3 className="dfr-text-2xl dfr-font-bold">
          {technologyCategoryLabels[category]}
        </h3>
        <div className="dfr-mt-2 dfr-grid dfr-grid-cols-10 dfr-gap-4">
          {technologiessByCategory[category]
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(skill => (
            <TechnologyCard
              key={skill.id}
              technology={skill}
            />
          ))}
        </div>
      </article>
    ))
  ), [
    sortedCategories,
    technologiessByCategory,
  ])

  const renderGrouped = useCallback(() => (
    <div className="dfr-grid dfr-grid-cols-10 dfr-gap-4">
      {Object.values(technologiessByCategory)
      .reduce((acc, skills) => [...acc, ...skills], [])
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(skill => (
        <TechnologyCard
          key={skill.id}
          technology={skill}
        />
      ))}
    </div>
  ), [
    technologiessByCategory,
  ])

  if (!portfolio.sections.includes('technologies')) return null

  return (
    <section className="dfr-py-8 dfr-container">
      <h2 className="dfr-text-4xl dfr-font-bold">
        Technologies
      </h2>
      <div className="dfr-mt-8 dfr-space-y-8">
        {portfolio.technologiesGrouped ? renderGrouped() : renderUngrouped()}
      </div>
    </section>
  )
}

export default PortfolioTechnologies
