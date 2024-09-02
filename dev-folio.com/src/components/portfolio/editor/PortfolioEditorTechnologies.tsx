import { skillCategories, skillCategoryLabels, skills } from 'dev-folio-types'

import usePortfolio from '~hooks/portfolio/usePortfolio'

import { Checkbox } from '~components/ui/Checkbox'
import { Label } from '~components/ui/Label'
import { Switch } from '~components/ui/Switch'
import { Button } from '~components/ui/Button'

function PortfolioEditorTechnologies() {
  const { portfolio, setPortfolio } = usePortfolio()

  return (
    <div className="space-y-4">
      <article className="flex items-center gap-2">
        <Label>
          Include technologies
        </Label>
        <Switch
          checked={portfolio.sections.includes('technologies')}
          onCheckedChange={checked => setPortfolio(x => ({ ...x, sections: checked ? [...x.sections, 'technologies'] : x.sections.filter(section => section !== 'technologies') }))}
        />
      </article>
      <article className="flex items-center gap-2">
        <Label>
          Group technologies
        </Label>
        <Switch
          checked={portfolio.skillsGrouped}
          onCheckedChange={checked => setPortfolio(x => ({ ...x, skillsGrouped: checked }))}
        />
      </article>
      {skillCategories.map(category => (
        <article key={category}>
          <Label>
            {skillCategoryLabels[category]}
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
      {import.meta.env.DEV && (
        <Button onClick={() => setPortfolio(x => ({ ...x, skillIds: skills.map(skill => skill.id) }))}>
          Select all
        </Button>
      )}
    </div>
  )
}

export default PortfolioEditorTechnologies
