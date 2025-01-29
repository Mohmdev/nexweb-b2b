import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { Config } from 'payload'

export const minimalLexical: Config['editor'] = lexicalEditor({
  features: ({ rootFeatures }) => {
    return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
  },
})
