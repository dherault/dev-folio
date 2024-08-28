import { createContext } from 'react'
import type { Portfolio } from 'dev-folio-types'

export default createContext<Portfolio>({} as Portfolio)
