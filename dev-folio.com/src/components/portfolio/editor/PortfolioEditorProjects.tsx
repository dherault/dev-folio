import { Plus } from 'lucide-react'

import { Button } from '~components/ui/Button'

function PortfolioEditorProjects() {
  // const { portfolio, setPortfolio } = usePortfolio()

  // const handleAddProject = useCallback(async () => {

  // }, [])

  return (
    <>
      PortfolioEditorProjects
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Add
      </Button>
    </>
  )
}

export default PortfolioEditorProjects
