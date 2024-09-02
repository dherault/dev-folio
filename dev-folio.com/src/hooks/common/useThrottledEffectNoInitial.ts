import { useEffect, useRef } from 'react'

function useThrottledEffectNoInitial(callback: () => void, delay: number, deps: any[] = []) {
  const lastRan = useRef(Date.now())
  const isInitial = useRef(true)

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false

      return
    }

    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= delay) {
        callback()
        lastRan.current = Date.now()
      }
    }, delay)

    return () => {
      clearTimeout(handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, ...deps])
}

export default useThrottledEffectNoInitial
