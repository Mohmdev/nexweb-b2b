import type { CollectionConfig } from 'payload'

import { Archive } from '@CMS/blocks/ArchiveBlock/config'
import { CallToAction } from '@CMS/blocks/CallToAction/config'
import { Content } from '@CMS/blocks/Content/config'
import { FormBlock } from '@CMS/blocks/Form/config'
import { MediaBlock } from '@CMS/blocks/MediaBlock/config'
import { hero } from '@CMS/heros/config'
import { slugField } from '@CMS/fields/shared/slug/config'
import { populatePublishedAt } from '@CMS/_hooks/populatePublishedAt'
import { revalidateDelete, revalidatePage } from '@CMS/_hooks/revalidatePage'
import { populateAuthors } from '@CMS/_hooks/populateAuthors'

import { isAdminOrEditor } from '@access/access/isAdminOrEditor'
import { isAdminOrSelf } from '@access/access/isAdminOrSelf'
import { publishedOnly } from '@access/access/publishedOnly'
import { getPreviewUrl } from '@services/live-preview/getPreviewUrl'
import { getLivePreviewUrl } from '@services/live-preview/getLivePreviewUrl'
import { populateAuthorsField } from '@CMS/fields/shared/populatedAuthorsField'
import { authorsField } from '@CMS/fields/shared/authorsField'
import { publishedAtField } from '@CMS/fields/shared/publishedAtField'
import { noindexField } from '@CMS/fields/shared/noindexField'
import { tagsField } from '@CMS/fields/shared/tagsField'
import { seoTab } from '@CMS/fields/shared/seoTab'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
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
    livePreview: getLivePreviewUrl('pages'),
    preview: getPreviewUrl('pages'),
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
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock],
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        seoTab,
      ],
    },
    noindexField,
    tagsField,
    authorsField,
    populateAuthorsField,
    publishedAtField,
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
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
