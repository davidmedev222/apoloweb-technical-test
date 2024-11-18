'use client'
import { MyCharactersProvider } from '@/context'

interface MyCharactersProviderProps {
  children: React.ReactNode
}

function MyCharactersPageProvider({ children }: MyCharactersProviderProps) {
  return <MyCharactersProvider>{children}</MyCharactersProvider>
}

export { MyCharactersPageProvider }
