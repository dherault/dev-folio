import fs from 'node:fs'
import path from 'node:path'

import { HttpsError, onCall } from 'firebase-functions/v2/https'
import { Storage } from '@google-cloud/storage'

import { getUserFromCallableRequest } from '../authentication/getUser'

const storage = new Storage()
const dataLocation = path.resolve(__dirname, '../../../../data/build')

const deployPortfolio = onCall(async request => {
  const { user } = await getUserFromCallableRequest(request)

  if (!user) throw new HttpsError('permission-denied', 'You are not authenticated')

  const { subdomain } = request.data

  const [existingBucket] = await storage.bucket(subdomain).exists()

  if (existingBucket) {
    return {
      error: 'bucket already exists',
    }
  }

  const [bucket] = await storage.createBucket(subdomain)

  await bucket.makePublic()

  for (const file of fs.readdirSync(dataLocation)) {
    await bucket.upload(path.resolve(dataLocation, file), {
      public: true,
    })
  }

  return {
    url: `https://storage.cloud.google.com/${bucket.name}`,
  }
})

export default deployPortfolio
