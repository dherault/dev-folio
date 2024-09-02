import type { PropsWithChildren, ReactNode } from 'react'
import { Link } from 'react-router-dom'

import Logo from '~components/common/logos/Logo'
import GithubButton from '~components/common/GithubButton'
import UserAvatarMenu from '~components/common/UserAvatarMenu'

type Props = PropsWithChildren<{
  actions?: ReactNode
}>

function AppLayout({ actions, children }: Props) {
  return (
    <div className="relative grow flex flex-col">
      <nav className="px-4 h-[58px] flex justify-between border-b z-50">
        <div className="py-2 flex items-center gap-4">
          <Link to="/~">
            <Logo className="h-8 text-blue" />
          </Link>
          <div className="mt-[6px] ">
            <GithubButton />
          </div>
        </div>
        <div className="flex">
          {actions}
          <div className="pl-4 flex items-center">
            <UserAvatarMenu />
          </div>
        </div>
      </nav>
      <div className="grow flex flex-col bg-neutral-background">
        {children}
      </div>
    </div>
  )
}

export default AppLayout
