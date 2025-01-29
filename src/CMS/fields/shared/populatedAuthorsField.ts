import type { Field } from 'payload'

export const populateAuthorsField: Field = {
  // This field is only used to populate the user data via the `populateAuthors` hook
  // This is because the `user` collection has access control locked to protect user privacy
  // GraphQL will also not return mutated user data that differs from the underlying schema

  name: 'populatedAuthors',
  type: 'array',
  access: {
    update: () => false
  },
  admin: {
    disabled: true,
    readOnly: true,
    position: 'sidebar'
  },
  fields: [
    {
      name: 'id',
      type: 'text'
    },
    {
      name: 'name',
      type: 'text'
    }
  ]
}
