import type { NamedTab } from 'payload'

import { metaFields } from './metaFields'

export const seoTab: NamedTab = {
  name: 'meta',
  interfaceName: 'meta',
  fields: metaFields,
  label: 'SEO',
}
