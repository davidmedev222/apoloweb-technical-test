'use client'
import { User } from '@/models'
import { getLocalStorage, removeLocalStorage } from '@/utils'
import { createContext, useEffect, useState } from 'react'

interface UserContextValues {
  user: User | null
  loading: boolean
  isRevalidating: boolean
  revalidateUser: () => void
  signOut: () => void
}

export const UserContext = createContext<UserContextValues | null>(null)

interface UserContextProps {
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

  const revalidateUser = () => {
    setIsRevalidating((state) => !state)
    setLoading(true)
  }

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
