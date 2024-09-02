import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useCallback, useState } from 'react'

import { storage } from '~firebase'

import { Button } from '~components/ui/Button'

import skills from '~data/skills.json'

function Skills() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleAddImageUrl = useCallback(async () => {
    if (loading) return

    setLoading(true)

    const nextSkills = [...skills]
    const misses: string[] = []

    for (const skill of nextSkills) {
      try {
        const blob = await fetch(`/images/skills/${skill.id}`).then(res => res.blob())
        const storageRef = ref(storage, `skills/${skill.id}`)

        await uploadBytes(storageRef, blob)

        const url = await getDownloadURL(storageRef)

        skill.imageUrl = url
      }
      catch (error) {
        misses.push(skill.id)
      }
    }

    if (misses.length) {
      window.alert(`Failed to upload image for the following skills: ${misses.join(', ')}`)
    }

    window.navigator.clipboard.writeText(JSON.stringify(nextSkills, null, 2))

    setLoading(false)
    setSuccess(true)
  }, [
    loading,
  ])

  return (
    <div className="flex items-center gap-2">
      <Button
        loading={loading}
        onClick={handleAddImageUrl}
      >
        Upload skill images
      </Button>
      {success && (
        <div className="text-green-500">
          Success!
        </div>
      )}
    </div>
  )
}

export default Skills
