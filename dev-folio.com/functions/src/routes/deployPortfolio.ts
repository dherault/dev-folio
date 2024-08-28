import fs from 'node:fs'
import path from 'node:path'

import { HttpsError, onCall } from 'firebase-functions/v2/https'
import { type Bucket, Storage } from '@google-cloud/storage'

import { getUserFromCallableRequest } from '../authentication/getUser'

const storage = new Storage()
const dataLocation = path.resolve(__dirname, '../../../../data/build')

const deployPortfolio = onCall(async request => {
  const { user, userDocument } = await getUserFromCallableRequest(request)

  if (!user) throw new HttpsError('permission-denied', 'You are not authenticated')
  if (!user.portfolio.subdomain) throw new HttpsError('failed-precondition', 'You do not have a portfolio')

  const { subdomain } = user.portfolio
  let bucket = storage.bucket(subdomain)

  const [existingBucket] = await bucket.exists()

  if (!existingBucket) {
    [bucket] = await storage.createBucket(subdomain)

    await bucket.makePublic()
  }

  await deployBuild(bucket, dataLocation)

  await userDocument.update({
    deployedAt: new Date().toISOString(),
  })

  return {
    message: 'ok',
  }
})

async function deployBuild(bucket: Bucket, dir: string) {
  for (const file of fs.readdirSync(dir)) {
    if (fs.statSync(file).isDirectory()) {
      await deployBuild(bucket, path.join(dir, file))

      continue
    }

    await bucket.upload(path.resolve(dir, file), {
      public: true,
    })
  }
}

export default deployPortfolio
