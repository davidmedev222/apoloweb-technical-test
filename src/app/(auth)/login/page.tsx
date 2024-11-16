import { SignInForm } from '@/components/molecules'
import { Routes } from '@/utils'
import Link from 'next/link'

function AuthLoginPage() {
  return (
    <section className='mx-auto grid max-w-md gap-y-12 px-4 py-16'>
      <div className='grid gap-y-2 text-center'>
        <h1 className='text-3xl font-semibold'>¡Bienvenido de vuelta a Apolo Web!</h1>
        <p className='text-gray-500'>Completa la información para iniciar sesión.</p>
      </div>
      <SignInForm />
      <p className='flex items-center justify-center gap-x-2 text-center text-sm'>
        ¿No tienes una cuenta?
        <Link className='font-medium underline' href={Routes.Register}>
          Crea una cuenta
        </Link>
      </p>
    </section>
  )
}

export default AuthLoginPage
