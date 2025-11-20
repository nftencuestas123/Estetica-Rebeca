import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

export default function AdminNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-slate-800 rounded-lg shadow-xl p-8 border border-slate-700">
          <div className="flex justify-center mb-6">
            <AlertTriangle className="w-12 h-12 text-yellow-400" />
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-slate-200 mb-4">Página no encontrada</h2>

          <p className="text-slate-400 mb-8">
            La página del panel administrativo que buscas no existe o fue movida.
          </p>

          <Link
            href="/admin"
            className="inline-block px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition"
          >
            Volver al Panel
          </Link>
        </div>
      </div>
    </div>
  )
}

