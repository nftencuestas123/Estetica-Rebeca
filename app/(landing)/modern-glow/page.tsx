'use client'

import { useState } from 'react'
import { Sparkles, Copy, Check, Star, Zap, Phone, Calendar, Award, TrendingUp, Heart, Shield } from 'lucide-react'
import Image from 'next/image'
import { SERVICIOS, TRATAMIENTOS_FACIALES, TRATAMIENTOS_CORPORALES, TRATAMIENTOS_MAQUILLAJE } from '@/constants/tratamientos'

const TESTIMONIOS = [
  {
    nombre: 'Lucía Benítez',
    edad: 29,
    ubicacion: 'San Lorenzo',
    historia: 'Siempre tuve piel sensible y manchas. Probé infinidad de tratamientos sin resultados. Con Rebeca encontré el tratamiento perfecto para mí. Mi piel está radiante, sin manchas, y por primera vez me siento segura sin filtros en mis fotos.',
    tratamiento: 'Tratamiento Manchas + Hidratación',
    rating: 5
  },
  {
    nombre: 'Gabriela Acosta',
    edad: 41,
    ubicacion: 'Luque',
    historia: 'El Dermapen cambió mi vida. Tenía cicatrices de acné desde la adolescencia y arrugas que me hacían ver mayor. Después de 8 sesiones con Rebeca, mi piel está lisa, firme y luminosa. Me siento 10 años más joven.',
    tratamiento: 'Dermapen + Antiage',
    rating: 5
  },
  {
    nombre: 'Camila Vera',
    edad: 36,
    ubicacion: 'Capiatá',
    historia: 'Rebeca no solo transformó mi piel, transformó mi autoestima. Después del Hidrofacial y tratamiento antiage, mi rostro está radiante. Mis compañeras de trabajo no paran de preguntarme qué me hice. ¡Gracias Rebeca!',
    tratamiento: 'Hidrofacial + Antiage',
    rating: 5
  }
]

export default function ModernGlowPage() {
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null)

  const copyPrompt = (prompt: string, id: string) => {
    navigator.clipboard.writeText(prompt)
    setCopiedPrompt(id)
    setTimeout(() => setCopiedPrompt(null), 2000)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Prueba Social Flotante */}
      <div className="fixed bottom-8 left-8 z-50 bg-gradient-to-r from-white to-[#FFF0F0] rounded-[2rem] shadow-3xl p-7 max-w-md hidden md:block border-4 border-[#E8B8B8]">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#E8B8B8] to-[#CC9999] flex items-center justify-center shadow-2xl">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <div>
            <p className="text-xl font-black text-gray-900">¡3 Citas Reservadas!</p>
            <p className="text-base font-bold text-[#CC9999]">En los últimos 15 minutos</p>
          </div>
        </div>
      </div>

      {/* Hero Section - ULTRA MODERN */}
      <section className="relative min-h-screen flex items-center px-4 py-24 bg-gradient-to-br from-white via-[#FFF8F8] to-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E8B8B8] rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#CC9999] rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Texto Hero */}
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#E8B8B8] to-[#CC9999] rounded-full shadow-2xl">
                  <Zap className="w-6 h-6 text-white" />
                  <span className="text-white font-black text-lg">Tecnología de Vanguardia</span>
                </div>
                
                <h1 className="text-8xl md:text-9xl font-black leading-none">
                  <span className="relative inline-block mb-4">
                    <span className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900 rounded-[3rem] blur-xl opacity-50"></span>
                    <span className="relative block px-12 py-6 bg-gradient-to-r from-gray-900 via-black to-gray-900 rounded-[3rem]">
                      <span className="bg-gradient-to-r from-[#FFE0E0] to-[#E8B8B8] bg-clip-text text-transparent">
                        Modern
                      </span>
                    </span>
                  </span>
                  <br />
                  <span className="text-gray-900">GLOW</span>
                </h1>
              </div>

              <p className="text-3xl text-gray-800 font-bold leading-relaxed">
                La fusión perfecta entre <span className="font-black text-[#CC9999]">tecnología avanzada</span> y 
                belleza natural. Descubre tu <span className="font-black text-[#CC9999]">resplandor moderno</span>.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <button className="group px-12 py-6 bg-black text-amber-500 rounded-full font-black text-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110 hover:rotate-1">
                  <span className="flex items-center gap-3 justify-center">
                    <Calendar className="w-7 h-7" />
                    Agendar Mi Transformación
                  </span>
                </button>
              </div>

              {/* Mini Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center p-6 bg-white rounded-3xl shadow-xl border-2 border-[#FFE0E0] transform hover:scale-110 transition-all">
                  <p className="text-5xl font-black text-[#CC9999]">500+</p>
                  <p className="text-sm font-bold text-gray-900 mt-2">Clientas</p>
                </div>
                <div className="text-center p-6 bg-white rounded-3xl shadow-xl border-2 border-[#FFE0E0] transform hover:scale-110 transition-all">
                  <p className="text-5xl font-black text-[#CC9999]">15+</p>
                  <p className="text-sm font-bold text-gray-900 mt-2">Años</p>
                </div>
                <div className="text-center p-6 bg-white rounded-3xl shadow-xl border-2 border-[#FFE0E0] transform hover:scale-110 transition-all">
                  <p className="text-5xl font-black text-[#CC9999]">4.9★</p>
                  <p className="text-sm font-bold text-gray-900 mt-2">Rating</p>
                </div>
              </div>
            </div>

            {/* Imagen Hero */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#E8B8B8] to-[#CC9999] rounded-[3rem] blur-3xl opacity-20"></div>
              <div className="relative w-full h-[700px] rounded-[3rem] overflow-hidden shadow-3xl transform hover:scale-105 hover:rotate-2 transition-all duration-700 border-4 border-white">
                <Image
                  src="/images/rebeca-barreto.jpg"
                  alt="Modern Glow"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tratamientos Faciales - MODERN GRID */}
      <section className="py-28 px-4 bg-gradient-to-b from-white to-[#FFF8F8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <span className="px-8 py-4 bg-white text-gray-900 rounded-full text-base font-black shadow-xl border-2 border-[#E8B8B8]">
                💫 TRATAMIENTOS PREMIUM
              </span>
            </div>
            
            <h2 className="text-8xl md:text-9xl font-black mb-8">
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black rounded-[3rem] blur-2xl opacity-30"></span>
                <span className="relative block px-12 py-6 bg-gradient-to-r from-gray-900 to-black rounded-[3rem]">
                  <span className="bg-gradient-to-r from-[#FFE0E0] to-[#E8B8B8] bg-clip-text text-transparent">
                    FACIALES
                  </span>
                </span>
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICIOS.faciales.map((servicio, index) => {
              const tratamiento = TRATAMIENTOS_FACIALES[servicio as keyof typeof TRATAMIENTOS_FACIALES]
              return (
              <div
                key={index}
                className="group bg-white rounded-[2.5rem] shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 cursor-pointer overflow-hidden border-2 border-[#FFE0E0] hover:border-[#E8B8B8]"
              >
                <div className="relative h-64 overflow-hidden bg-gray-50">
                  <Image
                    src={tratamiento.imagen}
                    alt={servicio}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-black text-2xl text-gray-900 mb-3 leading-tight">{servicio}</h3>
                  <p className="text-base font-bold text-gray-700">{tratamiento.descripcion}</p>
                </div>
              </div>
              )
            })}
          </div>

          <div className="mt-20 text-center">
            <button
              onClick={() => copyPrompt('Imagen profesional de alta calidad: Tratamiento facial Hidrofacial en spa de lujo. Mujer paraguaya de 30-40 años, piel radiante, expresión relajada. Ambiente sereno con tonos nude y rosa suave. Decoración con elementos paraguayos sutiles (ñandutí, artesanías de madera). Iluminación natural perfecta. Estilo minimalista y elegante. Centro de estética Rebeca Barreto en Asunción, Paraguay. Foto profesional, alta resolución, realista.', 'facial-img')}
              className="inline-flex items-center gap-4 px-12 py-6 bg-black text-amber-500 rounded-full font-black text-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110"
            >
              {copiedPrompt === 'facial-img' ? (
                <>
                  <Check className="w-7 h-7" />
                  <span>¡Prompt Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-7 h-7" />
                  <span>Copiar Prompt IA (Faciales)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Rebeca Barreto - MODERN LAYOUT */}
      <section className="py-28 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="inline-block">
                <span className="px-8 py-4 bg-black text-amber-500 rounded-full text-lg font-black shadow-2xl">
                  ⭐ Experta Certificada
                </span>
              </div>
              
              <h2 className="text-8xl md:text-9xl font-black leading-none">
                <span className="text-gray-900">REBECA</span>
                <br />
                <span className="relative inline-block mt-4">
                  <span className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black rounded-[3rem] blur-xl opacity-50"></span>
                  <span className="relative block px-10 py-5 bg-gradient-to-r from-gray-900 to-black rounded-[3rem]">
                    <span className="bg-gradient-to-r from-[#FFE0E0] to-[#E8B8B8] bg-clip-text text-transparent">
                      BARRETO
                    </span>
                  </span>
                </span>
              </h2>

              <div className="space-y-6 text-2xl text-gray-800 font-bold leading-relaxed">
                <p>
                  Pionera en <span className="font-black text-[#CC9999]">tecnología estética avanzada</span> en Paraguay. 
                  Con más de 15 años transformando la vida de mujeres paraguayas.
                </p>
                <p>
                  Certificada internacionalmente en las técnicas más innovadoras del mundo. 
                  Su pasión por la excelencia la convierte en la referencia #1.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-8 bg-gradient-to-br from-[#FFF8F8] to-white rounded-[2rem] shadow-xl border-2 border-[#FFE0E0] transform hover:scale-105 transition-all">
                  <Award className="w-10 h-10 text-[#CC9999] mb-4" />
                  <p className="font-black text-xl text-gray-900 mb-2">Certificación Internacional</p>
                  <p className="text-base font-bold text-gray-700">Técnicas de clase mundial</p>
                </div>
                <div className="p-8 bg-gradient-to-br from-[#FFF8F8] to-white rounded-[2rem] shadow-xl border-2 border-[#FFE0E0] transform hover:scale-105 transition-all">
                  <TrendingUp className="w-10 h-10 text-[#CC9999] mb-4" />
                  <p className="font-black text-xl text-gray-900 mb-2">Resultados Comprobados</p>
                  <p className="text-base font-bold text-gray-700">98% satisfacción</p>
                </div>
                <div className="p-8 bg-gradient-to-br from-[#FFF8F8] to-white rounded-[2rem] shadow-xl border-2 border-[#FFE0E0] transform hover:scale-105 transition-all">
                  <Heart className="w-10 h-10 text-[#CC9999] mb-4" />
                  <p className="font-black text-xl text-gray-900 mb-2">Atención Personalizada</p>
                  <p className="text-base font-bold text-gray-700">Cada piel es única</p>
                </div>
                <div className="p-8 bg-gradient-to-br from-[#FFF8F8] to-white rounded-[2rem] shadow-xl border-2 border-[#FFE0E0] transform hover:scale-105 transition-all">
                  <Shield className="w-10 h-10 text-[#CC9999] mb-4" />
                  <p className="font-black text-xl text-gray-900 mb-2">Seguridad Total</p>
                  <p className="text-base font-bold text-gray-700">Productos premium</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#E8B8B8] to-[#CC9999] rounded-[3rem] blur-3xl opacity-20"></div>
              <div className="relative w-full h-[800px] rounded-[3rem] overflow-hidden shadow-3xl transform hover:scale-105 hover:-rotate-2 transition-all duration-700 border-4 border-white">
                <Image
                  src="/images/rebeca-barreto.jpg"
                  alt="Rebeca Barreto"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporales - MODERN */}
      <section className="py-28 px-4 bg-gradient-to-b from-[#FFF8F8] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-8xl md:text-9xl font-black mb-8">
              <span className="text-gray-900">MASAJES</span>
              <br />
              <span className="relative inline-block mt-4">
                <span className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black rounded-[3rem] blur-2xl opacity-30"></span>
                <span className="relative block px-12 py-6 bg-gradient-to-r from-gray-900 to-black rounded-[3rem]">
                  <span className="bg-gradient-to-r from-[#FFE0E0] to-[#E8B8B8] bg-clip-text text-transparent">
                    CORPORALES
                  </span>
                </span>
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {SERVICIOS.corporales.map((servicio, index) => {
              const tratamiento = TRATAMIENTOS_CORPORALES[servicio as keyof typeof TRATAMIENTOS_CORPORALES]
              return (
              <div
                key={index}
                className="group bg-white rounded-[2.5rem] shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 cursor-pointer overflow-hidden border-2 border-[#FFE0E0] hover:border-[#E8B8B8]"
              >
                <div className="relative h-64 overflow-hidden bg-gray-50">
                  <Image
                    src={tratamiento.imagen}
                    alt={servicio}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-black text-xl text-gray-900 mb-3 leading-tight">{servicio}</h3>
                  <p className="text-base font-bold text-gray-700">{tratamiento.descripcion}</p>
                </div>
              </div>
              )
            })}
          </div>

          <div className="mt-20 text-center">
            <button
              onClick={() => copyPrompt('Imagen profesional: Masaje corporal maderoterapia en spa de lujo. Mujer paraguaya de 30-40 años, expresión relajada. Ambiente sereno con tonos nude y rosa suave. Elementos de madera, decoración paraguaya sutil (artesanías, ñandutí). Iluminación cálida natural. Estilo profesional, elegante. Centro Rebeca Barreto, Asunción Paraguay. Alta resolución, realista.', 'corp-img')}
              className="inline-flex items-center gap-4 px-12 py-6 bg-black text-amber-500 rounded-full font-black text-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110"
            >
              {copiedPrompt === 'corp-img' ? (
                <>
                  <Check className="w-7 h-7" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-7 h-7" />
                  <span>Copiar Prompt IA (Corporales)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Testimonios - MODERN CARDS */}
      <section className="py-28 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-8xl md:text-9xl font-black">
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black rounded-[3rem] blur-2xl opacity-30"></span>
                <span className="relative block px-12 py-6 bg-gradient-to-r from-gray-900 to-black rounded-[3rem]">
                  <span className="bg-gradient-to-r from-[#FFE0E0] to-[#E8B8B8] bg-clip-text text-transparent">
                    TESTIMONIOS
                  </span>
                </span>
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {TESTIMONIOS.map((testimonio, index) => {
              const testimonioImages = [
                '/images/landing/testimonials/testimonio-mujer-01.jpg',
                '/images/landing/testimonials/testimonio-mujer-02.jpg',
                '/images/landing/testimonials/testimonio-mujer-03.jpg'
              ]
              return (
              <div key={index} className="group bg-gradient-to-br from-white to-[#FFF8F8] rounded-[2.5rem] overflow-hidden shadow-3xl border-4 border-[#FFE0E0] hover:border-[#E8B8B8] hover:shadow-4xl transition-all duration-500 transform hover:scale-105">
                <div className="relative h-[400px] overflow-hidden">
                  <Image
                    src={testimonioImages[index]}
                    alt={`${testimonio.nombre} - Cliente satisfecha`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
                    <p className="font-black text-3xl mb-2">{testimonio.nombre}</p>
                    <p className="font-bold text-xl">{testimonio.edad} años · {testimonio.ubicacion}</p>
                  </div>
                </div>
                <div className="p-10">
                  <div className="mb-6">
                    <span className="px-5 py-3 bg-black text-amber-500 rounded-full text-base font-black shadow-lg">
                      {testimonio.tratamiento}
                    </span>
                  </div>
                  <p className="text-gray-800 font-bold text-lg leading-relaxed mb-6">
                    "{testimonio.historia}"
                  </p>
                  <div className="flex gap-2">
                    {Array.from({length: testimonio.rating}).map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-[#E8B8B8] fill-[#E8B8B8]" />
                    ))}
                  </div>
                </div>
              </div>
              )
            })}
          </div>

          <div className="mt-20 text-center">
            <button
              onClick={() => copyPrompt('Foto profesional retrato: Mujer paraguaya de 30-45 años, sonriente, piel radiante y perfecta, rasgos típicos paraguayos. Ambiente: interior de casa moderna paraguaya con decoración típica (ñandutí en tonos pastel, artesanías de madera, colores tierra y nude, plantas nativas). O plaza/centro comercial de Asunción al fondo desenfocado. Iluminación natural perfecta, luz suave. Estilo: retrato profesional, alta calidad, realista. La mujer debe lucir feliz, confiada y radiante después de su tratamiento facial. Fondo desenfocado mostrando ambiente paraguayo auténtico y acogedor.', 'test-img')}
              className="inline-flex items-center gap-4 px-12 py-6 bg-black text-amber-500 rounded-full font-black text-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110"
            >
              {copiedPrompt === 'test-img' ? (
                <>
                  <Check className="w-7 h-7" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-7 h-7" />
                  <span>Copiar Prompt IA (Testimonios)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Maquillaje */}
      <section className="py-28 px-4 bg-gradient-to-b from-[#FFF8F8] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-8xl md:text-9xl font-black">
              <span className="text-gray-900">MAQUILLAJE</span>
              <br />
              <span className="relative inline-block mt-4">
                <span className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black rounded-[3rem] blur-2xl opacity-30"></span>
                <span className="relative block px-12 py-6 bg-gradient-to-r from-gray-900 to-black rounded-[3rem]">
                  <span className="bg-gradient-to-r from-[#FFE0E0] to-[#E8B8B8] bg-clip-text text-transparent">
                    PROFESIONAL
                  </span>
                </span>
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICIOS.maquillaje.map((servicio, index) => {
              const maquillajeImages = [
                '/images/landing/treatments/maquillaje-social.jpg',
                '/images/landing/treatments/maquillaje-eventos.jpg',
                '/images/landing/treatments/maquillaje-novia.jpg',
                '/images/landing/treatments/maquillaje-prueba.jpg'
              ]
              return (
              <div
                key={index}
                className="group bg-white rounded-[2.5rem] shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 cursor-pointer overflow-hidden border-2 border-[#FFE0E0] hover:border-[#E8B8B8]"
              >
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={maquillajeImages[index]}
                    alt={servicio}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-8">
                  <h3 className="font-black text-2xl text-gray-900 mb-3 leading-tight">{servicio}</h3>
                  <p className="text-base font-bold text-gray-700">Perfección garantizada</p>
                </div>
              </div>
              )
            })}
          </div>

          <div className="mt-20 text-center">
            <button
              onClick={() => copyPrompt('Imagen profesional: Maquillaje profesional siendo aplicado. Mujer paraguaya de 25-35 años, rostro perfecto, piel impecable. Spa elegante minimalista. Productos de belleza de alta gama, espejo con iluminación profesional, brochas y paletas. Ambiente paraguayo sofisticado y moderno. Tonos nude y rosa suave. Centro Rebeca Barreto, Asunción. Alta resolución, estilo profesional, realista.', 'maq-img')}
              className="inline-flex items-center gap-4 px-12 py-6 bg-black text-amber-500 rounded-full font-black text-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110"
            >
              {copiedPrompt === 'maq-img' ? (
                <>
                  <Check className="w-7 h-7" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-7 h-7" />
                  <span>Copiar Prompt IA (Maquillaje)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* CTA Final - ULTRA MODERN */}
      <section className="py-40 px-4 bg-gradient-to-br from-[#E8B8B8] via-[#CC9999] to-[#E8B8B8] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-[600px] h-[600px] bg-white rounded-full opacity-5 blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-white rounded-full opacity-5 blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-8xl md:text-[10rem] font-black text-white mb-12 drop-shadow-2xl leading-none">
            TU MOMENTO<br />ES AHORA
          </h2>
          <p className="text-4xl text-white font-black mb-20 drop-shadow-xl">
            ¡Transforma tu vida HOY!
          </p>
          <button className="group px-20 py-10 bg-white text-[#CC9999] rounded-full font-black text-3xl shadow-3xl hover:shadow-4xl transition-all transform hover:scale-110 hover:rotate-2">
            <span className="flex items-center gap-4 justify-center">
              <Phone className="w-12 h-12" />
              RESERVAR AHORA
            </span>
          </button>
          <p className="text-white/90 mt-12 text-2xl font-bold drop-shadow-lg">✨ Cupos limitados · No esperes más</p>
        </div>
      </section>
    </div>
  )
}

