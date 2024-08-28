import { useCallback, useState } from 'react'

import { deployPortfolio } from '~firebase'

import { Button } from '~components/ui/Button'
import { Input } from '~components/ui/Input'

const generateSubdomain = () => `dherault-${Math.random().toString(36).substring(7)}`

function AdministratorDev() {
  const [subdomain, setSubdomain] = useState(generateSubdomain())
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState('')

  const handleDeploy = useCallback(async () => {
    if (!subdomain) return
    if (loading) return

    setLoading(true)

    try {
      const { data: { url, error } } = await deployPortfolio({ subdomain })

      if (error) {
        console.error(error)
      }
      else {
        setUrl(url ?? '')
      }
    }
    catch {
      //
    }

    setLoading(false)
    setSubdomain(generateSubdomain())
  }, [
    subdomain,
    loading,
  ])

  return (
    <div className="flex items-center gap-2">
      <Input
        value={subdomain}
        onChange={event => setSubdomain(event.target.value)}
        className="w-64"
      />
      <Button
        onClick={handleDeploy}
        loading={loading}
      >
        Deploy
      </Button>
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="text-blue hover:underline"
        >
          {url}
        </a>
      )}
    </div>
  )
}

export default AdministratorDev
