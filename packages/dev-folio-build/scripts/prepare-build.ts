import fs from 'node:fs'
import path from 'node:path'

const htmlLocation = path.resolve(__dirname, '../dist/index.html')
const scriptRegex = /\/assets\//g

const html = fs.readFileSync(htmlLocation, 'utf-8')
const nextHtml = html.replaceAll(scriptRegex, '{{bucketUrl}}/assets/')

fs.writeFileSync(htmlLocation, nextHtml)
