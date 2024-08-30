import { useCallback } from 'react'

import usePortfolio from '~hooks/portfolio/usePortfolio'

import uploadFile from '~utils/storage/uploadFile'

import { Input } from '~components/ui/Input'
import { Label } from '~components/ui/Label'
import { Checkbox } from '~components/ui/Checkbox'
import TextareaAutosize from '~components/common/TextareaAutosize'
import EmojiPicker from '~components/common/EmojiPicker'
import PortfolioEditorHeroDescriptionInspiration from '~components/portfolio/editor/PortfolioEditorHeroDescriptionInspiration'
import ImageDropzone from '~components/common/ImageDropzone'

function PortfolioEditorHero() {
  const { portfolio, setPortfolio } = usePortfolio()

  const handleImageUpload = useCallback(async (file: File) => {
    try {
      const heroImageUrl = await uploadFile(file, 'heroImages')

      setPortfolio(x => ({ ...x, heroImageUrl }))
    }
    catch {
      //
    }
  }, [
    setPortfolio,
  ])

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
      <article>
        <Label>
          Image
        </Label>
        {!portfolio.heroImageUrl && (
          <>
            <div className="mt-2 mb-1 text-xs text-neutral-500">
              We recommend using a 3/4 aspect ratio image.
            </div>
            <ImageDropzone onSelect={handleImageUpload} />
          </>
        )}
      </article>
    </div>
  )
}

export default PortfolioEditorHero
