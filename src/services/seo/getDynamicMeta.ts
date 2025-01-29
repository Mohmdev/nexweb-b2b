import { getCachedGlobals } from '@data/getGlobals'

import type { GlobalSetting } from '@payload-types'

export type DynamicMeta = {
  siteName: string
  siteDescription: string
  favicon?: {
    url: string
  }
}

export const getDynamicMeta = async (): Promise<DynamicMeta> => {
  const globaldata: GlobalSetting = await getCachedGlobals('global-settings', {
    depth: 1,
    select: {
      branding: { favicon: true },
      siteIdentity: {
        siteName: true,
        siteDescription: true
      }
    }
  })()

  const { siteName: cachedSiteName, siteDescription: cachedSiteDescription } =
    globaldata.siteIdentity || {}
  const favicon = globaldata.branding?.favicon

  return {
    siteName: cachedSiteName || 'Nexweb',
    siteDescription: cachedSiteDescription || 'Nexweb Content Management Systems',
    favicon:
      favicon && typeof favicon === 'object' && 'url' in favicon && favicon.url
        ? { url: favicon.url }
        : undefined
  }
}
