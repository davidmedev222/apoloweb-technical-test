import { CharactersSection } from '@/components/organisms'
import { Suspense } from 'react'

function HomePage() {
  return (
    <main className='flex flex-col gap-y-12 px-4 py-16'>
      <section className='grid gap-y-4 py-16 text-center'>
        <h1 className='text-5xl font-semibold'>Encuentra personajes de Rick y Morty</h1>
        <p className='mx-auto max-w-sm'>
          Utiliza el buscador para buscar personajes o filtra por estado, especie o género.
        </p>
      </section>
      <Suspense>
        <CharactersSection />
      </Suspense>
    </main>
  )
}

export default HomePage
