import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'

import type { Plugin } from 'payload'

import { NESTED_COLLECTIONS } from '@services/control-board'

export const nestedDocsService: Plugin = nestedDocsPlugin({
  collections: NESTED_COLLECTIONS,
  generateLabel: (_, doc) => doc.title as string,
  generateURL: (docs) =>
    docs.reduce((url, doc) => `${url}/${doc.slug as string}`, ''),
})
