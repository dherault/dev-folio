import { technologies, technologyCategories, technologyCategoryLabels } from 'dev-folio-types'

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
          checked={portfolio.technologiesGrouped}
          onCheckedChange={checked => setPortfolio(x => ({ ...x, technologiesGrouped: checked }))}
        />
      </article>
      {technologyCategories.map(category => (
        <article key={category}>
          <Label>
            {technologyCategoryLabels[category]}
          </Label>
          <div className="mt-2 text-sm">
            {technologies.filter(technology => technology.category === category)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(technology => (
              <div
                key={technology.id}
                className="flex items-center gap-2"
              >
                <Checkbox
                  checked={portfolio.technologyIds.includes(technology.id)}
                  onCheckedChange={checked => setPortfolio(x => ({ ...x, technologyIds: checked ? [...x.technologyIds, technology.id] : x.technologyIds.filter(id => id !== technology.id) }))}
                />
                {technology.name}
              </div>
            ))}
          </div>
        </article>
      ))}
      {import.meta.env.DEV && (
        <Button onClick={() => setPortfolio(x => ({ ...x, technologyIds: technologies.map(technology => technology.id) }))}>
          Select all
        </Button>
      )}
    </div>
  )
}

export default PortfolioEditorTechnologies
