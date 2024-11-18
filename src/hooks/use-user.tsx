'use client'
import { UserContext } from '@/context'
import { useContext } from 'react'

/**
 * Hook to access the UserContext.
 * @returns The UserContext object
 */
function useUser() {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used within a UserProvider')
  return context
}

export { useUser }
