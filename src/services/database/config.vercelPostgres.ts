import path from 'path'
import { fileURLToPath } from 'url'

import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'

import type { Config } from 'payload'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const vercelPostgres: Config['db'] = vercelPostgresAdapter({
  pool: {
    connectionString: process.env.POSTGRES_URL,
  },
  migrationDir: path.resolve(dirname, './migrations'),
  push: false,
  // forceUseVercelPostgres: true,
})
