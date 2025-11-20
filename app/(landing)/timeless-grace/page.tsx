'use client'

import { useState } from 'react'
import { Sparkles, Copy, Check, Star, Phone, Crown, Clock, Award, Gem, Shield, Heart } from 'lucide-react'
import Image from 'next/image'

const SERVICIOS = {
  faciales: [
    'Hidrofacial Profesional',
    'Limpieza Facial Profunda',
    'Exfoliación + Extracción',
    'Peeling ultrasónico',
    'Dermapen / Microneedling',
    'Tratamiento Antiage',
    'Tratamiento para Manchas',
    'Hidratación y Luminosidad',
  ],
  corporales: [
    'Masaje Reductor',
    'Maderoterapia',
    'Drenaje Linfático',
    'Combo Reductor + Madero + Drenaje (1 hora)',
    'Masaje Descontracturante',
  ],
  maquillaje: [
    'Maquillaje Social',
    'Maquillaje para Eventos',
    'Maquillaje para Novia',
    'Prueba de Maquillaje',
  ],
}

const TESTIMONIOS = [
  {
    nombre: 'Silvia Montenegro',
    edad: 47,
    ubicacion: 'Villarrica',
    historia: 'A mis 47 años quería lucir elegante y atemporal, no "rejuvenecida artificialmente". Rebeca entendió perfectamente mi visión. El tratamiento antiage y Dermapen me dieron una piel firme, luminosa y sofisticada. Luzco mi edad con orgullo y elegancia.',
    tratamiento: 'Antiage + Dermapen Elite',
    rating: 5
  },
  {
    nombre: 'Alicia Cardozo',
    edad: 52,
    ubicacion: 'Coronel Oviedo',
    historia: 'La elegancia no tiene edad, y Rebeca lo sabe. Con el Hidrofacial y peeling ultrasónico, mi piel recuperó la textura y luminosidad que tenía hace 15 años. No busco parecer joven, busco lucir impecable. Y lo logré.',
    tratamiento: 'Hidrofacial + Peeling Premium',
    rating: 5
  },
  {
    nombre: 'Graciela Escobar',
    edad: 45,
    ubicacion: 'Concepción',
    historia: 'Quería tratamientos sofisticados que respetaran mi estilo clásico y elegante. Rebeca ofrece justo eso: técnicas de vanguardia con resultados discretos y refinados. El tratamiento de manchas y luminosidad transformó mi piel manteniendo mi esencia.',
    tratamiento: 'Manchas + Luminosidad Elite',
    rating: 5
  }
]

export default function TimelessGracePage() {
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null)

  const copyPrompt = (prompt: string, id: string) => {
    navigator.clipboard.writeText(prompt)
    setCopiedPrompt(id)
    setTimeout(() => setCopiedPrompt(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F5F2] via-white to-[#FAF8F5]">
      {/* Prueba Social Flotante - TIMELESS */}
      <div className="fixed bottom-10 left-10 z-50 bg-gradient-to-r from-[#E8D8C8] to-[#D8C8B8] rounded-3xl shadow-3xl p-8 max-w-md hidden md:block border-2 border-[#C8B8A8]">
        <div className="flex items-center gap-5">
          <div className="w-18 h-18 rounded-full bg-gradient-to-br from-[#D8C8B8] to-[#C8B8A8] flex items-center justify-center shadow-2xl">
            <Clock className="w-9 h-9 text-white" />
          </div>
          <div>
            <p className="text-2xl font-black text-gray-900">Dra. María R.</p>
            <p className="text-base font-bold text-[#A89888]">Elite Treatment Booked</p>
          </div>
        </div>
      </div>

      {/* Hero Section - TIMELESS ELEGANCE */}
      <section className="relative min-h-screen flex items-center px-4 py-28 bg-gradient-to-br from-[#F8F5F2] via-white to-[#FAF8F5]">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-[#D8C8B8] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-[450px] h-[450px] bg-[#C8B8A8] rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="text-center space-y-16">
            <div className="inline-flex items-center gap-4 px-12 py-6 bg-white border-3 border-[#D8C8B8] rounded-full shadow-2xl">
              <Clock className="w-8 h-8 text-[#A89888]" />
              <span className="text-gray-900 font-black text-2xl uppercase tracking-widest">Elegancia Atemporal</span>
            </div>
            
            <h1 className="text-[11rem] md:text-[14rem] font-black leading-none">
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 rounded-[6rem] blur-3xl opacity-40"></span>
                <span className="relative block px-24 py-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-[6rem] shadow-4xl">
                  <span className="bg-gradient-to-r from-[#F8E8D8] via-[#E8D8C8] to-[#D8C8B8] bg-clip-text text-transparent drop-shadow-3xl">
                    TIMELESS
                  </span>
                </span>
              </span>
              <br />
              <span className="text-gray-900 mt-8 inline-block drop-shadow-2xl">GRACE</span>
            </h1>

            <p className="text-4xl text-gray-800 font-bold max-w-5xl mx-auto leading-relaxed">
              Donde la elegancia trasciende el tiempo y la belleza se cultiva con sabiduría.
              <br />
              <span className="font-black text-[#A89888]">Rebeca Barreto</span> - sofisticación eterna.
            </p>

            <button className="group px-20 py-10 bg-black text-amber-500 rounded-full font-black text-4xl shadow-4xl hover:shadow-5xl transition-all transform hover:scale-110">
              <span className="flex items-center gap-5 justify-center">
                <Phone className="w-12 h-12" />
                Experiencia Atemporal
              </span>
            </button>

            {/* Stats Elegantes */}
            <div className="grid md:grid-cols-4 gap-12 pt-20">
              <div className="p-12 bg-white border-3 border-[#E8D8C8] rounded-[3rem] shadow-3xl transform hover:scale-110 transition-all">
                <Clock className="w-16 h-16 text-[#A89888] mx-auto mb-6" />
                <p className="text-7xl font-black text-gray-900 mb-4">15+</p>
                <p className="text-xl font-bold text-gray-700">Años de Excelencia</p>
              </div>
              <div className="p-12 bg-white border-3 border-[#E8D8C8] rounded-[3rem] shadow-3xl transform hover:scale-110 transition-all">
                <Crown className="w-16 h-16 text-[#A89888] mx-auto mb-6" />
                <p className="text-7xl font-black text-gray-900 mb-4">500+</p>
                <p className="text-xl font-bold text-gray-700">Clientas Distinguidas</p>
              </div>
              <div className="p-12 bg-white border-3 border-[#E8D8C8] rounded-[3rem] shadow-3xl transform hover:scale-110 transition-all">
                <Gem className="w-16 h-16 text-[#A89888] mx-auto mb-6" />
                <p className="text-7xl font-black text-gray-900 mb-4">98%</p>
                <p className="text-xl font-bold text-gray-700">Satisfacción</p>
              </div>
              <div className="p-12 bg-white border-3 border-[#E8D8C8] rounded-[3rem] shadow-3xl transform hover:scale-110 transition-all">
                <Star className="w-16 h-16 text-[#A89888] mx-auto mb-6" />
                <p className="text-7xl font-black text-gray-900 mb-4">4.9★</p>
                <p className="text-xl font-bold text-gray-700">Excelencia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tratamientos Faciales - SOPHISTICATED GRID */}
      <section className="py-36 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-28">
            <div className="inline-flex items-center gap-4 px-10 py-5 bg-black text-amber-500 rounded-full mb-12 shadow-3xl">
              <Award className="w-7 h-7" />
              <span className="font-black text-xl uppercase tracking-widest">TRATAMIENTOS SOFISTICADOS</span>
            </div>
            
            <h2 className="text-9xl md:text-[10rem] font-black text-gray-900 mb-12 leading-tight">
              FACIALES<br />
              <span className="text-[#A89888]">ELEGANTES</span>
            </h2>
            <p className="text-3xl text-gray-700 font-bold max-w-4xl mx-auto">
              Refinamiento y resultados que perduran en el tiempo
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {SERVICIOS.faciales.map((servicio, index) => {
              const facialesImages = [
                '/images/landing/treatments/facial-hidrofacial.jpg.png',
                '/images/landing/treatments/facial-limpieza-profunda.jpg.png',
                '/images/landing/treatments/facial-exfoliacion.jpg',
                '/images/landing/treatments/facial-peeling-ultrasonico.jpg',
                '/images/landing/treatments/facial-dermapen.jpg',
                '/images/landing/treatments/facial-antiage.jpg',
                '/images/landing/treatments/facial-manchas.jpg',
                '/images/landing/treatments/facial-hidratacion-luminosidad.jpg'
              ]
              return (
              <div
                key={index}
                className="group bg-white rounded-[3.5rem] shadow-3xl hover:shadow-4xl transition-all duration-500 transform hover:scale-105 cursor-pointer border-3 border-[#E8D8C8] hover:border-[#D8C8B8] overflow-hidden"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={facialesImages[index]}
                    alt={servicio}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-8">
                  <h3 className="font-black text-2xl text-gray-900 mb-3 leading-tight">{servicio}</h3>
                  <p className="text-lg font-bold text-gray-600">Elegancia duradera</p>
                </div>
              </div>
              )
            })}
          </div>

          <div className="mt-28 text-center">
            <button
              onClick={() => copyPrompt('Imagen profesional de alta calidad: Tratamiento facial Hidrofacial en spa de lujo. Mujer paraguaya de 30-40 años, piel radiante, expresión relajada. Ambiente sereno con tonos nude y rosa suave. Decoración con elementos paraguayos sutiles (ñandutí, artesanías de madera). Iluminación natural perfecta. Estilo minimalista y elegante. Centro de estética Rebeca Barreto en Asunción, Paraguay. Foto profesional, alta resolución, realista.', 'facial-img')}
              className="inline-flex items-center gap-5 px-16 py-8 bg-black text-amber-500 rounded-full font-black text-2xl shadow-3xl hover:shadow-4xl transition-all transform hover:scale-110"
            >
              {copiedPrompt === 'facial-img' ? (
                <>
                  <Check className="w-9 h-9" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-9 h-9" />
                  <span>Copiar Prompt IA (Faciales)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Rebeca Barreto - TIMELESS EXPERT */}
      <section className="py-36 px-4 bg-gradient-to-b from-[#F8F5F2] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-28 items-center">
            <div className="space-y-14">
              <div>
                <div className="inline-flex items-center gap-4 px-10 py-5 bg-black text-amber-500 rounded-full mb-10 shadow-3xl">
                  <Crown className="w-7 h-7" />
                  <span className="font-black text-xl">MAESTRA DE LA ELEGANCIA</span>
                </div>
                
                <h2 className="text-[10rem] md:text-[12rem] font-black leading-none mb-10">
                  <span className="text-gray-900">REBECA</span>
                  <br />
                  <span className="text-[#A89888]">BARRETO</span>
                </h2>
              </div>

              <div className="space-y-10 text-3xl text-gray-700 font-bold leading-relaxed">
                <p>
                  Con más de <span className="font-black text-gray-900">15 años definiendo estándares</span> de 
                  excelencia en estética, Rebeca Barreto ha cultivado una reputación 
                  de <span className="font-black text-[#A89888]">sofisticación y resultados atemporales</span>.
                </p>
                <p>
                  Su enfoque combina <span className="font-black text-gray-900">técnicas de vanguardia</span> con 
                  una sensibilidad estética que respeta la elegancia natural de cada mujer. No persigue 
                  tendencias pasajeras, sino <span className="font-black text-[#A89888]">belleza que perdura</span>.
                </p>
                <p>
                  Certificada internacionalmente y reconocida por su <span className="font-black text-gray-900">profesionalismo 
                  impecable</span>, más de 500 mujeres distinguidas confían en su criterio y experiencia.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-10 pt-10">
                <div className="p-12 bg-white rounded-[2.5rem] shadow-3xl border-3 border-[#E8D8C8] transform hover:scale-105 transition-all">
                  <Shield className="w-14 h-14 text-[#A89888] mb-8" />
                  <p className="font-black text-3xl text-gray-900 mb-4">Excelencia Certificada</p>
                  <p className="text-xl font-bold text-gray-600">Internacional</p>
                </div>
                <div className="p-12 bg-white rounded-[2.5rem] shadow-3xl border-3 border-[#E8D8C8] transform hover:scale-105 transition-all">
                  <Clock className="w-14 h-14 text-[#A89888] mb-8" />
                  <p className="font-black text-3xl text-gray-900 mb-4">Resultados Duraderos</p>
                  <p className="text-xl font-bold text-gray-600">Atemporales</p>
                </div>
                <div className="p-12 bg-white rounded-[2.5rem] shadow-3xl border-3 border-[#E8D8C8] transform hover:scale-105 transition-all">
                  <Heart className="w-14 h-14 text-[#A89888] mb-8" />
                  <p className="font-black text-3xl text-gray-900 mb-4">Atención Personalizada</p>
                  <p className="text-xl font-bold text-gray-600">Exquisita</p>
                </div>
                <div className="p-12 bg-white rounded-[2.5rem] shadow-3xl border-3 border-[#E8D8C8] transform hover:scale-105 transition-all">
                  <Gem className="w-14 h-14 text-[#A89888] mb-8" />
                  <p className="font-black text-3xl text-gray-900 mb-4">Productos Premium</p>
                  <p className="text-xl font-bold text-gray-600">Selectos</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D8C8B8] to-[#C8B8A8] rounded-[4.5rem] blur-3xl opacity-20"></div>
              <div className="relative w-full h-[900px] rounded-[4.5rem] overflow-hidden shadow-4xl transform hover:scale-105 transition-all duration-700 border-8 border-white">
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

      {/* Masajes Corporales */}
      <section className="py-36 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-28">
            <h2 className="text-9xl md:text-[10rem] font-black text-gray-900 mb-12 leading-tight">
              MASAJES<br />
              <span className="text-[#A89888]">REFINADOS</span>
            </h2>
            <p className="text-3xl text-gray-700 font-bold max-w-4xl mx-auto">
              Bienestar sofisticado para cuerpo y espíritu
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
            {SERVICIOS.corporales.map((servicio, index) => {
              const corporalesImages = [
                '/images/landing/treatments/corporal-masaje-reductor.jpg',
                '/images/landing/treatments/corporal-maderoterapia.jpg',
                '/images/landing/treatments/corporal-drenaje-linfatico.jpg',
                '/images/landing/treatments/corporal-combo-reductor.jpg',
                '/images/landing/treatments/corporal-masaje-descontracturante.jpg'
              ]
              return (
              <div
                key={index}
                className="group bg-white rounded-[3.5rem] shadow-3xl hover:shadow-4xl transition-all duration-500 transform hover:scale-105 cursor-pointer border-3 border-[#E8D8C8] hover:border-[#D8C8B8] overflow-hidden"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={corporalesImages[index]}
                    alt={servicio}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-8">
                  <h3 className="font-black text-xl text-gray-900 mb-3 leading-tight">{servicio}</h3>
                  <p className="text-lg font-bold text-gray-600">Refinamiento total</p>
                </div>
              </div>
              )
            })}
          </div>

          <div className="mt-28 text-center">
            <button
              onClick={() => copyPrompt('Imagen profesional: Masaje corporal maderoterapia en spa de lujo. Mujer paraguaya de 30-40 años, expresión relajada. Ambiente sereno con tonos nude y rosa suave. Elementos de madera, decoración paraguaya sutil (artesanías, ñandutí). Iluminación cálida natural. Estilo profesional, elegante. Centro Rebeca Barreto, Asunción Paraguay. Alta resolución, realista.', 'corp-img')}
              className="inline-flex items-center gap-5 px-16 py-8 bg-black text-amber-500 rounded-full font-black text-2xl shadow-3xl hover:shadow-4xl transition-all transform hover:scale-110"
            >
              {copiedPrompt === 'corp-img' ? (
                <>
                  <Check className="w-9 h-9" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-9 h-9" />
                  <span>Copiar Prompt IA (Corporales)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Testimonios - REFINED CARDS */}
      <section className="py-36 px-4 bg-gradient-to-b from-[#F8F5F2] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-28">
            <h2 className="text-9xl md:text-[10rem] font-black text-gray-900 mb-12 leading-tight">
              CLIENTAS<br />
              <span className="text-[#A89888]">DISTINGUIDAS</span>
            </h2>
            <p className="text-3xl text-gray-700 font-bold max-w-4xl mx-auto">
              Mujeres de criterio que eligen lo mejor
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-14">
            {TESTIMONIOS.map((testimonio, index) => {
              const testimonioImages = [
                '/images/landing/testimonials/testimonio-mujer-01.jpg',
                '/images/landing/testimonials/testimonio-mujer-02.jpg',
                '/images/landing/testimonials/testimonio-mujer-03.jpg'
              ]
              return (
              <div key={index} className="group bg-white rounded-[3.5rem] overflow-hidden shadow-4xl border-4 border-[#E8D8C8] hover:border-[#D8C8B8] hover:shadow-5xl transition-all duration-500 transform hover:scale-105">
                <div className="relative h-[520px] overflow-hidden">
                  <Image
                    src={testimonioImages[index]}
                    alt={`${testimonio.nombre} - Cliente satisfecha`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-14 text-white">
                    <p className="font-black text-4xl mb-4">{testimonio.nombre}</p>
                    <p className="font-bold text-2xl">{testimonio.edad} años</p>
                    <p className="font-semibold text-xl mt-3">{testimonio.ubicacion}</p>
                  </div>
                </div>
                <div className="p-14">
                  <div className="mb-10">
                    <span className="px-8 py-4 bg-black text-amber-500 rounded-full text-xl font-black shadow-2xl">
                      {testimonio.tratamiento}
                    </span>
                  </div>
                  <p className="text-gray-800 font-bold text-2xl leading-relaxed mb-10">
                    "{testimonio.historia}"
                  </p>
                  <div className="flex gap-3">
                    {Array.from({length: testimonio.rating}).map((_, i) => (
                      <Star key={i} className="w-8 h-8 text-[#D8C8B8] fill-[#D8C8B8]" />
                    ))}
                  </div>
                </div>
              </div>
              )
            })}
          </div>

          <div className="mt-28 text-center">
            <button
              onClick={() => copyPrompt('Foto profesional retrato: Mujer paraguaya de 30-45 años, sonriente, piel radiante y perfecta, rasgos típicos paraguayos. Ambiente: interior de casa moderna paraguaya con decoración típica (ñandutí en tonos pastel, artesanías de madera, colores tierra y nude, plantas nativas). O plaza/centro comercial de Asunción al fondo desenfocado. Iluminación natural perfecta, luz suave. Estilo: retrato profesional, alta calidad, realista. La mujer debe lucir feliz, confiada y radiante después de su tratamiento facial. Fondo desenfocado mostrando ambiente paraguayo auténtico y acogedor.', 'test-img')}
              className="inline-flex items-center gap-5 px-16 py-8 bg-black text-amber-500 rounded-full font-black text-2xl shadow-3xl hover:shadow-4xl transition-all transform hover:scale-110"
            >
              {copiedPrompt === 'test-img' ? (
                <>
                  <Check className="w-9 h-9" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-9 h-9" />
                  <span>Copiar Prompt IA (Testimonios)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Maquillaje */}
      <section className="py-36 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-28">
            <h2 className="text-9xl md:text-[10rem] font-black text-gray-900 mb-12 leading-tight">
              MAQUILLAJE<br />
              <span className="text-[#A89888]">CLÁSICO</span>
            </h2>
            <p className="text-3xl text-gray-700 font-bold max-w-4xl mx-auto">
              Elegancia refinada para tu ocasión especial
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
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
                className="group bg-white rounded-[3.5rem] shadow-3xl hover:shadow-4xl transition-all duration-500 transform hover:scale-105 cursor-pointer border-3 border-[#E8D8C8] hover:border-[#D8C8B8] overflow-hidden"
              >
                <div className="relative h-56 overflow-hidden">
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
                  <p className="text-lg font-bold text-gray-600">Elegancia atemporal</p>
                </div>
              </div>
              )
            })}
          </div>

          <div className="mt-28 text-center">
            <button
              onClick={() => copyPrompt('Imagen profesional: Maquillaje profesional siendo aplicado. Mujer paraguaya de 25-35 años, rostro perfecto, piel impecable. Spa elegante minimalista. Productos de belleza de alta gama, espejo con iluminación profesional, brochas y paletas. Ambiente paraguayo sofisticado y moderno. Tonos nude y rosa suave. Centro Rebeca Barreto, Asunción. Alta resolución, estilo profesional, realista.', 'maq-img')}
              className="inline-flex items-center gap-5 px-16 py-8 bg-black text-amber-500 rounded-full font-black text-2xl shadow-3xl hover:shadow-4xl transition-all transform hover:scale-110"
            >
              {copiedPrompt === 'maq-img' ? (
                <>
                  <Check className="w-9 h-9" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-9 h-9" />
                  <span>Copiar Prompt IA (Maquillaje)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* CTA Final - TIMELESS SOPHISTICATION */}
      <section className="py-44 px-4 bg-gradient-to-br from-[#D8C8B8] via-[#C8B8A8] to-[#B8A898] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-white rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-white rounded-full opacity-10 blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <Clock className="w-28 h-28 text-white mx-auto mb-12" />
          <h2 className="text-[12rem] md:text-[14rem] font-black text-white mb-20 drop-shadow-3xl leading-none">
            ELEGANCIA<br />ETERNA
          </h2>
          <p className="text-6xl text-white font-black mb-28 drop-shadow-2xl">
            Tu belleza atemporal te espera
          </p>
          <button className="group px-28 py-14 bg-white text-[#A89888] rounded-full font-black text-5xl shadow-5xl hover:shadow-6xl transition-all transform hover:scale-110">
            <span className="flex items-center gap-6 justify-center">
              <Phone className="w-16 h-16" />
              Reservar Elite
            </span>
          </button>
          <p className="text-white/90 mt-20 text-4xl font-bold drop-shadow-xl">✨ Experiencia refinada · Paraguay</p>
        </div>
      </section>
    </div>
  )
}


