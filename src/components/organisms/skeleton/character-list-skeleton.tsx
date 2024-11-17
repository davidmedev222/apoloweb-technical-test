import { Skeleton } from '@/components/ui/skeleton'

function CharacterListSkeleton() {
  return (
    <ul className='xsm:grid-cols-2 grid gap-4 sm:grid-cols-3 lg:grid-cols-4'>
      {Array.from({ length: 10 }).map((_, index) => (
        <li key={index}>
          <Skeleton className='aspect-square' />
        </li>
      ))}
    </ul>
  )
}

export { CharacterListSkeleton }
