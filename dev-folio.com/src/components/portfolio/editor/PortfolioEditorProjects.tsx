import { Plus } from 'lucide-react'

import PortfolioEditorProjectsDialog from '~components/portfolio/editor/PortfolioEditorProjectsDialog'
import { Button } from '~components/ui/Button'

function PortfolioEditorProjects() {
  // const { portfolio, setPortfolio } = usePortfolio()

  // const handleAddProject = useCallback(async () => {

  // }, [])

  return (
    <>
      PortfolioEditorProjects
      <PortfolioEditorProjectsDialog>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add
        </Button>
      </PortfolioEditorProjectsDialog>
    </>
  )
}

export default PortfolioEditorProjects
