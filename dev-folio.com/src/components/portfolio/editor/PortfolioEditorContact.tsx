import usePortfolio from '~hooks/portfolio/usePortfolio'

import { Label } from '~components/ui/Label'
import { Switch } from '~components/ui/Switch'
import { Input } from '~components/ui/Input'

function PortfolioEditorContact() {
  const { portfolio, setPortfolio } = usePortfolio()

  return (
    <>
      <article className="flex items-center gap-2">
        <Label>
          Include contact
        </Label>
        <Switch
          checked={portfolio.sections.includes('contact')}
          onCheckedChange={checked => setPortfolio(x => ({ ...x, sections: checked ? [...x.sections, 'contact'] : x.sections.filter(section => section !== 'contact') }))}
        />
      </article>
      <article className="mt-4">
        <Label>
          Email
        </Label>
        <Input
          value={portfolio.email}
          onChange={event => setPortfolio(x => ({ ...x, email: event.target.value }))}
          placeholder="xyz@example.com"
          className="mt-2"
        />
      </article>
    </>
  )
}

export default PortfolioEditorContact
