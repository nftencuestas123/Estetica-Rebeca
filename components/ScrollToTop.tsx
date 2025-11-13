'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Prevenir scroll restoration del navegador
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual'
      }
      
      // Forzar scroll al top inmediatamente
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
  }, [])

  useEffect(() => {
    // Scroll al top cuando cambia la ruta - Múltiples intentos para asegurar
    if (typeof window !== 'undefined') {
      const scrollToTop = () => {
        window.scrollTo(0, 0)
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }

      // Ejecutar inmediatamente
      scrollToTop()

      // Ejecutar después del render
      requestAnimationFrame(() => {
        scrollToTop()
        // Ejecutar una vez más después de un pequeño delay
        setTimeout(scrollToTop, 0)
      })
    }
  }, [pathname])

  useEffect(() => {
    // Forzar scroll al top múltiples veces durante la carga inicial
    if (typeof window !== 'undefined') {
      const forceScroll = () => {
        window.scrollTo(0, 0)
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }

      // Ejecutar múltiples veces para asegurar que funcione
      forceScroll()
      requestAnimationFrame(forceScroll)
      setTimeout(forceScroll, 0)
      setTimeout(forceScroll, 10)
      setTimeout(forceScroll, 50)
      setTimeout(forceScroll, 100)
      setTimeout(forceScroll, 200)
      
      // También cuando la página esté completamente cargada
      if (document.readyState === 'complete') {
        forceScroll()
      } else {
        window.addEventListener('load', forceScroll, { once: true })
      }

      // Observer para detectar cambios en el DOM durante la carga inicial
      let observerActive = true
      const observer = new MutationObserver(() => {
        if (observerActive && window.scrollY > 0) {
          forceScroll()
        }
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      })

      // Desactivar observer después de que la página esté cargada
      const deactivateObserver = () => {
        observerActive = false
        observer.disconnect()
      }

      if (document.readyState === 'complete') {
        setTimeout(deactivateObserver, 500)
      } else {
        window.addEventListener('load', () => {
          setTimeout(deactivateObserver, 500)
        }, { once: true })
      }

      return () => {
        observer.disconnect()
        window.removeEventListener('load', forceScroll)
      }
    }
  }, [])

  return null
}

