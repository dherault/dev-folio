import { useEffect, useState } from 'react'

function useRefreshWithDependencies(dependencies: any[] = [], twiceTimeout = 0) {
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setRefresh(x => !x)

    if (!twiceTimeout) return

    setTimeout(() => setRefresh(x => !x), twiceTimeout)
  }, [
    twiceTimeout,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...dependencies,
  ])

  return [refresh, setRefresh] as const
}

export default useRefreshWithDependencies
