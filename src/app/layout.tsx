import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

interface RootLayoutProps {
  children: React.ReactNode
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <body className={cn('flex min-h-dvh flex-col antialiased', inter.variable)}>{children}</body>
    </html>
  )
}

export default RootLayout