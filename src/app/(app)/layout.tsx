'use client'
import { Header } from '@/components/organisms'
import { useUser } from '@/hooks'
import { Routes } from '@/utils'
import { Loader2Icon } from 'lucide-react'
import { redirect } from 'next/navigation'

interface LandingLayoutProps {
  children: React.ReactNode
}

function LandingLayout({ children }: LandingLayoutProps) {
  const { loading, user } = useUser()

  if (loading) return <Loader2Icon className='fixed inset-0 m-auto animate-spin' />
  if (!user) return redirect(Routes.Login)

  return (
    <>
      <Header />
      {children}
      <div className='absolute inset-0 -z-10 size-full bg-mosaics bg-block' />
    </>
  )
}

export default LandingLayout
