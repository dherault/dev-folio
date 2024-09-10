import { type Technology } from 'dev-folio-types'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~components/ui/Tooltip'

type Props = {
  technology: Technology
}

function TechnologyCard({ technology }: Props) {
  if (!technology) return null

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger>
        <div
          className="dfr-bg-white dfr-border dfr-aspect-square"
          style={{ padding: (technology.imagePadding ?? true) ? 16 : 0 }}
        >
          <img
            src={technology.imageUrl ?? `https://storage.googleapis.com/dev-folio-com.appspot.com/technologies/${technology.id}`}
            alt={technology.name}
            className="dfr-w-full"
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        {technology.name}
      </TooltipContent>
    </Tooltip>
  )
}

export default TechnologyCard
