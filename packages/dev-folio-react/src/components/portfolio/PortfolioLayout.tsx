import type { PropsWithChildren } from 'react'

function PortfolioLayout({ children }: PropsWithChildren) {
  return (
    <div className="dfr-min-h-screen dfr-flex dfr-flex-col">
      {children}
    </div>
  )
}

export default PortfolioLayout
