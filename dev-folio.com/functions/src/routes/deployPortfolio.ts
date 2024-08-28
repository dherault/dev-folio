import { HttpsError, onCall } from 'firebase-functions/v2/https'

import { getUserFromCallableRequest } from '../authentication/getUser'

const deployPortfolio = onCall(async request => {
  const { user } = await getUserFromCallableRequest(request)

  if (!user) throw new HttpsError('permission-denied', 'You are not authenticated')

  return {
    url: 'ok',
  }
})

export default deployPortfolio
