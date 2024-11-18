'use client'
import { CharacterFilters } from '@/components/molecules'
import { CharacterList, CharacterListSkeleton } from '@/components/organisms'
import { Button } from '@/components/ui/button'
import { ApiResponse, Character } from '@/models'
import { fetcher } from '@/services'
import {
  KEY_QUERY_CHARACTER_GENDER,
  KEY_QUERY_CHARACTER_NAME,
  KEY_QUERY_CHARACTER_SPECIES,
  KEY_QUERY_CHARACTER_STATUS,
  MIN_PAGE_SIZE
} from '@/utils'
import { AxiosError } from 'axios'
import clsx from 'clsx'
import { Loader2Icon } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import useSWRInfinite from 'swr/infinite'

function CharactersSection() {
  const searchParams = useSearchParams()

  const name = searchParams.get(KEY_QUERY_CHARACTER_NAME) ?? ''
  const status = searchParams.get(KEY_QUERY_CHARACTER_STATUS) ?? ''
  const species = searchParams.get(KEY_QUERY_CHARACTER_SPECIES) ?? ''
  const gender = searchParams.get(KEY_QUERY_CHARACTER_GENDER) ?? ''

  const [isLoadMoreCharacters, setIsLoadMoreCharacters] = useState(false)
  const { data, isLoading, error, size, setSize } = useSWRInfinite<ApiResponse<Character[]>, AxiosError>(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.results.length) return null
      return `/character?name=${name}&status=${status}&species=${species}&gender=${gender}&page=${pageIndex + MIN_PAGE_SIZE}`
    },
    fetcher,
    { keepPreviousData: true }
  )

  const characters = data?.flatMap((page) => page.results) ?? []
  const hasMoreCharacters = data?.[data.length - 1].info.next

  /**
   * Handles loading more characters.
   * @returns This function does not return a value.
   */
  const handleLoadMoreCharacters = async () => {
    try {
      if (!hasMoreCharacters || isLoading) return

      setIsLoadMoreCharacters(true)
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve(setSize(size + MIN_PAGE_SIZE))
        }, 500)
      )
    } catch (error) {
      toast.error('¡Ocurrió un error al cargar más personajes!')
    } finally {
      setIsLoadMoreCharacters(false)
    }
  }

  return (
    <section className='relative mx-auto flex w-full max-w-screen-2xl flex-col gap-y-4'>
      <CharacterFilters />
      {error && <p className='py-16 text-center'>No se encontraron resultados</p>}
      {!data && isLoading && !error && <CharacterListSkeleton />}
      {!error && <CharacterList characters={characters} className={clsx(isLoading && 'opacity-55')} />}
      {!error && (
        <Button
          className='mx-auto mt-4 w-full max-w-48'
          onClick={handleLoadMoreCharacters}
          disabled={!hasMoreCharacters || isLoadMoreCharacters || isLoading}
        >
          {isLoadMoreCharacters ? <Loader2Icon className='animate-spin' /> : 'Cargar más'}
        </Button>
      )}
    </section>
  )
}

export { CharactersSection }
