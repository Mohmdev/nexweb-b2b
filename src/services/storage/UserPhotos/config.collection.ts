import { anyone } from '@access/access/anyone'
import { isAdminOrSelf } from '@access/access/isAdminOrSelf'

import type { CollectionConfig } from 'payload'

export const UserPhotos: CollectionConfig<'user-photos'> = {
  slug: 'user-photos',
  labels: {
    singular: 'User Photo',
    plural: 'User Photos',
  },
  access: {
    read: anyone,
    create: isAdminOrSelf,
    delete: isAdminOrSelf,
    update: isAdminOrSelf,
  },
  defaultPopulate: {
    filename: true,
    user: true,
    url: true,
    height: true,
    width: true,
    mimeType: true,
  },
  admin: {
    useAsTitle: 'user',
    defaultColumns: [
      'user',
      'filename',
      'filesize',
      'mimeType',
      'createdAt',
      'updatedAt',
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
    {
      type: 'join',
      name: 'user',
      collection: 'users',
      on: 'photo',
      label: 'User',
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
        name: 'thumbnail',
        width: 100,
        height: 100,
        crop: 'center',
      },
      {
        name: 'avatar',
        width: 300,
        height: 300,
        crop: 'center',
      },
      {
        name: 'original',
        width: 800,
        withoutEnlargement: true,
        withoutReduction: true,
      },
    ],
  },
}
