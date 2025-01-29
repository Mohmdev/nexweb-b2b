import type { Field } from 'payload'

export const categoriesField: Field = {
  name: 'categories',
  type: 'relationship',
  relationTo: 'categories',
  hasMany: true,
  label: {
    singular: 'Category',
    plural: 'Categories',
  },
  admin: {
    position: 'sidebar',
  },
}
