import { useMemo } from 'react'
import { type SkillCategory, skillCategories, skillCategoryLabels, skills } from 'dev-folio-types'

import usePortfolio from '~hooks/portfolio/usePortfolio'

import Skill from '~components/portfolio/skills/Skill'

function PortfolioSkills() {
  const { portfolio } = usePortfolio()

  const skillIdsByCategory = useMemo(() => (
    portfolio.skillIds.reduce((acc, skillId) => {
      const skill = skills.find(skill => skill.id === skillId)

      if (!skill) return acc

      if (!acc[skill.category]) {
        acc[skill.category] = []
      }

      acc[skill.category].push(skillId)

      return acc
    }, {} as Record<string, string[]>)
  ), [
    portfolio.skillIds,
  ])
  const sortedCategories = useMemo(() => (
    (Object.keys(skillIdsByCategory) as SkillCategory[]).sort((a, b) => skillCategories.indexOf(a) - skillCategories.indexOf(b))
  ), [
    skillIdsByCategory,
  ])

  return (
    <section className="dfr-py-8 dfr-container">
      <h2 className="dfr-text-4xl dfr-font-bold">
        Technologies
      </h2>
      <div className="dfr-mt-4 dfr-space-y-4">
        {sortedCategories.map(category => (
          <article key={category}>
            <h3 className="dfr-text-2xl dfr-font-bold">
              {skillCategoryLabels[category]}
            </h3>
            <div className="dfr-mt-2 dfr-grid dfr-grid-cols-6">
              {skillIdsByCategory[category].map(skillId => (
                <Skill
                  key={skillId}
                  skillId={skillId}
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
