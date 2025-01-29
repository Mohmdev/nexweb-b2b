import React from 'react'

import { ResetButton } from './ResetButton'
import { SeedButton } from './SeedButton'

import type { User } from '@payload-types'
import { useAuth } from '@payloadcms/ui'

export const DbInteractionZone: React.FC = () => {
  const { user } = useAuth<User>()

  const isUserAdmin = user?.role === 'admin'

  return (
    <>
      {isUserAdmin ? (
        <div className="db-interaction-zone">
          <SeedButton user={user} />
          <ResetButton user={user} />
        </div>
      ) : null}
    </>
  )
}
