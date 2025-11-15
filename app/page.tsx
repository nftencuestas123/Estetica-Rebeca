'use client'

import React, { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import PageRenderer from '@/components/pages/PageRenderer'
import { getRootPage, incrementPageViews } from '@/services/pages'

/**
 * =====================================================
 * PÁGINA PRINCIPAL DINÁMICA
 * Renderiza la landing page activa según BD
 * =====================================================
 */

export default function HomeDynamic() {
  const [mounted, setMounted] = useState(false)
  const [templateKey, setTemplateKey] = useState<string | null>(null)
  const [pageId, setPageId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const loadRootPage = async () => {
      try {
        const rootPage = await getRootPage()
        
        if (!rootPage) {
          console.error('No hay página root configurada')
          setError(true)
          setLoading(false)
          return
        }

        setTemplateKey(rootPage.template_key)
        setPageId(rootPage.id)
        
        // Incrementar vistas (fire and forget)
        incrementPageViews(rootPage.id).catch((err) =>
          console.error('Error incrementando vistas:', err)
        )
        
        setLoading(false)
      } catch (err) {
        console.error('Error cargando página root:', err)
        setError(true)
        setLoading(false)
      }
    }

    loadRootPage()
  }, [])

  // Evitar hidratación SSR mismatch
  if (!mounted) {
    return null
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary-400 mx-auto mb-4" />
          <p className="text-white/70">Cargando...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !templateKey) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl font-bold text-red-400 mb-4">Error al cargar la página</h1>
          <p className="text-white/70 mb-8">
            No se pudo cargar la página principal. Por favor, contacta al administrador.
          </p>
          <a
            href="/admin/gestor-paginas"
            className="inline-block px-6 py-3 bg-primary-400 text-black rounded-xl font-semibold hover:bg-primary-500 transition-colors"
          >
            Ir al Panel Admin
          </a>
        </div>
      </div>
    )
  }

  // Render the page
  return <PageRenderer templateKey={templateKey} />
}

