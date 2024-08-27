import { Link } from 'react-router-dom'

import { Button } from '~components/ui/Button'

function NotFound() {
  return (
    <div className="p-4 fixed inset-0 bg-white flex flex-col items-center justify-center text-center z-50">
      ¯\_(ツ)_/¯
      <br />
      Page not found
      <Link
        to="/"
        className="mt-6"
      >
        <Button>
          Go home
        </Button>
      </Link>
      <Link
        to="/support"
        className="mt-2 text-blue hover:underline text-xs"
      >
        Contact support
      </Link>
    </div>
  )
}

export default NotFound
