'use client'

import { useState } from 'react'
import { Sparkles, Copy, Check, Star, Phone, MapPin, Clock, Award, TrendingUp, Heart, Users } from 'lucide-react'
import Image from 'next/image'
import { SERVICIOS, TRATAMIENTOS_FACIALES, TRATAMIENTOS_CORPORALES, TRATAMIENTOS_MAQUILLAJE } from '@/constants/tratamientos'

const TESTIMONIOS = [
  {
    nombre: 'Daniela Silva',
    edad: 34,
    ubicacion: 'Ñemby',
    historia: 'Durante años busqué un centro de estética que realmente entendiera mi piel. En Rebeca Barreto encontré exactamente eso. El tratamiento para manchas y el Hidrofacial me devolvieron la confianza. Mi piel nunca estuvo tan luminosa y pareja.',
    tratamiento: 'Manchas + Hidrofacial',
    rating: 5
  },
  {
    nombre: 'Natalia Benítez',
    edad: 39,
    ubicacion: 'Mariano Roque Alonso',
    historia: 'Tenía arrugas profundas y piel sin vida. Rebeca diseñó un tratamiento personalizado con Dermapen y antiage. Los resultados son increíbles. Recuperé la firmeza y luminosidad que creí perdidas para siempre. Altamente recomendable.',
    tratamiento: 'Dermapen + Antiage',
    rating: 5
  },
  {
    nombre: 'Patricia Díaz',
    edad: 31,
    ubicacion: 'Villa Elisa',
    historia: 'El peeling ultrasónico cambió completamente la textura de mi piel. Las cicatrices de acné que me acomplejaban están casi imperceptibles. Rebeca es una profesional excepcional que realmente ama lo que hace. Eternamente agradecida.',
    tratamiento: 'Peeling Ultrasónico',
    rating: 5
  }
]

export default function ChicMinimalPage() {
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null)

  const copyPrompt = (prompt: string, id: string) => {
    navigator.clipboard.writeText(prompt)
    setCopiedPrompt(id)
    setTimeout(() => setCopiedPrompt(null), 2000)
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Prueba Social Flotante - MINIMALISTA */}
      <div className="fixed bottom-8 left-8 z-50 bg-white rounded-2xl shadow-2xl p-6 max-w-xs hidden md:block border border-[#E0C4C4]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#E0C4C4] flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-base font-black text-gray-900">Claudia M.</p>
            <p className="text-xs font-bold text-[#C0A4A4]">Reservó hace 12 min</p>
          </div>
        </div>
      </div>

      {/* Hero Section - MINIMAL ELEGANTE */}
      <section className="min-h-screen flex items-center px-4 py-20 bg-white">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Texto Hero */}
            <div className="space-y-12">
              <div className="space-y-6">
                <p className="text-[#C0A4A4] font-bold text-lg uppercase tracking-widest">
                  ESTÉTICA · BELLEZA · BIENESTAR
                </p>
                
                <h1 className="text-8xl md:text-9xl font-black leading-none text-gray-900">
                  CHIC
                  <br />
                  <span className="relative inline-block mt-2">
                    <span className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl -z-10"></span>
                    <span className="relative px-8 py-4 bg-gradient-to-r from-[#E8D0D0] to-[#D0B4B4] bg-clip-text text-transparent">
                      MINIMAL
                    </span>
                  </span>
                </h1>
              </div>

              <p className="text-2xl text-gray-700 font-semibold leading-relaxed">
                Elegancia sin excesos. Belleza en su forma más pura.
                <br />
                <span className="font-black text-[#C0A4A4]">Rebeca Barreto</span> te invita a descubrir 
                la esencia de la verdadera transformación.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <button className="group px-10 py-5 bg-gray-900 text-amber-500 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                  <span className="flex items-center gap-3 justify-center">
                    <Phone className="w-5 h-5" />
                    Agendar Cita
                  </span>
                </button>
                <button className="px-10 py-5 border-2 border-gray-900 text-gray-900 rounded-full font-bold text-lg hover:bg-gray-900 hover:text-white transition-all transform hover:scale-105">
                  Ver Servicios
                </button>
              </div>

              {/* Info Rápida */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#E0C4C4]">
                <div>
                  <p className="text-4xl font-black text-[#C0A4A4] mb-2">500+</p>
                  <p className="text-sm font-bold text-gray-700">Clientas</p>
                </div>
                <div>
                  <p className="text-4xl font-black text-[#C0A4A4] mb-2">15+</p>
                  <p className="text-sm font-bold text-gray-700">Años</p>
                </div>
                <div>
                  <p className="text-4xl font-black text-[#C0A4A4] mb-2">4.9★</p>
                  <p className="text-sm font-bold text-gray-700">Rating</p>
                </div>
              </div>
            </div>

            {/* Imagen Hero */}
            <div className="relative">
              <div className="w-full h-[700px] rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
                <Image
                  src="/images/rebeca-barreto.jpg"
                  alt="Chic Minimal"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tratamientos Faciales - GRID MINIMAL */}
      <section className="py-24 px-4 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <p className="text-[#C0A4A4] font-bold text-base uppercase tracking-widest mb-4">FACIALES</p>
            <h2 className="text-7xl md:text-8xl font-black text-gray-900">
              Tratamientos Premium
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICIOS.faciales.map((servicio, index) => {
              const tratamiento = TRATAMIENTOS_FACIALES[servicio as keyof typeof TRATAMIENTOS_FACIALES]
              return (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-[#F0E0E0] hover:border-[#E0C4C4] overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={tratamiento.imagen}
                    alt={servicio}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-black text-xl text-gray-900 mb-2">{servicio}</h3>
                  <p className="text-base font-semibold text-gray-600">{tratamiento.descripcion}</p>
                </div>
              </div>
              )
            })}
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={() => copyPrompt('Imagen profesional de alta calidad: Tratamiento facial Hidrofacial en spa de lujo. Mujer paraguaya de 30-40 años, piel radiante, expresión relajada. Ambiente sereno con tonos nude y rosa suave. Decoración con elementos paraguayos sutiles (ñandutí, artesanías de madera). Iluminación natural perfecta. Estilo minimalista y elegante. Centro de estética Rebeca Barreto en Asunción, Paraguay. Foto profesional, alta resolución, realista.', 'facial-img')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-amber-500 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
            >
              {copiedPrompt === 'facial-img' ? (
                <>
                  <Check className="w-6 h-6" />
                  <span>Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-6 h-6" />
                  <span>Copiar Prompt IA (Faciales)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Rebeca Barreto - MINIMAL PROFESIONAL */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="w-full h-[800px] rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
                <Image
                  src="/images/rebeca-barreto.jpg"
                  alt="Rebeca Barreto"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="space-y-10">
              <div>
                <p className="text-[#C0A4A4] font-bold text-base uppercase tracking-widest mb-4">EXPERTA EN ESTÉTICA</p>
                <h2 className="text-7xl md:text-8xl font-black text-gray-900 leading-tight">
                  Rebeca
                  <br />
                  Barreto
                </h2>
              </div>

              <div className="space-y-6 text-xl text-gray-700 font-semibold leading-relaxed">
                <p>
                  Con más de <span className="font-black text-gray-900">15 años de experiencia</span>, 
                  Rebeca Barreto ha consolidado su posición como la referencia en estética 
                  y belleza en Paraguay.
                </p>
                <p>
                  Su enfoque personalizado y certificaciones internacionales garantizan 
                  resultados excepcionales. Cada tratamiento es diseñado específicamente 
                  para las necesidades únicas de cada clienta.
                </p>
                <p>
                  <span className="font-black text-gray-900">Más de 500 mujeres paraguayas</span> confían 
                  en su profesionalismo y experiencia para lucir su mejor versión.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-6">
                <div className="p-6 bg-[#FAFAFA] rounded-2xl border border-[#E0C4C4] transform hover:scale-105 transition-all">
                  <Award className="w-8 h-8 text-[#C0A4A4] mb-4" />
                  <p className="font-black text-lg text-gray-900 mb-2">Certificación Internacional</p>
                  <p className="text-sm font-semibold text-gray-600">Técnicas de clase mundial</p>
                </div>
                <div className="p-6 bg-[#FAFAFA] rounded-2xl border border-[#E0C4C4] transform hover:scale-105 transition-all">
                  <Heart className="w-8 h-8 text-[#C0A4A4] mb-4" />
                  <p className="font-black text-lg text-gray-900 mb-2">Atención Personalizada</p>
                  <p className="text-sm font-semibold text-gray-600">Cada piel es única</p>
                </div>
                <div className="p-6 bg-[#FAFAFA] rounded-2xl border border-[#E0C4C4] transform hover:scale-105 transition-all">
                  <TrendingUp className="w-8 h-8 text-[#C0A4A4] mb-4" />
                  <p className="font-black text-lg text-gray-900 mb-2">Resultados Comprobados</p>
                  <p className="text-sm font-semibold text-gray-600">98% satisfacción</p>
                </div>
                <div className="p-6 bg-[#FAFAFA] rounded-2xl border border-[#E0C4C4] transform hover:scale-105 transition-all">
                  <Users className="w-8 h-8 text-[#C0A4A4] mb-4" />
                  <p className="font-black text-lg text-gray-900 mb-2">500+ Clientas Felices</p>
                  <p className="text-sm font-semibold text-gray-600">En todo Paraguay</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Masajes Corporales */}
      <section className="py-24 px-4 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <p className="text-[#C0A4A4] font-bold text-base uppercase tracking-widest mb-4">CORPORALES</p>
            <h2 className="text-7xl md:text-8xl font-black text-gray-900">
              Masajes Terapéuticos
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {SERVICIOS.corporales.map((servicio, index) => {
              const tratamiento = TRATAMIENTOS_CORPORALES[servicio as keyof typeof TRATAMIENTOS_CORPORALES]
              return (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-[#F0E0E0] hover:border-[#E0C4C4] overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={tratamiento.imagen}
                    alt={servicio}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-black text-lg text-gray-900 mb-2">{servicio}</h3>
                  <p className="text-base font-semibold text-gray-600">{tratamiento.descripcion}</p>
                </div>
              </div>
              )
            })}
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={() => copyPrompt('Imagen profesional: Masaje corporal maderoterapia en spa de lujo. Mujer paraguaya de 30-40 años, expresión relajada. Ambiente sereno con tonos nude y rosa suave. Elementos de madera, decoración paraguaya sutil (artesanías, ñandutí). Iluminación cálida natural. Estilo profesional, elegante. Centro Rebeca Barreto, Asunción Paraguay. Alta resolución, realista.', 'corp-img')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-amber-500 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
            >
              {copiedPrompt === 'corp-img' ? (
                <>
                  <Check className="w-6 h-6" />
                  <span>Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-6 h-6" />
                  <span>Copiar Prompt IA (Corporales)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Testimonios - MINIMAL CARDS */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <p className="text-[#C0A4A4] font-bold text-base uppercase tracking-widest mb-4">TESTIMONIOS</p>
            <h2 className="text-7xl md:text-8xl font-black text-gray-900">
              Historias Reales
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIOS.map((testimonio, index) => {
              const testimonioImages = [
                '/images/landing/testimonials/testimonio-mujer-01.jpg',
                '/images/landing/testimonials/testimonio-mujer-02.jpg',
                '/images/landing/testimonials/testimonio-mujer-03.jpg'
              ]
              return (
              <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-xl border border-[#E0C4C4] hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="relative h-[350px] overflow-hidden">
                  <Image
                    src={testimonioImages[index]}
                    alt={`${testimonio.nombre} - Cliente satisfecha`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <p className="font-black text-2xl mb-1">{testimonio.nombre}</p>
                    <p className="font-semibold text-lg">{testimonio.edad} años · {testimonio.ubicacion}</p>
                  </div>
                </div>
                <div className="p-8">
                  <div className="mb-6">
                    <span className="px-4 py-2 bg-[#FAFAFA] text-gray-900 rounded-full text-sm font-bold border border-[#E0C4C4]">
                      {testimonio.tratamiento}
                    </span>
                  </div>
                  <p className="text-gray-700 font-semibold text-base leading-relaxed mb-6">
                    "{testimonio.historia}"
                  </p>
                  <div className="flex gap-1">
                    {Array.from({length: testimonio.rating}).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#C0A4A4] fill-[#C0A4A4]" />
                    ))}
                  </div>
                </div>
              </div>
              )
            })}
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={() => copyPrompt('Foto profesional retrato: Mujer paraguaya de 30-45 años, sonriente, piel radiante y perfecta, rasgos típicos paraguayos. Ambiente: interior de casa moderna paraguaya con decoración típica (ñandutí en tonos pastel, artesanías de madera, colores tierra y nude, plantas nativas). O plaza/centro comercial de Asunción al fondo desenfocado. Iluminación natural perfecta, luz suave. Estilo: retrato profesional, alta calidad, realista. La mujer debe lucir feliz, confiada y radiante después de su tratamiento facial. Fondo desenfocado mostrando ambiente paraguayo auténtico y acogedor.', 'test-img')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-amber-500 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
            >
              {copiedPrompt === 'test-img' ? (
                <>
                  <Check className="w-6 h-6" />
                  <span>Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-6 h-6" />
                  <span>Copiar Prompt IA (Testimonios)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Maquillaje Profesional */}
      <section className="py-24 px-4 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <p className="text-[#C0A4A4] font-bold text-base uppercase tracking-widest mb-4">MAQUILLAJE</p>
            <h2 className="text-7xl md:text-8xl font-black text-gray-900">
              Perfección en Detalle
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICIOS.maquillaje.map((servicio, index) => {
              const tratamiento = TRATAMIENTOS_MAQUILLAJE[servicio as keyof typeof TRATAMIENTOS_MAQUILLAJE]
              return (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-[#F0E0E0] hover:border-[#E0C4C4] overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={tratamiento.imagen}
                    alt={servicio}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-black text-xl text-gray-900 mb-2">{servicio}</h3>
                  <p className="text-base font-semibold text-gray-600">{tratamiento.descripcion}</p>
                </div>
              </div>
              )
            })}
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={() => copyPrompt('Imagen profesional: Maquillaje profesional siendo aplicado. Mujer paraguaya de 25-35 años, rostro perfecto, piel impecable. Spa elegante minimalista. Productos de belleza de alta gama, espejo con iluminación profesional, brochas y paletas. Ambiente paraguayo sofisticado y moderno. Tonos nude y rosa suave. Centro Rebeca Barreto, Asunción. Alta resolución, estilo profesional, realista.', 'maq-img')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-amber-500 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
            >
              {copiedPrompt === 'maq-img' ? (
                <>
                  <Check className="w-6 h-6" />
                  <span>Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-6 h-6" />
                  <span>Copiar Prompt IA (Maquillaje)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* CTA Final - MINIMAL ELEGANTE */}
      <section className="py-32 px-4 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-7xl md:text-8xl font-black text-white mb-10 leading-tight">
            Tu Transformación<br />Comienza Hoy
          </h2>
          <p className="text-2xl text-white/90 font-semibold mb-16">
            Descubre la elegancia de la belleza natural
          </p>
          <button className="group px-16 py-6 bg-white text-gray-900 rounded-full font-black text-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110">
            <span className="flex items-center gap-3 justify-center">
              <Phone className="w-7 h-7" />
              Reservar Ahora
            </span>
          </button>
          <p className="text-white/80 mt-10 text-lg font-semibold">Cupos limitados · Asunción, Paraguay</p>
        </div>
      </section>
    </div>
  )
}

