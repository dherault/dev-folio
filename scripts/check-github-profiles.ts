import fs from 'node:fs'
import path from 'node:path'

import 'dotenv/config'
import { Octokit } from 'octokit'

import input from './output.json'

const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN })

async function wait(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}

const users = {}
const outputLocation = path.join(__dirname, 'output-2.json')

for (const user of Object.values(input)) {
  const profile = await octokit.request('GET /users/{username}', {
    username: user.username,
  })

  await wait(800)

  if (profile.data.blog) continue

  users[user.email] = user

  console.log(user.username, 'has no blog')
}

fs.writeFileSync(outputLocation, JSON.stringify(users, null, 2))
