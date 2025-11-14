/**
 * Componente de Logo
 * Responsabilidad: Renderizar el logo animado de la marca
 */

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <motion.div
        className="relative"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative w-16 h-16">
          {/* Fondo circular con gradiente animado */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-300 via-primary-500 to-primary-700"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              rotate: [0, 360],
            }}
            transition={{
              backgroundPosition: { duration: 4, repeat: Infinity, ease: 'linear' },
              rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          />

          {/* Símbolo elegante de belleza - Flor estilizada */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-10"
            >
              {/* Pétalos elegantes */}
              {[0, 72, 144, 216, 288].map((rotation, i) => (
                <motion.ellipse
                  key={i}
                  cx="18"
                  cy="18"
                  rx="6"
                  ry="10"
                  fill="white"
                  opacity="0.95"
                  transform={`rotate(${rotation} 18 18)`}
                  transformOrigin="18 18"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.1, 1],
                    opacity: [0, 0.95, 0.95],
                    rotate: [rotation, rotation + 360],
                  }}
                  transition={{
                    scale: { duration: 0.8, delay: i * 0.1 },
                    opacity: { duration: 0.8, delay: i * 0.1 },
                    rotate: { duration: 15, repeat: Infinity, ease: 'linear', delay: i * 0.2 },
                  }}
                />
              ))}

              {/* Centro dorado pulsante */}
              <motion.circle
                cx="18"
                cy="18"
                r="4"
                fill="#FFD700"
                initial={{ scale: 0 }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.9, 1, 0.9],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Brillo central */}
              <motion.circle
                cx="18"
                cy="18"
                r="2"
                fill="white"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </svg>
          </div>

          {/* Anillos decorativos concéntricos */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent/30"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border border-primary-300/40"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          />

          {/* Brillo rotatorio exterior */}
          <motion.div
            className="absolute -inset-2 rounded-full bg-gradient-to-tr from-transparent/20 via-transparent to-transparent"
            animate={{
              rotate: [0, 360],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />

          {/* Efecto de resplandor al hover */}
          <motion.div
            className="absolute -inset-3 rounded-full bg-gradient-to-r from-primary-200/30 via-primary-300/30 to-primary-400/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Partículas decorativas */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-400 rounded-full"
            style={{
              top: `${20 + i * 15}%`,
              left: `${80 + i * 10}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>

      {/* Nombre con efecto gradiente */}
      <div className="flex flex-col">
        <motion.span
          className="font-bold text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-primary-400 via-primary-500 to-primary-400 bg-clip-text text-transparent"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundSize: '200% 200%',
          }}
        >
          Rebeca Barreto
        </motion.span>
        <motion.span
          className="hidden sm:block text-xs font-light text-primary-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Estética y Belleza
        </motion.span>
      </div>
    </Link>
  )
}

