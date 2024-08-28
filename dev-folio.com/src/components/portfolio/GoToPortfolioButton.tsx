import { SquareArrowOutUpRight } from 'lucide-react'

import useUser from '~hooks/user/useUser'

import { Button } from '~components/ui/Button'

function GoToPortfolioButton() {
  const { user } = useUser()

  if (!(user?.portfolio.deployedAt && user.portfolio.subdomain)) return null

  return (
    <a
      href={`${user.portfolio.subdomain}.dev-folio.com`}
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
