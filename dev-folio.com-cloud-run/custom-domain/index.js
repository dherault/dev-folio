import { promisify } from 'node:util'
import { exec } from 'node:child_process'

import 'dotenv/config'
import express from 'express'
import vine from '@vinejs/vine'

const execPromise = promisify(exec)

const secret = process.env.CUSTOM_DOMAIN_SECRET
const app = express()
app.use(express.json())

const schema = vine.object({
  secret: vine.string(),
  customDomain: vine.string().minLength(1),
})

app.post('/', async (req, res) => {
  try {
    await vine.validate({
      schema,
      data: req.body,
    })
  }
  catch {
    res.status(400).send()

    return
  }

  if (req.body.secret !== secret) {
    res.status(403).send()

    return
  }

  const { customDomain } = req.body

  try {
    console.log('Setting custom domain:', customDomain)

    const { stdout, stderr } = await execPromise(`gcloud beta run integrations update custom-domains --parameters='set-mapping=${customDomain}:dev-folio'`)

    console.log('stdout', stdout)
    console.log('stderr', stderr)

    res.send({
      stdout,
      stderr,
    })
  }
  catch (error) {
    console.error(error)

    res.send({
      error: error.message,
    })
  }
})

const port = parseInt(process.env.PORT) || 8080

app.listen(port, () => {
  console.log(`custom-domain: listening on port ${port}`)
})
