import { anyone } from '@auth/access/anyone'
import { isAdminOrEditor } from '@auth/access/isAdminOrEditor'
import { isAdminOrSelf } from '@auth/access/isAdminOrSelf'
import { slugField } from '@fields/shared/slug/config'

import { minimalLexical } from '@services/editor/minimalLexical'
import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig<'tags'> = {
  slug: 'tags',
  labels: {
    singular: 'Tag',
    plural: 'Tags',
  },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    delete: isAdminOrSelf,
    update: isAdminOrSelf,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: [
      'image',
      'title',
      'pages',
      'posts',
      'createdAt',
      'updatedAt',
    ],
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Tag Name',
      required: true,
      unique: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Details',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              hasMany: false,
              label: 'Tag Image',
              admin: {
                description: 'Optional',
              },
            },
            {
              name: 'description',
              type: 'richText',
              label: 'Description',
              editor: minimalLexical,
              admin: {
                description: 'Optional',
              },
            },
          ],
        },
        {
          label: 'Tagged Content',
          fields: [
            {
              name: 'pages',
              type: 'join',
              collection: 'pages',
              on: 'tags',
            },
            {
              name: 'posts',
              type: 'join',
              collection: 'posts',
              on: 'tags',
            },
          ],
        },
      ],
    },
    ...slugField(),
  ],
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },
}
