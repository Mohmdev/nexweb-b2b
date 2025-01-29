import { Banner } from '@CMS/blocks/Banner/config'
import { Code } from '@CMS/blocks/Code/config'
import { MediaBlock } from '@CMS/blocks/MediaBlock/config'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { Config } from 'payload'

export const fullLexical: Config['editor'] = lexicalEditor({
  features: ({ rootFeatures }) => {
    return [
      ...rootFeatures,
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
      BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
      HorizontalRuleFeature(),
    ]
  },
})
