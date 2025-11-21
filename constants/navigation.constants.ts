/**
 * Constantes de navegación
 * Responsabilidad: Almacenar enlaces y rutas de navegación
 */

import type { NavLink } from '@/types/navigation.types'

export const NAV_LINKS: NavLink[] = [
  { href: '/tratamientos', label: 'Tratamientos' },
  { href: '/sedes', label: 'Sedes' },
  { href: '/blog', label: 'Blog' },
  { href: '/contacto', label: 'Contacto' },
]

export const SCROLL_THRESHOLD = 20 // px para activar navbar scrolled

