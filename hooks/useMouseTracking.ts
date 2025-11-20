/**
 * Hook para tracking del mouse
 * Responsabilidad: Detectar y trackear posici├│n del mouse
 */

import { useState, useEffect } from 'react'

interface MousePosition {
  x: number
  y: number
}

export function useMouseTracking(enabled: boolean = true): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    if (!enabled) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [enabled])

  return mousePosition
}

