import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-6xl font-bold text-amber-400 mb-4">404</h1>
        <p className="text-slate-300 mb-6">
          La página que buscas no existe.
        </p>
        <Link
          href="/auth"
          className="inline-block bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold transition"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}

