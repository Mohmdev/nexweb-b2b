import { revalidateTag } from 'next/cache'

import type { GlobalAfterChangeHook } from 'payload'

export const revalidateGlobalSettings: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  revalidateTag('globals_global-settings')

  payload.logger.info(`✔ Global Settings Revalidated`)
  payload.logger.info(``)
  return doc
}
