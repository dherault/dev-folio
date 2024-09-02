import { useMemo } from 'react'
import { type SkillCategory, skillCategories, skills } from 'dev-folio-types'

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
    <section className="dfr-py-32 dfr-container dfr-flex dfr-items-center dfr-justify-center">
      {sortedCategories.map(category => (
        <article key={category}>
          {skillIdsByCategory[category].map(skillId => (
            <Skill
              key={skillId}
              skillId={skillId}
            />
          ))}
        </article>
      ))}
    </section>
  )
}

export default PortfolioSkills
