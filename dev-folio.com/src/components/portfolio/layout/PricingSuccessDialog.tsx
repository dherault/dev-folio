import { type PropsWithChildren, useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { PRICING_SUCCESS_SEARCH_PARAMETER_KEY } from '~constants'

import { assignPremiumStatus } from '~firebase'

import { Button } from '~components/ui/Button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~components/ui/Dialog'

function PricingSuccessDialog({ children }: PropsWithChildren) {
  const [searchParams, setSearchParams] = useSearchParams()

  const open = !!searchParams.get(PRICING_SUCCESS_SEARCH_PARAMETER_KEY)

  const handleClose = useCallback(() => {
    setSearchParams(x => {
      x.delete(PRICING_SUCCESS_SEARCH_PARAMETER_KEY)

      return x
    })
  }, [
    setSearchParams,
  ])

  const handleAssignPremium = useCallback(async () => {
    await assignPremiumStatus()
  }, [])

  useEffect(() => {
    handleAssignPremium()
  }, [
    handleAssignPremium,
  ])

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={open => !open && handleClose()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              You now have access to the pro version of Dev Folio!
            </DialogTitle>
          </DialogHeader>
          <div>
            To start using the unlocked features, simply click on the settings buttons on the top right corner of the page.
          </div>
          <DialogFooter>
            <Button
              onClick={handleClose}
              variant="ghost"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {children}
    </>
  )
}

export default PricingSuccessDialog
