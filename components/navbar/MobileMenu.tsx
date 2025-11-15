/**
 * Componente de menú móvil
 * Responsabilidad: Renderizar menú de navegación para dispositivos móviles
 */

'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, LogOut } from 'lucide-react'
import type { NavLink } from '@/types/navigation.types'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  links: NavLink[]
  user: any
  onSignOut: () => Promise<void>
}

export function MobileMenu({ isOpen, onClose, links, user, onSignOut }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-cream-100/95 backdrop-blur-md z-40 lg:hidden"
          />

          {/* Menu */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-80 bg-cream-50 shadow-2xl z-50 lg:hidden border-l-2 border-primary-200/50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-primary-200/50">
              <h3 className="text-xl font-bold text-white">Menú</h3>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-cream-200 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>
            </div>

            {/* Links */}
            <div className="flex flex-col p-6 space-y-4">
              {links.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block py-3 px-4 text-white hover:text-primary-400 hover:bg-cream-200 rounded-lg transition-all font-medium"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Divider */}
              <div className="border-t border-primary-200/50 my-4" />

              {/* Auth buttons */}
              {user ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: links.length * 0.1 }}
                  >
                    <Link
                      href="/dashboard"
                      onClick={onClose}
                      className="flex items-center gap-3 py-3 px-4 text-white hover:text-primary-400 hover:bg-cream-200 rounded-lg transition-all font-medium"
                    >
                      <User className="w-5 h-5" />
                      Mi Panel
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (links.length + 1) * 0.1 }}
                  >
                    <button
                      onClick={() => {
                        onSignOut()
                        onClose()
                      }}
                      className="flex items-center gap-3 w-full py-3 px-4 text-white hover:text-primary-500 hover:bg-cream-200 rounded-lg transition-all font-medium"
                    >
                      <LogOut className="w-5 h-5" />
                      Cerrar Sesión
                    </button>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: links.length * 0.1 }}
                  >
                    <Link
                      href="/login"
                      onClick={onClose}
                      className="block py-3 px-4 text-center text-white hover:text-primary-400 hover:bg-cream-200 rounded-lg transition-all font-medium"
                    >
                      Iniciar Sesión
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (links.length + 1) * 0.1 }}
                  >
                    <Link
                      href="/register"
                      onClick={onClose}
                      className="block py-3 px-4 text-center bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 text-transparent rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                      Registrarse
                    </Link>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

