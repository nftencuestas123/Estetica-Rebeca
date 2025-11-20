'use client'

import { Phone, ArrowRight } from 'lucide-react'

/**
 * LocationSection Component
 * Lazy loaded - No aparece hasta que sea necesario
 */
export default function LocationSection() {
  return (
    <section className="py-12 px-4 bg-gradient-to-b from-black via-gray-900 to-gray-800 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 right-5 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-5 w-48 h-48 bg-amber-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-full border border-amber-500/30 mb-6">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            <span className="text-amber-400 font-bold text-sm">Nuestra Ubicación</span>
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Visítanos en
            <span className="block text-amber-500">Ciudad del Este</span>
          </h2>
          <p className="text-lg text-gray-300 font-semibold max-w-2xl mx-auto leading-relaxed">
            Rebeca Barreto Estética en Barrio Boquerón. 
            <span className="text-amber-400 font-black"> Fácil acceso y estacionamiento.</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          {/* Información de contacto */}
          <div className="space-y-4">
            <ContactCard
              title="Dirección"
              icon={<LocationIcon />}
              content={
                <>
                  <p className="text-white font-semibold text-base leading-relaxed">
                    Barrio Boquerón<br />
                    Ciudad del Este<br />
                    <span className="text-amber-300">Paraguay</span>
                  </p>
                </>
              }
            />

            <ContactCard
              title="Horarios de Atención"
              icon={<ClockIcon />}
              content={
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-white font-semibold">Lunes - Viernes</span>
                    <span className="text-amber-300 font-bold">8:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-white font-semibold">Sábados</span>
                    <span className="text-amber-300 font-bold">8:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-white font-semibold">Domingos</span>
                    <span className="text-gray-400 font-bold">Cerrado</span>
                  </div>
                </div>
              }
            />

            <ContactCard
              title="Contacto Directo"
              icon={<PhoneIcon />}
              content={
                <div className="space-y-3">
                  <a href="tel:+595981234567" className="flex items-center gap-3 text-white hover:text-amber-400 transition-all duration-300 group p-2 rounded-lg hover:bg-amber-500/10">
                    <span className="font-bold text-lg">+595 98 123 4567</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </a>
                  <a href="https://wa.me/595981234567" className="flex items-center gap-3 text-white hover:text-amber-400 transition-all duration-300 group p-2 rounded-lg hover:bg-amber-500/10">
                    <span className="font-semibold">WhatsApp Directo</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </a>
                </div>
              }
            />
          </div>

          {/* Mapa */}
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/20 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-black text-amber-400">Cómo Llegar</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-bold text-xs">Abierto</span>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-500/30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.5234567890123!2d-54.6166667!3d-25.5166667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94f69d5b5b5b5b5b%3A0x5b5b5b5b5b5b5b5b!2sBarrio%20Boquer%C3%B3n%2C%20Ciudad%20del%20Este%2C%20Paraguay!5e0!3m2!1ses!2spy!4v1234567890123!5m2!1ses!2spy"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-72 rounded-xl"
                title="Ubicación Estética Rebeca Barreto"
              ></iframe>

              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-amber-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                    <LocationIcon />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Estética Rebeca Barreto</p>
                    <p className="text-amber-400 font-semibold text-xs">Barrio Boquerón</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 right-4">
                <a
                  href="https://www.google.com/maps/search/Barrio+Boquer%C3%B3n,+Ciudad+del+Este,+Paraguay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black py-3 px-6 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center gap-2 text-sm"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  Abrir Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface ContactCardProps {
  title: string
  icon: React.ReactNode
  content: React.ReactNode
}

function ContactCard({ title, icon, content }: ContactCardProps) {
  return (
    <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/30 shadow-xl">
      <div className="flex items-start gap-5">
        <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-black text-amber-400 mb-3">{title}</h3>
          {content}
        </div>
      </div>
    </div>
  )
}

function LocationIcon() {
  return (
    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l1.498 4.493a1 1 0 00.502.756l2.73 1.365a1 1 0 001.27-1.27l-1.365-2.73a1 1 0 00.756-.502l4.493-1.498a1 1 0 00.684-.948V5a2 2 0 00-2-2h-4.5a2 2 0 00-2 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-4z" />
    </svg>
  )
}

