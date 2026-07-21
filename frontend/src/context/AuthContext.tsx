import { createContext, useContext, useState } from 'react'

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  accessToken: string | null
  setAuth: (user: User, token: string) => void
  clearAuth: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })

  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem('accessToken')
  })

  const setAuth = (user: User, token: string) => {
    setUser(user)
    setAccessToken(token)
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('accessToken', token)
    
  }

  const clearAuth = () => {
    setUser(null)
    setAccessToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('accessToken')
  }

  return (
    <AuthContext.Provider value={{
      user,
      accessToken,
      setAuth,
      clearAuth,
      isAuthenticated: !!accessToken && !!user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}