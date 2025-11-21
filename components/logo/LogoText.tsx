'use client'

import { motion } from 'framer-motion'
import { getTextFontSize, type LogoSize } from './logoConfig'

interface LogoTextProps {
  currentSize: LogoSize
  size: 'sm' | 'md' | 'lg' | 'xl'
  textColor: string
  animated: boolean
}

export default function LogoText({ currentSize, size, textColor, animated }: LogoTextProps) {
  return (
    <motion.div
      className="flex flex-col leading-tight"
      initial={animated ? { opacity: 0, x: -10 } : {}}
      animate={animated ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <span 
        className={`font-light tracking-wider ${currentSize.text}`}
        style={{ 
          color: textColor,
          fontFamily: 'var(--font-inter)',
          letterSpacing: '0.1em'
        }}
      >
        REBECA BARRETO
      </span>
      <span 
        className="font-light tracking-widest opacity-80"
        style={{ 
          color: textColor,
          fontSize: getTextFontSize(size),
          fontFamily: 'var(--font-inter)',
          letterSpacing: '0.15em',
          marginTop: '-2px'
        }}
      >
        ESTÉTICA Y BELLEZA
      </span>
    </motion.div>
  )
}

