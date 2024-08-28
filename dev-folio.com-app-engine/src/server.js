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

  const [indexDotHtml] = await bucket.file('index.html').download()

  res.setHeader('content-type', 'text/html')
  res.send(indexDotHtml)
})

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`)
})
