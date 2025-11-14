'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import PremiumHero from '@/components/PremiumHero'
import PreLaunchSection from '@/components/PreLaunchSection'
import RebecaSection from '@/components/RebecaSection'
import StorytellingSection from '@/components/StorytellingSection'
import PremiumTestimonials from '@/components/PremiumTestimonials'
import SofiaSection from '@/components/SofiaSection'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <main className="relative min-h-screen bg-transparent dynamic-stellar">
      <Navbar />
      <div className="pt-16 sm:pt-20">
        {/* 1. Hero - Entrada con headlines */}
        <PremiumHero />

        {/* 2. Pre-Lanzamiento App - Descarga de aplicación */}
        <PreLaunchSection />

        {/* 3. Rebeca Barreto - Quién es y su experiencia */}
        <RebecaSection />

        {/* 4. ¿Qué buscás? - Categorías de tratamientos */}
        <section className="py-16 sm:py-24 md:py-32 bg-transparent relative overflow-hidden">
        {/* Animaciones de fondo deshabilitadas en móvil para mejor performance */}
        {!isMobile && (
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-200/30 via-primary-300/30 to-primary-400/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 0.7, 0.4],
                x: [0, 50, -30, 0],
                y: [0, -50, 30, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-l from-primary-200/30 via-primary-300/30 to-primary-400/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
                x: [0, -40, 20, 0],
                y: [0, 40, -20, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        )}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-block px-6 py-3 bg-gradient-to-r from-primary-200/30 via-primary-300/30 to-primary-400/30 backdrop-blur-sm border-2 border-primary-200/50 rounded-full text-sm font-medium mb-6"
              animate={!isMobile ? {
                boxShadow: [
                  '0 0 25px rgba(201,163,71,0.35)',
                  '0 0 45px rgba(201,163,71,0.55)',
                  '0 0 25px rgba(201,163,71,0.35)',
                ],
              } : {}}
              transition={!isMobile ? { duration: 3, repeat: Infinity } : {}}
            >
              <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent font-semibold">
                Tratamientos Personalizados
              </span>
            </motion.div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              ¿Qué{' '}
              <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent animate-gradient">
                buscás
              </span>?
            </h2>
            <p className="text-base sm:text-lg md:text-xl font-light text-white max-w-2xl mx-auto px-4">
              Cada tratamiento está diseñado pensando en vos y en tus necesidades únicas
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                name: 'Tratamientos Faciales', 
                description: 'Renovación y cuidado profundo de tu piel',
                gradient: 'from-primary-100/30 to-cream-100/20',
                image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80'
              },
              { 
                name: 'Anti-Aging', 
                description: 'Recuperá la juventud que sentís perdida',
                gradient: 'from-primary-100/25 to-primary-200/25',
                image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80'
              },
              { 
                name: 'Tratamientos Corporales', 
                description: 'Moldeá y cuida tu cuerpo con amor',
                gradient: 'from-primary-100/30 to-primary-200/20',
                image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80'
              },
              { 
                name: 'Depilación Láser', 
                description: 'Libertad y suavidad duradera',
                gradient: 'from-cream-100/40 to-primary-100/30',
                image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80'
              },
              { 
                name: 'Tratamientos Capilares', 
                description: 'Cabello saludable y brillante',
                gradient: 'from-primary-100/20 to-primary-200/30',
                image: 'https://images.unsplash.com/photo-1560869713-7d5633c5db33?auto=format&fit=crop&w=900&q=80'
              },
              { 
                name: 'Consultas Personalizadas', 
                description: 'Encontrá el tratamiento perfecto para vos',
                gradient: 'from-cream-100/25 to-primary-100/20',
                image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80'
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={`/tratamientos?categoria=${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group block h-full p-8 bg-cream-100/80 backdrop-blur-sm rounded-2xl border-2 border-primary-200/60 hover:border-primary-400 hover:shadow-2xl transition-all relative overflow-hidden"
                  >
                    <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/45 via-primary-900/15 to-transparent" />
                    </div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary-200/20 via-primary-300/20 to-primary-400/20 opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                      }}
                      transition={{ duration: 5, repeat: Infinity }}
                    />
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} mb-6 flex items-center justify-center relative z-10`}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      animate={{
                        boxShadow: [
                          '0 0 20px rgba(201,163,71,0.35)',
                          '0 0 40px rgba(201,163,71,0.55)',
                          '0 0 20px rgba(201,163,71,0.35)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="w-8 h-8 bg-cream-100/50 rounded-lg backdrop-blur-sm" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-3 relative z-10 group-hover:bg-gradient-to-r group-hover:from-primary-400 group-hover:to-primary-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                      {category.name}
                    </h3>
                    <p className="text-white font-medium leading-relaxed relative z-10">
                      {category.description}
                    </p>
                    <motion.div
                      className="mt-6 text-white text-sm font-bold relative z-10"
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                    >
                      Explorar →
                    </motion.div>
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Tratamientos Destacados - Los más elegidos */}
      <section className="py-16 sm:py-24 md:py-32 bg-transparent relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-tl from-primary-200/30 via-primary-300/25 to-primary-400/25 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.4, 0.7, 0.4],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gradient-to-r from-primary-200/25 via-primary-300/25 to-primary-400/25 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, 100, -50, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-block px-6 py-3 bg-gradient-to-r from-primary-200/30 via-primary-300/30 to-primary-400/30 backdrop-blur-sm border-2 border-primary-200/50 rounded-full text-sm font-bold mb-6"
              animate={{
                boxShadow: [
                  '0 0 30px rgba(255,215,0,0.4)',
                  '0 0 50px rgba(255,215,0,0.7)',
                  '0 0 30px rgba(255,215,0,0.4)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                Los Más Elegidos
              </span>
            </motion.div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Tratamientos{' '}
              <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent animate-gradient">
                destacados
              </span>
            </h2>
            <p className="text-xl font-light text-white">
              Los tratamientos que más transforman vidas
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                nombre: 'Botox',
                descripcion: 'Suaviza arrugas y líneas de expresión de forma natural',
                precio: 200,
                popular: true,
                imagen: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80',
              },
              {
                nombre: 'Rellenos de Ácido Hialurónico',
                descripcion: 'Aumento de volumen y definición con resultados naturales',
                precio: 350,
                popular: true,
                imagen: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=1000&q=80',
              },
              {
                nombre: 'HIFU Facial',
                descripcion: 'Lifting sin cirugía, recuperá la firmeza de tu piel',
                precio: 450,
                popular: false,
                imagen: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80',
              },
              {
                nombre: 'Limpieza Facial Profunda',
                descripcion: 'Renovación y cuidado profundo de tu piel',
                precio: 80,
                popular: false,
                imagen: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80',
              },
              {
                nombre: 'Mesoterapia',
                descripcion: 'Hidratación y nutrición profunda para una piel radiante',
                precio: 120,
                popular: false,
                imagen: 'https://images.unsplash.com/photo-1501290838151-8221aacb4c33?auto=format&fit=crop&w=1000&q=80',
              },
              {
                nombre: 'Plan Anti-Aging Completo',
                descripcion: 'Transformación integral con múltiples tratamientos',
                precio: 800,
                popular: true,
                imagen: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80',
              },
            ].map((tratamiento, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/tratamientos/${tratamiento.nombre.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group block h-full bg-cream-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-primary-100"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={tratamiento.imagen}
                      alt={tratamiento.nombre}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-primary-900/15 to-transparent" />
                    {tratamiento.popular && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-white rounded-full text-xs font-light">
                        Más Popular
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-light text-white mb-3 group-hover:text-primary transition-colors">
                      {tratamiento.nombre}
                    </h3>
                    <p className="text-white mb-6 font-light leading-relaxed">
                      {tratamiento.descripcion}
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-primary-100">
                      <span className="text-3xl font-light text-primary">
                        ${tratamiento.precio}
                        <span className="text-lg text-white"> USD</span>
                      </span>
                      <span className="text-primary text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity">
                        Ver más →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link
              href="/tratamientos"
              className="inline-block px-10 py-5 bg-gradient-to-r from-primary via-primary-700 to-primary text-white rounded-full font-light text-lg hover:shadow-xl transition-all"
            >
              Ver Todos los Tratamientos
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 6. Testimonios Premium - Prueba social */}
      <PremiumTestimonials />

      {/* 7. Storytelling - Historia emocional */}
      <StorytellingSection />

      {/* 8. Sofía - Atención al Cliente (Chat al final para contacto) */}
      <SofiaSection />

      {/* 9. Footer Premium */}
      <footer className="bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="font-light text-2xl mb-4 text-primary">Rebeca Barreto</h3>
              <p className="text-white text-sm font-light leading-relaxed">
                Tu belleza auténtica, elevada. Transformando vidas desde 2010.
              </p>
            </div>
            <div>
              <h4 className="font-light mb-6">Enlaces</h4>
              <ul className="space-y-3 text-sm text-white font-light">
                <li>
                  <Link href="/tratamientos" className="hover:text-primary transition-colors">
                    Tratamientos
                  </Link>
                </li>
                <li>
                  <Link href="/sedes" className="hover:text-primary transition-colors">
                    Sedes
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="hover:text-primary transition-colors">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-light mb-6">Contacto</h4>
              <ul className="space-y-3 text-sm text-white font-light">
                <li>Ciudad del Este, Paraguay</li>
                <li>+595 987 123 456</li>
                <li>info@rebecabarreto.com</li>
              </ul>
            </div>
            <div>
              <h4 className="font-light mb-6">Seguinos</h4>
              <ul className="space-y-3 text-sm text-white font-light">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    WhatsApp
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-700 pt-8 text-center text-sm text-white font-light">
            <p>© 2025 Rebeca Barreto Estética y Belleza. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
      </div>
    </main>
  )
}







