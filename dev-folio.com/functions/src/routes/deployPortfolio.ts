import fs from 'node:fs'
import path from 'node:path'

import { logger } from 'firebase-functions/v2'
import { HttpsError, onCall } from 'firebase-functions/v2/https'
import { type Bucket, Storage } from '@google-cloud/storage'
import type { Portfolio } from 'dev-folio-types'

import { getUserFromCallableRequest } from '../authentication/getUser'
import getBucketId from '../utils/getBucketId'

const dataLocation = path.resolve(__dirname, '../../../../data/build')

const deployPortfolio = onCall(
  { enforceAppCheck: true, cors: ['https://dev-folio.com'] },
  async request => {
    const { user, userDocument } = await getUserFromCallableRequest(request)

    if (!user) throw new HttpsError('permission-denied', 'You are not authenticated')
    if (!user.portfolio.subdomain) throw new HttpsError('failed-precondition', 'You do not have a portfolio')

    const { subdomain } = user.portfolio
    const bucketId = getBucketId(subdomain)
    const storage = new Storage()
    let bucket = storage.bucket(bucketId)

    logger.log(`Deploying portfolio for ${bucketId}`)

    const [existingBucket] = await bucket.exists()

    if (!existingBucket) {
      [bucket] = await storage.createBucket(bucketId)

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

    writePortfolioData(user.portfolio)

    await deployBuildFiles(bucket, dataLocation)

    cleanPortfolioData()

    await userDocument.update({
      'portfolio.deployedAt': new Date().toISOString(),
    })

    return {
      message: 'ok',
    }
  }
)

function writePortfolioData(portfolio: Portfolio) {
  fs.writeFileSync(path.join(dataLocation, 'portfolio.json'), JSON.stringify(portfolio, null, 2))
}

function cleanPortfolioData() {
  fs.rmSync(path.join(dataLocation, 'portfolio.json'))
}

async function deployBuildFiles(bucket: Bucket, directoryLocation: string, initialDirectoryLocation = directoryLocation) {
  for (const file of fs.readdirSync(directoryLocation)) {
    const fileLocation = path.join(directoryLocation, file)

    if (fs.statSync(fileLocation).isDirectory()) {
      await deployBuildFiles(bucket, fileLocation, initialDirectoryLocation)

      continue
    }

    await bucket.upload(fileLocation, {
      destination: path.relative(initialDirectoryLocation, fileLocation),
      public: true,
    })
  }
}

export default deployPortfolio
