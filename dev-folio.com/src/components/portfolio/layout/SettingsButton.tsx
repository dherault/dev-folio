import { Settings } from 'lucide-react'

import { Button } from '~components/ui/Button'
import PortfolioSettings from '~components/portfolio/PortfolioSettings'

function SettingsButton() {
  return (
    <div className="border-l flex">
      <PortfolioSettings>
        <Button
          variant="ghost"
          className="h-auto"
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </PortfolioSettings>
    </div>
  )
}

export default SettingsButton
