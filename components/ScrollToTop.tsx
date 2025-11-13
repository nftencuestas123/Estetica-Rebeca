'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Prevenir scroll restoration del navegador
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    // Scroll al top cuando cambia la ruta
    if (typeof window !== 'undefined') {
      // Usar requestAnimationFrame para asegurar que se ejecute después del render
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant', // Instantáneo, no suave
        })
      })
    }
  }, [pathname])

  useEffect(() => {
    // Asegurar que siempre comience desde arriba al cargar la página inicial
    if (typeof window !== 'undefined') {
      // Pequeño delay para asegurar que el DOM esté listo
      const timer = setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant',
        })
      }, 0)

      return () => clearTimeout(timer)
    }
  }, [])

  return null
}

