import { HttpsError, onCall } from 'firebase-functions/v2/https'
import { Storage } from '@google-cloud/storage'

import getBucketId from '../utils/getBucketId'
import { getUserFromCallableRequest } from '../authentication/getUser'

const checkSubdomain = onCall(
  { enforceAppCheck: true },
  async request => {
    const { user } = await getUserFromCallableRequest(request)

    if (!user) throw new HttpsError('permission-denied', 'You are not authenticated')

    const { subdomain } = request.data

    if (!subdomain) throw new HttpsError('invalid-argument', 'You must provide a subdomain')

    const bucketId = getBucketId(subdomain)
    const storage = new Storage()
    const [exists] = await storage.bucket(bucketId).exists()

    return { exists }
  }
)

export default checkSubdomain
