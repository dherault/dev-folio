import { useCallback, useState } from 'react'
import { ref, uploadBytes } from 'firebase/storage'
import { skills } from 'dev-folio-types'

import { storage } from '~firebase'

import { Button } from '~components/ui/Button'

function Skills() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(true)

  const handleAddImageUrl = useCallback(async () => {
    if (loading) return

    setLoading(true)

    const misses: string[] = []

    for (const skill of skills) {
      try {
        const response = await fetch(`/images/skills/${skill.id}.png`)
        const blob = await response.blob()

        if (blob.type !== 'image/png') throw new Error('Invalid image type')

        const storageRef = ref(storage, `skills/${skill.id}`)

        await uploadBytes(storageRef, blob)
      }
      catch (error) {
        misses.push(skill.id)
      }
    }

    setLoading(false)
    setSuccess(true)

    if (misses.length) {
      window.alert(`Failed to upload image for the following skills: ${misses.join(', ')}`)
    }
  }, [
    loading,
  ])

  return (
    <div>
      <div className="flex items-center gap-2">
        <Button
          loading={loading}
          onClick={handleAddImageUrl}
        >
          Upload skill images
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

export default Skills
