import { SquareArrowOutUpRight } from 'lucide-react'

import useUser from '~hooks/user/useUser'

import { Button } from '~components/ui/Button'

function GoToPortfolioButton() {
  const { user } = useUser()

  if (!(user?.portfolio.subdomain && user.portfolio.deployedAt)) return null

  return (
    <a
      href={`https://${user.portfolio.subdomain}.dev-folio.com`}
      target="_blank"
      rel="noreferrer"
      className="border-l flex"
    >
      <Button
        variant="ghost"
        className="pl-2.5 h-auto"
      >
        <SquareArrowOutUpRight className="mr-2 h-4" />
        Go to Portfolio
      </Button>
    </a>
  )
}

export default GoToPortfolioButton
