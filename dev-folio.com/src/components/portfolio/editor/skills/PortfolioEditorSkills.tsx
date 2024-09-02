import { SkillCategory, skillCategories, skills } from 'dev-folio-types'

import usePortfolio from '~hooks/portfolio/usePortfolio'

import { Checkbox } from '~components/ui/Checkbox'
import { Label } from '~components/ui/Label'

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  basic: 'Basic',
  language: 'Language',
  frontend: 'Frontend',
  backend: 'Backend',
  mobile: 'Mobile',
  database: 'Database',
  devops: 'DevOps',
  testing: 'Testing',
  tooling: 'Tooling',
  'machine-learning': 'Machine Learning',
  other: 'Other',
}

function PortfolioEditorSkills() {
  const { portfolio, setPortfolio } = usePortfolio()

  return (
    <div className="space-y-4">
      {skillCategories.map(category => (
        <article key={category}>
          <Label>
            {CATEGORY_LABELS[category]}
          </Label>
          <div className="mt-2 text-sm">
            {skills.filter(skill => skill.category === category)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(skill => (
              <div
                key={skill.id}
                className="flex items-center gap-2"
              >
                <Checkbox
                  checked={portfolio.skillIds.includes(skill.id)}
                  onCheckedChange={checked => setPortfolio(x => ({ ...x, skillIds: checked ? [...x.skillIds, skill.id] : x.skillIds.filter(id => id !== skill.id) }))}
                />
                {skill.name}
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  )
}

export default PortfolioEditorSkills
