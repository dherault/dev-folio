import { Eye, PencilRuler } from 'lucide-react'

import usePortfolio from '~hooks/portfolio/usePortfolio'

import { Button } from '~components/ui/Button'

function EditButton() {
  const { edited, setEdited } = usePortfolio()

  return (
    <div className="border-l flex">
      <Button
        variant="ghost"
        className="h-auto"
        onClick={() => setEdited(!edited)}
      >
        {edited ? (
          <>
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </>
        ) : (
          <>
            <PencilRuler className="mr-2 h-4 w-4" />
            Edit
          </>
        )}
      </Button>
    </div>
  )
}

export default EditButton
