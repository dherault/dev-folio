import { logger } from 'firebase-functions/v2'
import { HttpsError, onCall } from 'firebase-functions/v2/https'

import { getUserFromCallableRequest } from '../authentication/getUser'

const customDomainSecret = process.env.CUSTOM_DOMAIN_SECRET
const customDomainUrl = 'https://custom-domain.dev-folio.com'

const applyCustomDomain = onCall(
  {
    enforceAppCheck: true,
    cors: ['https://dev-folio.com'],
    timeoutSeconds: 540,
  },
  async request => {
    const { user } = await getUserFromCallableRequest(request)

    if (!user) throw new HttpsError('permission-denied', 'You are not authenticated')

    try {
      logger.log('Calling', customDomainUrl)

      const response = await fetch(customDomainUrl, {
        method: 'POST',
        body: JSON.stringify({
          secret: customDomainSecret,
          customDomain: user.portfolio.customDomain,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      logger.log('Status:', response.status)

      if (!response.ok) {
        throw new HttpsError('internal', 'Failed to apply custom domain')
      }

      const data = await response.json()

      return data
    }
    catch (error: any) {
      logger.error(error)

      throw new HttpsError('internal', error.message)
    }
  }
)

export default applyCustomDomain
