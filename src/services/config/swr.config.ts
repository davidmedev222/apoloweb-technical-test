import { api } from '@/services'
import { SWRConfiguration } from 'swr'

/**
 * Fetcher function for SWR.
 * @param url - URL to fetch
 * @returns The response data from the API
 */
export const fetcher = async (url: string) => await api.get(url).then((res) => res.data)

export const SWR_CONFIG: SWRConfiguration = {
  fetcher,
  revalidateOnFocus: false
}
