import usePortfolio from '~hooks/portfolio/usePortfolio'

import { Input } from '~components/ui/Input'
import { Label } from '~components/ui/Label'
import { Checkbox } from '~components/ui/Checkbox'
import TextareaAutosize from '~components/common/TextareaAutosize'
import EmojiPicker from '~components/common/EmojiPicker'
import PortfolioEditorHeroDescriptionInspiration from '~components/portfolio/editor/PortfolioEditorHeroDescriptionInspiration'

function PortfolioEditorHero() {
  const { portfolio, setPortfolio } = usePortfolio()

  return (
    <div className="px-4 space-y-4">
      <article>
        <div className="mb-2 flex items-center gap-2">
          <Checkbox
            checked={!!portfolio.heroEmoji}
            onCheckedChange={checked => {
              setPortfolio({ ...portfolio, heroEmoji: checked ? '👋' : '' })
            }}
          />
          <Label>
            Emoji
          </Label>
        </div>
        {!!portfolio.heroEmoji && (
          <EmojiPicker />
        )}
      </article>
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
          value={portfolio.heroDescription}
          onChange={event => setPortfolio({ ...portfolio, heroDescription: event.target.value })}
          className="mt-2"
          placeholder="I'm a full-stack developer..."
        />
        <div className="mt-1.5 flex justify-end">
          <PortfolioEditorHeroDescriptionInspiration>
            <div className="text-xs text-blue hover:underline cursor-pointer">
              Find some inspiration
            </div>
          </PortfolioEditorHeroDescriptionInspiration>
        </div>
      </article>
    </div>
  )
}

export default PortfolioEditorHero
