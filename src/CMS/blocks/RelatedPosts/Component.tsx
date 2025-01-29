import RichText from '@components/RichText'

import React from 'react'

import type { Post } from '@payload-types'

import { Card } from '@components/Card'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { cn } from '@utils/ui'

export type RelatedPostsProps = {
  className?: string
  docs?: Post['relatedDocs']
  introContent?: SerializedEditorState
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={cn('lg:container', className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          const docData = typeof doc.value === 'object' ? doc.value : null
          if (!docData) return null

          return (
            <Card
              key={index}
              doc={docData}
              relationTo={doc.relationTo}
              showCategories
            />
          )
        })}
      </div>
    </div>
  )
}
