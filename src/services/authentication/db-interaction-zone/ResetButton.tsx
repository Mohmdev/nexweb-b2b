'use client'

import React, { Fragment, useCallback, useState } from 'react'

import { toast } from '@payloadcms/ui'

import type { User } from '@payload-types'

const SuccessMessage: React.FC = () => (
  <div>
    Database reset complete! You can now{' '}
    <a target="_blank" href="/">
      visit your website
    </a>
  </div>
)

interface ResetButtonProps {
  user: User | null
}

export const ResetButton: React.FC<ResetButtonProps> = ({ user }) => {
  const [loading, setLoading] = useState(false)
  const [reset, setReset] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const getButtonText = () => {
    if (user?.role !== 'admin') return 'You need admin access level to perform this action'
    if (loading) return 'Resetting...'
    if (reset) return 'Database Reset Complete!'
    if (error) return `Error: ${error}`
    return 'Reset Database'
  }

  const resetStates = useCallback(() => {
    setLoading(false)
    setReset(false)
    setError(null)
  }, [])

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      if (reset) {
        toast.info('Database already reset.')
        return
      }
      if (loading) {
        toast.info('Reset already in progress.')
        return
      }
      if (error) {
        toast.error(`An error occurred, please refresh and try again.`)
        return
      }

      setLoading(true)

      try {
        toast.promise(
          fetch('/next/reset-db', {
            method: 'POST',
            credentials: 'include',
          }).then((res) => {
            if (!res.ok) {
              throw new Error('An error occurred while resetting.')
            }
            setReset(true)
            return res
          }),
          {
            loading: 'Resetting database and clearing data...',
            success: <SuccessMessage />,
            error: 'An error occurred while resetting the database.',
          },
        )

        const timeoutId = setTimeout(resetStates, 3000)
        // Cleanup timeout if component unmounts
        return () => clearTimeout(timeoutId)
      } catch (err) {
        setError(err as Error)
        setLoading(false)

        // Also reset states after error after 3 seconds
        const timeoutId = setTimeout(resetStates, 3000)
        return () => clearTimeout(timeoutId)
      }
    },
    [loading, reset, error, resetStates],
  )

  return (
    <Fragment>
      <button
        className="seedButton"
        onClick={handleClick}
        disabled={loading || reset || !!error || user?.role !== 'admin'}
      >
        {getButtonText()}
      </button>
    </Fragment>
  )
}
