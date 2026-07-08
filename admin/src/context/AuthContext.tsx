import { createContext, useContext, useEffect, useState } from 'react'
import api from '@/services/api'

interface Admin {
  _id: string
  email: string
  role: string
}

interface AuthContextType {
  admin: Admin | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('admin-token'))
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (token) {
      api.get('/auth/me')
        .then((res) => setAdmin(res.data.data))
        .catch(() => {
          setToken(null)
          localStorage.removeItem('admin-token')
        })
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, [token])

  const login = async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password })
    const { accessToken: newToken, admin: adminData } = res.data.data
    localStorage.setItem('admin-token', newToken)
    setToken(newToken)
    setAdmin(adminData)
  }

  const logout = () => {
    localStorage.removeItem('admin-token')
    setToken(null)
    setAdmin(null)
    api.post('/auth/logout').catch(() => {})
  }

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated: !!token && !!admin,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
