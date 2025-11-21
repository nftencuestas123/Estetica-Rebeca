'use client'

import { useState } from 'react'
import { Sparkles, Copy, Check, Star, Phone, Waves, Droplet, Flower2, Sun, Heart, Smile } from 'lucide-react'
import Image from 'next/image'
import { SERVICIOS, TRATAMIENTOS_FACIALES, TRATAMIENTOS_CORPORALES, TRATAMIENTOS_MAQUILLAJE } from '@/constants/tratamientos'

const TESTIMONIOS = [
  {
    nombre: 'Susana Riveros',
    edad: 39,
    ubicacion: 'Carapeguá',
    historia: 'Necesitaba desconectar del estrés y reconectar conmigo misma. El Hidrofacial de Rebeca no solo transformó mi piel, transformó mi estado de ánimo. Es un oasis de paz donde cada tratamiento es una experiencia de renovación total. Salí radiante por dentro y por fuera.',
    tratamiento: 'Hidrofacial Serenity',
    rating: 5
  },
  {
    nombre: 'Miriam Espínola',
    edad: 44,
    ubicacion: 'Piribebuy',
    historia: 'Encontré en Rebeca Barreto mi refugio de tranquilidad. El tratamiento antiage combinado con el ambiente sereno de su spa me devolvió la paz y la confianza. Mi piel luce descansada, luminosa y rejuvenecida. Es más que un tratamiento, es terapia para el alma.',
    tratamiento: 'Antiage + Spa Experience',
    rating: 5
  },
  {
    nombre: 'Teresa Giménez',
    edad: 37,
    ubicacion: 'Altos',
    historia: 'El ritmo de vida acelerado me estaba pasando factura. El peeling ultrasónico y masaje relajante de Rebeca me ayudaron a recuperar mi equilibrio. No solo mejoró mi piel, mejoró mi vida. Ahora es mi ritual mensual de autocuidado y renovación.',
    tratamiento: 'Peeling + Masaje Zen',
    rating: 5
  }
]

export default function SereneSpaPage() {
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null)

  const copyPrompt = (prompt: string, id: string) => {
    navigator.clipboard.writeText(prompt)
    setCopiedPrompt(id)
    setTimeout(() => setCopiedPrompt(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F0F8FA] via-[#F8FCFE] to-white">
      {/* Prueba Social Flotante - SERENE */}
      <div className="fixed bottom-10 left-10 z-50 bg-white/95 backdrop-blur-lg rounded-[2.5rem] shadow-3xl p-8 max-w-md hidden md:block border-3 border-[#B8D8E8]">
        <div className="flex items-center gap-5">
          <div className="w-18 h-18 rounded-full bg-gradient-to-br from-[#B8D8E8] to-[#A8C8D8] flex items-center justify-center shadow-2xl">
            <Waves className="w-9 h-9 text-white" />
          </div>
          <div>
            <p className="text-2xl font-black text-gray-900">Ana Laura G.</p>
            <p className="text-base font-bold text-[#88B8C8]">Spa Experience Reservada</p>
          </div>
        </div>
      </div>

      {/* Hero Section - SERENE & TRANQUIL */}
      <section className="relative min-h-screen flex items-center px-4 py-28">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-[450px] h-[450px] bg-[#B8D8E8] rounded-full blur-3xl opacity-20"></div>
          <div className="absolute top-1/2 right-20 w-[400px] h-[400px] bg-[#A8C8D8] rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-20 left-1/3 w-[420px] h-[420px] bg-[#98B8C8] rounded-full blur-3xl opacity-15"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="text-center space-y-16">
            <div className="inline-flex items-center gap-4 px-12 py-6 bg-white/90 backdrop-blur-md rounded-full shadow-3xl border-3 border-[#B8D8E8]">
              <Waves className="w-8 h-8 text-[#88B8C8]" />
              <span className="text-gray-900 font-black text-2xl uppercase tracking-widest">Santuario de Paz</span>
            </div>
            
            <h1 className="text-[11rem] md:text-[15rem] font-black leading-none">
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 rounded-[6rem] blur-3xl opacity-40"></span>
                <span className="relative block px-24 py-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-[6rem] shadow-4xl">
                  <span className="bg-gradient-to-r from-[#D8E8F8] via-[#C8D8E8] to-[#B8D8E8] bg-clip-text text-transparent drop-shadow-3xl">
                    SERENE
                  </span>
                </span>
              </span>
              <br />
              <span className="text-gray-900 mt-8 inline-block drop-shadow-2xl">SPA</span>
            </h1>

            <p className="text-4xl text-gray-800 font-bold max-w-6xl mx-auto leading-relaxed">
              Un oasis de tranquilidad donde tu belleza y bienestar renacen.
              <br />
              <span className="font-black text-[#88B8C8]">Rebeca Barreto</span> - tu refugio de serenidad en Paraguay.
            </p>

            <button className="group px-20 py-10 bg-black text-amber-500 rounded-full font-black text-4xl shadow-4xl hover:shadow-5xl transition-all transform hover:scale-110">
              <span className="flex items-center gap-5 justify-center">
                <Phone className="w-12 h-12" />
                Reserva Tu Paz
              </span>
            </button>

            {/* Stats Serenos */}
            <div className="grid md:grid-cols-4 gap-12 pt-20">
              <div className="p-12 bg-white/90 backdrop-blur-sm rounded-[3rem] shadow-3xl border-3 border-[#D8E8F8] transform hover:scale-110 transition-all">
                <Droplet className="w-16 h-16 text-[#88B8C8] mx-auto mb-6" />
                <p className="text-7xl font-black text-gray-900 mb-4">500+</p>
                <p className="text-xl font-bold text-gray-700">Almas Renovadas</p>
              </div>
              <div className="p-12 bg-white/90 backdrop-blur-sm rounded-[3rem] shadow-3xl border-3 border-[#D8E8F8] transform hover:scale-110 transition-all">
                <Waves className="w-16 h-16 text-[#88B8C8] mx-auto mb-6" />
                <p className="text-7xl font-black text-gray-900 mb-4">15+</p>
                <p className="text-xl font-bold text-gray-700">Años de Paz</p>
              </div>
              <div className="p-12 bg-white/90 backdrop-blur-sm rounded-[3rem] shadow-3xl border-3 border-[#D8E8F8] transform hover:scale-110 transition-all">
                <Heart className="w-16 h-16 text-[#88B8C8] mx-auto mb-6" />
                <p className="text-7xl font-black text-gray-900 mb-4">98%</p>
                <p className="text-xl font-bold text-gray-700">Satisfacción</p>
              </div>
              <div className="p-12 bg-white/90 backdrop-blur-sm rounded-[3rem] shadow-3xl border-3 border-[#D8E8F8] transform hover:scale-110 transition-all">
                <Star className="w-16 h-16 text-[#88B8C8] mx-auto mb-6" />
                <p className="text-7xl font-black text-gray-900 mb-4">4.9★</p>
                <p className="text-xl font-bold text-gray-700">Excelencia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tratamientos Faciales - ZEN GRID */}
      <section className="py-36 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-28">
            <div className="inline-flex items-center gap-4 px-10 py-5 bg-black text-amber-500 rounded-full mb-12 shadow-3xl">
              <Flower2 className="w-7 h-7" />
              <span className="font-black text-xl uppercase tracking-widest">FACIALES REJUVENECEDORES</span>
            </div>
            
            <h2 className="text-9xl md:text-[10rem] font-black text-gray-900 mb-12 leading-tight">
              TRATAMIENTOS<br />
              <span className="text-[#88B8C8]">SERENOS</span>
            </h2>
            <p className="text-3xl text-gray-700 font-bold max-w-4xl mx-auto">
              Cada sesión es una experiencia de renovación profunda
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {SERVICIOS.faciales.map((servicio, index) => {
              const tratamiento = TRATAMIENTOS_FACIALES[servicio as keyof typeof TRATAMIENTOS_FACIALES]
              return (
              <div
                key={index}
                className="group bg-white rounded-[3.5rem] shadow-3xl hover:shadow-4xl transition-all duration-500 transform hover:scale-105 cursor-pointer border-3 border-[#D8E8F8] hover:border-[#B8D8E8] overflow-hidden"
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
                  <p className="text-lg font-bold text-gray-600">{tratamiento.descripcion}</p>
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

      {/* Rebeca Barreto - ZEN MASTER */}
      <section className="py-36 px-4 bg-gradient-to-b from-[#F0F8FA] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-28 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#B8D8E8] to-[#A8C8D8] rounded-[4.5rem] blur-3xl opacity-20"></div>
              <div className="relative w-full h-[900px] rounded-[4.5rem] overflow-hidden shadow-4xl transform hover:scale-105 transition-all duration-700 border-8 border-white">
                <Image
                  src="/images/rebeca-barreto.jpg"
                  alt="Rebeca Barreto"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="space-y-14 order-1 lg:order-2">
              <div>
                <div className="inline-flex items-center gap-4 px-10 py-5 bg-black text-amber-500 rounded-full mb-10 shadow-3xl">
                  <Sun className="w-7 h-7" />
                  <span className="font-black text-xl">MAESTRA DEL BIENESTAR</span>
                </div>
                
                <h2 className="text-[10rem] md:text-[12rem] font-black leading-none mb-10">
                  <span className="text-gray-900">REBECA</span>
                  <br />
                  <span className="text-[#88B8C8]">BARRETO</span>
                </h2>
              </div>

              <div className="space-y-10 text-3xl text-gray-700 font-bold leading-relaxed">
                <p>
                  Durante más de <span className="font-black text-gray-900">15 años</span>, Rebeca Barreto ha 
                  creado un santuario donde la <span className="font-black text-[#88B8C8]">belleza y el bienestar</span> se 
                  encuentran en perfecta armonía.
                </p>
                <p>
                  Su visión va más allá de los tratamientos: cada sesión es una <span className="font-black text-gray-900">experiencia 
                  holística</span> que nutre tu piel, calma tu mente y renueva tu espíritu. En su spa, el tiempo 
                  se detiene y solo existe el presente.
                </p>
                <p>
                  Certificada internacionalmente y guiada por la <span className="font-black text-[#88B8C8]">filosofía del bienestar 
                  integral</span>, más de 500 mujeres han encontrado en su spa su refugio de paz y renovación.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-10 pt-10">
                <div className="p-12 bg-white rounded-[2.5rem] shadow-3xl border-3 border-[#D8E8F8] transform hover:scale-105 transition-all">
                  <Waves className="w-14 h-14 text-[#88B8C8] mb-8" />
                  <p className="font-black text-3xl text-gray-900 mb-4">Ambiente Zen</p>
                  <p className="text-xl font-bold text-gray-600">Paz absoluta</p>
                </div>
                <div className="p-12 bg-white rounded-[2.5rem] shadow-3xl border-3 border-[#D8E8F8] transform hover:scale-105 transition-all">
                  <Heart className="w-14 h-14 text-[#88B8C8] mb-8" />
                  <p className="font-black text-3xl text-gray-900 mb-4">Cuidado Integral</p>
                  <p className="text-xl font-bold text-gray-600">Cuerpo y alma</p>
                </div>
                <div className="p-12 bg-white rounded-[2.5rem] shadow-3xl border-3 border-[#D8E8F8] transform hover:scale-105 transition-all">
                  <Flower2 className="w-14 h-14 text-[#88B8C8] mb-8" />
                  <p className="font-black text-3xl text-gray-900 mb-4">Productos Naturales</p>
                  <p className="text-xl font-bold text-gray-600">Esencia pura</p>
                </div>
                <div className="p-12 bg-white rounded-[2.5rem] shadow-3xl border-3 border-[#D8E8F8] transform hover:scale-105 transition-all">
                  <Smile className="w-14 h-14 text-[#88B8C8] mb-8" />
                  <p className="font-black text-3xl text-gray-900 mb-4">98% Satisfacción</p>
                  <p className="text-xl font-bold text-gray-600">Clientas renovadas</p>
                </div>
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
              <span className="text-[#88B8C8]">RELAJANTES</span>
            </h2>
            <p className="text-3xl text-gray-700 font-bold max-w-4xl mx-auto">
              Libera tensiones y reconecta con tu bienestar
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
            {SERVICIOS.corporales.map((servicio, index) => {
              const tratamiento = TRATAMIENTOS_CORPORALES[servicio as keyof typeof TRATAMIENTOS_CORPORALES]
              return (
              <div
                key={index}
                className="group bg-white rounded-[3.5rem] shadow-3xl hover:shadow-4xl transition-all duration-500 transform hover:scale-105 cursor-pointer border-3 border-[#D8E8F8] hover:border-[#B8D8E8] overflow-hidden"
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
                  <p className="text-lg font-bold text-gray-600">{tratamiento.descripcion}</p>
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

      {/* Testimonios - ZEN CARDS */}
      <section className="py-36 px-4 bg-gradient-to-b from-[#F0F8FA] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-28">
            <h2 className="text-9xl md:text-[10rem] font-black text-gray-900 mb-12 leading-tight">
              HISTORIAS<br />
              <span className="text-[#88B8C8]">DE PAZ</span>
            </h2>
            <p className="text-3xl text-gray-700 font-bold max-w-4xl mx-auto">
              Paraguayas que encontraron su serenidad
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
              <div key={index} className="group bg-white rounded-[3.5rem] overflow-hidden shadow-4xl border-4 border-[#D8E8F8] hover:border-[#B8D8E8] hover:shadow-5xl transition-all duration-500 transform hover:scale-105">
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
                      <Star key={i} className="w-8 h-8 text-[#B8D8E8] fill-[#B8D8E8]" />
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
              <span className="text-[#88B8C8]">FRESCO</span>
            </h2>
            <p className="text-3xl text-gray-700 font-bold max-w-4xl mx-auto">
              Belleza radiante y natural para tu día especial
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {SERVICIOS.maquillaje.map((servicio, index) => {
              const tratamiento = TRATAMIENTOS_MAQUILLAJE[servicio as keyof typeof TRATAMIENTOS_MAQUILLAJE]
              return (
              <div
                key={index}
                className="group bg-white rounded-[3.5rem] shadow-3xl hover:shadow-4xl transition-all duration-500 transform hover:scale-105 cursor-pointer border-3 border-[#D8E8F8] hover:border-[#B8D8E8] overflow-hidden"
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
                  <p className="text-lg font-bold text-gray-600">{tratamiento.descripcion}</p>
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

      {/* CTA Final - SERENE & PEACEFUL */}
      <section className="py-44 px-4 bg-gradient-to-br from-[#B8D8E8] via-[#A8C8D8] to-[#98B8C8] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-white rounded-full opacity-15 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-white rounded-full opacity-15 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white rounded-full opacity-10 blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <Waves className="w-28 h-28 text-white mx-auto mb-12" />
          <h2 className="text-[12rem] md:text-[15rem] font-black text-white mb-20 drop-shadow-3xl leading-none">
            TU<br />SANTUARIO
          </h2>
          <p className="text-6xl text-white font-black mb-28 drop-shadow-2xl">
            Tu oasis de paz y belleza te espera
          </p>
          <button className="group px-28 py-14 bg-white text-[#88B8C8] rounded-full font-black text-5xl shadow-5xl hover:shadow-6xl transition-all transform hover:scale-110">
            <span className="flex items-center gap-6 justify-center">
              <Phone className="w-16 h-16" />
              Reserva Tu Paz
            </span>
          </button>
          <p className="text-white/90 mt-20 text-4xl font-bold drop-shadow-xl">🌊 Serenidad absoluta · Asunción, Paraguay</p>
        </div>
      </section>
    </div>
  )
}


