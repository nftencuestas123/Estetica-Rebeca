'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Key } from 'lucide-react'

export default function AdminForgotPasswordPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Error al procesar solicitud')
        return
      }

      setSent(true)
    } catch (err) {
      setError('Error al procesar la solicitud')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-full mb-4">
              <Key className="w-6 h-6 text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">📧 Email Enviado</h1>
            <p className="text-slate-400">Revisa tu bandeja de entrada</p>
          </div>

          <div className="bg-slate-800 rounded-lg shadow-xl p-8 border border-slate-700 space-y-6">
            <div className="p-4 bg-green-900/20 border border-green-500/50 rounded-lg text-green-200 text-center">
              <p className="mb-2">✓ Hemos enviado un enlace a:</p>
              <p className="font-semibold">{email}</p>
            </div>

            <div className="space-y-2 text-slate-300 text-sm">
              <p>📋 <strong>Próximos pasos:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>Abre el email que enviamos</li>
                <li>Haz clic en el enlace de restauración</li>
                <li>Sigue las instrucciones para crear una nueva contraseña</li>
              </ul>
            </div>

            <Link
              href="/admin/login"
              className="block w-full text-center bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              ← Volver al Login Admin
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-500/20 rounded-full mb-4">
            <Key className="w-6 h-6 text-amber-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">¿Olvidaste tu Contraseña Admin?</h1>
          <p className="text-slate-400">Te ayudaremos a restaurarla</p>
        </div>

        <div className="bg-slate-800 rounded-lg shadow-xl p-8 border border-amber-500/30">
          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                📧 Ingresa tu Email Admin
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition"
                placeholder="admin@email.com"
              />
              <p className="text-xs text-slate-400 mt-1">
                Te enviaremos un enlace para restaurar tu contraseña
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ Enviando...' : '✉️ Enviar Enlace'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-600">
            <Link
              href="/admin/login"
              className="block text-center text-slate-400 hover:text-slate-300 text-sm transition"
            >
              ← Volver al Login Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

