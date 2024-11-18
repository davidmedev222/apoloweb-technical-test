'use client'
import { MyCharactersProvider } from '@/context'

interface MyCharactersProviderProps {
  /**
   * The children components.
   */
  children: React.ReactNode
}

function MyCharactersPageProvider({ children }: MyCharactersProviderProps) {
  return <MyCharactersProvider>{children}</MyCharactersProvider>
}

export { MyCharactersPageProvider }
