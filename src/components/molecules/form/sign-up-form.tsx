'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { User } from '@/models'
import { signUpWithEmailAndPassword } from '@/services/auth.service'
import { getLocalStorage, Routes, setLocalStorage, SignUpSchema, signUpSchema } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

function SignUpForm() {
  const router = useRouter()
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
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
  const onSubmit = async (values: SignUpSchema) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const { error, data: user } = signUpWithEmailAndPassword(values)
      if (error || !user) return toast.error(error)

      const users = getLocalStorage<User[]>('users', [])
      setLocalStorage('users', [...users, user])

      toast.success('¡Cuenta creada correctamente!')
      form.reset()

      router.replace(Routes.Login)
    } catch (error) {
      toast.error('¡Ocurrió un error al registrarse, inténtalo de nuevo!')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder='John Doe' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          {isSubmitting ? <Loader2Icon className='animate-spin' /> : 'Registrarse'}
        </Button>
      </form>
    </Form>
  )
}

export { SignUpForm }
