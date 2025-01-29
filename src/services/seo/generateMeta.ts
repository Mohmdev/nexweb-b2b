import type { Metadata } from 'next'

import { getServerSideURL } from '@utils/getURL'

import type { Page, Post, Tattoo } from '@payload-types'

import { getDynamicMeta } from './getDynamicMeta'
import { mergeOpenGraph } from './mergeOpenGraph'

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | Partial<Tattoo>
}): Promise<Metadata> => {
  const { doc } = args || {}

  const { siteName, siteDescription } = await getDynamicMeta()

  const ogImage =
    typeof doc?.meta?.image === 'object' &&
    doc.meta.image !== null &&
    'url' in doc.meta.image &&
    doc.meta.image.url
      ? `${getServerSideURL()}${doc.meta.image.url}`
      : undefined

  // Base OpenGraph configuration
  const openGraphBase = mergeOpenGraph(
    {
      siteName: siteName,
      title: siteName,
      description: siteDescription,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    {
      siteName,
      description: siteDescription,
    },
  )

  // Special handling for homepage
  if (doc?.slug === 'home') {
    return {
      title: siteName,
      description: siteDescription,
      openGraph: {
        ...openGraphBase,
        url: '/',
      },
    }
  }

  if (doc?.slug === 'posts') {
    return {
      title: `Blog | ${siteName}`,
      description: 'Browse all posts.',
      openGraph: {
        ...openGraphBase,
        title: `Blog | ${siteName}`,
        description: 'Browse all posts.',
        url: '/blog',
      },
    }
  }

  if (doc?.slug === 'search') {
    return {
      title: `Search | ${siteName}`,
      description: 'Search across our site',
      openGraph: {
        ...openGraphBase,
        title: `Search | ${siteName}`,
        description: 'Search across our site',
        url: '/search',
      },
    }
  }

  // All other docs
  const documentTitle = doc?.meta?.title
    ? `${doc.meta.title} | ${siteName}`
    : siteName
  const documentDescription = doc?.meta?.description || siteDescription
  const documentUrl = doc?.slug
    ? Array.isArray(doc.slug)
      ? doc.slug.join('/')
      : 'collection' in doc
        ? `/${doc.collection}/${doc.slug}`
        : `/${doc.slug}`
    : '/'

  return {
    title: documentTitle,
    description: documentDescription,
    openGraph: {
      ...openGraphBase,
      title: documentTitle,
      description: documentDescription,
      url: documentUrl,
    },
  }
}
