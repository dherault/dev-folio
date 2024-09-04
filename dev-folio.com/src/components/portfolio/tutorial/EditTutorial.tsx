import { type PropsWithChildren, useCallback } from 'react'

import useUser from '~hooks/user/useUser'

function EditTutorial({ children }: PropsWithChildren) {
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
        <div className="h-4 w-px bg-blue" />
        <div className="mt-1 text-blue text-center leading-tight">
          Start by editing
          <br />
          your portfolio
        </div>
      </div>
    </div>
  )
}

export default EditTutorial
