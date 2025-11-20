'use client'

import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export default function ResetPasswordSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 rounded-lg shadow-xl p-8 border border-slate-700 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">
            ¡Contraseña Restablecida!
          </h1>

          <p className="text-slate-300 mb-6">
            Tu contraseña ha sido cambiada exitosamente.
          </p>

          <div className="bg-slate-700/50 rounded-lg p-6 mb-6">
            <p className="text-slate-300 mb-4">
              📧 Hemos enviado un email de confirmación a tu correo.
            </p>
          </div>

          <p className="text-slate-400 mb-6">
            Ahora puedes iniciar sesión con tu nueva contraseña:
          </p>

          <Link
            href="/login"
            className="inline-block w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition"
          >
            Ir al Login
          </Link>

          <p className="mt-6 text-center text-slate-400 text-sm">
            ¿Necesitas ayuda?{' '}
            <Link href="/" className="text-primary-400 hover:text-primary-300">
              Centro de Ayuda
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

