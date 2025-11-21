/**
 * Hook: Detección de dispositivo móvil
 * Responsabilidad: Detectar si el usuario está en móvil y manejar scroll
 */

import { useState, useEffect } from 'react'

export function useMobileDetect() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return { isMobile }
}

/**
 * Hook: Manejo de scroll en móvil
 * Responsabilidad: Bloquear/desbloquear scroll del body
 */
export function useMobileScrollLock(isActive: boolean, isMobile: boolean) {
  useEffect(() => {
    if (isActive && isMobile) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'

      return () => {
        const scrollY = document.body.style.top
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }
  }, [isActive, isMobile])
}

