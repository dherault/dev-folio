import { useContext } from 'react'

import ThemeContext from '~contexts/ui/ThemeContext'

function useTheme() {
  return useContext(ThemeContext)
}

export default useTheme
