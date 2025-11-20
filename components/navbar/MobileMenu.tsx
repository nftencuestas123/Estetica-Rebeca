/**
 * Componente: Mobile Menu
 * Responsabilidad: Menú móvil desplegable
 */

'use client'

import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import NavLinks from './NavLinks'
import UserMenu from './UserMenu'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  user: any
  onSignOut: () => void
}

export default function MobileMenu({ isOpen, onClose, user, onSignOut }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed right-0 top-0 bottom-0 w-80 bg-cream-50 z-50 shadow-2xl md:hidden"
          >
            <div className="p-6">
              <button
                onClick={onClose}
                className="ml-auto flex items-center justify-center w-10 h-10 rounded-full bg-cream-200 hover:bg-cream-300 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mt-8 space-y-4">
                <NavLinks
                  className="block py-3 text-lg font-medium text-gray-800 hover:text-primary-600 hover:bg-cream-100 rounded-lg px-4 transition-colors"
                  onClick={onClose}
                />

                <div className="pt-6 border-t border-cream-200">
                  <UserMenu user={user} onSignOut={onSignOut} isMobile />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
