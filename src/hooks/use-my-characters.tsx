'use client'
import { MyCharactersContext } from '@/context'
import { useContext } from 'react'

/**
 * Hook to access the MyCharactersContext.
 * @returns The MyCharactersContext object
 */
function useMyCharacters() {
  const context = useContext(MyCharactersContext)
  if (!context) throw new Error('useMyCharacters must be used within a MyCharactersProvider')
  return context
}

export { useMyCharacters }
