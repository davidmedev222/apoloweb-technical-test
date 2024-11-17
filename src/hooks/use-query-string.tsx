import { useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

function useQueryString() {
  const searchParams = useSearchParams()

  const getQueryValue = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString())
      return params.get(name)
    },
    [searchParams]
  )

  const toggleQueryValue = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.get(name) === value ? params.delete(name) : params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const hasQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString())
      return params.has(name)
    },
    [searchParams]
  )

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const removeQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete(name)

      return params.toString()
    },
    [searchParams]
  )

  const removeAndToggleQueryString = useCallback(
    (oldQuery: string, newQuery: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete(oldQuery)
      params.get(newQuery) === value ? params.delete(newQuery) : params.set(newQuery, value)

      return params.toString()
    },
    [searchParams]
  )

  return {
    hasQueryString,
    createQueryString,
    removeQueryString,
    getQueryValue,
    toggleQueryValue,
    removeAndToggleQueryString
  }
}

export { useQueryString }
