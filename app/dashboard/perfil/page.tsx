'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowLeft, User, Save, Loader2 } from 'lucide-react'

export default function ClientPerfilPage() {
  const router = useRouter()
  const { user, profile, loading: authLoading } = useAuth()
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    address: '',
    city: 'Ciudad del Este',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        address: profile.address || '',
        city: profile.city || 'Ciudad del Este',
      })
    }
  }, [user, profile, authLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update(formData)
        .eq('id', user?.id)

      if (error) throw error

      setMessage({ type: 'success', text: 'Perfil actualizado correctamente' })
      setTimeout(() => router.push('/dashboard'), 2000)
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Error al actualizar' })
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || !user) return null

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#FAF7F5' }}>
      <Link href="/dashboard" className="inline-flex items-center gap-2 mb-6 hover:opacity-70">
        <ArrowLeft className="w-5 h-5" /> Volver al Dashboard
      </Link>
      <div className="max-w-2xl mx-auto">
        <div className="p-8 rounded-3xl" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8D5D5' }}>
          <User className="w-12 h-12 mb-4" style={{ color: '#C9A961' }} />
          <h1 className="text-3xl font-light mb-6" style={{ color: '#5A4A42' }}>
            Mi Perfil
          </h1>

          {message && (
            <div className={`mb-6 p-4 rounded-xl ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#5A4A42' }}>
                Nombre Completo
              </label>
              <input
                type="text"
                required
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none"
                style={{ borderColor: '#E8D5D5', color: '#5A4A42' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#5A4A42' }}>
                Teléfono
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none"
                style={{ borderColor: '#E8D5D5', color: '#5A4A42' }}
                placeholder="+595 XXX XXX XXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#5A4A42' }}>
                Dirección
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none"
                style={{ borderColor: '#E8D5D5', color: '#5A4A42' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#5A4A42' }}>
                Ciudad
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none"
                style={{ borderColor: '#E8D5D5', color: '#5A4A42' }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:scale-105 transition-transform disabled:opacity-50"
              style={{ backgroundColor: '#C9A961', color: '#FAF7F5' }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Guardar Cambios
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

