import type { Field } from 'payload'

export const noindexField: Field = {
  name: 'noindex',
  type: 'checkbox',
  label: 'Hide from Search Engines',
  admin: {
    position: 'sidebar',
    // TODO: Make the description a tooltip
    description:
      'When checked, this page will not appear in search engines like Google. Use this for private pages or temporary content that should not be publicly searchable.',
  },
}
