/**
 * Componente: Navbar (REFACTORIZADO CON SRP)
 * Responsabilidad: Solo orquestación de la barra de navegación
 */

'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useMobileDetect } from '@/hooks/useMobileDetect'
import NavLinks from './navbar/NavLinks'
import UserMenu from './navbar/UserMenu'
import MobileMenu from './navbar/MobileMenu'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const { isMobile } = useMobileDetect()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    setMobileMenuOpen(false)
    router.push('/')
  }

  return (
    <>
      <motion.nav
        initial={isMobile ? {} : { y: -100 }}
        animate={isMobile ? {} : { y: 0 }}
        transition={isMobile ? {} : { duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 ${
          isMobile ? '' : 'transition-all duration-300'
        } ${
          scrolled
            ? 'bg-cream-100/95 md:backdrop-blur-xl shadow-lg border-b border-primary-200/60'
            : 'bg-cream-100/80 md:backdrop-blur-md border-b border-primary-100/40'
        } safe-area-top`}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent hover:scale-105 transition-transform"
            >
              Estética Rebeca
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <NavLinks className="text-gray-700 hover:text-primary-600 font-medium transition-colors" />
            </div>

            {/* Desktop User Menu */}
            <div className="hidden md:block">
              <UserMenu user={user} onSignOut={handleSignOut} />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-cream-200 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        user={user}
        onSignOut={handleSignOut}
      />
    </>
  )
}
