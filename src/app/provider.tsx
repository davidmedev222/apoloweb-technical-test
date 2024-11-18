'use client'
import { Toaster } from '@/components/ui/sonner'
import { UserProvider } from '@/context'
import { SWR_CONFIG } from '@/services'
import { SWRConfig } from 'swr'

interface RootProviderProps {
  children: React.ReactNode
}

function RootProvider({ children }: RootProviderProps) {
  return (
    <UserProvider>
      <SWRConfig value={SWR_CONFIG}>
        {children}
        <Toaster />
      </SWRConfig>
    </UserProvider>
  )
}

export { RootProvider }
