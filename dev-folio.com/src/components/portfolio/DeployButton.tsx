import { Box } from 'lucide-react'

import { Button } from '~components/ui/Button'

function DeployButton() {
  return (
    <Button
      variant="ghost"
      className="pl-2.5 h-auto border-l"
    >
      <Box className="mr-2 h-4" />
      Deploy
    </Button>
  )
}

export default DeployButton
