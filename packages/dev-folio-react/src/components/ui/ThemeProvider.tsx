import { type PropsWithChildren, useEffect } from 'react'
import type { Theme } from 'dev-folio-types'

type ThemeProviderProps = PropsWithChildren<{
  theme?: Theme
  storageKey?: string
}>

export function ThemeProvider({
  children,
  theme = 'light',
}: ThemeProviderProps) {
  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('dfr-light', 'dfr-dark')
    root.classList.add(`dfr-${theme}`)
  }, [theme])

  return children as JSX.Element
}
