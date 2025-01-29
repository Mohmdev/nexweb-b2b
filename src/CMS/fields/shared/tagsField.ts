import type { Field } from 'payload'

export const tagsField: Field = {
  name: 'tags',
  type: 'relationship',
  relationTo: 'tags',
  hasMany: true,
  label: 'Tags',
  admin: {
    position: 'sidebar',
  },
}
