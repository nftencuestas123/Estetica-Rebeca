'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Shield } from 'lucide-react'

export default function AdminRegisterPage() {
  const [step, setStep] = useState<'questions' | 'form'>('questions')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [answers, setAnswers] = useState({ answer1: '', answer2: '', answer3: '' })
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value,
    })
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleVerifyAnswers = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/verify-admin-gate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Respuestas incorrectas')
        return
      }

      setStep('form')
    } catch (err) {
      setError('Error al verificar respuestas')
    } finally {
      setLoading(false)
    }
  }

  const handleRegisterAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/register-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Error al registrarse')
        return
      }

      // Redirigir a pending-verification con email y tipo
      const email = encodeURIComponent(formData.email)
      window.location.href = `/register/pending-verification?email=${email}&type=admin`
    } catch (err) {
      setError('Error al procesar el registro')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'questions') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-500/20 rounded-full mb-4">
              <Shield className="w-6 h-6 text-amber-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Verificación de Identidad</h1>
            <p className="text-slate-400">Solo admins autorizados</p>
          </div>

          {/* Form Card */}
          <div className="bg-slate-800 rounded-lg shadow-xl p-8 border border-amber-500/30">
            <div className="mb-6 p-4 bg-amber-900/20 border border-amber-500/50 rounded-lg">
              <p className="text-amber-200 text-sm">
                🔒 Debes responder 3 preguntas de seguridad para continuar
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleVerifyAnswers} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  ❓ Pregunta 1: ¿Cuál es el Nombre completo de tu hijo?
                </label>
                <input
                  type="text"
                  name="answer1"
                  value={answers.answer1}
                  onChange={handleAnswerChange}
                  required
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition"
                  placeholder="Tu respuesta"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  ❓ Pregunta 2: Fecha, mes y año de nacimiento de tu hijo
                </label>
                <input
                  type="text"
                  name="answer2"
                  value={answers.answer2}
                  onChange={handleAnswerChange}
                  required
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition"
                  placeholder="DD/MM/YYYY"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  ❓ Pregunta 3: Tu escuela primaria
                </label>
                <input
                  type="text"
                  name="answer3"
                  value={answers.answer3}
                  onChange={handleAnswerChange}
                  required
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition"
                  placeholder="Tu respuesta"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '⏳ Verificando...' : '✓ Verificar Respuestas'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-600">
              <p className="text-center text-slate-400 text-xs mb-4">
                ❌ Si no conoces las respuestas, no puedes registrarte como administrador
              </p>
              <Link
                href="/client/login"
                className="block text-center text-slate-400 hover:text-slate-300 text-sm transition"
              >
                ← Volver
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-full mb-4">
            <Shield className="w-6 h-6 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">✅ Verificado</h1>
          <p className="text-slate-400">Completa tu registro como administrador</p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-800 rounded-lg shadow-xl p-8 border border-slate-700">
          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleRegisterAdmin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                👤 Nombre Completo
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition"
                placeholder="Tu nombre completo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                📧 Email Admin
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition"
                placeholder="admin@email.com"
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
                onChange={handleFormChange}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition"
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
                onChange={handleFormChange}
                required
                minLength={8}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition"
                placeholder="Mínimo 8 caracteres"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                ✓ Confirmar Contraseña
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition"
                placeholder="Confirma tu contraseña"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ Registrando...' : '✓ Crear Cuenta Admin'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-600">
            <button
              onClick={() => {
                setStep('questions')
                setAnswers({ answer1: '', answer2: '', answer3: '' })
              }}
              className="block w-full text-center text-slate-400 hover:text-slate-300 text-sm transition"
            >
              ← Volver a preguntas
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

