/**
 * Componente de Logo para Navbar
 * Responsabilidad: Renderizar el logo emblemático de la marca
 */

'use client'

import Link from 'next/link'
import LogoComponent from '@/components/Logo'

export function Logo() {
  return (
    <Link href="/" className="flex items-center group">
      <LogoComponent 
        variant="gradient" 
        size="lg" 
        showText={true}
        animated={true}
      />
    </Link>
  )
}

