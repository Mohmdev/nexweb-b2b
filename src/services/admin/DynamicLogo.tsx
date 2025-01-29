import React from 'react'

import './index.scss'

import Image from 'next/image'
import { getCachedGlobal } from '@data/getGlobal'

import { cn } from '@utils/ui'

import type { Asset, GlobalSetting } from '@payload-types'

import { NexwebRectangleSVG, NexwebSVG } from './white-label-svg'

export const RectangleLogo = ({ graphics }: { graphics?: Asset }) => {
  const loading = 'lazy'
  const priority = 'low'

  const url = graphics?.url

  return (
    <>
      {url ? (
        <Image
          src={url}
          alt="Site Logo"
          width={193}
          height={34}
          loading={loading}
          fetchPriority={priority}
          decoding="async"
          className={cn('h-[34px] w-full max-w-[9.375rem]')}
        />
      ) : (
        <NexwebRectangleSVG />
      )}
    </>
  )
}

export const SquareLogo = ({ graphics }: { graphics?: Asset }) => {
  const loading = 'lazy'
  const priority = 'low'

  const url = graphics?.url

  return (
    <>
      {url ? (
        <Image
          src={url}
          alt="Site Logo"
          width={193}
          height={34}
          loading={loading}
          fetchPriority={priority}
          decoding="async"
          className={cn('h-[34px] w-full max-w-[9.375rem]')}
        />
      ) : (
        <NexwebSVG />
      )}
    </>
  )
}

export const NavbarLogo: React.FC = async () => {
  const graphics = (await getCachedGlobal('global-settings', 1)()) as GlobalSetting
  const logoSquare = (graphics?.branding?.logoSquare as Asset) ?? undefined

  return (
    <div className="NavbarLogo">
      <SquareLogo graphics={logoSquare} />
    </div>
  )
}
export const MainLogo: React.FC = async () => {
  const graphics = (await getCachedGlobal('global-settings', 1)()) as GlobalSetting
  const logo = (graphics?.branding?.logo as Asset) ?? undefined

  return (
    <div className="">
      <RectangleLogo graphics={logo} />
    </div>
  )
}

// export const SidebarLogo: React.FC = () => {
//   return (
//     //
//     <div className="LogoWrapper">
//       <SquareLogo />
//     </div>
//   )
// }
