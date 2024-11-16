import { SignUpForm } from '@/components/molecules'
import { Routes } from '@/utils'
import Link from 'next/link'

function AuthRegisterPage() {
  return (
    <section className='mx-auto grid w-full max-w-md gap-y-12 px-4 py-16'>
      <div className='grid gap-y-2 text-center'>
        <h1 className='text-3xl font-semibold'>¡Bienvenido a Apolo Web!</h1>
        <p className='text-gray-500'>Completa la información para crear una cuenta.</p>
      </div>
      <SignUpForm />
      <p className='flex items-center justify-center gap-x-2 text-center text-sm'>
        ¿Ya tienes una cuenta?
        <Link className='font-medium underline' href={Routes.Login}>
          Iniciar sesión
        </Link>
      </p>
    </section>
  )
}

export default AuthRegisterPage
