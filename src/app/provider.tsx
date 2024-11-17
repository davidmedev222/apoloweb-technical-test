'use client'
import { Toaster } from '@/components/ui/sonner'
import { SWR_CONFIG } from '@/services'
import { SWRConfig } from 'swr'

interface RootProviderProps {
  children: React.ReactNode
}

function RootProvider({ children }: RootProviderProps) {
  return (
    <SWRConfig value={SWR_CONFIG}>
      {children}
      <Toaster />
    </SWRConfig>
  )
}

export { RootProvider }
