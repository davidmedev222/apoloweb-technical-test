'use client'
import { MyCharactersContext } from '@/context'
import { useContext } from 'react'

function useMyCharacters() {
  const context = useContext(MyCharactersContext)
  if (!context) throw new Error('useMyCharacters must be used within a MyCharactersProvider')
  return context
}

export { useMyCharacters }
