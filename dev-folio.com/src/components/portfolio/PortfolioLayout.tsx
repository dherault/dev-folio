import type { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

import Logotype from '~components/common/logos/Logotype'
import GithubButton from '~components/common/GithubButton'
import DeployButton from '~components/portfolio/DeployButton'
import UserAvatarMenu from '~components/common/UserAvatarMenu'

function PortfolioLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative grow flex flex-col bg-neutral-background">
      <div className="absolute top-4 left-4 md:left-6 flex items-center gap-4 z-50">
        <Link to="/~">
          <Logotype />
        </Link>
        <div className="mt-1">
          <GithubButton />
        </div>
      </div>
      <div className="absolute top-4 right-4 md:right-6 flex items-center gap-4 z-50">
        <DeployButton />
        <UserAvatarMenu />
      </div>
      <div className="mt-[72px] grow flex flex-col">
        {children}
      </div>
    </div>
  )
}

export default PortfolioLayout
