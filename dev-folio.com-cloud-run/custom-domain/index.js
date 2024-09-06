import { promisify } from 'node:util'
import { exec } from 'node:child_process'

import express from 'express'

const execPromise = promisify(exec)

const app = express()
const secret = process.env.SECRET

app.post('/', async (req, res) => {
  const incomingSecret = req.body.secret

  if (incomingSecret !== secret) {
    res.status(403).send()

    return
  }

  try {
    const { stdout, stderr } = await execPromise('gcloud version')

    res.send({
      stdout,
      stderr,
    })
  }
  catch (error) {
    res.send({
      error: error.message,
    })
  }
})

const port = parseInt(process.env.PORT) || 8080

app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`)
})
