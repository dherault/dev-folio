import { useCallback, useMemo } from 'react'

import usePortfolio from '~hooks/portfolio/usePortfolio'
import useDebounce from '~hooks/common/useDebounce'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '~components/ui/Dialog'
import { Button } from '~components/ui/Button'

type Props = {
  projectId: string
  setProjectId: (projectId: string) => void
}

function PortfolioEditorProjectsDeleteDialog({ projectId, setProjectId }: Props) {
  const { portfolio, setPortfolio } = usePortfolio()

  const project = useMemo(() => portfolio.projects.find(project => project.id === projectId), [portfolio.projects, projectId])
  const debouncedProject = useDebounce(project, 300) || project

  const handleDelete = useCallback(() => {
    setPortfolio(x => ({
      ...x,
      projects: x.projects.filter(project => project.id !== projectId),
    }))
    setProjectId('')
  }, [
    projectId,
    setPortfolio,
    setProjectId,
  ])

  return (
    <Dialog
      open={!!projectId}
      onOpenChange={open => {
        if (open) return

        setProjectId('')
      }}
    >
      <DialogContent>
        <DialogHeader>
          Delete project
          <DialogDescription className="mt-2">
            Are you certain you want to delete the project "
            {debouncedProject?.name}
            "?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            onClick={() => setProjectId('')}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete()}
            variant="destructive"
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PortfolioEditorProjectsDeleteDialog
