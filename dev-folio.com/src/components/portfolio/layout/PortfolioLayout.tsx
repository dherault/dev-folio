import type { PropsWithChildren } from 'react'

import AppLayout from '~components/common/AppLayout'
import ProPlanButton from '~components/portfolio/layout/ProPlanButton'
import EditButton from '~components/portfolio/layout/EditButton'
import DeployButton from '~components/portfolio/layout/DeployButton'
import GoToPortfolioButton from '~components/portfolio/layout/GoToPortfolioButton'
import SettingsButton from '~components/portfolio/layout/SettingsButton'
import PricingSuccessDialog from '~components/portfolio/layout/PricingSuccessDialog'

function PortfolioLayout({ children }: PropsWithChildren) {
  return (
    <AppLayout actions={(
      <div className="flex border-r">
        <ProPlanButton />
        <EditButton />
        <DeployButton />
        <GoToPortfolioButton />
        <SettingsButton />
      </div>
    )}
    >
      <PricingSuccessDialog>
        {children}
      </PricingSuccessDialog>
    </AppLayout>
  )
}

export default PortfolioLayout
