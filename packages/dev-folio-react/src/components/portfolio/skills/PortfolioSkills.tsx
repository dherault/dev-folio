import { useMemo } from 'react'
import { type Skill, type SkillCategory, skillCategories, skillCategoryLabels, skills } from 'dev-folio-types'

import usePortfolio from '~hooks/portfolio/usePortfolio'

import SkillCard from '~components/portfolio/skills/SkillCard'

function PortfolioSkills() {
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

  return (
    <section className="dfr-py-8 dfr-container">
      <h2 className="dfr-text-4xl dfr-font-bold">
        Technologies
      </h2>
      <div className="dfr-mt-8 dfr-space-y-8">
        {sortedCategories.map(category => (
          <article key={category}>
            <h3 className="dfr-text-2xl dfr-font-bold">
              {skillCategoryLabels[category]}
            </h3>
            <div className="dfr-mt-2 dfr-grid dfr-grid-cols-8 dfr-gap-4">
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
        ))}
      </div>
    </section>
  )
}

export default PortfolioSkills
