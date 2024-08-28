import type { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

import Logo from '~components/common/logos/Logo'
import GithubButton from '~components/common/GithubButton'
import GoToPortfolioButton from '~components/portfolio/GoToPortfolioButton'
import DeployButton from '~components/portfolio/DeployButton'
import UserAvatarMenu from '~components/common/UserAvatarMenu'

function PortfolioLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative grow flex flex-col">
      <nav className="px-4 flex justify-between border-b">
        <div className="py-2 flex items-center gap-4">
          <Link to="/~">
            <Logo className="h-8 text-blue" />
          </Link>
          <div className="mt-[6px] ">
            <GithubButton />
          </div>
        </div>
        <div className="flex z-50">
          <DeployButton />
          <GoToPortfolioButton />
          <div className="pl-4 flex items-center border-l">
            <UserAvatarMenu />
          </div>
        </div>
      </nav>
      <div className="mt-[72px] grow flex flex-col">
        {children}
      </div>
    </div>
  )
}

export default PortfolioLayout
