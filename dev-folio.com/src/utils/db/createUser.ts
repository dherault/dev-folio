import { User } from '~types'

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
      sections: ['hero', 'skills', 'projects', 'contact'],
      firstName: '',
      lastName: '',
      jobTitle: '',
      heroImageStoragePath: '',
      socialMediaUrls: {},
    },
    createdAt: now,
    updatedAt: now,
    deletedAt: '',
  }
}

export default createUser
