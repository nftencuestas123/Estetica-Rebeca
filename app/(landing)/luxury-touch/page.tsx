'use client'

import { useState } from 'react'
import { Sparkles, Copy, Check, Star, Phone, Crown, Diamond, Award, Zap, TrendingUp, Shield } from 'lucide-react'
import Image from 'next/image'
import { SERVICIOS, TRATAMIENTOS_FACIALES, TRATAMIENTOS_CORPORALES, TRATAMIENTOS_MAQUILLAJE } from '@/constants/tratamientos'

const TESTIMONIOS = [
  {
    nombre: 'Mercedes Villalba',
    edad: 43,
    ubicacion: 'San Bernardino',
    historia: 'Como empresaria exitosa, merezco lo mejor. Rebeca Barreto me ofrece exactamente eso: tratamientos de clase mundial con resultados espectaculares. El Hidrofacial y antiage transformaron mi piel completamente. Ahora luzco tan poderosa como me siento.',
    tratamiento: 'Hidrofacial VIP + Antiage',
    rating: 5
  },
  {
    nombre: 'Beatriz Ortiz',
    edad: 38,
    ubicacion: 'Luque',
    historia: 'Probé centros de estética en Miami y Buenos Aires, pero ninguno se compara con Rebeca Barreto. Su nivel de profesionalismo, la calidad de productos y los resultados son incomparables. El Dermapen me dio una piel de porcelana. Inversión que vale oro.',
    tratamiento: 'Dermapen Premium',
    rating: 5
  },
  {
    nombre: 'Alejandra Mora',
    edad: 36,
    ubicacion: 'Asunción',
    historia: 'Exijo excelencia en todo lo que hago, incluido el cuidado de mi piel. Rebeca superó mis expectativas más altas. El tratamiento de manchas y peeling ultrasónico eliminó imperfecciones que otros dijeron imposibles. Es la mejor inversión en mí misma.',
    tratamiento: 'Manchas + Peeling Elite',
    rating: 5
  }
]

export default function LuxuryTouchPage() {
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null)

  const copyPrompt = (prompt: string, id: string) => {
    navigator.clipboard.writeText(prompt)
    setCopiedPrompt(id)
    setTimeout(() => setCopiedPrompt(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F0] via-[#FFFCF5] to-white">
      {/* Prueba Social Flotante - LUXURY */}
      <div className="fixed bottom-10 left-10 z-50 bg-gradient-to-r from-gray-900 to-black text-amber-500 rounded-3xl shadow-3xl p-8 max-w-md hidden md:block border-4 border-[#D4A474]">
        <div className="flex items-center gap-5">
          <div className="w-18 h-18 rounded-full bg-gradient-to-br from-[#D4A474] to-[#B48444] flex items-center justify-center shadow-2xl">
            <Diamond className="w-10 h-10 text-white" />
          </div>
          <div>
            <p className="text-2xl font-black">VIP Elena R.</p>
            <p className="text-base font-bold text-[#D4A474]">Tratamiento Premium Reservado</p>
          </div>
        </div>
      </div>

      {/* Hero Section - ULTRA LUXURY */}
      <section className="relative min-h-screen flex items-center px-4 py-28 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4A474] rounded-full blur-3xl opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#B48444] rounded-full blur-3xl opacity-10"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="text-center space-y-16">
            <div className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-[#D4A474] to-[#B48444] rounded-full shadow-3xl">
              <Diamond className="w-8 h-8 text-white" />
              <span className="text-white font-black text-2xl uppercase tracking-wider">EXPERIENCIA PREMIUM</span>
            </div>
            
            <h1 className="text-[10rem] md:text-[14rem] font-black leading-none">
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-[#D4A474] to-[#B48444] rounded-[6rem] blur-3xl opacity-50"></span>
                <span className="relative block px-24 py-12 bg-gradient-to-r from-[#D4A474] to-[#B48444] rounded-[6rem] shadow-4xl">
                  <span className="text-white drop-shadow-2xl">
                    LUXURY
                  </span>
                </span>
              </span>
              <br />
              <span className="text-white drop-shadow-2xl mt-8 inline-block">TOUCH</span>
            </h1>

            <p className="text-4xl text-white font-bold max-w-5xl mx-auto leading-relaxed drop-shadow-xl">
              Donde la excelencia se encuentra con la exclusividad.
              <br />
              <span className="text-[#D4A474] font-black text-5xl">Rebeca Barreto</span>
              <br />
              define el lujo en estética paraguaya.
            </p>

            <button className="group px-20 py-10 bg-black text-amber-500 rounded-full font-black text-4xl shadow-4xl hover:shadow-5xl transition-all transform hover:scale-110">
              <span className="flex items-center gap-5 justify-center">
                <Phone className="w-12 h-12" />
                Experiencia VIP
              </span>
            </button>

            {/* Stats Luxury */}
            <div className="grid md:grid-cols-4 gap-10 pt-20">
              <div className="p-12 bg-white/10 backdrop-blur-md rounded-[3rem] border-4 border-[#D4A474] shadow-3xl transform hover:scale-110 transition-all">
                <Crown className="w-16 h-16 text-[#D4A474] mx-auto mb-6" />
                <p className="text-7xl font-black text-white mb-4">500+</p>
                <p className="text-xl font-bold text-white/90">Clientas VIP</p>
              </div>
              <div className="p-12 bg-white/10 backdrop-blur-md rounded-[3rem] border-4 border-[#D4A474] shadow-3xl transform hover:scale-110 transition-all">
                <Diamond className="w-16 h-16 text-[#D4A474] mx-auto mb-6" />
                <p className="text-7xl font-black text-white mb-4">15+</p>
                <p className="text-xl font-bold text-white/90">Años Elite</p>
              </div>
              <div className="p-12 bg-white/10 backdrop-blur-md rounded-[3rem] border-4 border-[#D4A474] shadow-3xl transform hover:scale-110 transition-all">
                <Award className="w-16 h-16 text-[#D4A474] mx-auto mb-6" />
                <p className="text-7xl font-black text-white mb-4">98%</p>
                <p className="text-xl font-bold text-white/90">Perfección</p>
              </div>
              <div className="p-12 bg-white/10 backdrop-blur-md rounded-[3rem] border-4 border-[#D4A474] shadow-3xl transform hover:scale-110 transition-all">
                <Star className="w-16 h-16 text-[#D4A474] mx-auto mb-6" />
                <p className="text-7xl font-black text-white mb-4">4.9★</p>
                <p className="text-xl font-bold text-white/90">Excelencia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tratamientos Faciales - LUXURY GRID */}
      <section className="py-36 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-28">
            <div className="inline-flex items-center gap-4 px-10 py-5 bg-black text-amber-500 rounded-full mb-10 shadow-3xl">
              <Diamond className="w-7 h-7" />
              <span className="font-black text-xl uppercase tracking-widest">TRATAMIENTOS DE LUJO</span>
            </div>
            
            <h2 className="text-9xl md:text-[10rem] font-black text-gray-900 mb-12 leading-tight">
              FACIALES<br />
              <span className="text-[#B48444]">PREMIUM</span>
            </h2>
            <p className="text-3xl text-gray-700 font-bold max-w-4xl mx-auto">
              Excelencia absoluta en cada tratamiento
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {SERVICIOS.faciales.map((servicio, index) => {
              const tratamiento = TRATAMIENTOS_FACIALES[servicio as keyof typeof TRATAMIENTOS_FACIALES]
              return (
              <div
                key={index}
                className="group bg-white rounded-[3.5rem] shadow-3xl hover:shadow-4xl transition-all duration-500 transform hover:scale-110 cursor-pointer border-4 border-[#E8D4B4] hover:border-[#D4A474] overflow-hidden"
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

      {/* Rebeca Barreto - LUXURY EXPERT */}
      <section className="py-36 px-4 bg-gradient-to-b from-[#FFF8F0] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-28 items-center">
            <div className="space-y-14">
              <div>
                <div className="inline-flex items-center gap-4 px-10 py-5 bg-black text-amber-500 rounded-full mb-10 shadow-3xl">
                  <Crown className="w-7 h-7" />
                  <span className="font-black text-xl">MAESTRA DEL LUJO</span>
                </div>
                
                <h2 className="text-[10rem] md:text-[12rem] font-black leading-none">
                  <span className="text-gray-900">REBECA</span>
                  <br />
                  <span className="text-[#B48444]">BARRETO</span>
                </h2>
              </div>

              <div className="space-y-10 text-3xl text-gray-700 font-bold leading-relaxed">
                <p>
                  Con más de <span className="font-black text-gray-900">15 años definiendo el estándar</span> de 
                  excelencia en estética en Paraguay, Rebeca Barreto es la elección indiscutible de las 
                  <span className="font-black text-[#B48444]"> mujeres más exigentes</span>.
                </p>
                <p>
                  Certificada internacionalmente en las técnicas más exclusivas del mundo, cada tratamiento 
                  es una <span className="font-black text-gray-900">obra maestra personalizada</span> que combina 
                  tecnología de vanguardia con un toque artístico único.
                </p>
                <p>
                  <span className="font-black text-[#B48444]">Más de 500 mujeres VIP</span> confían en su 
                  profesionalismo excepcional para mantener su belleza al más alto nivel.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-10 pt-10">
                <div className="p-12 bg-white rounded-[2.5rem] shadow-3xl border-4 border-[#E8D4B4] transform hover:scale-105 transition-all">
                  <Shield className="w-14 h-14 text-[#B48444] mb-8" />
                  <p className="font-black text-3xl text-gray-900 mb-4">Certificación Elite</p>
                  <p className="text-xl font-bold text-gray-600">Mundial</p>
                </div>
                <div className="p-12 bg-white rounded-[2.5rem] shadow-3xl border-4 border-[#E8D4B4] transform hover:scale-105 transition-all">
                  <Zap className="w-14 h-14 text-[#B48444] mb-8" />
                  <p className="font-black text-3xl text-gray-900 mb-4">Tecnología Avanzada</p>
                  <p className="text-xl font-bold text-gray-600">Última generación</p>
                </div>
                <div className="p-12 bg-white rounded-[2.5rem] shadow-3xl border-4 border-[#E8D4B4] transform hover:scale-105 transition-all">
                  <Award className="w-14 h-14 text-[#B48444] mb-8" />
                  <p className="font-black text-3xl text-gray-900 mb-4">Productos Premium</p>
                  <p className="text-xl font-bold text-gray-600">Solo lo mejor</p>
                </div>
                <div className="p-12 bg-white rounded-[2.5rem] shadow-3xl border-4 border-[#E8D4B4] transform hover:scale-105 transition-all">
                  <TrendingUp className="w-14 h-14 text-[#B48444] mb-8" />
                  <p className="font-black text-3xl text-gray-900 mb-4">Resultados Garantizados</p>
                  <p className="text-xl font-bold text-gray-600">98% satisfacción</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4A474] to-[#B48444] rounded-[4.5rem] blur-3xl opacity-20"></div>
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
              <span className="text-[#B48444]">EXCLUSIVOS</span>
            </h2>
            <p className="text-3xl text-gray-700 font-bold max-w-4xl mx-auto">
              Experiencia de bienestar de clase mundial
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
            {SERVICIOS.corporales.map((servicio, index) => {
              const tratamiento = TRATAMIENTOS_CORPORALES[servicio as keyof typeof TRATAMIENTOS_CORPORALES]
              return (
              <div
                key={index}
                className="group bg-white rounded-[3.5rem] shadow-3xl hover:shadow-4xl transition-all duration-500 transform hover:scale-110 cursor-pointer border-4 border-[#E8D4B4] hover:border-[#D4A474] overflow-hidden"
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

      {/* Testimonios VIP */}
      <section className="py-36 px-4 bg-gradient-to-b from-[#FFF8F0] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-28">
            <h2 className="text-9xl md:text-[10rem] font-black text-gray-900 mb-12 leading-tight">
              CLIENTAS<br />
              <span className="text-[#B48444]">VIP</span>
            </h2>
            <p className="text-3xl text-gray-700 font-bold max-w-4xl mx-auto">
              Mujeres exigentes que eligen lo mejor
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
              <div key={index} className="group bg-white rounded-[4rem] overflow-hidden shadow-4xl border-4 border-[#E8D4B4] hover:border-[#D4A474] hover:shadow-5xl transition-all duration-500 transform hover:scale-105">
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
                      <Star key={i} className="w-8 h-8 text-[#D4A474] fill-[#D4A474]" />
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
              <span className="text-[#B48444]">DE LUJO</span>
            </h2>
            <p className="text-3xl text-gray-700 font-bold max-w-4xl mx-auto">
              Perfección absoluta para tu evento especial
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {SERVICIOS.maquillaje.map((servicio, index) => {
              const tratamiento = TRATAMIENTOS_MAQUILLAJE[servicio as keyof typeof TRATAMIENTOS_MAQUILLAJE]
              return (
              <div
                key={index}
                className="group bg-white rounded-[3.5rem] shadow-3xl hover:shadow-4xl transition-all duration-500 transform hover:scale-110 cursor-pointer border-4 border-[#E8D4B4] hover:border-[#D4A474] overflow-hidden"
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

      {/* CTA Final - ULTRA LUXURY */}
      <section className="py-44 px-4 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-[#D4A474] rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#B48444] rounded-full opacity-10 blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <Diamond className="w-28 h-28 text-[#D4A474] mx-auto mb-12" />
          <h2 className="text-[12rem] md:text-[14rem] font-black text-white mb-20 drop-shadow-3xl leading-none">
            VIVE EL<br />LUJO
          </h2>
          <p className="text-6xl text-white font-black mb-28 drop-shadow-2xl">
            Tu experiencia premium te espera
          </p>
          <button className="group px-28 py-14 bg-black text-amber-500 rounded-full font-black text-5xl shadow-5xl hover:shadow-6xl transition-all transform hover:scale-110">
            <span className="flex items-center gap-6 justify-center">
              <Phone className="w-16 h-16" />
              Reservar VIP
            </span>
          </button>
          <p className="text-white/90 mt-20 text-4xl font-bold drop-shadow-xl">✨ Cupos Exclusivos · Paraguay</p>
        </div>
      </section>
    </div>
  )
}


