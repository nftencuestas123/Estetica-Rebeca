/**
 * Componente de enlaces de navegación
 * Responsabilidad: Renderizar enlaces de navegación con animaciones
 */

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { NavLink } from '@/types/navigation.types'

interface NavLinksProps {
  links: NavLink[]
}

export function NavLinks({ links }: NavLinksProps) {
  return (
    <div className="hidden lg:flex items-center gap-4 xl:gap-8">
      {links.map((link, index) => (
        <motion.div
          key={link.href}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.2 }}
        >
          <Link href={link.href} className="relative group text-primary-200 font-medium text-sm">
            <motion.span whileHover={{ y: -2 }} className="relative z-10">
              {link.label}
            </motion.span>
            {/* Línea animada debajo */}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600"
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
            {/* Efecto de brillo al hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary-200/20 via-primary-300/20 to-primary-400/20 rounded-lg opacity-0 group-hover:opacity-100 blur-sm"
              transition={{ duration: 0.3 }}
            />
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

