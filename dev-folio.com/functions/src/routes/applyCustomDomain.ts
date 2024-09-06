import { HttpsError, onCall } from 'firebase-functions/v2/https'

import { getUserFromCallableRequest } from '../authentication/getUser'

const cutomDomainSecret = process.env.CUSTOM_DOMAIN_SECRET
const customDomainUrl = 'https://custom-domain-264351709313.us-central1.run.app'

const applyCustomDomain = onCall(
  { enforceAppCheck: true, cors: ['https://dev-folio.com'] },
  async request => {
    const { user } = await getUserFromCallableRequest(request)

    if (!user) throw new HttpsError('permission-denied', 'You are not authenticated')

    try {
      const response = await fetch(customDomainUrl, {
        method: 'POST',
        body: JSON.stringify({
          secret: cutomDomainSecret,
        }),
      })
      const data = await response.json()

      return {
        data,
      }
    }
    catch (error: any) {
      throw new HttpsError('internal', error.message)
    }
  }
)

export default applyCustomDomain
