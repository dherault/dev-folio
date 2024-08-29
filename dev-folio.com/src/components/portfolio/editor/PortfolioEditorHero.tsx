import usePortfolio from '~hooks/portfolio/usePortfolio'

import { Input } from '~components/ui/Input'
import { Label } from '~components/ui/Label'
import TextareaAutosize from '~components/common/TextareaAutosize'

function PortfolioEditorHero() {
  const { portfolio, setPortfolio } = usePortfolio()

  return (
    <div className="px-4 space-y-4">
      <article>
        <Label>
          Name
        </Label>
        <Input
          value={portfolio.name}
          onChange={event => setPortfolio({ ...portfolio, name: event.target.value })}
          className="mt-2"
          placeholder="Steve Wozniak"
        />
      </article>
      <article>
        <Label>
          Description
        </Label>
        <TextareaAutosize
          minRows={3}
          value={portfolio.name}
          onChange={event => setPortfolio({ ...portfolio, heroDescription: event.target.value })}
          className="mt-2"
          placeholder="I'm a full-stack developer..."
        />
        <div className="mt-1.5 flex justify-end">
          <div className="text-xs text-blue hover:underline cursor-pointer">
            Find some inspiration
          </div>
        </div>
      </article>
    </div>
  )
}

export default PortfolioEditorHero
