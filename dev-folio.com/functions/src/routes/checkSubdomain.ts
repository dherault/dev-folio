import { HttpsError, onCall } from 'firebase-functions/v2/https'
import { Storage } from '@google-cloud/storage'

import { firestore } from '../firebase'
import { getUserFromCallableRequest } from '../authentication/getUser'
import getBucketId from '../utils/getBucketId'

const checkSubdomain = onCall(
  { enforceAppCheck: true, cors: ['https://dev-folio.com'] },
  async request => {
    const { user } = await getUserFromCallableRequest(request)

    if (!user) throw new HttpsError('permission-denied', 'You are not authenticated')

    const { subdomain } = request.data

    if (!subdomain) throw new HttpsError('invalid-argument', 'You must provide a subdomain')

    const existingUser = await firestore.collection('users').where('portfolio.subdomain', '==', subdomain).get()

    if (!existingUser.empty) return { exists: true }

    const bucketId = getBucketId(subdomain)
    const storage = new Storage()
    const [exists] = await storage.bucket(bucketId).exists()

    return { exists }
  }
)

export default checkSubdomain
