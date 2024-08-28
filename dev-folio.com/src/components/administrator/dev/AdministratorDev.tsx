import { useCallback, useState } from 'react'

import { deployPortfolio } from '~firebase'

import { Button } from '~components/ui/Button'
import { Input } from '~components/ui/Input'

function AdministratorDev() {
  const [subdomain, setSubdomain] = useState('dherault')
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState('')

  const handleDeploy = useCallback(async () => {
    if (!subdomain) return
    if (loading) return

    setLoading(true)

    const { data: { url } } = await deployPortfolio({ subdomain })

    setUrl(url)

    setLoading(false)
  }, [
    subdomain,
    loading,
  ])

  return (
    <div className="w-fit flex items-center gap-2">
      <Input
        value={subdomain}
        onChange={event => setSubdomain(event.target.value)}
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
