import { Header } from '@/components/organisms'

interface LandingLayoutProps {
  children: React.ReactNode
}

function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <div className='bg-mosaics bg-block absolute inset-0 -z-10 size-full' />
    </>
  )
}

export default LandingLayout
