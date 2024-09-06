import { promisify } from 'node:util'
import { exec } from 'node:child_process'

import { HttpsError, onCall } from 'firebase-functions/v2/https'

import { getUserFromCallableRequest } from '../authentication/getUser'

const execPromise = promisify(exec)

const applyCustomDomain = onCall(
  { enforceAppCheck: true, cors: ['https://dev-folio.com'] },
  async request => {
    const { user } = await getUserFromCallableRequest(request)

    if (!user) throw new HttpsError('permission-denied', 'You are not authenticated')

    const { stdout, stderr } = await execPromise('gcloud version')

    if (stderr) throw new HttpsError('internal', stderr)

    return { message: stdout }
  }
)

export default applyCustomDomain
