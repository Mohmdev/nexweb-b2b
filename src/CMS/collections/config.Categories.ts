import type { CollectionConfig } from 'payload'

import { isUser } from '@access/access/isUser'
import { anyone } from '@access/access/anyone'
import { slugField } from '@CMS/fields/shared/slug/config'
import { minimalLexical } from '@services/editor/minimalLexical'

export const Categories: CollectionConfig<'categories'> = {
  slug: 'categories',
  access: {
    create: isUser,
    delete: isUser,
    read: anyone,
    update: isUser,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'richText',
      editor: minimalLexical,
      admin: {
        description: 'Optional',
      },
    },
    ...slugField(),
  ],
}
