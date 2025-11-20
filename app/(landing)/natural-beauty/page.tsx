'use client'

import { useState } from 'react'
import { Sparkles, Copy, Check, Star, Phone, Leaf, Heart, Sun, Smile, TreePine, Flower } from 'lucide-react'
import Image from 'next/image'
import { SERVICIOS, TRATAMIENTOS_FACIALES, TRATAMIENTOS_CORPORALES, TRATAMIENTOS_MAQUILLAJE } from '@/constants/tratamientos'

const TESTIMONIOS = [
  {
    nombre: 'Lorena Benítez',
    edad: 36,
    ubicacion: 'Itá',
    historia: 'Quería volver a mi esencia, a sentirme yo misma pero en mi mejor versión. Rebeca entendió perfectamente lo que necesitaba. Con el Hidrofacial y tratamiento de hidratación, mi piel recuperó su glow natural. No parezco maquillada, solo radiante y fresca.',
    tratamiento: 'Hidrofacial + Hidratación Natural',
    rating: 5
  },
  {
    nombre: 'Marina Duarte',
    edad: 41,
    ubicacion: 'Tobatí',
    historia: 'El sol paraguayo y el tiempo habían opacado mi piel. Buscaba resultados naturales, sin exagerar. El peeling ultrasónico y tratamiento antiage me dieron exactamente eso: una piel sana, luminosa y natural. Luzco descansada y rejuvenecida sin parecer "operada".',
    tratamiento: 'Peeling + Antiage Natural',
    rating: 5
  },
  {
    nombre: 'Fátima Rojas',
    edad: 33,
    ubicacion: 'Paraguarí',
    historia: 'Siempre fui de belleza natural y productos orgánicos. Encontré en Rebeca a alguien que respeta esa filosofía pero con resultados profesionales. La limpieza facial profunda y tratamiento para manchas eliminaron imperfecciones manteniendo mi look natural.',
    tratamiento: 'Limpieza + Manchas Natural',
    rating: 5
  }
]

export default function NaturalBeautyPage() {
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null)

  const copyPrompt = (prompt: string, id: string) => {
    navigator.clipboard.writeText(prompt)
    setCopiedPrompt(id)
    setTimeout(() => setCopiedPrompt(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F9F0] via-white to-[#F8FCF3]">
      {/* Prueba Social Flotante - NATURAL */}
      <div className="fixed bottom-8 left-8 z-50 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-7 max-w-sm hidden md:block border-4 border-[#B8D4A8]">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C8E4B8] to-[#A8C498] flex items-center justify-center shadow-xl">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-xl font-black text-gray-900">Carolina P.</p>
            <p className="text-sm font-bold text-[#88A478]">Eligió Tratamiento Natural</p>
          </div>
        </div>
      </div>

      {/* Hero Section - NATURAL & ORGANIC */}
      <section className="relative min-h-screen flex items-center px-4 py-24">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-[#C8E4B8] rounded-full blur-3xl opacity-15"></div>
          <div className="absolute top-1/2 right-20 w-[350px] h-[350px] bg-[#A8C498] rounded-full blur-3xl opacity-15"></div>
          <div className="absolute bottom-20 left-1/3 w-[380px] h-[380px] bg-[#88A478] rounded-full blur-3xl opacity-10"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Texto Hero */}
            <div className="space-y-12">
              <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/90 backdrop-blur-sm rounded-full shadow-xl border-3 border-[#C8E4B8]">
                <TreePine className="w-7 h-7 text-[#88A478]" />
                <span className="text-gray-900 font-black text-xl">100% Natural · 100% Tú</span>
              </div>
              
              <h1 className="text-8xl md:text-[11rem] font-black leading-none">
                <span className="text-gray-900">NATURAL</span>
                <br />
                <span className="relative inline-block mt-4">
                  <span className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 rounded-[4rem] blur-2xl opacity-40"></span>
                  <span className="relative block px-14 py-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-[4rem] shadow-3xl">
                    <span className="bg-gradient-to-r from-[#D8F4C8] via-[#C8E4B8] to-[#B8D4A8] bg-clip-text text-transparent drop-shadow-2xl">
                      BEAUTY
                    </span>
                  </span>
                </span>
              </h1>

              <p className="text-3xl text-gray-800 font-bold leading-relaxed">
                Tu belleza más auténtica, realzada con el poder de tratamientos 
                que respetan tu esencia natural.
                <br />
                <span className="font-black text-[#88A478]">Rebeca Barreto</span> - belleza consciente.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <button className="group px-14 py-7 bg-black text-amber-500 rounded-full font-black text-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110">
                  <span className="flex items-center gap-3 justify-center">
                    <Phone className="w-8 h-8" />
                    Descubre Tu Glow Natural
                  </span>
                </button>
              </div>

              {/* Mini Stats Natural */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border-3 border-[#D8F4C8] transform hover:scale-110 transition-all">
                  <Leaf className="w-10 h-10 text-[#88A478] mx-auto mb-3" />
                  <p className="text-5xl font-black text-gray-900 mb-2">500+</p>
                  <p className="text-sm font-bold text-gray-700">Clientas</p>
                </div>
                <div className="p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border-3 border-[#D8F4C8] transform hover:scale-110 transition-all">
                  <Heart className="w-10 h-10 text-[#88A478] mx-auto mb-3" />
                  <p className="text-5xl font-black text-gray-900 mb-2">15+</p>
                  <p className="text-sm font-bold text-gray-700">Años</p>
                </div>
                <div className="p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border-3 border-[#D8F4C8] transform hover:scale-110 transition-all">
                  <Star className="w-10 h-10 text-[#88A478] mx-auto mb-3" />
                  <p className="text-5xl font-black text-gray-900 mb-2">4.9★</p>
                  <p className="text-sm font-bold text-gray-700">Rating</p>
                </div>
              </div>
            </div>

            {/* Imagen Hero */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#C8E4B8] to-[#A8C498] rounded-[4rem] blur-3xl opacity-20"></div>
              <div className="relative w-full h-[750px] rounded-[4rem] overflow-hidden shadow-3xl transform hover:scale-105 transition-all duration-700 border-4 border-white">
                <Image
                  src="/images/rebeca-barreto.jpg"
                  alt="Natural Beauty"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tratamientos Faciales - ORGANIC GRID */}
      <section className="py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-black text-amber-500 rounded-full mb-10 shadow-2xl">
              <Flower className="w-6 h-6" />
              <span className="font-black text-lg uppercase tracking-wider">FACIALES NATURALES</span>
            </div>
            
            <h2 className="text-8xl md:text-9xl font-black text-gray-900 mb-10 leading-tight">
              Tratamientos<br />
              <span className="text-[#88A478]">Orgánicos</span>
            </h2>
            <p className="text-2xl text-gray-700 font-bold max-w-4xl mx-auto">
              Respetamos tu piel y realzamos tu belleza natural
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {SERVICIOS.faciales.map((servicio, index) => {
              const tratamiento = TRATAMIENTOS_FACIALES[servicio as keyof typeof TRATAMIENTOS_FACIALES]
              return (
              <div
                key={index}
                className="group bg-white rounded-[3rem] shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 cursor-pointer border-3 border-[#D8F4C8] hover:border-[#C8E4B8] overflow-hidden"
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
                  <h3 className="font-black text-2xl text-gray-900 mb-4 leading-tight">{servicio}</h3>
                  <p className="text-lg font-bold text-gray-600">{tratamiento.descripcion}</p>
                </div>
              </div>
              )
            })}
          </div>

          <div className="mt-24 text-center">
            <button
              onClick={() => copyPrompt('Imagen profesional de alta calidad: Tratamiento facial Hidrofacial en spa de lujo. Mujer paraguaya de 30-40 años, piel radiante, expresión relajada. Ambiente sereno con tonos nude y rosa suave. Decoración con elementos paraguayos sutiles (ñandutí, artesanías de madera). Iluminación natural perfecta. Estilo minimalista y elegante. Centro de estética Rebeca Barreto en Asunción, Paraguay. Foto profesional, alta resolución, realista.', 'facial-img')}
              className="inline-flex items-center gap-4 px-12 py-6 bg-black text-amber-500 rounded-full font-black text-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110"
            >
              {copiedPrompt === 'facial-img' ? (
                <>
                  <Check className="w-8 h-8" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-8 h-8" />
                  <span>Copiar Prompt IA (Faciales)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Rebeca Barreto - NATURAL EXPERT */}
      <section className="py-32 px-4 bg-gradient-to-b from-[#F5F9F0] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#C8E4B8] to-[#A8C498] rounded-[4rem] blur-3xl opacity-20"></div>
              <div className="relative w-full h-[850px] rounded-[4rem] overflow-hidden shadow-3xl transform hover:scale-105 transition-all duration-700 border-4 border-white">
                <Image
                  src="/images/rebeca-barreto.jpg"
                  alt="Rebeca Barreto"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="space-y-12 order-1 lg:order-2">
              <div>
                <div className="inline-flex items-center gap-3 px-8 py-4 bg-black text-amber-500 rounded-full mb-8 shadow-2xl">
                  <Sun className="w-6 h-6" />
                  <span className="font-black text-lg">ESPECIALISTA EN BELLEZA NATURAL</span>
                </div>
                
                <h2 className="text-9xl md:text-[10rem] font-black leading-none mb-8">
                  <span className="text-gray-900">Rebeca</span>
                  <br />
                  <span className="text-[#88A478]">Barreto</span>
                </h2>
              </div>

              <div className="space-y-8 text-2xl text-gray-700 font-bold leading-relaxed">
                <p>
                  Durante más de <span className="font-black text-gray-900">15 años</span>, Rebeca Barreto 
                  ha perfeccionado el arte de realzar la <span className="font-black text-[#88A478]">belleza 
                  natural</span> de cada mujer paraguaya.
                </p>
                <p>
                  Su filosofía es clara: tu piel es única y merece tratamientos que respeten su esencia 
                  mientras revelan su máximo potencial. Sin artificios, sin exageraciones, solo 
                  <span className="font-black text-gray-900"> resultados auténticos y duraderos</span>.
                </p>
                <p>
                  Con certificaciones internacionales y un compromiso absoluto con la <span className="font-black text-[#88A478]">belleza 
                  consciente</span>, más de 500 mujeres han confiado en su visión natural de la estética.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8 pt-8">
                <div className="p-10 bg-white rounded-3xl shadow-2xl border-3 border-[#D8F4C8] transform hover:scale-105 transition-all">
                  <Leaf className="w-12 h-12 text-[#88A478] mb-6" />
                  <p className="font-black text-2xl text-gray-900 mb-3">Productos Naturales</p>
                  <p className="text-lg font-bold text-gray-600">Lo mejor de la naturaleza</p>
                </div>
                <div className="p-10 bg-white rounded-3xl shadow-2xl border-3 border-[#D8F4C8] transform hover:scale-105 transition-all">
                  <Heart className="w-12 h-12 text-[#88A478] mb-6" />
                  <p className="font-black text-2xl text-gray-900 mb-3">Enfoque Holístico</p>
                  <p className="text-lg font-bold text-gray-600">Cuerpo, mente y piel</p>
                </div>
                <div className="p-10 bg-white rounded-3xl shadow-2xl border-3 border-[#D8F4C8] transform hover:scale-105 transition-all">
                  <Sun className="w-12 h-12 text-[#88A478] mb-6" />
                  <p className="font-black text-2xl text-gray-900 mb-3">Resultados Naturales</p>
                  <p className="text-lg font-bold text-gray-600">Sin artificios</p>
                </div>
                <div className="p-10 bg-white rounded-3xl shadow-2xl border-3 border-[#D8F4C8] transform hover:scale-105 transition-all">
                  <Smile className="w-12 h-12 text-[#88A478] mb-6" />
                  <p className="font-black text-2xl text-gray-900 mb-3">98% Satisfacción</p>
                  <p className="text-lg font-bold text-gray-600">Clientas felices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Masajes Corporales */}
      <section className="py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-8xl md:text-9xl font-black text-gray-900 mb-10 leading-tight">
              Masajes<br />
              <span className="text-[#88A478]">Terapéuticos</span>
            </h2>
            <p className="text-2xl text-gray-700 font-bold max-w-4xl mx-auto">
              Bienestar natural para tu cuerpo y mente
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
            {SERVICIOS.corporales.map((servicio, index) => {
              const tratamiento = TRATAMIENTOS_CORPORALES[servicio as keyof typeof TRATAMIENTOS_CORPORALES]
              return (
              <div
                key={index}
                className="group bg-white rounded-[3rem] shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 cursor-pointer border-3 border-[#D8F4C8] hover:border-[#C8E4B8] overflow-hidden"
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

          <div className="mt-24 text-center">
            <button
              onClick={() => copyPrompt('Imagen profesional: Masaje corporal maderoterapia en spa de lujo. Mujer paraguaya de 30-40 años, expresión relajada. Ambiente sereno con tonos nude y rosa suave. Elementos de madera, decoración paraguaya sutil (artesanías, ñandutí). Iluminación cálida natural. Estilo profesional, elegante. Centro Rebeca Barreto, Asunción Paraguay. Alta resolución, realista.', 'corp-img')}
              className="inline-flex items-center gap-4 px-12 py-6 bg-black text-amber-500 rounded-full font-black text-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110"
            >
              {copiedPrompt === 'corp-img' ? (
                <>
                  <Check className="w-8 h-8" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-8 h-8" />
                  <span>Copiar Prompt IA (Corporales)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Testimonios - NATURAL CARDS */}
      <section className="py-32 px-4 bg-gradient-to-b from-[#F5F9F0] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-8xl md:text-9xl font-black text-gray-900 mb-10 leading-tight">
              Belleza<br />
              <span className="text-[#88A478]">Auténtica</span>
            </h2>
            <p className="text-2xl text-gray-700 font-bold max-w-4xl mx-auto">
              Paraguayas que eligieron lo natural
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {TESTIMONIOS.map((testimonio, index) => {
              const testimonioImages = [
                '/images/landing/testimonials/testimonio-mujer-01.jpg',
                '/images/landing/testimonials/testimonio-mujer-02.jpg',
                '/images/landing/testimonials/testimonio-mujer-03.jpg'
              ]
              return (
              <div key={index} className="group bg-white rounded-[3rem] overflow-hidden shadow-3xl border-4 border-[#D8F4C8] hover:border-[#C8E4B8] hover:shadow-4xl transition-all duration-500 transform hover:scale-105">
                <div className="relative h-[460px] overflow-hidden">
                  <Image
                    src={testimonioImages[index]}
                    alt={`${testimonio.nombre} - Cliente satisfecha`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
                    <p className="font-black text-4xl mb-4">{testimonio.nombre}</p>
                    <p className="font-bold text-2xl">{testimonio.edad} años</p>
                    <p className="font-semibold text-xl mt-3">{testimonio.ubicacion}</p>
                  </div>
                </div>
                <div className="p-12">
                  <div className="mb-8">
                    <span className="px-6 py-3 bg-black text-amber-500 rounded-full text-lg font-black shadow-xl">
                      {testimonio.tratamiento}
                    </span>
                  </div>
                  <p className="text-gray-800 font-bold text-xl leading-relaxed mb-8">
                    "{testimonio.historia}"
                  </p>
                  <div className="flex gap-2">
                    {Array.from({length: testimonio.rating}).map((_, i) => (
                      <Star key={i} className="w-7 h-7 text-[#C8E4B8] fill-[#C8E4B8]" />
                    ))}
                  </div>
                </div>
              </div>
              )
            })}
          </div>

          <div className="mt-24 text-center">
            <button
              onClick={() => copyPrompt('Foto profesional retrato: Mujer paraguaya de 30-45 años, sonriente, piel radiante y perfecta, rasgos típicos paraguayos. Ambiente: interior de casa moderna paraguaya con decoración típica (ñandutí en tonos pastel, artesanías de madera, colores tierra y nude, plantas nativas). O plaza/centro comercial de Asunción al fondo desenfocado. Iluminación natural perfecta, luz suave. Estilo: retrato profesional, alta calidad, realista. La mujer debe lucir feliz, confiada y radiante después de su tratamiento facial. Fondo desenfocado mostrando ambiente paraguayo auténtico y acogedor.', 'test-img')}
              className="inline-flex items-center gap-4 px-12 py-6 bg-black text-amber-500 rounded-full font-black text-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110"
            >
              {copiedPrompt === 'test-img' ? (
                <>
                  <Check className="w-8 h-8" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-8 h-8" />
                  <span>Copiar Prompt IA (Testimonios)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Maquillaje */}
      <section className="py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-8xl md:text-9xl font-black text-gray-900 mb-10 leading-tight">
              Maquillaje<br />
              <span className="text-[#88A478]">Natural</span>
            </h2>
            <p className="text-2xl text-gray-700 font-bold max-w-4xl mx-auto">
              Realza tu belleza sin perder tu esencia
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {SERVICIOS.maquillaje.map((servicio, index) => {
              const tratamiento = TRATAMIENTOS_MAQUILLAJE[servicio as keyof typeof TRATAMIENTOS_MAQUILLAJE]
              return (
              <div
                key={index}
                className="group bg-white rounded-[3rem] shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 cursor-pointer border-3 border-[#D8F4C8] hover:border-[#C8E4B8] overflow-hidden"
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
                  <h3 className="font-black text-2xl text-gray-900 mb-4 leading-tight">{servicio}</h3>
                  <p className="text-lg font-bold text-gray-600">{tratamiento.descripcion}</p>
                </div>
              </div>
              )
            })}
          </div>

          <div className="mt-24 text-center">
            <button
              onClick={() => copyPrompt('Imagen profesional: Maquillaje profesional siendo aplicado. Mujer paraguaya de 25-35 años, rostro perfecto, piel impecable. Spa elegante minimalista. Productos de belleza de alta gama, espejo con iluminación profesional, brochas y paletas. Ambiente paraguayo sofisticado y moderno. Tonos nude y rosa suave. Centro Rebeca Barreto, Asunción. Alta resolución, estilo profesional, realista.', 'maq-img')}
              className="inline-flex items-center gap-4 px-12 py-6 bg-black text-amber-500 rounded-full font-black text-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110"
            >
              {copiedPrompt === 'maq-img' ? (
                <>
                  <Check className="w-8 h-8" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-8 h-8" />
                  <span>Copiar Prompt IA (Maquillaje)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* CTA Final - NATURAL & ORGANIC */}
      <section className="py-40 px-4 bg-gradient-to-br from-[#C8E4B8] via-[#B8D4A8] to-[#A8C498] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-white rounded-full opacity-10 blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <TreePine className="w-24 h-24 text-white mx-auto mb-12" />
          <h2 className="text-9xl md:text-[11rem] font-black text-white mb-16 drop-shadow-3xl leading-none">
            SÉ TÚ<br />NATURALMENTE
          </h2>
          <p className="text-5xl text-white font-black mb-24 drop-shadow-2xl">
            Tu mejor versión natural te espera
          </p>
          <button className="group px-24 py-12 bg-white text-[#88A478] rounded-full font-black text-4xl shadow-4xl hover:shadow-5xl transition-all transform hover:scale-110">
            <span className="flex items-center gap-5 justify-center">
              <Phone className="w-14 h-14" />
              Agenda Tu Cita
            </span>
          </button>
          <p className="text-white/90 mt-16 text-3xl font-bold drop-shadow-xl">🌿 Belleza consciente · Asunción, Paraguay</p>
        </div>
      </section>
    </div>
  )
}


