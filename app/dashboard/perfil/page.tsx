'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { User, Sparkles, Save, Loader2, Mail, Phone, Check, X } from 'lucide-react'

export default function ClientPerfilPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/client/login')
    }
    if (user && user.role === 'admin') {
      router.push('/admin')
    }
    if (user) {
      setFormData({
        full_name: user.fullName || '',
        phone: user.phone || '',
      })
    }
  }, [user, authLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const { error } = await supabase
        .from('auth_users')
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
        })
        .eq('id', user?.id)

      if (error) throw error

      setMessage({ type: 'success', text: 'Perfil actualizado correctamente' })
      setTimeout(() => {
        setMessage(null)
        router.refresh()
      }, 2000)
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Error al actualizar' })
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50/30 to-pink-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50/30 to-pink-50/30">
      {/* HEADER ELEGANTE */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-rose-200/50 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
                <User className="w-7 h-7 text-rose-500" />
                Mi Perfil
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Actualiza tu información personal
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* CARD PRINCIPAL */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-purple-300 mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-white">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30">
                  <User className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    Información Personal
                  </h2>
                  <p className="text-white/90 text-lg">
                    Mantén tus datos actualizados
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* MENSAJE DE ÉXITO/ERROR */}
              {message && (
                <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                  message.type === 'success' 
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 text-green-800' 
                    : 'bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-300 text-red-800'
                }`}>
                  {message.type === 'success' ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <X className="w-5 h-5" />
                  )}
                  <span className="font-semibold">{message.text}</span>
                </div>
              )}

              {/* FORMULARIO */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* EMAIL (Solo lectura) */}
                <div className="p-6 bg-gradient-to-br from-slate-50 to-gray-50 border-2 border-slate-200 rounded-xl">
                  <label className="block text-sm font-semibold mb-3 text-slate-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-rose-600" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl text-slate-600 cursor-not-allowed"
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    El email no se puede modificar
                  </p>
                </div>

                {/* NOMBRE COMPLETO */}
                <div className="p-6 bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-rose-200 rounded-xl">
                  <label className="block text-sm font-semibold mb-3 text-slate-700 flex items-center gap-2">
                    <User className="w-4 h-4 text-rose-600" />
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full px-4 py-3 bg-white border-2 border-rose-300 rounded-xl focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-slate-800 transition-all"
                    placeholder="Tu nombre completo"
                  />
                </div>

                {/* TELÉFONO */}
                <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl">
                  <label className="block text-sm font-semibold mb-3 text-slate-700 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white border-2 border-blue-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-slate-800 transition-all"
                    placeholder="+595 XXX XXX XXX"
                  />
                </div>

                {/* BOTÓN DE GUARDAR */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 px-8 rounded-xl font-bold transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      Guardar Cambios
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* INFORMACIÓN ADICIONAL */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-slate-200 p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-2">Seguridad de tus datos</h3>
                <p className="text-slate-600 text-sm">
                  Tu información personal está protegida y solo se utiliza para mejorar tu experiencia 
                  en la plataforma. Nunca compartimos tus datos con terceros.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
