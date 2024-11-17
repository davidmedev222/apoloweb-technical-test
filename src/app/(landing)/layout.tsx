import { Header } from '@/components/organisms'

interface LandingLayoutProps {
  children: React.ReactNode
}

function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default LandingLayout
