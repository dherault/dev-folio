import { useCallback, useMemo } from 'react'
import { type Skill, type SkillCategory, skillCategories, skillCategoryLabels, skills } from 'dev-folio-types'

import usePortfolio from '~hooks/portfolio/usePortfolio'

import SkillCard from '~components/portfolio/technologies/SkillCard'

function PortfolioTechnologies() {
  const { portfolio } = usePortfolio()

  const skillsByCategory = useMemo(() => (
    portfolio.skillIds.reduce((acc, skillId) => {
      const skill = skills.find(skill => skill.id === skillId)

      if (!skill) return acc

      if (!acc[skill.category]) {
        acc[skill.category] = []
      }

      acc[skill.category].push(skill)

      return acc
    }, {} as Record<SkillCategory, Skill[]>)
  ), [
    portfolio.skillIds,
  ])

  const sortedCategories = useMemo(() => (
    (Object.keys(skillsByCategory) as SkillCategory[]).sort((a, b) => skillCategories.indexOf(a) - skillCategories.indexOf(b))
  ), [
    skillsByCategory,
  ])

  const renderUngrouped = useCallback(() => (
    sortedCategories.map(category => (
      <article key={category}>
        <h3 className="dfr-text-2xl dfr-font-bold">
          {skillCategoryLabels[category]}
        </h3>
        <div className="dfr-mt-2 dfr-grid dfr-grid-cols-10 dfr-gap-4">
          {skillsByCategory[category]
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(skill => (
            <SkillCard
              key={skill.id}
              skill={skill}
            />
          ))}
        </div>
      </article>
    ))
  ), [
    sortedCategories,
    skillsByCategory,
  ])

  const renderGrouped = useCallback(() => (
    <div className="dfr-grid dfr-grid-cols-10 dfr-gap-4">
      {Object.values(skillsByCategory)
      .reduce((acc, skills) => [...acc, ...skills], [])
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(skill => (
        <SkillCard
          key={skill.id}
          skill={skill}
        />
      ))}
    </div>
  ), [
    skillsByCategory,
  ])

  if (!portfolio.sections.includes('technologies')) return null

  return (
    <section className="dfr-py-8 dfr-container">
      <h2 className="dfr-text-4xl dfr-font-bold">
        Technologies
      </h2>
      <div className="dfr-mt-8 dfr-space-y-8">
        {portfolio.skillsGrouped ? renderGrouped() : renderUngrouped()}
      </div>
    </section>
  )
}

export default PortfolioTechnologies
