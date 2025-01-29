import path from 'path'
import { fileURLToPath } from 'url'

import { minimalLexical } from '@services/editor/minimalLexical'
import { tagsField } from '@CMS/fields/shared/tagsField'
import { anyone } from '@access/access/anyone'
import { isAdminOrEditor } from '@access/access/isAdminOrEditor'
import { isAdminOrSelf } from '@access/access/isAdminOrSelf'

import type { CollectionConfig } from 'payload'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig<'media'> = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Media',
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
    defaultColumns: ['filename', 'tags', 'mimeType', 'createdAt', 'updatedAt'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: {
        description: 'For SEO and accessibility',
      },
    },
    {
      name: 'caption',
      type: 'richText',
      label: 'Caption',
      editor: minimalLexical,
      admin: {
        description: 'Custom caption for the image',
      },
    },
    // {
    //   type: 'join',
    //   name: 'relatedTattoo',
    //   label: false,
    //   collection: 'tattoo',
    //   on: 'images',
    // },
    tagsField,
  ],
  upload: {
    crop: true,
    displayPreview: true,
    focalPoint: true,
    disableLocalStorage: true,
    mimeTypes: [
      'image/*',
      'image/webp',
      'video/*',
      'text/plain',
      'application/json',
      'application/pdf',
      'application/msword',
    ],
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'original',
        withoutEnlargement: true,
        withoutReduction: true,
        height: 1500,
      },
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
    staticDir: path.resolve(dirname, '../../public/media'),
  },
}
