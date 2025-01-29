import type { Field } from 'payload'

export const authorsField: Field = {
  // Use with `populateAuthors` hook
  name: 'authors',
  label: {
    singular: 'Author',
    plural: 'Authors'
  },
  type: 'relationship',
  admin: {
    position: 'sidebar'
  },
  hasMany: true,
  relationTo: 'users'
  // required: true
}
