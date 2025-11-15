'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // BYPASS TEMPORAL - Acceso directo sin autenticación real
    setTimeout(() => {
      router.push('/admin') // Redirigir directo al admin sin verificar
      router.refresh()
    }, 500) // Simular un pequeño delay para UX

    // CÓDIGO ORIGINAL COMENTADO - Reactivar cuando esté la autenticación configurada
    // try {
    //   const { data, error: authError } = await supabase.auth.signInWithPassword({
    //     email,
    //     password,
    //   })
    //   if (authError) throw authError
    //   if (data.user) {
    //     router.push('/dashboard')
    //     router.refresh()
    //   }
    // } catch (err: any) {
    //   setError(err.message || 'Error al iniciar sesión')
    // } finally {
    //   setLoading(false)
    // }
  }

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      <div className="flex items-center justify-center py-12 sm:py-16 md:py-20 px-4">
        <div className="w-full max-w-md">
          <div className="bg-cream-50 rounded-lg shadow-lg p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Iniciar Sesión
            </h1>
            <p className="text-sm sm:text-base text-white mb-6 sm:mb-8">
              Ingresá a tu cuenta para continuar
            </p>

            {error && (
              <div className="mb-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs sm:text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 sm:py-3.5 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base sm:text-lg min-h-[48px]"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 sm:py-3.5 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base sm:text-lg min-h-[48px]"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between">
                <Link
                  href="/reset-password"
                  className="text-xs sm:text-sm text-primary hover:underline min-h-[44px] flex items-center"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3.5 sm:py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[48px] text-base sm:text-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
            </form>

            <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-white">
              ¿No tenés cuenta?{' '}
              <Link href="/register" className="text-primary font-semibold hover:underline min-h-[44px] inline-flex items-center">
                Registrate acá
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}









