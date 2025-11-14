'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import { Loader2 } from 'lucide-react'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      })

      if (resetError) throw resetError

      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Error al enviar el email de recuperación')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-cream-50">
        <Navbar />
        <div className="flex items-center justify-center py-20 px-4">
          <div className="w-full max-w-md">
            <div className="bg-cream-50 rounded-lg shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-2xl">✓</span>
              </div>
              <h1 className="text-2xl font-bold text-primary-900 mb-4">
                Email Enviado
              </h1>
              <p className="text-primary-600 mb-6">
                Te enviamos un enlace para restablecer tu contraseña a{' '}
                <strong>{email}</strong>
              </p>
              <Link
                href="/login"
                className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Volver al Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <div className="flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-md">
          <div className="bg-cream-50 rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-primary-900 mb-2">
              Recuperar Contraseña
            </h1>
            <p className="text-primary-600 mb-8">
              Ingresá tu email y te enviaremos un enlace para restablecer tu contraseña
            </p>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="tu@email.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Enviar Enlace de Recuperación'
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-primary-600">
              <Link href="/login" className="text-primary font-semibold hover:underline">
                Volver al Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}






