import { HttpsError, onCall } from 'firebase-functions/v2/https'
import { Storage } from '@google-cloud/storage'

import { getUserFromCallableRequest } from '../authentication/getUser'
import getBucketId from '../utils/getBucketId'

const deleteSubdomain = onCall(
  {
    enforceAppCheck: true,
    cors: ['https://dev-folio.com'],
  },
  async request => {
    const { user } = await getUserFromCallableRequest(request)

    if (!user) throw new HttpsError('permission-denied', 'You are not authenticated')

    const { subdomain } = request.data

    if (!subdomain) throw new HttpsError('invalid-argument', 'You must provide a subdomain')
    if (subdomain !== user.portfolio.subdomain) throw new HttpsError('permission-denied', 'You do not have permission to delete this subdomain')

    const bucketId = getBucketId(subdomain)
    const storage = new Storage()
    const bucket = storage.bucket(bucketId)
    const [files] = await bucket.getFiles()

    for (const file of files) {
      await file.delete()
    }

    await bucket.delete()

    return { message: 'ok' }
  }
)

export default deleteSubdomain
