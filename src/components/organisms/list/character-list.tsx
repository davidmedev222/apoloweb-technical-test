import { CharacterCard } from '@/components/molecules'
import { cn } from '@/lib/utils'
import { Character } from '@/models'

interface CharacterListProps {
  /**
   * The class name for the list.
   */
  className?: string
  /**
   * The list of characters to display.
   */
  characters: Character[]
}

function CharacterList({ className, characters }: CharacterListProps) {
  return (
    <ul className={cn('grid gap-4 xsm:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4', className)}>
      {characters.map((character) => (
        <li key={character.id}>
          <CharacterCard character={character} />
        </li>
      ))}
    </ul>
  )
}

export { CharacterList }
