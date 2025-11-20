'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { UserPlus } from 'lucide-react'

export default function ClientRegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
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
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Error al registrarse')
        return
      }

      // Registro exitoso - redirigir a página de éxito
      router.push('/register/success')
    } catch (err) {
      setError('Error al procesar el registro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-500/20 rounded-full mb-4">
            <UserPlus className="w-6 h-6 text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Crear Cuenta</h1>
          <p className="text-slate-400">Regístrate como cliente</p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-800 rounded-lg shadow-xl p-8 border border-slate-700">
          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                👤 Nombre Completo
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary-500 transition"
                placeholder="Tu nombre completo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                📧 Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary-500 transition"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                📱 Teléfono (Opcional)
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary-500 transition"
                placeholder="+54 9 11 xxxx-xxxx"
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
                minLength={8}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary-500 transition"
                placeholder="Mínimo 8 caracteres"
              />
              <p className="text-xs text-slate-400 mt-1">
                ✓ Mínimo 8 caracteres
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                ✓ Confirmar Contraseña
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary-500 transition"
                placeholder="Confirma tu contraseña"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ Registrando...' : '✓ Crear Cuenta'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-600">
            <p className="text-center text-slate-400 text-sm mb-4">
              ¿Ya tienes cuenta?
            </p>
            <Link
              href="/client/login"
              className="block w-full text-center bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              → Iniciar Sesión
            </Link>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-600">
            <p className="text-center text-slate-400 text-xs">
              ¿Eres administrador?
            </p>
            <Link
              href="/admin/login"
              className="block text-center text-primary-400 hover:text-primary-300 text-sm transition mt-2"
            >
              → Acceso de Administrador
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

