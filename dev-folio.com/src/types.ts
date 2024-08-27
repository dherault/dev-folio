/* ---
  Database resources
--- */

export type DatabaseResource<T = unknown> = T & {
  id: string
  userId: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export type User = DatabaseResource<{
  email: string
  name: string
  imageUrl: string
  signInProviders: SignInProvider[]
  hasSentSignupMessages: boolean
  isAdministrator: boolean
}>

/* ---
  Authentication
--- */

export type SignInProvider = 'password' | 'google.com' | 'github.com'
