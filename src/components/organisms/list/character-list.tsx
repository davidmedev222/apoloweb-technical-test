import { CharacterCard } from '@/components/molecules'
import { cn } from '@/lib/utils'
import { Character } from '@/models'

interface CharacterListProps {
  className?: string
  characters: Character[]
}

function CharacterList({ className, characters }: CharacterListProps) {
  return (
    <ul className={cn('xsm:grid-cols-2 grid gap-4 sm:grid-cols-3 lg:grid-cols-4', className)}>
      {characters.map((character) => (
        <li key={character.id}>
          <CharacterCard character={character} />
        </li>
      ))}
    </ul>
  )
}

export { CharacterList }
