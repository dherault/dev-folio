import { User } from 'dev-folio-types'

type CreateUserArg = Omit<
  User,
  'hasSentSignupMessages'
  | 'hasCompletedTutorial'
  | 'isAdministrator'
  | 'portfolio'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
>

function createUser(user: CreateUserArg): User {
  const now = new Date().toISOString()

  return {
    ...user,
    hasSentSignupMessages: false,
    hasCompletedTutorial: false,
    isAdministrator: false,
    portfolio: {
      subdomain: '',
      customDomain: '',
      deployedAt: '',
      sections: ['about', 'technologies', 'projects', 'contact'],
      email: user.email,
      name: '',
      heroEmoji: '👋',
      heroDescription: '',
      heroImageUrl: '',
      socialMediaUrls: {},
      technologyIds: [],
      technologiesGrouped: false,
      projects: [],
      theme: 'light',
    },
    createdAt: now,
    updatedAt: now,
    deletedAt: '',
  }
}

export default createUser
