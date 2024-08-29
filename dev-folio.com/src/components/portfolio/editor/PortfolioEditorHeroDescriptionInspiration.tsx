import { type PropsWithChildren, useCallback, useState } from 'react'

import usePortfolio from '~hooks/portfolio/usePortfolio'

import { Button } from '~components/ui/Button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~components/ui/Dialog'

import inspirations from '~data/heroDescriptionInspirations'

function PortfolioEditorHeroDescriptionInspiration({ children }: PropsWithChildren) {
  const { setPortfolio } = usePortfolio()

  const [open, setOpen] = useState(false)

  const handleUse = useCallback((text: string) => {
    setPortfolio(x => ({
      ...x,
      heroDescription: `${x.heroDescription ? `${x.heroDescription}\n` : ''}${text}`,
    }))
    setOpen(false)
  }, [
    setPortfolio,
  ])

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Here's some inspiration</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm text-neutral-500">
          {inspirations.map(text => (
            <div>
              {text}
              <div>
                <span
                  className="text-xs text-blue hover:underline cursor-pointer"
                  onClick={() => handleUse(text)}
                >
                  Use
                </span>
              </div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PortfolioEditorHeroDescriptionInspiration
