import { createContext } from 'react'
import type { User as Viewer } from 'firebase/auth'
import type { User } from 'dev-folio-types'

export type UserContextType = {
  loading: boolean
  viewer: Viewer | null
  user: User | null
  isPremium: boolean
  updateUser: (payload: Record<string, any>) => Promise<void>
  signOut: () => Promise<void>
}

export default createContext<UserContextType>({
  loading: true,
  viewer: null,
  user: null,
  isPremium: false,
  signOut: async () => {},
  updateUser: async () => {},
})
