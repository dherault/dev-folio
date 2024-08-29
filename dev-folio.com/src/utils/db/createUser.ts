import { User } from 'dev-folio-types'

type CreateUserArg = Omit<
  User,
  'hasSentSignupMessages'
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
    isAdministrator: false,
    portfolio: {
      subdomain: '',
      deployedAt: '',
      sections: ['hero', 'skills', 'projects', 'contact'],
      name: '',
      heroEmoji: '👋',
      heroDescription: '',
      heroImageStoragePath: '',
      socialMediaUrls: {},
    },
    createdAt: now,
    updatedAt: now,
    deletedAt: '',
  }
}

export default createUser
