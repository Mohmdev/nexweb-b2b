import { assetDarkModeFallback } from './assetDarkModeFallback'
import { anyone } from '@access/access/anyone'
import { isAdminOrEditor } from '@access/access/isAdminOrEditor'
import { isAdminOrSelf } from '@access/access/isAdminOrSelf'

import type { CollectionConfig } from 'payload'

export const Assets: CollectionConfig<'assets'> = {
  slug: 'assets',
  labels: {
    singular: 'Asset',
    plural: 'Assets',
  },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    delete: isAdminOrSelf,
    update: isAdminOrSelf,
  },
  defaultPopulate: {
    alt: true,
    assetDarkModeFallback: true,
    filename: true,
    height: true,
    mimeType: true,
    url: true,
    width: true,
  },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'mimeType', 'filesize', 'createdAt', 'updatedAt'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      //required: true,
      admin: {
        description: 'Used for SEO and accessibility',
      },
    },
    assetDarkModeFallback,
  ],
  upload: {
    crop: true,
    displayPreview: true,
    focalPoint: true,
    disableLocalStorage: true,
  },
}
