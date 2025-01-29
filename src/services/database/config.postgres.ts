import path from 'path'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'

import type { Config } from 'payload'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const postgres: Config['db'] = postgresAdapter({
  pool: {
    connectionString: process.env.DATABASE_URI,
  },
  migrationDir: path.resolve(dirname, './migrations'),
  // push: false
  // prodMigrations: migrations,
})
