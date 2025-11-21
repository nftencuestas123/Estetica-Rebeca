'use client'

import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function AdminError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Admin Error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-slate-800 rounded-lg shadow-xl p-8 border border-red-700">
          <div className="flex justify-center mb-6">
            <AlertTriangle className="w-12 h-12 text-red-400" />
          </div>
          
          <h1 className="text-3xl font-bold text-red-400 mb-4">¡Algo salió mal!</h1>
          
          <p className="text-slate-300 mb-6">
            {error.message || 'Ha ocurrido un error inesperado en el panel administrativo.'}
          </p>

          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 mb-6 text-left">
            <p className="text-red-200 text-sm font-mono break-all">
              {error.digest && `Código: ${error.digest}`}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => window.location.href = '/admin'}
              className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition"
            >
              Recargar
            </button>
            <button
              onClick={reset}
              className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

