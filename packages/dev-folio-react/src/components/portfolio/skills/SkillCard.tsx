import { type Skill } from 'dev-folio-types'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~components/ui/Tooltip'

type Props = {
  skill: Skill
}

function SkillCard({ skill }: Props) {
  if (!skill) return null

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger>
        <div
          className="dfr-border"
          style={{ padding: (skill.imagePadding ?? true) ? 16 : 0 }}
        >
          <img
            src={`https://storage.googleapis.com/dev-folio-com.appspot.com/skills/${skill.id}`}
            alt={skill.name}
            className="dfr-aspect-square "
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        {skill.name}
      </TooltipContent>
    </Tooltip>
  )
}

export default SkillCard
