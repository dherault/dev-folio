import { Box } from 'lucide-react'
import { useCallback, useState } from 'react'

import { deployPortfolio } from '~firebase'

import { Button } from '~components/ui/Button'

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
    <div className="border-l flex">
      <Button
        variant="ghost"
        className="pl-2.5 h-auto"
        onClick={handleClick}
        loading={loading}
      >
        <Box className="mr-2 h-4" />
        Deploy
      </Button>
    </div>
  )
}

export default DeployButton
