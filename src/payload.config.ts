import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Categories } from '@CMS/collections/config.Categories'
import { Pages } from '@CMS/collections/config.Pages'
import { Posts } from '@CMS/collections/config.Posts'
import { Tags } from '@CMS/collections/config.Tags'
import { Footer } from '@CMS/globals/Footer/config'
import { Header } from '@CMS/globals/Header/config'
import { adminConfig } from '@services/admin/config'
import { collectionGroup, globalGroup } from '@services/admin/groupContent'
import { Users } from '@services/authentication/Users/config'
import { vercelPostgres } from '@services/database/config.vercelPostgres'
import { defaultLexical } from '@services/editor/defaultLexical'
import { emailAdapter } from '@services/email/config'
import { formBuilderService } from '@services/form-builder/config.plugin'
import { nestedDocsService } from '@services/nested-docs/config.plugin'
import { redirectsPluginConfig } from '@services/redirects/config.plugin'
import { scheduledJobsService } from '@services/scheduled-jobs/config'
import { searchService } from '@services/search/config.plugin'
import { seoService } from '@services/seo/config.plugin'
import { Assets } from '@services/storage/Assets/config.collection'
import { Media } from '@services/storage/Media/config.collection'
import { UserPhotos } from '@services/storage/UserPhotos/config.collection'
import { vercelBlob } from '@services/storage/config.plugin.vercelBlob'
import { getServerSideURL } from './lib/utils/getURL'

import { MetaMedia } from '@services/storage/MetaMedia/config.collection'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  collections: [
    ...collectionGroup('Content', [Pages, Posts, Categories, Tags]),
    ...collectionGroup('Uploads', [Media, Assets, MetaMedia]),
    ...collectionGroup('Access Control', [Users, UserPhotos]),
  ],
  globals: [...globalGroup('Customize', [Header, Footer])],
  db: vercelPostgres,
  admin: adminConfig,
  editor: defaultLexical,
  email: emailAdapter,
  jobs: scheduledJobsService,
  plugins: [
    vercelBlob,
    searchService,
    formBuilderService,
    seoService,
    nestedDocsService,
    redirectsPluginConfig,
  ],
  sharp,
  cors: [getServerSideURL()].filter(Boolean),
  secret: process.env.PAYLOAD_SECRET || 'isItASecret?',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // cookiePrefix: `${process.env.COOKIE_PREFIX}`,
  // debug: true,
  telemetry: false,
})
