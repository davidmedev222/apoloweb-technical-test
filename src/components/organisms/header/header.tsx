'use client'
import { UserProfileMenu } from '@/components/molecules'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { NAVIGATION_ROUTES } from '@/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Header() {
  const pathname = usePathname()

  return (
    <header className='mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 py-8'>
      <UserProfileMenu />
      <nav>
        <ul className='flex items-center'>
          {NAVIGATION_ROUTES.map((route) => (
            <li key={route.name}>
              <Button className={cn(pathname === route.href && 'underline')} variant='link' asChild>
                <Link href={route.href}>{route.name}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export { Header }
