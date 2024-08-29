import type { PropsWithChildren } from 'react'

function PortfolioLayout({ children }: PropsWithChildren) {
  return (
    <div className="tw-min-h-screen tw-flex tw-flex-col">
      {children}
    </div>
  )
}

export default PortfolioLayout
