import { CharacterCard } from '@/components/molecules'
import { cn } from '@/lib/utils'
import { Character } from '@/models'

interface CharacterListProps {
  className?: string
  characters: Character[]
}

function CharacterList({ className, characters }: CharacterListProps) {
  return (
    <ul className={cn('grid gap-4 xsm:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4', className)}>
      {characters
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((character) => (
          <li key={character.id}>
            <CharacterCard character={character} />
          </li>
        ))}
    </ul>
  )
}

export { CharacterList }