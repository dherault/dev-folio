/* ---
  Database resources
--- */

import type { portfolioSections, skillCategories, socialMedias } from './constants'

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

export type PortfolioSocialMedia = typeof socialMedias[number]

export type PortfolioSectionId = typeof portfolioSections[number]

export type Portfolio = {
  subdomain: string
  deployedAt: string
  sections: PortfolioSectionId[]
  name: string
  heroDescription: string
  heroEmoji: string
  heroImageUrl: string
  socialMediaUrls: Partial<Record<PortfolioSocialMedia, string>>
}

export type SkillCategory = typeof skillCategories[number]

export type Skill = {
  id: string
  name: string
  category: SkillCategory
  imageUrl: string
  imagePadding?: boolean
}

/* ---
  Authentication
--- */

export type SignInProvider = 'password' | 'google.com' | 'github.com'
