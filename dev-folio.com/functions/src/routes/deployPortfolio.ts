import fs from 'node:fs'
import path from 'node:path'

import { HttpsError, onCall } from 'firebase-functions/v2/https'
import { type Bucket, Storage } from '@google-cloud/storage'

import { getUserFromCallableRequest } from '../authentication/getUser'

const storage = new Storage()
const dataLocation = path.resolve(__dirname, '../../../../data/build')
const indexDotHtmlBucketUrlReplacement = /{{bucketUrl}}/g

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
    await bucket.setCorsConfiguration([
      {
        maxAgeSeconds: 3600,
        method: ['GET'],
        origin: ['https://*.dev-folio.com'],
        responseHeader: ['Content-Type'],
      },
    ])
  }

  await deployBuild(bucket, dataLocation)

  await userDocument.update({
    deployedAt: new Date().toISOString(),
  })

  return {
    message: 'ok',
  }
})

async function deployBuild(bucket: Bucket, directoryLocation: string, initialDirectoryLocation = directoryLocation) {
  const mockIndexDotHtmlFileName = `index-${bucket.name}.html`

  for (const file of fs.readdirSync(directoryLocation)) {
    let fileLocation = path.join(directoryLocation, file)

    if (fs.statSync(fileLocation).isDirectory()) {
      await deployBuild(bucket, fileLocation, initialDirectoryLocation)

      continue
    }

    const isIndexDotHtml = file === 'index.html'

    if (isIndexDotHtml) {
      const indexDotHtml = fs.readFileSync(fileLocation, 'utf-8')
      const nextIndexDotHtml = indexDotHtml.replaceAll(indexDotHtmlBucketUrlReplacement, `https://storage.googleapis.com/${bucket.name}`)

      fileLocation = path.join(directoryLocation, mockIndexDotHtmlFileName)

      fs.writeFileSync(fileLocation, nextIndexDotHtml)
    }

    await bucket.upload(fileLocation, {
      destination: isIndexDotHtml ? 'index.html' : path.relative(initialDirectoryLocation, fileLocation),
      public: true,
    })

    if (isIndexDotHtml) {
      fs.unlinkSync(fileLocation)
    }
  }
}

export default deployPortfolio
