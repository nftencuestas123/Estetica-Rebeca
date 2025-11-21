/**
 * Hook para detectar scroll
 * Responsabilidad: Detectar posici├│n de scroll de la ventana
 */

import { useState, useEffect } from 'react'

export function useScrollDetect(threshold: number = 20): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrolled
}

