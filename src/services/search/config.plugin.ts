import { beforeSyncWithSearch } from '@services/search/beforeSync'
import { searchFields } from '@services/search/fieldOverrides'
import { searchPlugin } from '@payloadcms/plugin-search'

import type { Plugin } from 'payload'

export const searchService: Plugin = searchPlugin({
  collections: ['posts'],
  beforeSync: beforeSyncWithSearch,
  searchOverrides: {
    fields: ({ defaultFields }) => {
      return [...defaultFields, ...searchFields]
    },
  },
})
