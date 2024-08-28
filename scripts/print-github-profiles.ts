import fs from 'node:fs'
import path from 'node:path'

import 'dotenv/config'
import { Octokit } from 'octokit'

const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN })

const topics = [
  // '3d',
  // 'ajax',
  // 'algorithm',
  // 'amphp',
  // 'android',
  // 'angular',
  // 'ansible',
  // 'api',
  'arduino',
  'aspnet',
  'awesome',
  'aws',
  'azure',
  'babel',
  'bash',
  'bitcoin',
  'bootstrap',
  'bot',
  'c',
  'chrome',
  'chrome-extension',
  'cli',
  'clojure',
  'code-quality',
  'code-review',
  'compiler',
  'continuous-integration',
  'cpp',
  'cryptocurrency',
  'crystal',
  'csharp',
  'css',
  'data-structures',
  'data-visualization',
  'database',
  'deep-learning',
  'dependency-management',
  'deployment',
  'django',
  'docker',
  'documentation',
  'dotnet',
  'electron',
  'elixir',
  'emacs',
  'ember',
  'emoji',
  'emulator',
  'eslint',
  'ethereum',
  'express',
  'firebase',
  'firefox',
  'flask',
  'font',
  'framework',
  'frontend',
  'game-engine',
  'git',
  'github-api',
  'go',
  'google',
  'gradle',
  'graphql',
  'gulp',
  'hacktoberfest',
  'haskell',
  'homebrew',
  'homebridge',
  'html',
  'http',
  'icon-font',
  'ios',
  'ipfs',
  'java',
  'javascript',
  'jekyll',
  'jquery',
  'json',
  'julia',
  'jupyter-notebook',
  'koa',
  'kotlin',
  'kubernetes',
  'laravel',
  'latex',
  'library',
  'linux',
  'localization',
  'lua',
  'machine-learning',
  'macos',
  'markdown',
  'mastodon',
  'material-design',
  'matlab',
  'maven',
  'minecraft',
  'mobile',
  'monero',
  'mongodb',
  'mongoose',
  'monitoring',
  'mvvmcross',
  'mysql',
  'nativescript',
  'nim',
  'nlp',
  'nodejs',
  'nosql',
  'npm',
  'objective-c',
  'opengl',
  'operating-system',
  'p2p',
  'package-manager',
  'parsing',
  'perl',
  'phaser',
  'php',
  'pico-8',
  'pixel-art',
  'postgresql',
  'project-management',
  'publishing',
  'pwa',
  'python',
  'qt',
  'r',
  'rails',
  'raspberry-pi',
  'ratchet',
  'react',
  'react-native',
  'reactiveui',
  'redux',
  'rest-api',
  'ruby',
  'rust',
  'sass',
  'scala',
  'scikit-learn',
  'sdn',
  'security',
  'server',
  'serverless',
  'shell',
  'sketch',
  'spacevim',
  'spring-boot',
  'sql',
  'storybook',
  'support',
  'swift',
  'symfony',
  'telegram',
  'tensorflow',
  'terminal',
  'terraform',
  'testing',
  'twitter',
  'typescript',
  'ubuntu',
  'unity',
  'unreal-engine',
  'vagrant',
  'vim',
  'virtual-reality',
]

async function wait(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}

async function getPaginatedData(url: string, maxPages: number) {
  const nextPattern = /(?<=<)([\S]*)(?=>; rel="Next")/i
  let pagesRemaining = true
  let data: any[] = []
  let pageCount = 0

  while (pagesRemaining && pageCount < maxPages) {
    const response = await octokit.request(`GET ${url}`, {
      per_page: 100,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })

    const parsedData = parseData(response.data)

    // console.log('getPaginatedData', url, pageCount, parsedData.length)

    data = [...data, ...parsedData]

    const linkHeader = response.headers.link!

    pagesRemaining = !!(linkHeader && linkHeader.includes('rel="next"'))

    if (pagesRemaining) {
      // eslint-disable-next-line
      url = linkHeader.match(nextPattern)![0]
    }

    pageCount++

    await wait(800)
  }

  return data
}

function parseData(data) {
  // If the data is an array, return that
  if (Array.isArray(data)) {
    return data
  }

  // Some endpoints respond with 204 No Content instead of empty array
  //   when there is no data. In that case, return an empty array.
  if (!data) {
    return []
  }

  // Otherwise, the array of items that we want is in an object
  // Delete keys that don't include the array of items
  delete data.incomplete_results
  delete data.repository_selection
  delete data.total_count
  // Pull out the array of items
  const namespaceKey = Object.keys(data)[0]
  data = data[namespaceKey]

  return data
}

let users: Record<string, any> = {}
const checkedUsers: Record<string, boolean> = {}
const noBlogUsers: Record<string, any> = {}
const outputLocation = path.join(__dirname, 'output.json')

for (const topic of topics) {
  console.log()
  console.log('Looking at topic', topic)

  const repositories = await getPaginatedData(`/search/repositories?q=topic:${topic}`, 1)

  for (const repository of repositories) {
    const commits = await getPaginatedData(`/repos/${repository.owner.login}/${repository.name}/commits`, 10)

    console.log(`Looking at ${repository.owner.login}/${repository.name}`, commits.length)

    for (const commit of commits) {
      if (!commit.commit.author.email.endsWith('@gmail.com')) continue
      if (commit.commit.author.name.split(' ').length < 2) continue
      if (!commit.author?.login) continue

      users[commit.commit.author.email] = {
        name: commit.commit.author.name,
        email: commit.commit.author.email,
        username: commit.author.login,
      }
    }

    console.log(Object.values(users).length, 'users')

    for (const user of Object.values(users)) {
      if (checkedUsers[user.email]) {
        process.stdout.write('⚫️')

        continue
      }

      checkedUsers[user.email] = true

      const profile = await octokit.request('GET /users/{username}', {
        username: user.username,
      })

      process.stdout.write(profile.data.blog ? '✅' : '❌')

      await wait(800)

      if (profile.data.blog) continue

      noBlogUsers[user.email] = user
    }

    users = {}

    fs.writeFileSync(outputLocation, JSON.stringify(noBlogUsers, null, 2))

    process.stdout.write('\n')
  }
}
