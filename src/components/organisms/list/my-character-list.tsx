import { MyCharacterCard } from '@/components/molecules'
import { cn } from '@/lib/utils'
import { Character } from '@/models'

interface MyCharacterListProps {
  className?: string
  characters: Character[]
}

function MyCharacterList({ className, characters }: MyCharacterListProps) {
  return (
    <ul className={cn('grid gap-4 xsm:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4', className)}>
      {characters
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((character) => (
          <li key={character.id}>
            <MyCharacterCard character={character} />
          </li>
        ))}
    </ul>
  )
}

export { MyCharacterList }
