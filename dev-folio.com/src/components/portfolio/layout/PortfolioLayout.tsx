import type { PropsWithChildren } from 'react'

import AppLayout from '~components/common/AppLayout'
import EditButton from '~components/portfolio/layout/EditButton'
import DeployButton from '~components/portfolio/layout/DeployButton'
import GoToPortfolioButton from '~components/portfolio/layout/GoToPortfolioButton'
import SettingsButton from '~components/portfolio/layout/SettingsButton'

function PortfolioLayout({ children }: PropsWithChildren) {
  return (
    <AppLayout actions={(
      <div className="flex border-r">
        <EditButton />
        <DeployButton />
        <GoToPortfolioButton />
        <SettingsButton />
      </div>
    )}
    >
      {children}
    </AppLayout>
  )
}

export default PortfolioLayout
