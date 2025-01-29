import { GlobalSlug, PayloadRequest } from 'payload'

type Props = {
  global: GlobalSlug
  slug: string
  req: PayloadRequest
}

export const generateGlobalPreviewPath = ({ global, slug, req }: Props) => {
  // All globals preview at root path
  const path = '/'
  // const path = global === 'homepage' ? '/' : `/${global}`

  const params = {
    slug,
    global,
    path,
  }

  const encodedParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    encodedParams.append(key, value)
  })

  const isProduction =
    process.env.NODE_ENV === 'production' ||
    Boolean(process.env.VERCEL_PROJECT_PRODUCTION_URL)
  const protocol = isProduction ? 'https:' : req.protocol

  // This generates the preview URL with query params
  return `${protocol}//${req.host}/next/preview-global?${encodedParams.toString()}`
}
