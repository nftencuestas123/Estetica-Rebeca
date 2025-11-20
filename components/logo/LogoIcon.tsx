'use client'

import { motion } from 'framer-motion'
import type { ColorScheme } from './logoConfig'

interface LogoIconProps {
  size: number
  colors: ColorScheme
  animated: boolean
}

export default function LogoIcon({ size, colors, animated }: LogoIconProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={animated ? { opacity: 0, scale: 0.8 } : {}}
      animate={animated ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={animated ? { scale: 1.05 } : {}}
    >
      {/* Gradiente para variante gradient */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#C9A347', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#D4AF37', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#F0E68C', stopOpacity: 1 }} />
        </linearGradient>
        
        {/* Filtro de resplandor suave */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Marco circular elegante */}
      <motion.circle
        cx="50"
        cy="50"
        r="46"
        stroke={colors.primary}
        strokeWidth="1.5"
        fill="none"
        initial={animated ? { pathLength: 0, opacity: 0 } : {}}
        animate={animated ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
      
      {/* Marco circular interno */}
      <motion.circle
        cx="50"
        cy="50"
        r="42"
        stroke={colors.secondary}
        strokeWidth="0.5"
        fill="none"
        opacity="0.6"
        initial={animated ? { pathLength: 0, opacity: 0 } : {}}
        animate={animated ? { pathLength: 1, opacity: 0.6 } : {}}
        transition={{ duration: 1.5, delay: 0.2, ease: 'easeInOut' }}
      />

      {/* Corona minimalista */}
      <motion.path
        d="M 50 10 L 52 18 L 50 16 L 48 18 Z"
        fill={colors.accent}
        initial={animated ? { opacity: 0, y: -5 } : {}}
        animate={animated ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
      />

      {/* Letra R estilizada */}
      <motion.path
        d="M 30 35 L 30 65 M 30 35 L 40 35 Q 48 35 48 42 Q 48 49 40 49 L 30 49 M 40 49 L 48 65"
        stroke={colors.primary}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#glow)"
        initial={animated ? { pathLength: 0, opacity: 0 } : {}}
        animate={animated ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.6, ease: 'easeInOut' }}
      />

      {/* Letra B estilizada */}
      <motion.path
        d="M 55 35 L 55 65 M 55 35 L 65 35 Q 72 35 72 42 Q 72 46.5 67 48 Q 72 49.5 72 54 Q 72 65 65 65 L 55 65"
        stroke={colors.primary}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#glow)"
        initial={animated ? { pathLength: 0, opacity: 0 } : {}}
        animate={animated ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.8, ease: 'easeInOut' }}
      />

      {/* Línea de elegancia inferior */}
      <motion.line
        x1="35"
        y1="72"
        x2="65"
        y2="72"
        stroke={colors.secondary}
        strokeWidth="0.5"
        strokeLinecap="round"
        initial={animated ? { pathLength: 0, opacity: 0 } : {}}
        animate={animated ? { pathLength: 1, opacity: 0.8 } : {}}
        transition={{ duration: 0.8, delay: 1 }}
      />

      {/* Detalles decorativos */}
      <motion.circle
        cx="35"
        cy="72"
        r="1"
        fill={colors.accent}
        initial={animated ? { scale: 0, opacity: 0 } : {}}
        animate={animated ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.2 }}
      />
      <motion.circle
        cx="65"
        cy="72"
        r="1"
        fill={colors.accent}
        initial={animated ? { scale: 0, opacity: 0 } : {}}
        animate={animated ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.2 }}
      />

      {/* Detalles de brillo */}
      <motion.path
        d="M 25 30 L 26 28 L 27 30 M 26 28 L 26 26"
        stroke={colors.accent}
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.7"
        initial={animated ? { opacity: 0, scale: 0 } : {}}
        animate={animated ? { opacity: 0.7, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.3 }}
      />
      <motion.path
        d="M 75 70 L 76 68 L 77 70 M 76 68 L 76 66"
        stroke={colors.accent}
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.7"
        initial={animated ? { opacity: 0, scale: 0 } : {}}
        animate={animated ? { opacity: 0.7, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.4 }}
      />
    </motion.svg>
  )
}

