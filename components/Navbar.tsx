'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { User, LogOut, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  const navLinks = [
    { href: '/tratamientos', label: 'Tratamientos' },
    { href: '/sedes', label: 'Sedes' },
    { href: '/blog', label: 'Blog' },
    { href: '/contacto', label: 'Contacto' },
  ]

  return (
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
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-0 right-1/4 w-80 h-80 bg-gradient-to-bl from-primary-200/20 via-primary-300/20 to-primary-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Elegante y Profesional */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              className="relative w-14 h-14"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Círculo exterior dorado con gradiente */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 shadow-xl"></div>
              
              {/* Círculo interior negro */}
              <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-neutral-900 to-black"></div>
              
              {/* Letras RB estilizadas */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <span className="text-2xl font-serif font-bold bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent" style={{
                    fontFamily: 'Georgia, serif',
                    textShadow: '0 0 20px rgba(251, 191, 36, 0.5)'
                  }}>
                    RB
                  </span>
                </div>
              </div>
              
              {/* Corona decorativa superior */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                <div className="text-amber-400 text-xs">♕</div>
              </div>
              
              {/* Brillo animado */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Resplandor al hover */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-amber-400/30 blur-xl"></div>
            </motion.div>
            
            {/* Texto elegante */}
            <div className="flex flex-col">
              <span className="font-bold text-lg sm:text-xl text-white tracking-wide" style={{
                fontFamily: 'Georgia, serif'
              }}>
                Rebeca Barreto
              </span>
              <span className="hidden sm:block text-[10px] text-white/70 tracking-[0.2em] uppercase font-light">
                Estética y Belleza
              </span>
            </div>
          </Link>

          {/* Desktop Menu - Dinámico */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <Link
                  href={link.href}
                  className="relative group text-white font-medium text-sm"
                >
                  <motion.span
                    whileHover={{ y: -2 }}
                    className="relative z-10"
                  >
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
                    className="absolute inset-0 bg-gradient-to-r from-primary-300/20 via-primary-400/20 to-primary-500/20 rounded-lg opacity-0 group-hover:opacity-100 blur-sm"
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}

            {user ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-4 ml-6 pl-6 border-l border-primary-200/50"
              >
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-white hover:text-white transition-colors group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="p-2 rounded-lg bg-cream-100 group-hover:bg-cream-200 transition-colors"
                  >
                    <User className="w-4 h-4" />
                  </motion.div>
                  <span className="font-medium">Mi Panel</span>
                </Link>
                <motion.button
                  onClick={handleSignOut}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 text-white hover:text-white transition-colors rounded-lg hover:bg-cream-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-medium">Salir</span>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-3 ml-6 pl-6 border-l border-primary-200/50"
              >
                <Link
                  href="/login"
                  className="text-white hover:text-white transition-colors font-medium"
                >
                  Iniciar Sesión
                </Link>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/register"
                  className="px-4 py-2.5 sm:px-5 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white rounded-full font-semibold hover:shadow-lg transition-all shadow-md text-sm sm:text-base"
                >
                  Registrarse
                </Link>
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white relative z-50"
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu - Animado */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden py-6 border-t border-primary-200/50"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="text-white hover:text-white transition-colors font-medium py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                {user ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 text-white hover:text-white transition-colors py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <User className="w-5 h-5" />
                        <span className="font-medium">Mi Panel</span>
                      </Link>
                    </motion.div>
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      onClick={() => {
                        handleSignOut()
                        setMobileMenuOpen(false)
                      }}
                      className="flex items-center gap-2 text-white hover:text-white transition-colors text-left py-2"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Salir</span>
                    </motion.button>
                  </>
                ) : (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Link
                        href="/login"
                        className="text-white hover:text-white transition-colors font-medium py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Iniciar Sesión
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Link
                        href="/register"
                        className="block px-4 py-2.5 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white rounded-full font-semibold text-center shadow-md"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Registrarse
                      </Link>
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}



