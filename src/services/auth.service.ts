import { User } from '@/models'
import { getLocalStorage, SignInSchema, SignUpSchema } from '@/utils'

/**
 * Signs in a user with email and password.
 * @param body - SignInSchema
 * @returns An object with an error message (if any) and the user data (if the sign in was successful).
 */
function signInWithEmailAndPassword(body: SignInSchema) {
  const users = getLocalStorage<User[]>('users', [])
  const userFound = users.find((user) => user.email === body.email)

  if (!userFound) return { error: '¡No existe un usuario con ese correo electrónico!', data: null }
  if (userFound.password !== body.password) return { error: '¡La contraseña es incorrecta!', data: null }

  return { error: null, data: userFound }
}

/**
 * Signs up a user with email and password.
 * @param body - SignUpSchema
 * @returns An object with an error message (if any) and the user data (if the sign up was successful).
 */
function signUpWithEmailAndPassword(body: SignUpSchema) {
  const users = getLocalStorage<User[]>('users', [])

  const userFound = users.find((user) => user.email === body.email)
  if (userFound) return { error: '¡Ya existe un usuario con ese correo electrónico!', data: null }

  const newUser = { id: crypto.randomUUID(), ...body }
  return { error: null, data: newUser }
}

export { signInWithEmailAndPassword, signUpWithEmailAndPassword }
