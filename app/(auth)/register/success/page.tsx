'use client'

import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function RegisterSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 rounded-lg shadow-xl p-8 border border-green-500/30 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>

          <h1 className="text-2xl font-bold text-white mb-4">
            ¡Registro Exitoso!
          </h1>

          <p className="text-slate-300 mb-8">
            Tu cuenta ha sido creada correctamente. Ya puedes iniciar sesión.
          </p>

          <Link
            href="/client/login"
            className="block w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition"
          >
            Ir a Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  )
}

