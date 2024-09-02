import { skills } from 'dev-folio-types'
import { useMemo } from 'react'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~components/ui/Tooltip'

type Props = {
  skillId: string
}

function Skill({ skillId }: Props) {
  const skill = useMemo(() => skills.find(skill => skill.id === skillId), [skillId])

  if (!skill) return null

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger>
        <img
          className="dfr-aspect-square"
          src={skill.imageUrl}
          alt={skill.name}
        />
      </TooltipTrigger>
      <TooltipContent>
        {skill.name}
      </TooltipContent>
    </Tooltip>
  )
}

export default Skill
