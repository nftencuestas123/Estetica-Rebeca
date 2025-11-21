/**
 * Componente: User Menu
 * Responsabilidad: Menú de usuario y logout
 */

'use client'

import Link from 'next/link'
import { User, LogOut } from 'lucide-react'

interface UserMenuProps {
  user: any
  onSignOut: () => void
  isMobile?: boolean
}

export default function UserMenu({ user, onSignOut, isMobile }: UserMenuProps) {
  if (!user) {
    return (
      <Link
        href="/login"
        className={`${
          isMobile
            ? 'w-full text-center py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600'
            : 'px-5 py-2.5 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-all shadow-md hover:shadow-lg'
        }`}
      >
        Iniciar Sesión
      </Link>
    )
  }

  return (
    <div className={`${isMobile ? 'flex flex-col gap-3 w-full' : 'flex items-center gap-3'}`}>
      <Link
        href="/dashboard"
        className={`${
          isMobile
            ? 'flex items-center justify-center gap-2 py-3 bg-cream-200 rounded-lg hover:bg-cream-300'
            : 'flex items-center gap-2 px-4 py-2 bg-cream-200 rounded-full hover:bg-cream-300 transition-all'
        }`}
      >
        <User className="w-5 h-5" />
        <span>Mi Cuenta</span>
      </Link>

      <button
        onClick={onSignOut}
        className={`${
          isMobile
            ? 'flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100'
            : 'flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-all'
        }`}
      >
        <LogOut className="w-5 h-5" />
        <span>Salir</span>
      </button>
    </div>
  )
}

