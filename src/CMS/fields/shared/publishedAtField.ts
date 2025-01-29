import type { Field } from 'payload'

export const publishedAtField: Field = {
  name: 'publishedAt',
  type: 'date',
  admin: {
    date: {
      pickerAppearance: 'dayAndTime'
    },
    position: 'sidebar'
  },
  hooks: {
    beforeChange: [
      ({ siblingData, value }) => {
        if (siblingData._status === 'published' && !value) {
          return new Date()
        }
        return value
      }
    ]
  }
}
