/**
 * Componente: Navigation Links
 * Responsabilidad: Renderizar links de navegación
 */

import Link from 'next/link'

const NAV_LINKS = [
  { href: '/dashboard/paginas-inicio', label: 'Páginas de Inicio' },
  { href: '/dashboard/videos', label: 'Videos' },
  { href: '/dashboard/creditos', label: 'Créditos' },
  { href: '/dashboard/perfil', label: 'Perfil' },
]

interface NavLinksProps {
  className?: string
  onClick?: () => void
}

export default function NavLinks({ className, onClick }: NavLinksProps) {
  return (
    <>
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={className}
          onClick={onClick}
        >
          {link.label}
        </Link>
      ))}
    </>
  )
}
