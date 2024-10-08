import { Crown } from 'lucide-react'
import { Link } from 'react-router-dom'

import useUser from '~hooks/user/useUser'

import { Button } from '~components/ui/Button'

function ProPlanButton() {
  const { user } = useUser()

  if (user?.isPremium) return null

  return (
    <Link
      to="/pricing"
      className="border-l flex"
    >
      <Button
        variant="ghost"
        className="h-auto"
      >
        <Crown className="mr-2 h-4 w-4 text-amber-500" />
        Upgrade to Pro
      </Button>
    </Link>
  )
}

export default ProPlanButton
