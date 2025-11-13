'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function RebecaSection() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-white via-rose-50/30 to-neutral-50 overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-rose-100/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Imagen de Rebeca */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/40">
                  <Image
                    src="/images/rebeca-barreto.jpg"
                    alt="Rebeca Barreto"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 via-transparent to-transparent mix-blend-multiply" />
            </div>
            {/* Elemento decorativo */}
            <motion.div
              className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.div>

          {/* Contenido */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-light mb-6"
              >
                La Fundadora
              </motion.div>
              <h2 className="text-5xl md:text-6xl font-light text-neutral-900 mb-6 leading-tight">
                Rebeca{' '}
                <span className="font-normal text-primary">Barreto</span>
              </h2>
              <p className="text-2xl font-light text-neutral-700 mb-4">
                Especialista en Estética y Belleza
              </p>
            </div>

            <div className="space-y-6 text-lg text-neutral-600 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Con más de 15 años de experiencia, Rebeca ha dedicado su vida a ayudar a mujeres a recuperar su confianza y autoestima a través de tratamientos de estética de vanguardia.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Su enfoque empático y profesional ha transformado la vida de más de 2,500 mujeres en Paraguay, combinando ciencia, arte y un toque humano único.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-primary font-normal"
              >
                "Cada mujer que entra por nuestra puerta es única. Mi misión es hacer que se sienta escuchada, entendida y, sobre todo, hermosa en su propia piel."
              </motion.p>
            </div>

            {/* Credenciales */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 gap-6 pt-8 border-t border-neutral-200"
            >
              {[
                { title: 'Certificaciones', value: '15+' },
                { title: 'Años de Experiencia', value: '15+' },
                { title: 'Clientas Transformadas', value: '2,500+' },
                { title: 'Especialidades', value: '12+' },
              ].map((cred, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-light text-primary mb-1">{cred.value}</div>
                  <div className="text-sm text-neutral-600">{cred.title}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

