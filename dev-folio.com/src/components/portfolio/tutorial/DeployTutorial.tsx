import { type PropsWithChildren, useCallback } from 'react'

import useUser from '~hooks/user/useUser'

function DeployTutorial({ children }: PropsWithChildren) {
  const { user, updateUser } = useUser()

  const handleClick = useCallback(() => {
    updateUser({ hasCompletedTutorial: true })
  }, [
    updateUser,
  ])

  if (user?.hasCompletedTutorial) return children as JSX.Element

  return (
    <div className="relative flex">
      <div
        className="flex"
        onClick={handleClick}
      >
        {children}
      </div>
      <div className="absolute top-[calc(100%+8px)] -left-32 -right-32 flex flex-col items-center">
        <div className="h-1 w-1 bg-blue rounded-full" />
        <div className="relative">
          <div className="h-[30px] w-px bg-blue" />
          <div className="absolute flex">
            <div className="h-px w-4 bg-blue" />
            <div className="-mt-2.5 ml-2 text-blue leading-tight w-max">
              Then deploy it
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeployTutorial
