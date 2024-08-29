import { useState } from 'react'
import Picker from '@emoji-mart/react'

import usePortfolio from '~hooks/portfolio/usePortfolio'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~components/ui/Popover'
import { Button } from '~components/ui/Button'

function EmojiPicker() {
  const { portfolio, setPortfolio } = usePortfolio()

  const [open, setOpen] = useState(false)

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
        >
          {portfolio.heroEmoji}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 bg-transparent w-fit border-none shadow-none">
        <Picker
          data={async () => {
            const response = await fetch('https://cdn.jsdelivr.net/npm/@emoji-mart/data')

            return response.json()
          }}
          onEmojiSelect={(x: any) => {
            setPortfolio({ ...portfolio, heroEmoji: x.native })
            setOpen(false)
          }}
          skinTonePosition="search"
          categories={[
            'people',
            'nature',
            'foods',
            'activity',
            'places',
            'objects',
            'symbols',
            'flags',
          ]}
        />
      </PopoverContent>
    </Popover>
  )
}

export default EmojiPicker
