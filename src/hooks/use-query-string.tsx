import { useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

/**
 * Hook to manage query string parameters.
 * @returns An object with functions to get, set, and remove query string parameters.
 */
function useQueryString() {
  const searchParams = useSearchParams()

  /**
   * Gets the value of a query string parameter.
   * @param name - Name of the query string parameter
   * @returns The value of the query string parameter, or null if it does not exist
   */
  const getQueryValue = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString())
      return params.get(name)
    },
    [searchParams]
  )

  /**
   * Toggles the value of a query string parameter.
   * @param name - Name of the query string parameter
   * @param value - Value to set for the query string parameter
   * @returns The updated query string
   */
  const toggleQueryValue = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.get(name) === value ? params.delete(name) : params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  /**
   * Checks if a query string parameter exists.
   * @param name - Name of the query string parameter
   * @returns True if the query string parameter exists, false otherwise
   */
  const hasQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString())
      return params.has(name)
    },
    [searchParams]
  )

  /**
   * Creates a new query string with the given parameter and value.
   * @param name - Name of the query string parameter
   * @param value - Value to set for the query string parameter
   * @returns The updated query string
   */
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  /**
   * Removes a query string parameter.
   * @param name - Name of the query string parameter
   * @returns The updated query string
   */
  const removeQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete(name)

      return params.toString()
    },
    [searchParams]
  )

  /**
   * Removes a query string parameter and toggles its value.
   * @param oldQuery - Name of the query string parameter to remove
   * @param newQuery - Name of the query string parameter to set
   * @param value - Value to set for the new query string parameter
   * @returns The updated query string
   */
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
