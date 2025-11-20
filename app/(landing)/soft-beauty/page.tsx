'use client'

import { useState } from 'react'
import { Sparkles, Copy, Check, Star, Heart, Phone, Clock, MapPin, CheckCircle2, Award } from 'lucide-react'
import Image from 'next/image'
import { SERVICIOS, TRATAMIENTOS_FACIALES, TRATAMIENTOS_CORPORALES, TRATAMIENTOS_MAQUILLAJE } from '@/constants/tratamientos'

const TESTIMONIOS = [
  {
    nombre: 'Sofía Martínez',
    edad: 38,
    ubicacion: 'Asunción',
    historia: 'Tenía manchas solares que me acomplejaban desde hace 10 años. Con el tratamiento para manchas de Rebeca, desaparecieron en 6 sesiones. No solo cambió mi piel, cambió mi vida. Ahora salgo sin maquillaje y me siento hermosa.',
    tratamiento: 'Tratamiento para Manchas',
    rating: 5
  },
  {
    nombre: 'Valentina López',
    edad: 45,
    ubicacion: 'Fernando de la Mora',
    historia: 'Después de tener a mis hijos, mi piel perdió firmeza y luminosidad. El Dermapen y el tratamiento antiage me devolvieron 10 años. Mis amigas me preguntan cuál es mi secreto, y siempre les respondo: Rebeca Barreto.',
    tratamiento: 'Dermapen + Antiage',
    rating: 5
  },
  {
    nombre: 'Isabella Rojas',
    edad: 32,
    ubicacion: 'Lambaré',
    historia: 'Probé mil productos para el acné sin resultados. Rebeca analizó mi piel y creó un plan personalizado. Hoy tengo la piel que siempre soñé. Es la mejor inversión que hice en mí misma.',
    tratamiento: 'Limpieza Facial Profunda',
    rating: 5
  }
]

export default function SoftBeautyPage() {
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null)

  const copyPrompt = (prompt: string, id: string) => {
    navigator.clipboard.writeText(prompt)
    setCopiedPrompt(id)
    setTimeout(() => setCopiedPrompt(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5F5] via-white to-[#FFF5F5]">
      {/* Prueba Social Flotante */}
      <div className="fixed bottom-6 left-6 z-50 bg-white rounded-3xl shadow-2xl p-6 max-w-sm hidden md:block border-l-4 border-[#D9B5B5]">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F5E5E5] to-[#D9B5B5] flex items-center justify-center shadow-lg">
            <CheckCircle2 className="w-8 h-8 text-[#B59090] fill-[#B59090]" />
          </div>
          <div>
            <p className="text-lg font-black text-gray-900">Patricia R.</p>
            <p className="text-sm font-bold text-[#B59090]">Confirmó su cita · Hace 8 min</p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <span className="px-8 py-4 bg-white border-2 border-[#D9B5B5] text-gray-900 rounded-full text-base font-black shadow-lg">
                💎 Centro de Estética #1 en Paraguay
              </span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-black leading-tight mb-8">
              <span className="relative inline-block px-10 py-6 mb-6">
                <span className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-[3rem] shadow-2xl"></span>
                <span className="relative text-[#F5E5E5] drop-shadow-2xl">
                  Soft Beauty
                </span>
              </span>
              <br />
              <span className="text-gray-900">
                Belleza Suave<br />
                <span className="text-[#B59090]">Resultados Poderosos</span>
              </span>
            </h1>

            <p className="text-3xl text-gray-800 font-bold max-w-4xl mx-auto leading-relaxed mb-12">
              Tratamientos personalizados que transforman tu piel naturalmente.<br/>
              <span className="text-[#B59090] font-black">Rebeca Barreto</span> te espera.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group px-12 py-6 bg-gradient-to-r from-[#D9B5B5] to-[#B59090] text-white rounded-full font-black text-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110">
                <span className="flex items-center gap-3">
                  <Phone className="w-7 h-7" />
                  Quiero Mi Cita Ya
                </span>
              </button>
              
              <div className="flex items-center gap-3 px-8 py-6 bg-white rounded-full shadow-xl border-2 border-[#F5E5E5]">
                <Clock className="w-6 h-6 text-[#B59090]" />
                <span className="text-gray-900 font-bold text-lg">Lun-Sáb 8AM-8PM</span>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            <div className="text-center p-8 bg-white rounded-3xl shadow-xl border-2 border-[#F5E5E5] transform hover:scale-110 transition-all">
              <p className="text-6xl font-black text-[#B59090] mb-3">500+</p>
              <p className="text-base font-bold text-gray-900">Clientas Felices</p>
            </div>
            <div className="text-center p-8 bg-white rounded-3xl shadow-xl border-2 border-[#F5E5E5] transform hover:scale-110 transition-all">
              <p className="text-6xl font-black text-[#B59090] mb-3">15+</p>
              <p className="text-base font-bold text-gray-900">Años de Experiencia</p>
            </div>
            <div className="text-center p-8 bg-white rounded-3xl shadow-xl border-2 border-[#F5E5E5] transform hover:scale-110 transition-all">
              <p className="text-6xl font-black text-[#B59090] mb-3">98%</p>
              <p className="text-base font-bold text-gray-900">Satisfacción</p>
            </div>
            <div className="text-center p-8 bg-white rounded-3xl shadow-xl border-2 border-[#F5E5E5] transform hover:scale-110 transition-all">
              <p className="text-6xl font-black text-[#B59090] mb-3">4.9★</p>
              <p className="text-base font-bold text-gray-900">Valoración</p>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Faciales Grid */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-7xl md:text-8xl font-black mb-8">
              <span className="relative inline-block px-8 py-4">
                <span className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl shadow-2xl"></span>
                <span className="relative text-[#F5E5E5]">Faciales</span>
              </span>
              <span className="text-gray-900"> Premium</span>
            </h2>
            <p className="text-2xl text-gray-800 font-bold max-w-3xl mx-auto">
              Cada tratamiento está diseñado específicamente para tu tipo de piel
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICIOS.faciales.map((servicio, index) => {
              const tratamiento = TRATAMIENTOS_FACIALES[servicio as keyof typeof TRATAMIENTOS_FACIALES]
              return (
              <div
                key={index}
                className="group bg-white rounded-[2rem] border-3 border-[#D9B5B5] shadow-xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 cursor-pointer overflow-hidden"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={tratamiento.imagen}
                    alt={servicio}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-8">
                  <h3 className="font-black text-2xl text-gray-900 mb-3 leading-tight">{servicio}</h3>
                  <p className="text-lg font-bold text-gray-700">{tratamiento.descripcion}</p>
                </div>
              </div>
              )
            })}
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={() => copyPrompt('Imagen profesional de alta calidad: Tratamiento facial Hidrofacial en spa de lujo. Mujer paraguaya de 30-40 años, piel radiante, expresión relajada. Ambiente sereno con tonos nude y rosa suave. Decoración con elementos paraguayos sutiles (ñandutí, artesanías de madera). Iluminación natural perfecta. Estilo minimalista y elegante. Centro de estética Rebeca Barreto en Asunción, Paraguay. Foto profesional, alta resolución, realista.', 'facial-img')}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#D9B5B5] to-[#B59090] text-white rounded-full font-black text-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110"
            >
              {copiedPrompt === 'facial-img' ? (
                <>
                  <Check className="w-7 h-7" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-7 h-7" />
                  <span>Copiar Prompt IA (Tratamiento Facial)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Rebeca Barreto */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#FFF5F5] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-2">
              <div className="relative w-full h-[800px] rounded-[3rem] overflow-hidden shadow-3xl transform hover:scale-105 transition-all duration-700 border-4 border-[#F5E5E5]">
                <Image
                  src="/images/rebeca-barreto.jpg"
                  alt="Rebeca Barreto"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-3 space-y-8">
              <div className="inline-block">
                <span className="px-8 py-4 bg-gradient-to-r from-[#D9B5B5] to-[#B59090] text-white rounded-full text-lg font-black shadow-xl">
                  ⭐ Tu Experta en Belleza Natural
                </span>
              </div>
              
              <h2 className="text-7xl md:text-8xl font-black leading-tight">
                <span className="relative inline-block px-8 py-4 mb-4">
                  <span className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl shadow-2xl"></span>
                  <span className="relative text-[#F5E5E5]">Rebeca</span>
                </span>
                <br />
                <span className="text-gray-900">Barreto</span>
              </h2>

              <div className="space-y-6 text-xl text-gray-800 font-bold leading-relaxed">
                <p>
                  Con más de <span className="font-black text-[#B59090] text-2xl">15 años transformando vidas</span> en Paraguay, 
                  Rebeca Barreto es sinónimo de excelencia en estética y belleza.
                </p>
                <p>
                  Su pasión por realzar la belleza natural de cada mujer paraguaya, combinada con 
                  certificaciones internacionales de primer nivel, la convierten en la opción #1 
                  para quienes buscan resultados reales y duraderos.
                </p>
                <p>
                  Más de <span className="font-black text-[#B59090] text-2xl">500 mujeres paraguayas</span> han confiado 
                  en su experiencia y profesionalismo. ¿Estás lista para ser la próxima?
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-8">
                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-xl border-2 border-[#F5E5E5] transform hover:scale-105 transition-all">
                  <Award className="w-8 h-8 text-[#B59090] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-black text-xl text-gray-900 mb-2">Certificación Internacional</p>
                    <p className="text-base font-bold text-gray-700">Las mejores técnicas del mundo</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-xl border-2 border-[#F5E5E5] transform hover:scale-105 transition-all">
                  <Heart className="w-8 h-8 text-[#B59090] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-black text-xl text-gray-900 mb-2">Tratamientos Personalizados</p>
                    <p className="text-base font-bold text-gray-700">Cada piel es única</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Masajes Corporales */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-7xl md:text-8xl font-black mb-8">
              <span className="text-gray-900">Masajes </span>
              <span className="relative inline-block px-8 py-4">
                <span className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl shadow-2xl"></span>
                <span className="relative text-[#F5E5E5]">Corporales</span>
              </span>
            </h2>
            <p className="text-2xl text-gray-800 font-bold max-w-3xl mx-auto">
              Relajación profunda y resultados visibles en tu cuerpo
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {SERVICIOS.corporales.map((servicio, index) => {
              const tratamiento = TRATAMIENTOS_CORPORALES[servicio as keyof typeof TRATAMIENTOS_CORPORALES]
              return (
              <div
                key={index}
                className="group bg-white rounded-[2rem] border-3 border-[#D9B5B5] shadow-xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 cursor-pointer overflow-hidden"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={tratamiento.imagen}
                    alt={servicio}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-8">
                  <h3 className="font-black text-xl text-gray-900 mb-3 leading-tight">{servicio}</h3>
                  <p className="text-lg font-bold text-gray-700">{tratamiento.descripcion}</p>
                </div>
              </div>
              )
            })}
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={() => copyPrompt('Imagen profesional: Masaje corporal maderoterapia en spa de lujo. Mujer paraguaya de 30-40 años, expresión relajada. Ambiente sereno con tonos nude y rosa suave. Elementos de madera, decoración paraguaya sutil (artesanías, ñandutí). Iluminación cálida natural. Estilo profesional, elegante. Centro Rebeca Barreto, Asunción Paraguay. Alta resolución, realista.', 'corp-img')}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#D9B5B5] to-[#B59090] text-white rounded-full font-black text-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110"
            >
              {copiedPrompt === 'corp-img' ? (
                <>
                  <Check className="w-7 h-7" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-7 h-7" />
                  <span>Copiar Prompt IA (Masaje Corporal)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#FFF5F5] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-7xl md:text-8xl font-black mb-8">
              <span className="relative inline-block px-8 py-4">
                <span className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl shadow-2xl"></span>
                <span className="relative text-[#F5E5E5]">Historias</span>
              </span>
              <span className="text-gray-900"> de Éxito</span>
            </h2>
            <p className="text-2xl text-gray-800 font-bold max-w-3xl mx-auto">
              Paraguayas reales que transformaron su vida
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {TESTIMONIOS.map((testimonio, index) => {
              const testimonioImages = [
                '/images/landing/testimonials/testimonio-mujer-04.jpg',
                '/images/landing/testimonials/testimonio-mujer-05.jpg',
                '/images/landing/testimonials/testimonio-mujer-06.jpg'
              ]
              return (
              <div key={index} className="group bg-white rounded-[2rem] overflow-hidden shadow-3xl border-4 border-[#F5E5E5] hover:border-[#D9B5B5] hover:shadow-4xl transition-all duration-500 transform hover:scale-105">
                <div className="relative h-[450px] overflow-hidden">
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
                    <span className="px-5 py-3 bg-gradient-to-r from-[#D9B5B5] to-[#B59090] text-white rounded-full text-base font-black shadow-lg">
                      {testimonio.tratamiento}
                    </span>
                  </div>
                  <p className="text-gray-800 font-bold text-lg leading-relaxed">
                    "{testimonio.historia}"
                  </p>
                  <div className="flex items-center gap-2 mt-6">
                    {Array.from({length: testimonio.rating}).map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-[#D9B5B5] fill-[#D9B5B5]" />
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
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#D9B5B5] to-[#B59090] text-white rounded-full font-black text-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110"
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
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-7xl md:text-8xl font-black mb-8">
              <span className="text-gray-900">Maquillaje </span>
              <span className="relative inline-block px-8 py-4">
                <span className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl shadow-2xl"></span>
                <span className="relative text-[#F5E5E5]">Profesional</span>
              </span>
            </h2>
            <p className="text-2xl text-gray-800 font-bold max-w-3xl mx-auto">
              Perfección en cada detalle para tu día especial
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICIOS.maquillaje.map((servicio, index) => {
              const tratamiento = TRATAMIENTOS_MAQUILLAJE[servicio as keyof typeof TRATAMIENTOS_MAQUILLAJE]
              return (
              <div
                key={index}
                className="group bg-white rounded-[2rem] border-3 border-[#D9B5B5] shadow-xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 cursor-pointer overflow-hidden"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={tratamiento.imagen}
                    alt={servicio}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-8">
                  <h3 className="font-black text-2xl text-gray-900 mb-3 leading-tight">{servicio}</h3>
                  <p className="text-lg font-bold text-gray-700">{tratamiento.descripcion}</p>
                </div>
              </div>
              )
            })}
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={() => copyPrompt('Imagen profesional: Maquillaje profesional siendo aplicado. Mujer paraguaya de 25-35 años, rostro perfecto, piel impecable. Spa elegante minimalista. Productos de belleza de alta gama, espejo con iluminación profesional, brochas y paletas. Ambiente paraguayo sofisticado y moderno. Tonos nude y rosa suave. Centro Rebeca Barreto, Asunción. Alta resolución, estilo profesional, realista.', 'maq-img')}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#D9B5B5] to-[#B59090] text-white rounded-full font-black text-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110"
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

      {/* CTA Final */}
      <section className="py-32 px-4 bg-gradient-to-br from-[#D9B5B5] via-[#C4A5A5] to-[#D9B5B5] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-white rounded-full opacity-5"></div>
          <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-white rounded-full opacity-5"></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-7xl md:text-9xl font-black text-white mb-10 drop-shadow-2xl leading-tight">
            Tu Mejor Versión<br />Te Espera
          </h2>
          <p className="text-4xl text-white font-black mb-16 drop-shadow-xl">
            ¡Reserva tu cita hoy y descubre la diferencia!
          </p>
          <button className="group px-20 py-8 bg-white text-[#B59090] rounded-full font-black text-3xl shadow-3xl hover:shadow-4xl transition-all transform hover:scale-110">
            <span className="flex items-center gap-4 justify-center">
              <Phone className="w-10 h-10" />
              Contactar Ahora
            </span>
          </button>
          <p className="text-white/90 mt-10 text-2xl font-bold drop-shadow-lg">✨ Cupos limitados cada semana</p>
        </div>
      </section>
    </div>
  )
}

