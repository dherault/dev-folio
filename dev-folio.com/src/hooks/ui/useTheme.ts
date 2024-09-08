import { useContext } from 'react'

import ThemeContext from '~contexts/ui/ThemeContext'

function useTheme() {
  const context = useContext(ThemeContext)

  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider')

  return context
}

export default useTheme
