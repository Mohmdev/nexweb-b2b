import { headers } from 'next/headers'

import config from '@payload-config'

import { createLocalReq, getPayload, Payload } from 'payload'

import type { CollectionSlug, PayloadRequest } from 'payload'

const collections: CollectionSlug[] = [
  'search',
  'media',
  'assets',
  'categories',
  'tags',
  'payload-jobs',
  'payload-locked-documents',
  'payload-preferences',
  'redirects',
  'meta-media',
  'pages',
  'posts',
  'forms',
  'form-submissions',
]

export const maxDuration = 60

export async function POST(): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()
  const { user } = await payload.auth({ headers: requestHeaders })
  if (!user) {
    return new Response('Action forbidden.', { status: 403 })
  }

  try {
    const payloadReq = await createLocalReq({ user }, payload)

    await clearDBScript({ payload, req: payloadReq })

    return Response.json({ success: true })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new Response(`Script failed to finish; ${error.message}`, {
        status: 500,
      })
    }
    return new Response('An unknown error occurred', { status: 500 })
  }
}

const clearDBScript = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  try {
    payload.logger.info('↪ Script initiated')

    payload.logger.info(`— Clearing collections and globals...`)
    await Promise.all(
      collections.map((collection) =>
        payload.db.deleteMany({ collection, req, where: {} }),
      ),
    )

    await Promise.all(
      collections
        .filter((collection) =>
          Boolean(payload.collections[collection].config.versions),
        )
        .map((collection) =>
          payload.db.deleteVersions({ collection, req, where: {} }),
        ),
    )

    payload.logger.info('✓ Successfully cleared all data')
  } catch (error) {
    payload.logger.info(`Script failed.`)
    throw error
  }
}
