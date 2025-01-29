import { anyone } from '@access/access/anyone'
import { isAdminOrEditor } from '@access/access/isAdminOrEditor'
import { isAdminOrSelf } from '@access/access/isAdminOrSelf'

import type { CollectionConfig } from 'payload'

export const MetaMedia: CollectionConfig<'meta-media'> = {
  slug: 'meta-media',
  labels: {
    singular: 'Meta Media',
    plural: 'Meta Media',
  },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    delete: isAdminOrSelf,
    update: isAdminOrSelf,
  },
  defaultPopulate: {
    alt: true,
    filename: true,
    height: true,
    mimeType: true,
    url: true,
    width: true,
  },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'mimeType', 'createdAt', 'updatedAt'],
    description:
      'The images used for SEO and accessibility go here. It is recommended to use a square image for best results.',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    crop: true,
    displayPreview: true,
    focalPoint: true,
    disableLocalStorage: true,
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'original',
        withoutEnlargement: true,
        withoutReduction: true,
        height: 1200,
      },
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
    ],
  },
}
