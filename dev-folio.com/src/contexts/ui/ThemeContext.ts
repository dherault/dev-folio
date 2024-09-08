import { createContext } from 'react'
import type { Theme } from 'dev-folio-types'

export type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'light',
  setTheme: () => null,
}

export default createContext<ThemeProviderState>(initialState)
