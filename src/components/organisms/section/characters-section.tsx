'use client'
import { CharacterFilters } from '@/components/molecules'
import { CharacterList, CharacterListSkeleton } from '@/components/organisms'
import { ApiResponse, Character } from '@/models'
import { fetcher } from '@/services'
import {
  KEY_QUERY_CHARACTER_GENDER,
  KEY_QUERY_CHARACTER_NAME,
  KEY_QUERY_CHARACTER_PAGE,
  KEY_QUERY_CHARACTER_SPECIES,
  KEY_QUERY_CHARACTER_STATUS
} from '@/utils'
import { AxiosError } from 'axios'
import clsx from 'clsx'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'

function CharactersSection() {
  const searchParams = useSearchParams()

  const name = searchParams.get(KEY_QUERY_CHARACTER_NAME) ?? ''
  const status = searchParams.get(KEY_QUERY_CHARACTER_STATUS) ?? ''
  const species = searchParams.get(KEY_QUERY_CHARACTER_SPECIES) ?? ''
  const gender = searchParams.get(KEY_QUERY_CHARACTER_GENDER) ?? ''
  const page = searchParams.get(KEY_QUERY_CHARACTER_PAGE) ?? ''

  const {
    data: characters,
    isLoading,
    error
  } = useSWR<ApiResponse<Character[]>, AxiosError>(
    `/character?name=${name}&status=${status}&species=${species}&gender=${gender}&page=${page}`,
    fetcher,
    { keepPreviousData: true }
  )

  return (
    <section className='relative mx-auto flex w-full max-w-screen-2xl flex-col gap-y-4'>
      <CharacterFilters />
      {error && <p className='py-16 text-center'>No se encontraron resultados</p>}
      {!error && !characters && <CharacterListSkeleton />}
      {!error && characters && (
        <CharacterList characters={characters.results} className={clsx(isLoading && 'opacity-55')} />
      )}
    </section>
  )
}

export { CharactersSection }
