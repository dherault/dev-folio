import { ArrowDown, ArrowUp, Plus, Trash } from 'lucide-react'
import { useCallback, useState } from 'react'

import usePortfolio from '~hooks/portfolio/usePortfolio'

import PortfolioEditorProjectsCreateDialog from '~components/portfolio/editor/PortfolioEditorProjectsCreateDialog'
import { Button } from '~components/ui/Button'
import { Label } from '~components/ui/Label'
import { Switch } from '~components/ui/Switch'
import PortfolioEditorProjectsDeleteDialog from '~components/portfolio/editor/PortfolioEditorProjectsDeleteDialog'

function PortfolioEditorProjects() {
  const { portfolio, setPortfolio } = usePortfolio()

  const [deletedProjectId, setDeletedProjectId] = useState('')

  const handleMoveProject = useCallback((projectId: string, direction: number) => {
    const projectIndex = portfolio.projects.findIndex(project => project.id === projectId)
    const newProjects = [...portfolio.projects]
    const [project] = newProjects.splice(projectIndex, 1)

    newProjects.splice(projectIndex + direction, 0, project)

    setPortfolio(x => ({ ...x, projects: newProjects }))
  }, [
    portfolio.projects,
    setPortfolio,
  ])

  return (
    <>
      <article className="flex items-center gap-2">
        <Label>
          Include projects
        </Label>
        <Switch
          checked={portfolio.sections.includes('projects')}
          onCheckedChange={checked => setPortfolio(x => ({ ...x, sections: checked ? [...x.sections, 'projects'] : x.sections.filter(section => section !== 'projects') }))}
        />
      </article>
      <article className="mt-4">
        {portfolio.projects.map((project, i, a) => (
          <article
            key={project.id}
            className="flex items-center gap-2"
          >
            <Label>
              {project.name}
            </Label>
            <div className="-ml-2 grow" />
            {i > 0 && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => handleMoveProject(project.id, -1)}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            )}
            {i < a.length - 1 && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => handleMoveProject(project.id, 1)}
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setDeletedProjectId(project.id)}
            >
              <Trash className="h-4 w-4 text-red-500" />
            </Button>
          </article>
        ))}
      </article>
      <article className="mt-4">
        <PortfolioEditorProjectsCreateDialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add project
          </Button>
        </PortfolioEditorProjectsCreateDialog>
      </article>
      <PortfolioEditorProjectsDeleteDialog
        projectId={deletedProjectId}
        setProjectId={setDeletedProjectId}
      />
    </>
  )
}

export default PortfolioEditorProjects
