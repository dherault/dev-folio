import { SquareArrowOutUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'

import useUser from '~hooks/user/useUser'

import { Button } from '~components/ui/Button'

function GoToPortfolioButton() {
  const { user } = useUser()

  const [nonce, setNonce] = useState(Math.random())

  useEffect(() => {
    setNonce(Math.random())
  }, [
    user?.portfolio.deployedAt,
  ])

  if (!(user?.portfolio.subdomain && user.portfolio.deployedAt)) return null

  return (
    <a
      href={`https://${user.portfolio.subdomain}.dev-folio.com?nonce=${nonce}`}
      target="_blank"
      rel="noreferrer"
      className="border-l flex"
    >
      <Button
        variant="ghost"
        className="h-auto"
      >
        <SquareArrowOutUpRight className="mr-2 h-4 w-4" />
        Go to portfolio
      </Button>
    </a>
  )
}

export default GoToPortfolioButton
