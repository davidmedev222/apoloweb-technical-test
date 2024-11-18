import { User } from '@/models'
import { getLocalStorage, SignInSchema, SignUpSchema } from '@/utils'

function signInWithEmailAndPassword(body: SignInSchema) {
  const users = getLocalStorage<User[]>('users', [])
  const userFound = users.find((user) => user.email === body.email)

  if (!userFound) return { error: '¡No existe un usuario con ese correo electrónico!', data: null }
  if (userFound.password !== body.password) return { error: '¡La contraseña es incorrecta!', data: null }

  return { error: null, data: userFound }
}

function signUpWithEmailAndPassword(body: SignUpSchema) {
  const users = getLocalStorage<User[]>('users', [])

  const userFound = users.find((user) => user.email === body.email)
  if (userFound) return { error: '¡Ya existe un usuario con ese correo electrónico!', data: null }

  const newUser = { id: crypto.randomUUID(), ...body }
  return { error: null, data: newUser }
}

export { signInWithEmailAndPassword, signUpWithEmailAndPassword }
