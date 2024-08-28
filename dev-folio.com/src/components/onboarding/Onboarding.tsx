import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useUser from '~hooks/user/useUser'

import { Button } from '~components/ui/Button'
import { Input } from '~components/ui/Input'

function Onboarding() {
  const { updateUser } = useUser()
  const navigate = useNavigate()

  const [subdomain, setSubdomain] = useState('')

  const handleSubmit = useCallback(async () => {
    await updateUser({
      'portfolio.subdomain': subdomain,
    })

    navigate('/~')
  }, [
    subdomain,
    updateUser,
    navigate,
  ])

  return (
    <>
      Onboarding
      <Input
        value={subdomain}
        onChange={event => setSubdomain(event.target.value)}
      />
      <Button onClick={handleSubmit}>
        Continue
      </Button>
    </>
  )
}

export default Onboarding
