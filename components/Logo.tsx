'use client'

import { motion } from 'framer-motion'

interface LogoProps {
  variant?: 'default' | 'white' | 'gradient'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  animated?: boolean
  className?: string
}

export default function Logo({ 
  variant = 'default', 
  size = 'md', 
  showText = true,
  animated = true,
  className = '' 
}: LogoProps) {
  
  const sizes = {
    sm: { icon: 32, text: 'text-sm' },
    md: { icon: 40, text: 'text-base' },
    lg: { icon: 56, text: 'text-xl' },
    xl: { icon: 80, text: 'text-3xl' }
  }

  const currentSize = sizes[size]

  const colorSchemes = {
    default: {
      primary: '#C9A347', // Dorado elegante
      secondary: '#D4AF37', // Oro
      accent: '#F0E68C', // Dorado claro
      text: '#FFFFFF'
    },
    white: {
      primary: '#FFFFFF',
      secondary: '#F5F5F5',
      accent: '#E0E0E0',
      text: '#FFFFFF'
    },
    gradient: {
      primary: 'url(#logoGradient)',
      secondary: 'url(#logoGradient)',
      accent: 'url(#logoGradient)',
      text: '#FFFFFF'
    }
  }

  const colors = colorSchemes[variant]

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon - Emblema RB con elementos de belleza */}
      <motion.svg
        width={currentSize.icon}
        height={currentSize.icon}
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

        {/* Marco circular elegante - Representa perfección y completitud */}
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
        
        {/* Marco circular interno - Detalle de lujo */}
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

        {/* Elemento decorativo superior - Corona minimalista */}
        <motion.path
          d="M 50 10 L 52 18 L 50 16 L 48 18 Z"
          fill={colors.accent}
          initial={animated ? { opacity: 0, y: -5 } : {}}
          animate={animated ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        {/* Letra R estilizada - Elegante y minimalista */}
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

        {/* Letra B estilizada - Simétrica y sofisticada */}
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

        {/* Detalle decorativo inferior - Línea de elegancia */}
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

        {/* Pequeños detalles decorativos - Simetría y balance */}
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

        {/* Detalles de brillo - Elementos de belleza */}
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

      {/* Texto del logo */}
      {showText && (
        <motion.div
          className="flex flex-col leading-tight"
          initial={animated ? { opacity: 0, x: -10 } : {}}
          animate={animated ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <span 
            className={`font-light tracking-wider ${currentSize.text}`}
            style={{ 
              color: colors.text,
              fontFamily: 'var(--font-inter)',
              letterSpacing: '0.1em'
            }}
          >
            REBECA BARRETO
          </span>
          <span 
            className={`font-light tracking-widest opacity-80`}
            style={{ 
              color: colors.text,
              fontSize: size === 'xl' ? '0.9rem' : size === 'lg' ? '0.75rem' : size === 'md' ? '0.65rem' : '0.55rem',
              fontFamily: 'var(--font-inter)',
              letterSpacing: '0.15em',
              marginTop: '-2px'
            }}
          >
            ESTÉTICA Y BELLEZA
          </span>
        </motion.div>
      )}
    </div>
  )
}

