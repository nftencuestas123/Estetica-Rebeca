'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import { Loader2 } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nombre: '',
    whatsapp: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      setLoading(false)
      return
    }

    try {
      // Registrar usuario en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (authError) throw authError

      if (authData.user) {
        // Crear perfil en tabla users
        const { error: profileError } = await supabase.from('users').insert({
          id: authData.user.id,
          email: formData.email,
          nombre: formData.nombre,
          whatsapp: formData.whatsapp || null,
          estado: 'activo',
          puntos_lealtad: 0,
          tier: 'bronze',
        })

        if (profileError) {
          console.error('Error creando perfil:', profileError)
          // No lanzamos error aquí porque el usuario ya está creado en auth
        }

        router.push('/dashboard')
        router.refresh()
      }
    } catch (err: any) {
      setError(err.message || 'Error al registrarse')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <div className="flex items-center justify-center py-12 sm:py-16 md:py-20 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
              Crear Cuenta
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 mb-6 sm:mb-8">
              Registrate para acceder a todos nuestros servicios
            </p>

            {error && (
              <div className="mb-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs sm:text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-neutral-700 mb-2">
                  Nombre Completo
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 sm:py-3.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base sm:text-lg min-h-[48px]"
                  placeholder="María González"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 sm:py-3.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base sm:text-lg min-h-[48px]"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium text-neutral-700 mb-2">
                  WhatsApp (opcional)
                </label>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full px-4 py-3 sm:py-3.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base sm:text-lg min-h-[48px]"
                  placeholder="+595 987 123 456"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 sm:py-3.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base sm:text-lg min-h-[48px]"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-2">
                  Confirmar Contraseña
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 sm:py-3.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base sm:text-lg min-h-[48px]"
                  placeholder="Repetí tu contraseña"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3.5 sm:py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[48px] text-base sm:text-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creando cuenta...
                  </>
                ) : (
                  'Crear Cuenta'
                )}
              </button>
            </form>

            <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-neutral-600">
              ¿Ya tenés cuenta?{' '}
              <Link href="/login" className="text-primary font-semibold hover:underline min-h-[44px] inline-flex items-center">
                Iniciá sesión acá
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

