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
  portfolio: Portfolio
}>

/* ---
  Portfolio
--- */

export type PortfolioSocialMedia = 'github'
  | 'linkedin'
  | 'x'
  | 'pinterest'
  | 'tiktok'
  | 'youtube'
  | 'website'

export type PortfolioSectionId = 'hero'
  | 'skills'
  | 'projects'
  | 'contact'

export type Portfolio = {
  subdomain: string
  sections: PortfolioSectionId[]
  firstName: string
  lastName: string
  jobTitle: string
  heroImageStoragePath: string
  socialMediaUrls: Partial<Record<PortfolioSocialMedia, string>>
}

/* ---
  Authentication
--- */

export type SignInProvider = 'password' | 'google.com' | 'github.com'
