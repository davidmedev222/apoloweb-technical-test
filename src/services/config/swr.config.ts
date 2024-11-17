import { api } from '@/services'
import { SWRConfiguration } from 'swr'

export const fetcher = async (url: string) => await api.get(url).then((res) => res.data)

export const SWR_CONFIG: SWRConfiguration = {
  fetcher,
  revalidateOnFocus: false
}
