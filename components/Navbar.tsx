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
          {/* Logo Premium Profesional */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
            >
              {/* Logo SVG Profesional */}
              <svg 
                width="48" 
                height="48" 
                viewBox="0 0 100 100" 
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-lg"
              >
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#D4AF37', stopOpacity: 1}} />
                    <stop offset="50%" style={{stopColor: '#FFD700', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#C9A347', stopOpacity: 1}} />
                  </linearGradient>
                  <filter id="shadow">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                  </filter>
                </defs>
                
                {/* Marco exterior elegante */}
                <circle cx="50" cy="50" r="48" fill="url(#goldGradient)" filter="url(#shadow)"/>
                <circle cx="50" cy="50" r="44" fill="#000000" opacity="0.95"/>
                
                {/* Detalles decorativos - Corona superior */}
                <path d="M 45 15 L 50 10 L 55 15 L 52 18 L 50 16 L 48 18 Z" fill="url(#goldGradient)"/>
                
                {/* Letra R artística */}
                <path 
                  d="M 30 35 L 30 70 M 30 35 L 42 35 C 48 35 48 42 48 45 C 48 48 48 50 42 50 L 30 50 M 40 50 L 50 70" 
                  stroke="url(#goldGradient)" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  fill="none"
                />
                
                {/* Letra B artística */}
                <path 
                  d="M 58 35 L 58 70 M 58 35 L 68 35 C 74 35 74 42 74 45 C 74 48 70 50 68 50 L 58 50 M 58 50 L 68 50 C 74 50 74 63 74 67 C 74 70 70 70 68 70 L 58 70" 
                  stroke="url(#goldGradient)" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  fill="none"
                />
                
                {/* Línea decorativa inferior */}
                <line x1="25" y1="80" x2="75" y2="80" stroke="url(#goldGradient)" strokeWidth="1" opacity="0.6"/>
                <circle cx="25" cy="80" r="1.5" fill="url(#goldGradient)"/>
                <circle cx="75" cy="80" r="1.5" fill="url(#goldGradient)"/>
                
                {/* Detalles de brillo */}
                <circle cx="50" cy="50" r="46" fill="none" stroke="#FFD700" strokeWidth="0.5" opacity="0.3"/>
              </svg>
            </motion.div>
            
            {/* Texto premium */}
            <div className="flex flex-col">
              <span className="font-semibold text-lg sm:text-xl text-white tracking-wide">
                Rebeca Barreto
              </span>
              <span className="hidden sm:block text-xs text-white/80 tracking-widest uppercase" style={{letterSpacing: '0.15em'}}>
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



