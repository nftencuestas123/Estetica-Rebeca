'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Shield } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Llamar al login
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Error al iniciar sesión')
      }

      const data = await response.json()
      
      // VALIDAR que el usuario sea ADMIN (no cliente)
      if (!data.user || data.user.role !== 'admin') {
        throw new Error('Esta es una cuenta de cliente. Por favor, usa el panel del cliente.')
      }

      // Si es admin, redirigir al panel de administrador
      window.location.href = '/admin'
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-500/20 rounded-full mb-4">
            <Shield className="w-6 h-6 text-amber-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Panel Admin</h1>
          <p className="text-slate-400">Acceso restringido a administradores</p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-800 rounded-lg shadow-xl p-8 border border-amber-500/30">
          <div className="mb-6 p-4 bg-amber-900/20 border border-amber-500/50 rounded-lg">
            <p className="text-amber-200 text-sm">
              🔐 <strong>Solo para Administradores</strong> - Ingresa con tus credenciales
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                📧 Email Admin
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition"
                placeholder="admin@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                🔐 Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition"
                placeholder="Tu contraseña"
              />
            </div>

            <div className="text-right">
              <Link
                href="/admin/forgot-password"
                className="text-sm text-amber-400 hover:text-amber-300 transition"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ Verificando...' : '🔐 Acceder al Panel'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-600">
            <p className="text-center text-slate-400 text-sm mb-4">
              ¿Eres nuevo administrador?
            </p>
            <Link
              href="/admin/register"
              className="block w-full text-center bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/30 text-amber-200 px-6 py-3 rounded-lg font-semibold transition"
            >
              → Registrarse como Admin
            </Link>
          </div>

          <div className="mt-4">
            <Link
              href="/auth"
              className="block text-center text-slate-400 hover:text-slate-300 text-sm transition"
            >
              ← Cambiar tipo de acceso
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

