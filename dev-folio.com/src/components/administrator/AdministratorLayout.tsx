import type { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

function AdministratorLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="mb-4 container flex items-center gap-2">
        <Link
          to="/administrator/dev"
          className="text-blue hover:underline"
        >
          Dev
        </Link>
        {/* {' - '}
        <Link
          to="/administrator/emails"
          className="text-blue hover:underline"
        >
          Emails
        </Link> */}
      </div>
      <div className="container grow flex flex-col">
        {children}
      </div>
    </>
  )
}

export default AdministratorLayout
