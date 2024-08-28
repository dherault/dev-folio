import type { PropsWithChildren } from 'react'

function PortfolioLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col">
      {children}
    </div>
  )
}

export default PortfolioLayout
