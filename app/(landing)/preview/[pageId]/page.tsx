'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

const LANDING_PAGES = [
  { id: 'nude-elegance', name: 'Nude Elegance', path: '/nude-elegance' },
  { id: 'soft-beauty', name: 'Soft Beauty', path: '/soft-beauty' },
  { id: 'modern-glow', name: 'Modern Glow', path: '/modern-glow' },
  { id: 'chic-minimal', name: 'Chic Minimal', path: '/chic-minimal' },
  { id: 'pure-essence', name: 'Pure Essence', path: '/pure-essence' },
  { id: 'rose-dream', name: 'Rose Dream', path: '/rose-dream' },
  { id: 'luxury-touch', name: 'Luxury Touch', path: '/luxury-touch' },
  { id: 'natural-beauty', name: 'Natural Beauty', path: '/natural-beauty' },
  { id: 'timeless-grace', name: 'Timeless Grace', path: '/timeless-grace' },
  { id: 'serene-spa', name: 'Serene Spa', path: '/serene-spa' },
]

export default function PreviewPage() {
  const params = useParams()
  const router = useRouter()
  const pageId = params.pageId as string

  const page = LANDING_PAGES.find(p => p.id === pageId)

  if (!page) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">
            Página no encontrada
          </h1>
          <button
            onClick={() => router.push('/dashboard/paginas-inicio')}
            className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-semibold transition-colors"
          >
            Volver a Páginas de Inicio
          </button>
        </div>
      </div>
    )
  }

  // Redirigir a la landing page real
  if (typeof window !== 'undefined') {
    window.location.href = page.path
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-600 font-medium">Cargando vista previa...</p>
      </div>
    </div>
  )
}

