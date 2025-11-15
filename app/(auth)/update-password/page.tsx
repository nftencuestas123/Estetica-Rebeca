'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import { Loader2 } from 'lucide-react'

export default function UpdatePasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [validSession, setValidSession] = useState(false)

  useEffect(() => {
    // Verificar que hay una sesión válida de recuperación
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setValidSession(true)
      } else {
        setError('Sesión inválida o expirada. Por favor, solicitá un nuevo enlace de recuperación.')
      }
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      setLoading(false)
      return
    }

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      })

      if (updateError) throw updateError

      setSuccess(true)
      
      // Redirigir al login después de 3 segundos
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } catch (err: any) {
      setError(err.message || 'Error al actualizar la contraseña')
    } finally {
      setLoading(false)
    }
  }

  if (!validSession && error) {
    return (
      <div className="min-h-screen bg-transparent">
        <Navbar />
        <div className="flex items-center justify-center py-20 px-4">
          <div className="w-full max-w-md">
            <div className="bg-cream-50 rounded-lg shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-600 text-2xl">✗</span>
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">
                Enlace Inválido
              </h1>
              <p className="text-white mb-6">{error}</p>
              <Link
                href="/reset-password"
                className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Solicitar Nuevo Enlace
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-transparent">
        <Navbar />
        <div className="flex items-center justify-center py-20 px-4">
          <div className="w-full max-w-md">
            <div className="bg-cream-50 rounded-lg shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-2xl">✓</span>
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">
                ¡Contraseña Actualizada!
              </h1>
              <p className="text-white mb-6">
                Tu contraseña se actualizó correctamente. Serás redirigido al login en unos segundos...
              </p>
              <Link
                href="/login"
                className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Ir al Login Ahora
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      <div className="flex items-center justify-center py-12 sm:py-16 md:py-20 px-4">
        <div className="w-full max-w-md">
          <div className="bg-cream-50 rounded-lg shadow-lg p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Nueva Contraseña
            </h1>
            <p className="text-sm sm:text-base text-white mb-6 sm:mb-8">
              Ingresá tu nueva contraseña
            </p>

            {error && (
              <div className="mb-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs sm:text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                  Nueva Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 sm:py-3.5 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base sm:text-lg min-h-[48px]"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                  Confirmar Contraseña
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 sm:py-3.5 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base sm:text-lg min-h-[48px]"
                  placeholder="Repetí tu contraseña"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !validSession}
                className="w-full px-4 py-3.5 sm:py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[48px] text-base sm:text-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Actualizando...
                  </>
                ) : (
                  'Actualizar Contraseña'
                )}
              </button>
            </form>

            <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-white">
              <Link href="/login" className="text-primary font-semibold hover:underline min-h-[44px] inline-flex items-center">
                Volver al Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

