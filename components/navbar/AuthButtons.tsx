/**
 * Componente de botones de autenticación
 * Responsabilidad: Renderizar botones de login/registro o perfil de usuario
 */

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { User, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface AuthButtonsProps {
  user: any
  onSignOut: () => Promise<void>
}

export function AuthButtons({ user, onSignOut }: AuthButtonsProps) {
  const router = useRouter()

  const handleSignOut = async () => {
    await onSignOut()
    router.push('/')
  }

  if (user) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="flex items-center gap-4 ml-6 pl-6 border-l border-primary-200/50"
      >
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-white hover:text-primary-400 transition-colors group"
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
          className="flex items-center gap-2 px-4 py-2 text-white hover:text-primary-500 transition-colors rounded-lg hover:bg-cream-200"
        >
          <LogOut className="w-4 h-4" />
          <span className="font-medium">Salir</span>
        </motion.button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 }}
      className="flex items-center gap-3 ml-6 pl-6 border-l border-primary-200/50"
    >
      <Link
        href="/login"
        className="text-white hover:text-primary-400 transition-colors font-medium"
      >
        Iniciar Sesión
      </Link>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          href="/register"
          className="px-4 py-2.5 sm:px-5 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 text-transparent rounded-full font-semibold hover:shadow-lg transition-all shadow-md text-sm sm:text-base"
        >
          Registrarse
        </Link>
      </motion.div>
    </motion.div>
  )
}

