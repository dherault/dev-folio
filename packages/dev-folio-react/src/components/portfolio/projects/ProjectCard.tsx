import type { Project } from 'dev-folio-types'
import _ from 'clsx'

import { Button } from '~components/ui/Button'

type Props = {
  project: Project
}

function ProjectCard({ project }: Props) {
  return (
    <div className="dfr-group dfr-border dfr-flex dfr-flex-col">
      <div className="dfr-relative dfr-grow">
        {!!project.imageUrl && (
          <img
            src={project.imageUrl}
            alt={project.name}
            className="dfr-w-full dfr-aspect-[120/63] dfr-object-cover"
          />
        )}
        {!project.imageUrl && (
          <div className="dfr-w-full dfr-aspect-[120/63]" />
        )}
        {!!project.description && (
          <div
            className={_('dfr-p-4 dfr-absolute dfr-inset-0 dfr-bg-white dfr-transition-opacity dfr-overflow-hidden', {
              'dfr-opacity-0 group-hover:dfr-opacity-100': !!project.imageUrl,
            })}
          >
            {project.description}
          </div>
        )}
      </div>
      <div className="dfr-flex dfr-justify-between dfr-gap-2">
        <h3 className="dfr-py-2 dfr-pl-4 dfr-shrink dfr-truncate dfr-text-lg dfr-font-semibold">
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
