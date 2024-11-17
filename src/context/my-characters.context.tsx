'use client'
import { Character } from '@/models'
import { createContext, useState } from 'react'

interface MyCharactersContextValues {
  characters: Character[]
  addCharacter: (character: Character) => void
  removeCharacter: (characterId: string) => void
  updateCharacter: (character: Character) => void
}

export const MyCharactersContext = createContext<MyCharactersContextValues | null>(null)

interface MyCharactersContextProps {
  children: React.ReactNode
}

function MyCharactersProvider({ children }: MyCharactersContextProps) {
  const [characters, setCharacters] = useState<Character[]>([])

  const addCharacter = (character: Character) => {
    setCharacters((characters) => [...characters, character])
  }

  const removeCharacter = (characterId: string) => {
    setCharacters((characters) => characters.filter((character) => character.id !== characterId))
  }

  const updateCharacter = (character: Character) => {
    setCharacters((characters) => characters.map((c) => (c.id === character.id ? character : c)))
  }

  const values = {
    characters,
    addCharacter,
    removeCharacter,
    updateCharacter
  }

  return <MyCharactersContext.Provider value={values}>{children}</MyCharactersContext.Provider>
}

export { MyCharactersProvider }
