'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface Testimonial {
  id: number
  nombre: string
  edad: number
  tratamiento: string
  comentario: string
  rating: number
  imagen?: string
  antesDespues?: {
    antes: string
    despues: string
  }
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    nombre: 'María González',
    edad: 42,
    tratamiento: 'Tratamiento Anti-Manchas',
    comentario: 'Llegué con manchas que me hacían sentir terrible. Hoy no solo recuperé mi piel, recuperé mi confianza. Rebeca y su equipo me entendieron desde el primer día.',
    rating: 5,
    imagen: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    nombre: 'Ana Martínez',
    edad: 38,
    tratamiento: 'Botox + Rellenos',
    comentario: 'Después de mi divorcio, me sentía invisible. Los tratamientos me ayudaron a recuperar no solo mi apariencia, sino mi autoestima. Me siento como nueva.',
    rating: 5,
    imagen: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    nombre: 'Laura Fernández',
    edad: 35,
    tratamiento: 'HIFU Facial',
    comentario: 'Tenía miedo de los tratamientos estéticos, pero Sofía me ayudó a entender todo. El resultado superó mis expectativas. Me siento hermosa otra vez.',
    rating: 5,
    imagen: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    nombre: 'Carmen Rodríguez',
    edad: 50,
    tratamiento: 'Plan Anti-Aging Completo',
    comentario: 'A los 50, pensé que ya era tarde. Rebeca me demostró que nunca es tarde para sentirse bien. Mi transformación fue increíble, tanto física como emocional.',
    rating: 5,
    imagen: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 5,
    nombre: 'Patricia López',
    edad: 45,
    tratamiento: 'Mesoterapia + Limpieza Profunda',
    comentario: 'Mi piel estaba apagada y sin vida. Ahora brilla y yo también. El proceso fue tan cuidadoso y empático que me sentí acompañada en cada paso.',
    rating: 5,
    imagen: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 6,
    nombre: 'Sofía Morales',
    edad: 32,
    tratamiento: 'Rellenos de Ácido Hialurónico',
    comentario: 'Siempre tuve complejos con mis labios. Los rellenos fueron tan naturales que nadie nota que me hice algo, pero yo sí noto la diferencia en mi confianza.',
    rating: 5,
    imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
  },
]

export default function PremiumTestimonials() {
  return (
    <section className="py-32 bg-gradient-to-b from-white via-rose-50/20 to-neutral-50 relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-primary/5 via-rose-100/10 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-light mb-6">
            Testimonios Verificados
          </div>
          <h2 className="text-5xl md:text-6xl font-light text-neutral-900 mb-6">
            Mujeres reales.{' '}
            <span className="font-normal text-primary">Resultados reales.</span>
          </h2>
          <p className="text-xl font-light text-neutral-600 max-w-2xl mx-auto">
            Conocé las experiencias de clientas que transformaron no solo su apariencia, sino su vida.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-neutral-100 hover:shadow-xl transition-all group"
            >
              {/* Imagen del testimonio */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={
                    testimonial.imagen ||
                    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=80'
                  }
                  alt={testimonial.nombre}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 via-neutral-900/30 to-transparent" />
              </div>

              {/* Contenido */}
              <div className="p-8">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-primary text-lg">★</span>
                  ))}
                </div>

                {/* Comentario */}
                <p className="text-neutral-700 mb-6 leading-relaxed font-light italic">
                  "{testimonial.comentario}"
                </p>

                {/* Info */}
                <div className="pt-6 border-t border-neutral-100">
                  <div className="font-light text-neutral-900 mb-1">
                    {testimonial.nombre}
                  </div>
                  <div className="text-sm text-neutral-500 mb-1">
                    {testimonial.edad} años
                  </div>
                  <div className="text-sm text-primary font-light">
                    {testimonial.tratamiento}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-neutral-600 mb-6 font-light">
            ¿Lista para tu propia transformación?
          </p>
          <a
            href="/tratamientos"
            className="inline-block px-10 py-5 bg-gradient-to-r from-primary via-primary-dark to-primary text-white rounded-full font-light text-lg hover:shadow-xl transition-all"
          >
            Agendá tu consulta gratuita
          </a>
        </motion.div>
      </div>
    </section>
  )
}

