import { CharacterModal, MyCharactersSection } from '@/components/organisms'
import { Button } from '@/components/ui/button'
import { MyCharactersPageProvider } from './provider'

function MyCharactersPage() {
  return (
    <MyCharactersPageProvider>
      <main className='flex flex-col gap-y-12 px-4 py-16'>
        <section className='grid gap-y-4 py-16 text-center'>
          <h1 className='text-5xl font-semibold'>Crea y edita personajes de Rick y Morty</h1>
          <p className='mx-auto max-w-sm'>Presiona el botón de crear personaje para crear un nuevo personaje.</p>
          <CharacterModal>
            <Button className='mx-auto mt-4'>Crear personaje</Button>
          </CharacterModal>
        </section>
        <MyCharactersSection />
      </main>
    </MyCharactersPageProvider>
  )
}

export default MyCharactersPage
