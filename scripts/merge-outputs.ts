// @ts-nocheck
import fs from 'node:fs'
import path from 'node:path'

import import1 from './output-1.json'
import import2 from './output-2.json'

fs.writeFileSync(path.resolve(__dirname, 'output-final.json'), JSON.stringify({ ...import1, ...import2 }, null, 2))
