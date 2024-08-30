import { useCallback, useState } from 'react'

import usePortfolio from '~hooks/portfolio/usePortfolio'

import uploadFile from '~utils/storage/uploadFile'

import { Input } from '~components/ui/Input'
import { Label } from '~components/ui/Label'
import { Checkbox } from '~components/ui/Checkbox'
import TextareaAutosize from '~components/common/TextareaAutosize'
import EmojiPicker from '~components/common/EmojiPicker'
import ImageDropzone from '~components/common/ImageDropzone'
import Spinner from '~components/common/Spinner'
import PortfolioEditorHeroDescriptionInspiration from '~components/portfolio/editor/PortfolioEditorHeroDescriptionInspiration'

function PortfolioEditorHero() {
  const { portfolio, setPortfolio } = usePortfolio()

  const [imageLoading, setImageLoading] = useState(false)
  const [imageEdited, setImageEdited] = useState(false)

  const handleImageUpload = useCallback(async (file: File) => {
    if (imageLoading) return

    try {
      setImageLoading(true)

      const heroImageUrl = await uploadFile(file, 'heroImages')

      setPortfolio(x => ({ ...x, heroImageUrl }))

      setImageLoading(false)
      setImageEdited(false)
    }
    catch {
      //
    }
  }, [
    imageLoading,
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
        <div className="mt-1.5 -mb-2 flex justify-end">
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
        {imageLoading && (
          <div className="mt-2">
            <Spinner className="w-4" />
          </div>
        )}
        {(!portfolio.heroImageUrl || imageEdited) && !imageLoading && (
          <>
            <div className="mt-2 mb-1 text-xs text-neutral-500">
              We recommend using a 3/4 aspect ratio image.
            </div>
            <ImageDropzone onSelect={handleImageUpload} />
            {imageEdited && (
              <div className="mt-1.5 flex justify-end">
                <div
                  className="text-xs text-blue hover:underline cursor-pointer"
                  onClick={() => setImageEdited(false)}
                >
                  Use current image
                </div>
              </div>
            )}
          </>
        )}
        {!!portfolio.heroImageUrl && !imageEdited && !imageLoading && (
          <>
            <img
              src={portfolio.heroImageUrl}
              alt="Hero"
              className="mt-2 h-48"
            />
            <div
              className="mt-2 text-xs text-blue hover:underline cursor-pointer"
              onClick={() => setImageEdited(true)}
            >
              Change Image
            </div>
          </>
        )}
      </article>
      <article>
        <Label>
          Social Media
        </Label>
        <div className="mt-2 space-y-1">
          <div className="flex items-center gap-4">
            <div className="text-sm w-32">
              GitHub
            </div>
            <Input
              value={portfolio.socialMediaUrls.github ?? ''}
              onChange={event => setPortfolio(x => ({ ...x, socialMediaUrls: { ...x.socialMediaUrls, github: event.target.value } }))}
              placeholder="https://github.com/xyz"
              className="h-8"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm w-32">
              LinkedIn
            </div>
            <Input
              value={portfolio.socialMediaUrls.linkedin ?? ''}
              onChange={event => setPortfolio(x => ({ ...x, socialMediaUrls: { ...x.socialMediaUrls, linkedin: event.target.value } }))}
              placeholder="https://linkedin.com/in/xyz"
              className="h-8"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm w-32">
              X
            </div>
            <Input
              value={portfolio.socialMediaUrls.x ?? ''}
              onChange={event => setPortfolio(x => ({ ...x, socialMediaUrls: { ...x.socialMediaUrls, x: event.target.value } }))}
              placeholder="https://www.x.com/xyz"
              className="h-8"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm w-32">
              YouTube
            </div>
            <Input
              value={portfolio.socialMediaUrls.youtube ?? ''}
              onChange={event => setPortfolio(x => ({ ...x, socialMediaUrls: { ...x.socialMediaUrls, youtube: event.target.value } }))}
              placeholder="https://youtube.com/channel/xyz"
              className="h-8"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm w-32">
              TiKTok
            </div>
            <Input
              value={portfolio.socialMediaUrls.tiktok ?? ''}
              onChange={event => setPortfolio(x => ({ ...x, socialMediaUrls: { ...x.socialMediaUrls, tiktok: event.target.value } }))}
              placeholder="https://tiktok.com/@xyz"
              className="h-8"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm w-32">
              Other website
            </div>
            <Input
              value={portfolio.socialMediaUrls.website ?? ''}
              onChange={event => setPortfolio(x => ({ ...x, socialMediaUrls: { ...x.socialMediaUrls, website: event.target.value } }))}
              placeholder="https://xyz.com"
              className="h-8"
            />
          </div>
        </div>
      </article>
    </div>
  )
}

export default PortfolioEditorHero
