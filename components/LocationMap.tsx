'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Navigation, ExternalLink } from 'lucide-react'

interface Location {
  id: string
  name: string
  address: string
  city: string
  country: string
  phone: string
  email: string
  hours: string
  mapUrl: string
  coordinates: {
    lat: number
    lng: number
  }
}

// Ubicaciones por defecto - Más adelante se cargarán desde el panel admin
const defaultLocations: Location[] = [
  {
    id: '1',
    name: 'Sede Principal - Ciudad del Este',
    address: 'Av. Pioneros del Este 1234',
    city: 'Ciudad del Este',
    country: 'Paraguay',
    phone: '+595 987 123 456',
    email: 'info@rebecabarreto.com',
    hours: 'Lun-Vie: 9:00-19:00, Sáb: 9:00-14:00',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.8261815544204!2d-54.611572!3d-25.509669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDMwJzM0LjgiUyA1NMKwMzYnNDEuNyJX!5e0!3m2!1ses!2spy!4v1234567890',
    coordinates: { lat: -25.509669, lng: -54.611572 }
  }
]

export default function LocationMap() {
  const [selectedLocation, setSelectedLocation] = useState<Location>(defaultLocations[0])
  const [isMobile, setIsMobile] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const openInMaps = () => {
    const { lat, lng } = selectedLocation.coordinates
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
    window.open(url, '_blank')
  }

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-transparent relative overflow-hidden">
      {/* Fondo animado espectacular */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-gradient-to-br from-primary-300/20 via-primary-400/25 to-primary-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, 100, 0],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-primary-200/25 via-primary-300/20 to-primary-400/25 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.4, 0.7, 0.4],
              x: [0, -80, 0],
              rotate: [0, -90, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header espectacular */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary-200/30 via-primary-300/30 to-primary-400/30 backdrop-blur-sm border-2 border-primary-200/50 rounded-full mb-6"
            animate={{
              boxShadow: [
                '0 0 30px rgba(201,163,71,0.4)',
                '0 0 50px rgba(201,163,71,0.7)',
                '0 0 30px rgba(201,163,71,0.4)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <MapPin className="w-5 h-5 text-primary-500" />
            <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent font-semibold text-sm sm:text-base">
              Visitanos
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            ¿Dónde{' '}
            <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent animate-gradient">
              encontrarnos
            </span>?
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-light text-white max-w-2xl mx-auto">
            Estamos esperándote en nuestra sede. Tu transformación comienza acá.
          </p>
        </motion.div>

        {/* Grid con mapa y detalles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Mapa interactivo espectacular */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              className="relative rounded-3xl overflow-hidden border-4 border-primary-200/40 shadow-2xl"
              whileHover={{ scale: isMobile ? 1 : 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Overlay decorativo */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary-300/20 via-transparent to-primary-400/20 pointer-events-none z-10"
                animate={{
                  opacity: isHovered ? 0.3 : 0,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Mapa */}
              <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px]">
                <iframe
                  src={selectedLocation.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              {/* Botón flotante para abrir en Google Maps */}
              <motion.button
                onClick={openInMaps}
                className="absolute bottom-6 right-6 bg-primary hover:bg-primary-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 font-medium transition-all z-20"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Navigation className="w-4 h-4" />
                <span className="text-sm sm:text-base">Cómo llegar</span>
                <ExternalLink className="w-4 h-4" />
              </motion.button>

              {/* Efecto de brillo en hover */}
              <AnimatePresence>
                {isHovered && !isMobile && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none z-[5]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Indicador de pin animado */}
            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center shadow-xl z-20"
              animate={{
                y: [0, -10, 0],
                boxShadow: [
                  '0 10px 40px rgba(201,163,71,0.4)',
                  '0 20px 60px rgba(201,163,71,0.6)',
                  '0 10px 40px rgba(201,163,71,0.4)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MapPin className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>

          {/* Detalles de ubicación */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center space-y-6"
          >
            {/* Tarjeta de ubicación */}
            <motion.div
              className="bg-cream-50/80 backdrop-blur-sm border-2 border-primary-200/50 rounded-3xl p-6 sm:p-8 shadow-xl"
              whileHover={{ y: -5, boxShadow: '0 20px 60px rgba(201,163,71,0.3)' }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {selectedLocation.name}
              </h3>
              
              <div className="space-y-4">
                {/* Dirección */}
                <motion.div
                  className="flex items-start gap-4 group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-200/30 to-primary-300/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Dirección</p>
                    <p className="text-white/80 leading-relaxed">
                      {selectedLocation.address}<br />
                      {selectedLocation.city}, {selectedLocation.country}
                    </p>
                  </div>
                </motion.div>

                {/* Teléfono */}
                <motion.a
                  href={`tel:${selectedLocation.phone.replace(/\s/g, '')}`}
                  className="flex items-start gap-4 group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-200/30 to-primary-300/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Teléfono</p>
                    <p className="text-white/80 group-hover:text-primary-400 transition-colors">
                      {selectedLocation.phone}
                    </p>
                  </div>
                </motion.a>

                {/* Email */}
                <motion.a
                  href={`mailto:${selectedLocation.email}`}
                  className="flex items-start gap-4 group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-200/30 to-primary-300/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Email</p>
                    <p className="text-white/80 group-hover:text-primary-400 transition-colors">
                      {selectedLocation.email}
                    </p>
                  </div>
                </motion.a>

                {/* Horarios */}
                <motion.div
                  className="flex items-start gap-4 group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-200/30 to-primary-300/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Clock className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Horarios</p>
                    <p className="text-white/80 leading-relaxed">
                      {selectedLocation.hours}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Call to action */}
            <motion.button
              onClick={openInMaps}
              className="w-full bg-gradient-to-r from-primary via-primary-600 to-primary-700 text-white py-4 px-8 rounded-2xl font-semibold text-lg shadow-xl flex items-center justify-center gap-3 group"
              whileHover={{ scale: 1.02, boxShadow: '0 20px 60px rgba(201,163,71,0.4)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Navigation className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
              <span>Obtener Direcciones</span>
              <ExternalLink className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>

        {/* Nota sobre múltiples ubicaciones futuras */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-white/60 text-sm">
            * Próximamente más ubicaciones disponibles para servirte mejor
          </p>
        </motion.div>
      </div>
    </section>
  )
}

