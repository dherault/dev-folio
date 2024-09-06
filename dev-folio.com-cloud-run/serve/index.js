import express from '../custom-domain/node_modules/@types/express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello Dev Folio!')
})

const port = parseInt(process.env.PORT) || 8080

app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`)
})
