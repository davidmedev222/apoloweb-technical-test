'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useUser } from '@/hooks'
import { signInWithEmailAndPassword } from '@/services/auth.service'
import { Routes, setLocalStorage, signInSchema, SignInSchema } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

function SignInForm() {
  const { revalidateUser } = useUser()
  const router = useRouter()
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const { isSubmitting, isDirty } = form.formState

  /**
   * Handles form submission.
   * @param values - The form values.
   * @returns This function does not return a value.
   */
  const onSubmit = async (values: SignInSchema) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const { error, data: user } = signInWithEmailAndPassword(values)
      if (error || !user) return toast.error(error)

      setLocalStorage('user', user)
      toast.success('¡Bienvenido de vuelta a Apolo Web!')
      form.reset()

      revalidateUser()
      router.replace(Routes.Home)
    } catch (error) {
      toast.error('¡Ocurrió un error al iniciar sesión, inténtalo de nuevo!')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-y-4'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input placeholder='johndoe@gmail.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type='password' placeholder='*********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='mt-4' type='submit' disabled={isSubmitting || !isDirty}>
          {isSubmitting ? <Loader2Icon className='animate-spin' /> : 'Iniciar sesión'}
        </Button>
      </form>
    </Form>
  )
}

export { SignInForm }
