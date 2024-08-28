/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const storage = require('@google-cloud/storage')

const app = express()

app.get('/', async (req, res) => {
  const [subdomain] = req.subdomains
  const storageClient = new storage.Storage()
  const bucket = storageClient.bucket(subdomain)
  const [buckedExists] = await bucket.exists()

  if (!buckedExists) {
    res.status(404).send('Project not found') // TODO 404 page

    return
  }

  const indexDotHtml = bucket.file('index.html')
  const [indexDotHtmlExists] = await indexDotHtml.exists()

  if (!indexDotHtmlExists) {
    res.status(404).send('Project files not found') // TODO 404 page

    return
  }

  const [indexDotHtmlBuffer] = await indexDotHtml.download()

  res.setHeader('content-type', 'text/html')
  res.send(indexDotHtmlBuffer)
})

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`)
})
