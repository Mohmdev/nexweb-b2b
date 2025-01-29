import React from 'react'
import { getCachedGlobal } from '@data/getGlobal'

import type { Asset, GlobalSetting } from '@payload-types'

const Favicon: React.FC = async () => {
  const graphics = (await getCachedGlobal('global-settings', 1)()) as GlobalSetting
  const favicon = (graphics?.branding?.logoSquare as Asset) ?? undefined

  return (
    <>
      {favicon && typeof favicon === 'object' && favicon.url ? (
        //  <link href={favicon.url} rel="icon" type="image/svg+xml" />
        <>
          {favicon.mimeType === 'image/svg+xml' && (
            <link href={favicon.url} rel="icon" type="image/svg+xml" />
          )}
          {favicon.mimeType === 'image/png' && (
            <link href={favicon.url} rel="icon" type="image/png" />
          )}
          {favicon.mimeType === 'image/x-icon' && (
            <link href={favicon.url} rel="icon" sizes="32x32" />
          )}
        </>
      ) : (
        <>
          <link href="/src/services/admin/Favicon/favicon.svg" rel="icon" type="image/svg+xml" />
          <link href="/src/services/admin/Favicon/favicon.ico" rel="icon" sizes="32x32" />
        </>
      )}
    </>
  )
}

export default Favicon
