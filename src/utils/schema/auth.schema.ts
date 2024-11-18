import { z } from 'zod'

/**
 * Zod schema for sign in.
 */
export const signInSchema = z.object({
  email: z.string().min(1, 'El correo electrónico es obligatorio').email({
    message: 'El correo electrónico es inválido'
  }),
  password: z.string().min(1, 'La contraseña es obligatoria').min(8, {
    message: 'La contraseña debe tener al menos 8 caracteres'
  })
})

export type SignInSchema = z.infer<typeof signInSchema>

/**
 * Zod schema for sign up.
 */
export const signUpSchema = signInSchema.extend({
  name: z.string().min(1, 'El nombre es obligatorio').min(2, {
    message: 'El nombre debe tener al menos 2 caracteres'
  })
})

export type SignUpSchema = z.infer<typeof signUpSchema>
