'use client'
import { MyCharacterList } from '@/components/organisms'
import { useMyCharacters } from '@/hooks'

function MyCharactersSection() {
  const { characters } = useMyCharacters()

  return (
    <section className='relative mx-auto flex w-full max-w-screen-2xl flex-col gap-y-4'>
      <MyCharacterList characters={characters} />
    </section>
  )
}

export { MyCharactersSection }
