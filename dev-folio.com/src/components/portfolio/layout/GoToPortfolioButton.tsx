import { SquareArrowOutUpRight } from 'lucide-react'

import useUser from '~hooks/user/useUser'

import { Button } from '~components/ui/Button'

function GoToPortfolioButton() {
  const { user } = useUser()

  if (!(user?.portfolio.subdomain && user.portfolio.deployedAt)) return null

  return (
    <a
      href={`https://${user.portfolio.subdomain}.dev-folio.com?nonce=${Math.random()}`}
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
