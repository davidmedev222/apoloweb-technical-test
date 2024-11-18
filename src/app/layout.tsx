import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { RootProvider } from './provider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: 'ApolloWeb - Technical Test',
  description:
    'ApolloWeb is a web application that allows users to search and view information about characters from the Rick and Morty API.'
}

interface RootLayoutProps {
  /**
   * The children components.
   */
  children: React.ReactNode
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <body className={cn('flex min-h-dvh flex-col antialiased', inter.variable)}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}

export default RootLayout
