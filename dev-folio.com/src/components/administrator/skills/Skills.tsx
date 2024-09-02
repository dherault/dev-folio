import { useCallback, useState } from 'react'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { type Skill, skills } from 'dev-folio-types'

import { storage } from '~firebase'

import { Button } from '~components/ui/Button'

function Skills() {
  const [loading, setLoading] = useState(false)
  const [skillsJson, setSkillsJson] = useState('')

  const handleAddImageUrl = useCallback(async () => {
    if (loading) return

    setLoading(true)

    const nextSkills: Skill[] = [...skills]
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
    setSkillsJson(JSON.stringify(nextSkills, null, 2))
  }, [
    loading,
  ])

  return (
    <div>
      <div className="flex gap-2">
        <Button
          loading={loading}
          onClick={handleAddImageUrl}
        >
          Upload skill images
        </Button>
        {!!skillsJson && (
          <Button onClick={() => window.navigator.clipboard.writeText(skillsJson)}>
            Copy skills JSON
          </Button>
        )}
      </div>
      {!!skillsJson && (
        <pre className="mt-4">
          {skillsJson}
        </pre>
      )}
    </div>
  )
}

export default Skills
