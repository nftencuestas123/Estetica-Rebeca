'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { motion } from 'framer-motion'
import { Lock, Mail, AlertCircle, Loader2 } from 'lucide-react'

/**
 * =====================================================
 * LOGIN DE ADMINISTRADOR
 * Ruta: /admin-login (PRIVADA, NO PÚBLICA)
 * =====================================================
 */

export default function AdminLoginPage() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await signIn(formData.email, formData.password)

      if (error) throw error

      if (!data.user) {
        throw new Error('Error de autenticación')
      }

      // El middleware verificará el rol y redirigirá
      router.push('/admin')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Credenciales inválidas')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Card de Login */}
        <div 
          className="rounded-3xl p-8 sm:p-12 shadow-2xl border"
          style={{ 
            backgroundColor: '#1A1A1A',
            borderColor: 'rgba(212, 169, 154, 0.2)'
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div 
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
              style={{ backgroundColor: 'rgba(212, 169, 154, 0.1)' }}
            >
              <Lock className="w-8 h-8" style={{ color: '#D4A99A' }} />
            </div>
            <h1 
              className="text-3xl font-bold mb-2"
              style={{ color: '#FAF7F5' }}
            >
              Admin Access
            </h1>
            <p style={{ color: 'rgba(250, 247, 245, 0.6)' }}>
              Panel de Administración
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl flex items-start gap-3"
              style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#EF4444' }} />
              <p className="text-sm" style={{ color: '#EF4444' }}>{error}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#FAF7F5' }}>
                Email Administrativo
              </label>
              <div className="relative">
                <Mail 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" 
                  style={{ color: 'rgba(250, 247, 245, 0.4)' }}
                />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 focus:outline-none transition-colors"
                  style={{
                    backgroundColor: '#0A0A0A',
                    borderColor: 'rgba(212, 169, 154, 0.2)',
                    color: '#FAF7F5',
                  }}
                  placeholder="admin@rebecabarreto.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#FAF7F5' }}>
                Contraseña
              </label>
              <div className="relative">
                <Lock 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" 
                  style={{ color: 'rgba(250, 247, 245, 0.4)' }}
                />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 focus:outline-none transition-colors"
                  style={{
                    backgroundColor: '#0A0A0A',
                    borderColor: 'rgba(212, 169, 154, 0.2)',
                    color: '#FAF7F5',
                  }}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ 
                backgroundColor: '#D4A99A',
                color: '#0A0A0A'
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verificando...
                </>
              ) : (
                'Acceder al Panel'
              )}
            </button>
          </form>

          {/* Footer Warning */}
          <div className="mt-8 p-4 rounded-xl" style={{ backgroundColor: 'rgba(212, 169, 154, 0.05)' }}>
            <p className="text-xs text-center" style={{ color: 'rgba(250, 247, 245, 0.5)' }}>
              🔒 Acceso restringido solo para administradores autorizados
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

