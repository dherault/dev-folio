import { type PropsWithChildren, useEffect } from 'react'

import { TooltipProvider } from '~components/ui/Tooltip'

function PortfolioLayout({ children }: PropsWithChildren) {
  // Remove "nonce" search param from URL
  useEffect(() => {
    if (window.location.search.includes('nonce')) {
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [])

  return (
    <TooltipProvider>
      <div className="dfr-min-h-screen dfr-flex dfr-flex-col dfr-bg-white dark:dfr-bg-neutral-900 dfr-text-neutral-950 dark:dfr-text-white">
        {children}
      </div>
    </TooltipProvider>
  )
}

export default PortfolioLayout
