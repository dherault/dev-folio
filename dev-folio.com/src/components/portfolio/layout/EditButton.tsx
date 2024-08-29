import { Eye, PencilRuler } from 'lucide-react'

import usePortfolio from '~hooks/portfolio/usePortfolio'

import { Button } from '~components/ui/Button'

function EditButton() {
  const { edited, setEdited } = usePortfolio()

  return (
    <div className="border-l flex">
      <Button
        variant="ghost"
        className="!pl-3 h-auto"
        onClick={() => setEdited(x => !x)}
      >
        {edited ? (
          <>
            <Eye className="mr-2 h-4" />
            Preview
          </>
        ) : (
          <>
            <PencilRuler className="mr-2 h-4" />
            Edit
          </>
        )}
      </Button>
    </div>
  )
}

export default EditButton
