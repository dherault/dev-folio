import { Box } from 'lucide-react'
import { useCallback, useState } from 'react'

import { deployPortfolio } from '~firebase'

import { Button } from '~components/ui/Button'
import DeployTutorial from '~components/portfolio/tutorial/DeployTutorial'

function DeployButton() {
  const [loading, setLoading] = useState(false)

  const handleClick = useCallback(async () => {
    if (loading) return

    setLoading(true)

    try {
      await deployPortfolio()
    }
    catch {
      //
    }

    setLoading(false)
  }, [
    loading,
  ])

  return (
    <DeployTutorial>
      <div className="border-l flex">
        <Button
          variant="ghost"
          className="h-auto"
          onClick={handleClick}
          loading={loading}
        >
          <Box className="mr-2 h-4 w-4" />
          Deploy
        </Button>
      </div>
    </DeployTutorial>
  )
}

export default DeployButton
