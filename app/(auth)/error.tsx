'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-5xl font-bold text-red-400 mb-4">⚠️ Error</h1>
        <p className="text-slate-300 mb-6">
          Algo salió mal. Por favor intenta de nuevo.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => reset()}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Intentar de nuevo
          </button>
          <Link
            href="/auth"
            className="block w-full bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}

