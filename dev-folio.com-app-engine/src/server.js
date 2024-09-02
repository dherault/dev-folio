/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const storage = require('@google-cloud/storage')

const app = express()

app.get(['/', '/*'], async (req, res) => {
  try {
    const [subdomain] = req.subdomains
    const storageClient = new storage.Storage()
    const bucketId = `${subdomain}-dev-folio-com`
    const bucket = storageClient.bucket(bucketId)
    const [buckedExists] = await bucket.exists()

    if (!buckedExists) {
      res.status(404).send('Portfolio not found') // TODO 404 page

      return
    }

    const url = req.originalUrl

    console.log('serving bucketId and url', bucketId, url)

    if (url === '/') {
      const file = bucket.file('index.html')
      const [fileBuffer] = await file.download()

      res.setHeader('content-type', 'text/html')
      res.send(fileBuffer)

      return
    }

    res.redirect(301, `https://storage.googleapis.com/${bucketId}${url}`)
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
