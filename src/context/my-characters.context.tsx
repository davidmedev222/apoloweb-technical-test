'use client'
import { Character } from '@/models'
import { createContext, useState } from 'react'

interface MyCharactersContextValues {
  /**
   * The list of characters.
   */
  characters: Character[]
  /**
   * Adds a character to the list.
   * @param character - The character to add.
   * @returns This function does not return a value.
   */
  addCharacter: (character: Character) => void
  /**
   * Removes a character from the list.
   * @param characterId - The ID of the character to remove.
   * @returns This function does not return a value.
   */
  removeCharacter: (characterId: string) => void
  /**
   * Updates a character in the list.
   * @param character - The character to update.
   * @returns This function does not return a value.
   */
  updateCharacter: (character: Character) => void
}

export const MyCharactersContext = createContext<MyCharactersContextValues | null>(null)

interface MyCharactersContextProps {
  /**
   * The children components.
   */
  children: React.ReactNode
}

function MyCharactersProvider({ children }: MyCharactersContextProps) {
  const [characters, setCharacters] = useState<Character[]>([])

  /**
   * Adds a character to the list.
   * @param character - The character to add.
   * @returns This function does not return a value.
   */
  const addCharacter = (character: Character) => {
    setCharacters((characters) => [...characters, character])
  }

  /**
   * Removes a character from the list.
   * @param characterId - The ID of the character to remove.
   * @returns This function does not return a value.
   */
  const removeCharacter = (characterId: string) => {
    setCharacters((characters) => characters.filter((character) => character.id !== characterId))
  }

  /**
   * Updates a character in the list.
   * @param character - The character to update.
   * @returns This function does not return a value.
   */
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
