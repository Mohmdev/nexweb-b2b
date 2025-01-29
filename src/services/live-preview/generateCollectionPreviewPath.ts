import type { CollectionSlug, PayloadRequest } from 'payload'

import { PREVIEWABLE_COLLECTIONS } from '@services/control-board'

// Dynamic collection prefix map
const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = PREVIEWABLE_COLLECTIONS.reduce(
  (acc, collection) => ({
    ...acc,
    [collection]: collection === 'pages' ? '' : `/${collection}`,
  }),
  {},
)

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
}

export const generateCollectionPreviewPath = ({ collection, slug, req }: Props) => {
  const path = `${collectionPrefixMap[collection]}/${slug}`

  const params = {
    slug,
    collection,
    path,
  }

  const encodedParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    encodedParams.append(key, value)
  })

  const isProduction =
    process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL_PROJECT_PRODUCTION_URL)
  const protocol = isProduction ? 'https:' : req.protocol

  const url = `${protocol}//${req.host}/next/preview?${encodedParams.toString()}`

  return url
}
