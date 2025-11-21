/**
 * Hook para detección de dispositivo
 * Responsabilidad: Detectar si es móvil o desktop
 */

import { useState, useEffect } from 'react'

export function useDeviceDetect(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [breakpoint])

  return isMobile
}

