'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface Story {
  id: number
  title: string
  subtitle: string
  content: string[]
  image?: string
}

const stories: Story[] = [
  {
    id: 1,
    title: 'La Transformación de María',
    subtitle: 'De la inseguridad a la confianza total',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1100&q=80',
    content: [
      'María llegó a nosotros con 42 años, arrastrando años de inseguridad por las manchas en su rostro que la habían acompañado desde la adolescencia. "Me sentía invisible", nos confesó en su primera consulta. Las manchas solares y el melasma habían hecho que evitara espejos y situaciones sociales.',
      'Después de una consulta profunda con Rebeca, diseñamos un plan personalizado de 6 meses que combinaba tratamientos de luz pulsada intensa, mesoterapia con vitamina C y un protocolo de cuidado en casa. María era escéptica al principio - había probado todo antes sin resultados.',
      'A los 3 meses, las manchas comenzaron a aclararse significativamente. Pero más importante que los resultados físicos, fue el cambio emocional que vimos en María. Empezó a sonreír más, a mirarse al espejo sin vergüenza, a aceptar invitaciones que antes rechazaba.',
      'Hoy, 8 meses después, María no solo recuperó la claridad de su piel, sino que recuperó su vida. "No es solo sobre cómo me veo", nos dijo en su última visita, "es sobre cómo me siento. Me siento como yo misma otra vez, y eso no tiene precio."',
      'Su transformación no fue solo estética - fue una transformación de autoestima, confianza y amor propio. Y eso es exactamente lo que buscamos en cada tratamiento: devolverte a vos misma.',
    ],
  },
  {
    id: 2,
    title: 'El Viaje de Ana',
    subtitle: 'Recuperando la juventud que sentía perdida',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1100&q=80',
    content: [
      'Ana, de 55 años, vino a nosotros después de un divorcio difícil. "Me sentía vieja e invisible", compartió. Las arrugas profundas y la pérdida de volumen facial la hacían sentir que su mejor momento había pasado.',
      'Rebeca diseñó un plan integral que incluía Botox estratégico, rellenos de ácido hialurónico y tratamientos de radiofrecuencia. Pero más allá de los tratamientos, lo que Ana necesitaba era sentirse escuchada y entendida.',
      'Cada sesión se convirtió en un espacio seguro donde Ana podía expresar sus miedos, sus inseguridades y sus esperanzas. Rebeca no solo trataba su piel, sino que la acompañaba emocionalmente en su proceso de transformación.',
      'Los resultados físicos fueron impresionantes - su piel recuperó firmeza, las arrugas se suavizaron y su rostro recuperó volumen. Pero lo más impactante fue ver cómo Ana recuperó su sonrisa, su confianza y su alegría de vivir.',
      'Hoy, Ana es una de nuestras embajadoras más entusiastas. "No solo me devolvieron mi juventud", dice, "me devolvieron a mí misma. Me siento hermosa, confiada y lista para lo que venga."',
      'Esta es la magia de lo que hacemos: no solo transformamos tu apariencia, transformamos tu vida.',
    ],
  },
]

export default function StorytellingSection() {
  const [activeStory, setActiveStory] = useState<number | null>(null)

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-transparent relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-r from-primary/5 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-100/60 text-white rounded-full text-xs sm:text-sm font-light mb-4 sm:mb-6">
            Historias Reales
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 sm:mb-6 px-4">
            Transformaciones que{' '}
            <span className="font-normal text-primary">cambian vidas</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-light text-white max-w-2xl mx-auto px-4">
            Cada historia es única. Cada transformación es personal. Conocé las experiencias reales de mujeres que recuperaron su confianza.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="bg-cream-50 rounded-2xl shadow-lg overflow-hidden border border-primary-100/60">
                {story.image && (
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 via-primary-900/20 to-transparent" />
                  </div>
                )}
                {/* Header de la historia */}
                <div className="p-8 bg-gradient-to-br from-primary-100/40 via-primary-200/40 to-transparent">
                  <div className="text-sm text-primary font-light mb-2">
                    Historia #{story.id}
                  </div>
                  <h3 className="text-2xl font-light text-white mb-2">
                    {story.title}
                  </h3>
                  <p className="text-white font-light">{story.subtitle}</p>
                </div>

                {/* Contenido expandible */}
                <AnimatePresence>
                  {activeStory === story.id ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden"
                    >
                      <div className="p-8 space-y-6">
                        {story.content.map((paragraph, pIndex) => (
                          <motion.p
                            key={pIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: pIndex * 0.1 }}
                            className="text-white leading-relaxed font-light"
                          >
                            {paragraph}
                          </motion.p>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="p-8">
                      <p className="text-white font-light mb-6 line-clamp-3">
                        {story.content[0]}
                      </p>
                    </div>
                  )}
                </AnimatePresence>

                {/* Botón */}
                <div className="p-8 pt-0">
                  <button
                    onClick={() => setActiveStory(activeStory === story.id ? null : story.id)}
                    className="w-full px-6 py-4 bg-gradient-to-r from-primary-100/40 to-primary-200/60 hover:from-primary-200/50 hover:to-primary-300/60 text-white rounded-full font-light transition-all border border-primary-200/50"
                  >
                    {activeStory === story.id ? 'Ocultar historia completa' : 'Leer historia completa'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}





