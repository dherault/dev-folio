import type { Project } from 'dev-folio-types'

import { Button } from '~components/ui/Button'

type Props = {
  project: Project
}

function ProjectCard({ project }: Props) {
  return (
    <div className="dfr-group dfr-border">
      <div className="dfr-relative">
        {!!project.imageUrl && (
          <img
            src={project.imageUrl}
            alt={project.name}
            className="dfr-w-full"
          />
        )}
        {!!project.description && (
          <div className="dfr-p-4 dfr-absolute dfr-inset-0 dfr-opacity-0 group-hover:dfr-opacity-100 dfr-bg-white dfr-transition-opacity">
            {project.description}
          </div>
        )}
      </div>
      <div className="dfr-flex dfr-justify-between dfr-gap-4">
        <h3 className="dfr-py-2 dfr-px-4 dfr-shrink dfr-truncate dfr-text-lg dfr-font-semibold">
          {project.name}
        </h3>
        {!!project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="dfr-flex"
          >
            <Button
              variant="ghost"
              className="dfr-h-full"
            >
              View
            </Button>
          </a>
        )}
      </div>
    </div>
  )
}

export default ProjectCard
