import type { CollectionConfig } from 'payload'

import { populateAuthors } from '@CMS/_hooks/populateAuthors'
import { revalidateDelete, revalidatePost } from '@CMS/_hooks/revalidatePost'

import { slugField } from '@CMS/fields/shared/slug/config'
import { isAdminOrEditor } from '@access/access/isAdminOrEditor'
import { isAdminOrSelf } from '@access/access/isAdminOrSelf'
import { publishedOnly } from '@access/access/publishedOnly'
import { getPreviewUrl } from '@services/live-preview/getPreviewUrl'
import { getLivePreviewUrl } from '@services/live-preview/getLivePreviewUrl'
import { populatePublishedAt } from '@CMS/_hooks/populatePublishedAt'
import { noindexField } from '@CMS/fields/shared/noindexField'
import { authorsField } from '@CMS/fields/shared/authorsField'
import { populateAuthorsField } from '@CMS/fields/shared/populatedAuthorsField'
import { publishedAtField } from '@CMS/fields/shared/publishedAtField'
import { tagsField } from '@CMS/fields/shared/tagsField'
import { categoriesField } from '@CMS/fields/shared/categoriesField'
import { fullLexical } from '@services/editor/fullLexical'
import { relatedDocsField } from '@CMS/fields/shared/relatedDocsField'
import { seoTab } from '@CMS/fields/shared/seoTab'

export const Posts: CollectionConfig<'posts'> = {
  slug: 'posts',
  access: {
    read: publishedOnly,
    create: isAdminOrEditor,
    delete: isAdminOrSelf,
    update: isAdminOrSelf,
    readVersions: isAdminOrEditor,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: [
      'title',
      'populatedAuthors',
      'slug',
      'updatedAt',
      'createdAt',
    ],
    livePreview: getLivePreviewUrl('posts'),
    preview: getPreviewUrl('posts'),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      index: true,
      unique: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              label: 'Editor',
              name: 'content',
              type: 'richText',
              editor: fullLexical,
            },
          ],
        },
        {
          label: 'Options',
          fields: [categoriesField, relatedDocsField, tagsField],
        },
        seoTab,
      ],
    },
    noindexField,
    authorsField,
    populateAuthorsField,
    publishedAtField,
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
    afterDelete: [revalidateDelete],
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
