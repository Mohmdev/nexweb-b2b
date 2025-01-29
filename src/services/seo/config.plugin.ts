import { seoPlugin } from '@payloadcms/plugin-seo'

import { getServerSideURL } from '@utils/getURL'

import type { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import type { Plugin } from 'payload'

import { SITE_NAME } from '@services/control-board'

const generateTitle: GenerateTitle = ({ doc }) => {
  return doc?.title ? `${doc.title} | ${SITE_NAME}` : SITE_NAME
}

const generateURL: GenerateURL = ({ doc }) => {
  const url = getServerSideURL()
  return doc?.slug ? `${url}/${doc.slug}` : url
}

export type GenerateTitle2<T = unknown> = (args: {
  doc: T
  locale?: string
}) => Promise<string> | string

export const seoService: Plugin = seoPlugin({
  generateTitle,
  generateURL,
  // collections: SEO_ENABLED_COLLECTIONS,
  // globals: SEO_ENABLED_GLOBALS,
  // uploadsCollection: 'assets'
})
