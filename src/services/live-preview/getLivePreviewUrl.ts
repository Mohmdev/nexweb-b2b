import { generateCollectionPreviewPath } from '@services/live-preview/generateCollectionPreviewPath'

import type { CollectionSlug, LivePreviewConfig } from 'payload'

export const getLivePreviewUrl = (
  collection: CollectionSlug,
): LivePreviewConfig => ({
  url: ({ data, req }) => {
    const path = generateCollectionPreviewPath({
      slug: typeof data?.slug === 'string' ? data.slug : '',
      collection,
      req,
    })

    return path
  },
})
