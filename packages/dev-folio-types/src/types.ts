/* ---
  Database resources
--- */

import type { portfolioSections, socialMedias, technologyCategories } from './constants'

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
  hasCompletedTutorial: boolean
  isAdministrator: boolean
  portfolio: Portfolio
}>

/* ---
  Portfolio
--- */

export type Theme = 'dark' | 'light'

export type PortfolioSocialMedia = typeof socialMedias[number]

export type PortfolioSectionId = typeof portfolioSections[number]

export type Portfolio = {
  subdomain: string
  customDomain: string
  deployedAt: string
  sections: PortfolioSectionId[]
  email: string
  name: string
  heroDescription: string
  heroEmoji: string
  heroImageUrl: string
  socialMediaUrls: Partial<Record<PortfolioSocialMedia, string>>
  technologyIds: string[]
  technologiesGrouped: boolean
  projects: Project[]
  theme: Theme
}

export type TechnologyCategory = typeof technologyCategories[number]

export type Technology = {
  id: string
  name: string
  category: TechnologyCategory
  imagePadding?: boolean
  imageUrl?: string
}

export type Project = {
  id: string
  name: string
  description: string
  url: string
  imageUrl: string
}
/* ---
  Authentication
--- */

export type SignInProvider = 'password' | 'google.com' | 'github.com'
