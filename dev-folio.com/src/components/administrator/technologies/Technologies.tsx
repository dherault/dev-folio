import { useCallback, useState } from 'react'
import { ref, uploadBytes } from 'firebase/storage'
import { technologies } from 'dev-folio-types'

import { storage } from '~firebase'

import { Button } from '~components/ui/Button'

function Technologies() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleUploadImages = useCallback(async () => {
    if (loading) return

    setLoading(true)
    setSuccess(false)

    const misses: string[] = []

    for (const technology of technologies) {
      try {
        const response = await fetch(`/images/technologies/${technology.id}.png`)
        const blob = await response.blob()

        if (blob.type !== 'image/png') throw new Error('Invalid image type')

        const storageRef = ref(storage, `technologies/${technology.id}`)

        await uploadBytes(storageRef, blob)
      }
      catch (error) {
        misses.push(technology.id)
      }
    }

    setLoading(false)
    setSuccess(true)

    if (misses.length) {
      window.alert(`Failed to upload image for the following technolgies: ${misses.join(', ')}`)
    }
  }, [
    loading,
  ])

  return (
    <div>
      <div className="flex items-center gap-2">
        <Button
          loading={loading}
          onClick={handleUploadImages}
        >
          Upload technologies images
        </Button>
        {success && (
          <div className="text-green-500">
            Success
          </div>
        )}
      </div>
    </div>
  )
}

export default Technologies
