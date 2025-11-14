/**
 * Componente de botón reutilizable
 * Responsabilidad: Renderizar botones con variantes consistentes
 */

'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  icon?: ReactNode
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  disabled = false,
  type = 'button',
  icon,
}: ButtonProps) {
  const baseClasses = 'font-semibold rounded-xl transition-all flex items-center justify-center gap-2'

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 text-primary-100 hover:shadow-lg',
    secondary: 'bg-cream-200 text-primary-200 hover:bg-cream-300',
    outline:
      'bg-transparent border-2 border-primary-200 text-primary-200 hover:bg-cream-200 hover:border-primary-400',
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const widthClass = fullWidth ? 'w-full' : ''

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {icon && icon}
      {children}
    </motion.button>
  )
}

