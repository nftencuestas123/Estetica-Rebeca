/**
 * CONTEXTO DE AUTENTICACIÓN
 * Maneja el estado global de autenticación
 */

'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

// =====================================================
// TIPOS
// =====================================================

export interface User {
  id: string
  email: string
  role: 'admin' | 'client'
  fullName: string
  phone?: string
  isActive: boolean
  isVerified: boolean
  lastLoginAt?: string
  createdAt?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  signOut: () => Promise<void> // Alias de logout
  refreshUser: () => Promise<void>
  isAdmin: boolean
  isAuthenticated: boolean
}

// =====================================================
// CONTEXTO
// =====================================================

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// =====================================================
// PROVIDER
// =====================================================

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // =====================================================
  // OBTENER USUARIO ACTUAL
  // =====================================================

  const refreshUser = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Error fetching user:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  // =====================================================
  // CARGAR USUARIO AL MONTAR
  // =====================================================

  useEffect(() => {
    refreshUser()
  }, [])

  // =====================================================
  // LOGIN
  // =====================================================

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Error al iniciar sesión')
      }

      const data = await response.json()
      
      // Verificar que tenemos el usuario
      if (!data.user || !data.user.role) {
        throw new Error('Respuesta inválida del servidor')
      }

      setUser(data.user)

      // Redirigir según el rol
      if (data.user.role === 'admin') {
        window.location.href = '/admin'
      } else {
        window.location.href = '/dashboard'
      }
    } catch (error) {
      console.error('Error en login:', error)
      throw error
    }
  }

  // =====================================================
  // LOGOUT
  // =====================================================

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
    } catch (error) {
      console.error('Error during logout:', error)
    } finally {
      setUser(null)
      router.push('/login')
      router.refresh()
    }
  }

  // =====================================================
  // VALORES COMPUTADOS
  // =====================================================

  const isAdmin = user?.role === 'admin'
  const isAuthenticated = user !== null

  // =====================================================
  // VALOR DEL CONTEXTO
  // =====================================================

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    signOut: logout, // Alias de logout para compatibilidad
    refreshUser,
    isAdmin,
    isAuthenticated,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// =====================================================
// HOOK
// =====================================================

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

