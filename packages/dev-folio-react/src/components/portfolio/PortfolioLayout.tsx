import type { PropsWithChildren } from 'react'

import { TooltipProvider } from '~components/ui/Tooltip'

function PortfolioLayout({ children }: PropsWithChildren) {
  return (
    <TooltipProvider>
      <div className="dfr-min-h-screen dfr-flex dfr-flex-col">
        {children}
      </div>
    </TooltipProvider>
  )
}

export default PortfolioLayout
