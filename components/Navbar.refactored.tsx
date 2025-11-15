/**
 * Componente principal de Navbar
 * Responsabilidad: Orquestar la barra de navegación
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useScrollDetect } from '@/hooks/useScrollDetect'
import { NAV_LINKS, SCROLL_THRESHOLD } from '@/constants/navigation.constants'
import { Logo } from './navbar/Logo'
import { NavLinks } from './navbar/NavLinks'
import { AuthButtons } from './navbar/AuthButtons'
import { MobileMenu } from './navbar/MobileMenu'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const scrolled = useScrollDetect(SCROLL_THRESHOLD)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-cream-100/95 md:backdrop-blur-xl shadow-lg border-b border-primary-200/60'
            : 'bg-cream-100/80 md:backdrop-blur-md border-b border-primary-100/40'
        } safe-area-top`}
      >
        {/* Efecto de fondo animado */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-200/20 via-primary-300/20 to-primary-400/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-0 right-1/4 w-80 h-80 bg-gradient-to-bl from-primary-200/15 via-primary-300/15 to-primary-400/15 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 40, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <NavLinks links={NAV_LINKS} />
              <AuthButtons user={user} onSignOut={handleSignOut} />
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-cream-200 transition-colors"
            >
              <Menu className="w-6 h-6 text-white" />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={NAV_LINKS}
        user={user}
        onSignOut={handleSignOut}
      />
    </>
  )
}

