import { useCallback, useEffect, useState } from 'react'

import { SubdomainValidity } from '~types'

import { checkSubdomain } from '~firebase'

import useThrottledEffect from '~hooks/common/useThrottledEffect'

function useSubdomainValidity(subdomain: string, existingSubdomain?: string) {
  const [subdomainValidity, setSubdomainValidity] = useState(SubdomainValidity.Unset)

  const handleCheckSubdomain = useCallback(async () => {
    if (!subdomain) return
    if (subdomain === existingSubdomain) return

    setSubdomainValidity(SubdomainValidity.Loading)

    try {
      const { data: { exists } } = await checkSubdomain({ subdomain })

      setSubdomainValidity(exists ? SubdomainValidity.Invalid : SubdomainValidity.Valid)
    }
    catch {
      setSubdomainValidity(SubdomainValidity.Unset)
      //
    }
  }, [
    subdomain,
    existingSubdomain,
  ])

  useThrottledEffect(() => {
    handleCheckSubdomain()
  }, 300, [
    handleCheckSubdomain,
  ])

  useEffect(() => {
    setSubdomainValidity(
      subdomain
        ? subdomain === existingSubdomain
          ? SubdomainValidity.Unset
          : SubdomainValidity.Loading
        : SubdomainValidity.Unset
    )
  }, [
    subdomain,
    existingSubdomain,
  ])

  return subdomainValidity
}

export default useSubdomainValidity
