import type { Metadata } from 'next'

import { getServerSideURL } from '@utils/getURL'

const defaultImage = `${getServerSideURL()}/assets/website-template-OG.webp`

export const mergeOpenGraph = (
  og?: Metadata['openGraph'],
  defaults: {
    siteName: string
    description: string
  } = {
    siteName: 'Nexweb - Modern Web Development Platform',
    description:
      'Nexweb is a modern web development platform that lets you build, deploy, and scale websites and web applications with ease.',
  },
): Metadata['openGraph'] => {
  const defaultOpenGraph: Metadata['openGraph'] = {
    type: 'website',
    description: defaults.description,
    images: [{ url: defaultImage }],
    siteName: defaults.siteName,
    title: defaults.siteName,
  }

  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
