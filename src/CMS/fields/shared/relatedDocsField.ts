import { Field } from 'payload'

import { RELATABLE_COLLECTIONS } from '@services/control-board'

export const relatedDocsField: Field = {
  name: 'relatedDocs',
  type: 'relationship',
  relationTo: RELATABLE_COLLECTIONS,
  filterOptions: ({ id }) => {
    return {
      id: {
        not_in: [id],
      },
    }
  },
  hasMany: true,
  admin: {
    position: 'sidebar',
    description:
      'Content that are related to this one. Could be a page, or post, that you would like to feature in this document.',
  },
  label: {
    singular: 'Related Content',
    plural: 'Related Content',
  },
}
