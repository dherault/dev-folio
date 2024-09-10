import { HttpsError, onCall } from 'firebase-functions/v2/https'
import { Storage } from '@google-cloud/storage'

import { getUserFromCallableRequest } from '../authentication/getUser'
import getBucketId from '../utils/getBucketId'

const setCustomDomain = onCall(
  {
    enforceAppCheck: true,
    cors: ['https://dev-folio.com'],
  },
  async request => {
    const { user } = await getUserFromCallableRequest(request)

    if (!user) throw new HttpsError('permission-denied', 'You are not authenticated')
    if (!user.portfolio.subdomain) throw new HttpsError('failed-precondition', 'You do not have a subdomain')
    if (!user.portfolio.customDomain) throw new HttpsError('failed-precondition', 'You do not have a custom domain')

    const { subdomain, customDomain } = user.portfolio
    const bucketId = getBucketId(subdomain)
    const storage = new Storage()
    const bucket = storage.bucket(bucketId)

    await bucket.setCorsConfiguration([
      {
        maxAgeSeconds: 3600,
        method: ['GET'],
        origin: [`https://${subdomain}.dev-folio.com`, `https://${customDomain}`],
        responseHeader: ['Content-Type'],
      },
    ])

    return {
      message: 'ok',
    }
  }
)

export default setCustomDomain
