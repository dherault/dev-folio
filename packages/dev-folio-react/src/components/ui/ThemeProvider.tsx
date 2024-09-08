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

    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])

  return children as JSX.Element
}
