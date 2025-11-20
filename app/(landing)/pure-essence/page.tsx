'use client'

import { useState } from 'react'
import { Sparkles, Copy, Check, Star, Phone, Leaf, Heart, Award, Droplets, Sun, Smile } from 'lucide-react'
import Image from 'next/image'
import { SERVICIOS, TRATAMIENTOS_FACIALES, TRATAMIENTOS_CORPORALES, TRATAMIENTOS_MAQUILLAJE } from '@/constants/tratamientos'

const TESTIMONIOS = [
  {
    nombre: 'Verónica Martínez',
    edad: 37,
    ubicacion: 'Itauguá',
    historia: 'Buscaba recuperar la vitalidad de mi piel después de años de descuido. El Hidrofacial Profesional y el tratamiento de hidratación me dieron resultados desde la primera sesión. Mi rostro está radiante, hidratado y lleno de vida. Rebeca es simplemente excepcional.',
    tratamiento: 'Hidrofacial + Hidratación',
    rating: 5
  },
  {
    nombre: 'Andrea Fernández',
    edad: 42,
    ubicacion: 'Areguá',
    historia: 'El tiempo y el sol paraguayo habían dejado huella en mi piel. Con el tratamiento antiage y manchas de Rebeca, recuperé una piel uniforme, firme y luminosa. Es increíble cómo un tratamiento profesional puede cambiar tanto tu apariencia y autoestima.',
    tratamiento: 'Antiage + Manchas',
    rating: 5
  },
  {
    nombre: 'Mónica Cabrera',
    edad: 33,
    ubicacion: 'Guarambaré',
    historia: 'Siempre quise tener una piel perfecta pero pensé que era imposible con mi tipo de piel sensible. Rebeca diseñó un tratamiento específico para mí con peeling ultrasónico y limpieza profunda. Los resultados superaron todas mis expectativas.',
    tratamiento: 'Peeling + Limpieza Profunda',
    rating: 5
  }
]

export default function PureEssencePage() {
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null)

  const copyPrompt = (prompt: string, id: string) => {
    navigator.clipboard.writeText(prompt)
    setCopiedPrompt(id)
    setTimeout(() => setCopiedPrompt(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFAF5] via-white to-[#FFF8F0]">
      {/* Prueba Social Flotante - NATURAL */}
      <div className="fixed bottom-8 left-8 z-50 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 max-w-sm hidden md:block border-2 border-[#E8D4C4]">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#E8D4C4] to-[#D4B8A8] flex items-center justify-center shadow-lg">
            <Leaf className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-lg font-black text-gray-900">Rosa M.</p>
            <p className="text-sm font-bold text-[#B8A090]">Acaba de reservar su cita</p>
          </div>
        </div>
      </div>

      {/* Hero Section - ESENCIA PURA */}
      <section className="relative min-h-screen flex items-center px-4 py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-80 h-80 bg-[#E8D4C4] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#D4B8A8] rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-sm rounded-full shadow-xl border-2 border-[#E8D4C4] mb-8">
              <Droplets className="w-6 h-6 text-[#B8A090]" />
              <span className="text-gray-900 font-black text-lg">Belleza Natural · Esencia Pura</span>
            </div>
            
            <h1 className="text-8xl md:text-[10rem] font-black leading-none mb-8">
              <span className="text-gray-900">PURE</span>
              <br />
              <span className="relative inline-block mt-4">
                <span className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-[4rem] blur-2xl opacity-40"></span>
                <span className="relative block px-16 py-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-[4rem] shadow-3xl">
                  <span className="bg-gradient-to-r from-[#F5E8D8] via-[#E8D4C4] to-[#D4B8A8] bg-clip-text text-transparent">
                    ESSENCE
                  </span>
                </span>
              </span>
            </h1>

            <p className="text-3xl text-gray-800 font-bold max-w-4xl mx-auto leading-relaxed mb-12">
              Conecta con la esencia más pura de tu belleza natural.
              <br />
              <span className="font-black text-[#B8A090]">Rebeca Barreto</span> revela tu luminosidad interior.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group px-14 py-7 bg-black text-amber-500 rounded-full font-black text-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110">
                <span className="flex items-center gap-3 justify-center">
                  <Phone className="w-7 h-7" />
                  Descubre Tu Esencia
                </span>
              </button>
            </div>
          </div>

          {/* Stats Natural */}
          <div className="grid md:grid-cols-4 gap-8 mt-20">
            <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-[#E8D4C4] transform hover:scale-110 transition-all">
              <Sun className="w-12 h-12 text-[#B8A090] mx-auto mb-4" />
              <p className="text-5xl font-black text-gray-900 mb-2">500+</p>
              <p className="text-base font-bold text-gray-700">Transformaciones</p>
            </div>
            <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-[#E8D4C4] transform hover:scale-110 transition-all">
              <Heart className="w-12 h-12 text-[#B8A090] mx-auto mb-4" />
              <p className="text-5xl font-black text-gray-900 mb-2">15+</p>
              <p className="text-base font-bold text-gray-700">Años Experiencia</p>
            </div>
            <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-[#E8D4C4] transform hover:scale-110 transition-all">
              <Award className="w-12 h-12 text-[#B8A090] mx-auto mb-4" />
              <p className="text-5xl font-black text-gray-900 mb-2">98%</p>
              <p className="text-base font-bold text-gray-700">Satisfacción</p>
            </div>
            <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-[#E8D4C4] transform hover:scale-110 transition-all">
              <Smile className="w-12 h-12 text-[#B8A090] mx-auto mb-4" />
              <p className="text-5xl font-black text-gray-900 mb-2">4.9★</p>
              <p className="text-base font-bold text-gray-700">Valoración</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tratamientos Faciales - ORGANIC LAYOUT */}
      <section className="py-28 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#FFF8F0] rounded-full mb-6 border-2 border-[#E8D4C4]">
              <Sparkles className="w-5 h-5 text-[#B8A090]" />
              <span className="text-gray-900 font-bold text-sm uppercase tracking-wider">TRATAMIENTOS FACIALES</span>
            </div>
            
            <h2 className="text-7xl md:text-8xl font-black text-gray-900 mb-8">
              Luminosidad Natural
            </h2>
            <p className="text-2xl text-gray-700 font-semibold max-w-3xl mx-auto">
              Tratamientos que respetan y realzan tu belleza natural
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICIOS.faciales.map((servicio, index) => {
              const tratamiento = TRATAMIENTOS_FACIALES[servicio as keyof typeof TRATAMIENTOS_FACIALES]
              return (
              <div
                key={index}
                className="group bg-gradient-to-br from-white to-[#FFF8F0] rounded-[2rem] shadow-xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 cursor-pointer border-2 border-[#F0E0D0] hover:border-[#E8D4C4] overflow-hidden"
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
                  <p className="text-base font-bold text-gray-600">{tratamiento.descripcion}</p>
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
                  <span>¡Copiado!</span>
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

      {/* Rebeca Barreto - ESSENCE LAYOUT */}
      <section className="py-28 px-4 bg-gradient-to-b from-[#FFFAF5] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div>
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-black text-amber-500 rounded-full mb-6 shadow-xl">
                  <Award className="w-5 h-5" />
                  <span className="font-black text-base">MAESTRA DE LA ESTÉTICA NATURAL</span>
                </div>
                
                <h2 className="text-8xl md:text-9xl font-black leading-none">
                  <span className="text-gray-900">Rebeca</span>
                  <br />
                  <span className="relative inline-block mt-4">
                    <span className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 rounded-[3rem] blur-xl opacity-40"></span>
                    <span className="relative block px-10 py-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-[3rem] shadow-2xl">
                      <span className="bg-gradient-to-r from-[#F5E8D8] to-[#E8D4C4] bg-clip-text text-transparent">
                        Barreto
                      </span>
                    </span>
                  </span>
                </h2>
              </div>

              <div className="space-y-6 text-2xl text-gray-700 font-semibold leading-relaxed">
                <p>
                  Rebeca Barreto ha dedicado más de <span className="font-black text-gray-900">15 años</span> a 
                  perfeccionar el arte de realzar la belleza natural de cada mujer paraguaya.
                </p>
                <p>
                  Su filosofía es simple pero poderosa: <span className="font-black text-[#B8A090]">cada piel tiene 
                  su propia esencia única</span> que merece ser revelada con cuidado, profesionalismo y amor.
                </p>
                <p>
                  Con certificaciones internacionales y un enfoque holístico, Rebeca no solo transforma 
                  pieles, transforma vidas. <span className="font-black text-gray-900">Más de 500 mujeres</span> lo 
                  confirman con sus sonrisas.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-6">
                <div className="p-8 bg-white rounded-3xl shadow-xl border-2 border-[#E8D4C4] transform hover:scale-105 transition-all">
                  <Leaf className="w-10 h-10 text-[#B8A090] mb-4" />
                  <p className="font-black text-xl text-gray-900 mb-2">Enfoque Natural</p>
                  <p className="text-base font-bold text-gray-600">Respeto por tu esencia</p>
                </div>
                <div className="p-8 bg-white rounded-3xl shadow-xl border-2 border-[#E8D4C4] transform hover:scale-105 transition-all">
                  <Heart className="w-10 h-10 text-[#B8A090] mb-4" />
                  <p className="font-black text-xl text-gray-900 mb-2">Atención Personalizada</p>
                  <p className="text-base font-bold text-gray-600">Tu piel es única</p>
                </div>
                <div className="p-8 bg-white rounded-3xl shadow-xl border-2 border-[#E8D4C4] transform hover:scale-105 transition-all">
                  <Award className="w-10 h-10 text-[#B8A090] mb-4" />
                  <p className="font-black text-xl text-gray-900 mb-2">Certificada Internacionalmente</p>
                  <p className="text-base font-bold text-gray-600">Excelencia garantizada</p>
                </div>
                <div className="p-8 bg-white rounded-3xl shadow-xl border-2 border-[#E8D4C4] transform hover:scale-105 transition-all">
                  <Smile className="w-10 h-10 text-[#B8A090] mb-4" />
                  <p className="font-black text-xl text-gray-900 mb-2">Resultados Felices</p>
                  <p className="text-base font-bold text-gray-600">98% satisfacción</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#E8D4C4] to-[#D4B8A8] rounded-[3rem] blur-3xl opacity-20"></div>
              <div className="relative w-full h-[800px] rounded-[3rem] overflow-hidden shadow-3xl transform hover:scale-105 transition-all duration-700 border-4 border-white">
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
      <section className="py-28 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-7xl md:text-8xl font-black text-gray-900 mb-8">
              Masajes Corporales
            </h2>
            <p className="text-2xl text-gray-700 font-semibold max-w-3xl mx-auto">
              Bienestar y renovación para tu cuerpo
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {SERVICIOS.corporales.map((servicio, index) => {
              const tratamiento = TRATAMIENTOS_CORPORALES[servicio as keyof typeof TRATAMIENTOS_CORPORALES]
              return (
              <div
                key={index}
                className="group bg-gradient-to-br from-white to-[#FFF8F0] rounded-[2rem] shadow-xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 cursor-pointer border-2 border-[#F0E0D0] hover:border-[#E8D4C4] overflow-hidden"
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
                  <p className="text-base font-bold text-gray-600">{tratamiento.descripcion}</p>
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

      {/* Testimonios - NATURAL CARDS */}
      <section className="py-28 px-4 bg-gradient-to-b from-[#FFFAF5] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-7xl md:text-8xl font-black text-gray-900 mb-8">
              Historias de Transformación
            </h2>
            <p className="text-2xl text-gray-700 font-semibold max-w-3xl mx-auto">
              Paraguayas que encontraron su esencia
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
              <div key={index} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-3xl border-4 border-[#E8D4C4] hover:border-[#D4B8A8] hover:shadow-4xl transition-all duration-500 transform hover:scale-105">
                <div className="relative h-[420px] overflow-hidden">
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
                      <Star key={i} className="w-6 h-6 text-[#E8D4C4] fill-[#E8D4C4]" />
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
      <section className="py-28 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-7xl md:text-8xl font-black text-gray-900 mb-8">
              Maquillaje Profesional
            </h2>
            <p className="text-2xl text-gray-700 font-semibold max-w-3xl mx-auto">
              Realza tu belleza natural con elegancia
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICIOS.maquillaje.map((servicio, index) => {
              const tratamiento = TRATAMIENTOS_MAQUILLAJE[servicio as keyof typeof TRATAMIENTOS_MAQUILLAJE]
              return (
              <div
                key={index}
                className="group bg-gradient-to-br from-white to-[#FFF8F0] rounded-[2rem] shadow-xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 cursor-pointer border-2 border-[#F0E0D0] hover:border-[#E8D4C4] overflow-hidden"
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
                  <p className="text-base font-bold text-gray-600">{tratamiento.descripcion}</p>
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

      {/* CTA Final - ESSENCE */}
      <section className="py-40 px-4 bg-gradient-to-br from-[#E8D4C4] via-[#D4B8A8] to-[#C0A490] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-white rounded-full opacity-5 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white rounded-full opacity-5 blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <Leaf className="w-20 h-20 text-white mx-auto mb-8 opacity-80" />
          <h2 className="text-8xl md:text-9xl font-black text-white mb-12 drop-shadow-2xl leading-none">
            DESCUBRE<br />TU ESENCIA
          </h2>
          <p className="text-4xl text-white font-black mb-20 drop-shadow-xl">
            La belleza natural que siempre estuvo en ti
          </p>
          <button className="group px-20 py-10 bg-white text-[#B8A090] rounded-full font-black text-3xl shadow-3xl hover:shadow-4xl transition-all transform hover:scale-110">
            <span className="flex items-center gap-4 justify-center">
              <Phone className="w-12 h-12" />
              Reservar Mi Transformación
            </span>
          </button>
          <p className="text-white/90 mt-12 text-2xl font-bold drop-shadow-lg">✨ Tu esencia te espera · Asunción, Paraguay</p>
        </div>
      </section>
    </div>
  )
}

