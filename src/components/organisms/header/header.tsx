import { Button } from '@/components/ui/button'
import { Routes } from '@/utils'
import Link from 'next/link'

function Header() {
  return (
    <header className='mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 py-8'>
      <Link href={Routes.Home}>ApolloWeb</Link>
      <nav>
        <ul className='flex items-center'>
          <li>
            <Button variant='link' asChild>
              <Link href={Routes.Home}>Inicio</Link>
            </Button>
          </li>
          <li>
            <Button variant='link' asChild>
              <Link href={Routes.MyCharacters}>Mis personajes</Link>
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export { Header }
