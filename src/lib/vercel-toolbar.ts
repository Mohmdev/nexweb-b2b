import { withVercelToolbar } from '@vercel/toolbar/plugins/next'

export const withToolbar = (config: object) => withVercelToolbar()(config)
