/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const storage = require('@google-cloud/storage')

const app = express()

const storageClient = new storage.Storage()
const customDomainMapping = {
  'portfolio.dherault.com': 'dherault-dev-folio-com',
}

app.get(['/', '/*'], async (req, res) => {
  try {
    const host = req.get('host')
    const [subdomain] = req.subdomains
    const bucketId = customDomainMapping[host] ?? `${subdomain}-dev-folio-com`
    const bucket = storageClient.bucket(bucketId)
    const [buckedExists] = await bucket.exists()

    if (!buckedExists) {
      res.status(404).send('Portfolio not found') // TODO 404 page

      return
    }

    const fileLocation = req.originalUrl.split('?')[0]

    console.log('serving bucketId and url', bucketId, fileLocation)

    if (fileLocation === '/') {
      const file = bucket.file('index.html')
      const [fileBuffer] = await file.download()

      res.setHeader('content-type', 'text/html')
      res.send(fileBuffer)

      return
    }

    res.redirect(301, `https://storage.googleapis.com/${bucketId}${fileLocation}`)
  }
  catch (error) {
    console.error(error)

    res.status(500).send('Internal server error')
  }
})

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`)
})
