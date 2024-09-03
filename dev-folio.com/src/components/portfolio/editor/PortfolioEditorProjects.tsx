import { ArrowDown, ArrowUp, Edit, Plus, Trash } from 'lucide-react'
import { useCallback, useState } from 'react'
import { Project } from 'dev-folio-types'

import usePortfolio from '~hooks/portfolio/usePortfolio'

import PortfolioEditorProjectsDialog from '~components/portfolio/editor/PortfolioEditorProjectsDialog'
import { Button } from '~components/ui/Button'
import { Label } from '~components/ui/Label'
import { Switch } from '~components/ui/Switch'
import PortfolioEditorProjectsDeleteDialog from '~components/portfolio/editor/PortfolioEditorProjectsDeleteDialog'

function PortfolioEditorProjects() {
  const { portfolio, setPortfolio } = usePortfolio()

  const [editedOpen, setEditedOpen] = useState(false)
  const [editedProject, setEditedProject] = useState<Project | null>(null)
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
            <Label className="shrink truncate">
              {project.name}
            </Label>
            <div className="-ml-2 grow" />
            {i > 0 && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => handleMoveProject(project.id, -1)}
                className="shrink-0"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            )}
            {i < a.length - 1 && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => handleMoveProject(project.id, 1)}
                className="shrink-0"
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => {
                setEditedProject(project)
                setEditedOpen(true)
              }}
              className="shrink-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setDeletedProjectId(project.id)}
              className="shrink-0"
            >
              <Trash className="h-4 w-4 text-red-500" />
            </Button>
          </article>
        ))}
      </article>
      <article className="mt-4">
        <Button onClick={() => setEditedOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add project
        </Button>
      </article>
      <PortfolioEditorProjectsDialog
        open={editedOpen}
        setOpen={open => {
          setEditedOpen(open)

          if (open) return

          setEditedProject(null)
        }}
        project={editedProject}
      />
      <PortfolioEditorProjectsDeleteDialog
        projectId={deletedProjectId}
        setProjectId={setDeletedProjectId}
      />
    </>
  )
}

export default PortfolioEditorProjects
