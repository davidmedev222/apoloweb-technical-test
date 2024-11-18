'use client'
import { User } from '@/models'
import { getLocalStorage, removeLocalStorage } from '@/utils'
import { createContext, useEffect, useState } from 'react'

interface UserContextValues {
  /**
   * The user object.
   */
  user: User | null
  /**
   * Whether the user is loading.
   */
  loading: boolean
  /**
   * Whether the user is being revalidated.
   */
  isRevalidating: boolean
  /**
   * Revalidates the user.
   * @returns This function does not return a value.
   */
  revalidateUser: () => void
  /**
   * Signs out the user.
   * @returns This function does not return a value.
   */
  signOut: () => void
}

export const UserContext = createContext<UserContextValues | null>(null)

interface UserContextProps {
  /**
   * The children components.
   */
  children: React.ReactNode
}

function UserProvider({ children }: UserContextProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isRevalidating, setIsRevalidating] = useState(false)

  useEffect(() => {
    const userFromLocalStorage = getLocalStorage<User | null>('user', null)

    if (userFromLocalStorage) {
      setUser(userFromLocalStorage)
      setLoading(false)
    } else {
      setUser(null)
      setLoading(false)
    }
  }, [isRevalidating])

  /**
   * Revalidates the user.
   * @returns This function does not return a value.
   */
  const revalidateUser = () => {
    setIsRevalidating((state) => !state)
    setLoading(true)
  }

  /**
   * Signs out the user.
   * @returns This function does not return a value.
   */
  const signOut = () => {
    removeLocalStorage('user')
    setUser(null)
    setLoading(false)
  }

  const values = {
    user,
    loading,
    isRevalidating,
    revalidateUser,
    signOut
  }

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>
}

export { UserProvider }
