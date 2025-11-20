'use client'

import { useState } from 'react'
import { Sparkles, Copy, Check, Star, Phone, Heart, Flower2, Award, Crown, Gem, ShieldCheck } from 'lucide-react'
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
    nombre: 'Elena Ramírez',
    edad: 40,
    ubicacion: 'Ypacaraí',
    historia: 'Después de mi boda y tres hijos, mi piel había perdido vitalidad. El tratamiento antiage y Dermapen de Rebeca me devolvieron la firmeza y luminosidad que creía imposible recuperar. Ahora luzco mejor que en mi boda. Mi esposo dice que parezco su novia otra vez.',
    tratamiento: 'Antiage + Dermapen',
    rating: 5
  },
  {
    nombre: 'Julia Sánchez',
    edad: 35,
    ubicacion: 'Caacupé',
    historia: 'Las manchas del embarazo me tenían deprimida. No me reconocía al verme al espejo. Rebeca creó un tratamiento personalizado que eliminó cada mancha. Hoy mi piel está uniforme, radiante y me encanta mostrar mi rostro sin maquillaje. Es una artista.',
    tratamiento: 'Tratamiento Manchas',
    rating: 5
  },
  {
    nombre: 'Cristina Torres',
    edad: 44,
    ubicacion: 'Pirayú',
    historia: 'A mis 44 años pensé que las arrugas y flacidez eran inevitables. Rebeca me demostró lo contrario. Con el Hidrofacial y peeling ultrasónico, mi piel recuperó firmeza, textura y luminosidad. Mis amigas no pueden creer mi transformación. ¡Gracias Rebeca!',
    tratamiento: 'Hidrofacial + Peeling',
    rating: 5
  }
]

export default function RoseDreamPage() {
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null)

  const copyPrompt = (prompt: string, id: string) => {
    navigator.clipboard.writeText(prompt)
    setCopiedPrompt(id)
    setTimeout(() => setCopiedPrompt(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5F8] via-white to-[#FFF0F5]">
      {/* Prueba Social Flotante - ROMANTIC */}
      <div className="fixed bottom-8 left-8 z-50 bg-white rounded-3xl shadow-3xl p-7 max-w-md hidden md:block border-4 border-[#F5C0D0]">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F5C0D0] to-[#E5A0C0] flex items-center justify-center shadow-2xl">
            <Heart className="w-8 h-8 text-white fill-white" />
          </div>
          <div>
            <p className="text-xl font-black text-gray-900">Marta L.</p>
            <p className="text-sm font-bold text-[#D090B0]">Reservó Tratamiento Antiage</p>
          </div>
        </div>
      </div>

      {/* Hero Section - ROMANTIC DREAM */}
      <section className="relative min-h-screen flex items-center px-4 py-24">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-[#F5C0D0] rounded-full blur-3xl opacity-20"></div>
          <div className="absolute top-1/3 right-20 w-80 h-80 bg-[#E5A0C0] rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-[#D090B0] rounded-full blur-3xl opacity-15"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="text-center space-y-12">
            <div className="inline-flex items-center gap-4 px-10 py-5 bg-white/90 backdrop-blur-sm rounded-full shadow-2xl border-4 border-[#F5C0D0]">
              <Flower2 className="w-7 h-7 text-[#D090B0]" />
              <span className="text-gray-900 font-black text-xl">Donde los Sueños se Vuelven Realidad</span>
            </div>
            
            <h1 className="text-9xl md:text-[12rem] font-black leading-none">
              <span className="relative inline-block mb-6">
                <span className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-[5rem] blur-3xl opacity-50"></span>
                <span className="relative block px-20 py-10 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-[5rem] shadow-3xl">
                  <span className="bg-gradient-to-r from-[#FFD5E0] via-[#F5C0D0] to-[#E5A0C0] bg-clip-text text-transparent drop-shadow-2xl">
                    ROSE
                  </span>
                </span>
              </span>
              <br />
              <span className="text-gray-900 drop-shadow-lg">DREAM</span>
            </h1>

            <p className="text-4xl text-gray-800 font-bold max-w-5xl mx-auto leading-relaxed">
              Déjate envolver por la magia de transformarte en la mejor versión de ti misma.
              <br />
              <span className="font-black text-[#D090B0]">Rebeca Barreto</span> hace realidad el sueño 
              de cada mujer paraguaya.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-6">
              <button className="group px-16 py-8 bg-black text-amber-500 rounded-full font-black text-3xl shadow-3xl hover:shadow-4xl transition-all transform hover:scale-110 hover:rotate-1">
                <span className="flex items-center gap-4 justify-center">
                  <Phone className="w-9 h-9" />
                  Vivir Mi Sueño
                </span>
              </button>
            </div>

            {/* Stats Románticos */}
            <div className="grid md:grid-cols-4 gap-8 pt-16">
              <div className="p-10 bg-white/90 backdrop-blur-sm rounded-[2.5rem] shadow-2xl border-4 border-[#FFE0EC] transform hover:scale-110 transition-all">
                <Crown className="w-14 h-14 text-[#D090B0] mx-auto mb-4" />
                <p className="text-6xl font-black text-gray-900 mb-3">500+</p>
                <p className="text-lg font-bold text-gray-700">Sueños Cumplidos</p>
              </div>
              <div className="p-10 bg-white/90 backdrop-blur-sm rounded-[2.5rem] shadow-2xl border-4 border-[#FFE0EC] transform hover:scale-110 transition-all">
                <Gem className="w-14 h-14 text-[#D090B0] mx-auto mb-4" />
                <p className="text-6xl font-black text-gray-900 mb-3">15+</p>
                <p className="text-lg font-bold text-gray-700">Años de Magia</p>
              </div>
              <div className="p-10 bg-white/90 backdrop-blur-sm rounded-[2.5rem] shadow-2xl border-4 border-[#FFE0EC] transform hover:scale-110 transition-all">
                <Heart className="w-14 h-14 text-[#D090B0] mx-auto mb-4" />
                <p className="text-6xl font-black text-gray-900 mb-3">98%</p>
                <p className="text-lg font-bold text-gray-700">Amor Total</p>
              </div>
              <div className="p-10 bg-white/90 backdrop-blur-sm rounded-[2.5rem] shadow-2xl border-4 border-[#FFE0EC] transform hover:scale-110 transition-all">
                <Star className="w-14 h-14 text-[#D090B0] mx-auto mb-4" />
                <p className="text-6xl font-black text-gray-900 mb-3">4.9★</p>
                <p className="text-lg font-bold text-gray-700">Excelencia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tratamientos Faciales - DREAMY GRID */}
      <section className="py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-black text-amber-500 rounded-full mb-8 shadow-2xl">
              <Sparkles className="w-6 h-6" />
              <span className="font-black text-lg uppercase tracking-wider">FACIALES DE ENSUEÑO</span>
            </div>
            
            <h2 className="text-8xl md:text-9xl font-black text-gray-900 mb-10">
              Tratamientos<br />
              <span className="text-[#D090B0]">Mágicos</span>
            </h2>
            <p className="text-3xl text-gray-700 font-bold max-w-4xl mx-auto">
              Cada tratamiento es una experiencia única diseñada para ti
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
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
                className="group bg-white rounded-[3rem] shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:rotate-2 cursor-pointer border-4 border-[#FFE0EC] hover:border-[#F5C0D0] overflow-hidden"
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
                  <h3 className="font-black text-2xl text-gray-900 mb-4 leading-tight">{servicio}</h3>
                  <p className="text-lg font-bold text-gray-600">Tu piel soñada</p>
                </div>
              </div>
              )
            })}
          </div>

          <div className="mt-24 text-center">
            <button
              onClick={() => copyPrompt('Imagen profesional de alta calidad: Tratamiento facial Hidrofacial en spa de lujo. Mujer paraguaya de 30-40 años, piel radiante, expresión relajada. Ambiente sereno con tonos nude y rosa suave. Decoración con elementos paraguayos sutiles (ñandutí, artesanías de madera). Iluminación natural perfecta. Estilo minimalista y elegante. Centro de estética Rebeca Barreto en Asunción, Paraguay. Foto profesional, alta resolución, realista.', 'facial-img')}
              className="inline-flex items-center gap-4 px-14 py-7 bg-black text-amber-500 rounded-full font-black text-2xl shadow-3xl hover:shadow-4xl transition-all transform hover:scale-110"
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

      {/* Rebeca Barreto - ROMANTIC LAYOUT */}
      <section className="py-32 px-4 bg-gradient-to-b from-[#FFF5F8] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#F5C0D0] to-[#E5A0C0] rounded-[4rem] blur-3xl opacity-25"></div>
              <div className="relative w-full h-[850px] rounded-[4rem] overflow-hidden shadow-3xl transform hover:scale-105 hover:rotate-2 transition-all duration-700 border-8 border-white">
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
                  <Crown className="w-6 h-6" />
                  <span className="font-black text-lg">LA HACEDORA DE SUEÑOS</span>
                </div>
                
                <h2 className="text-9xl md:text-[10rem] font-black leading-none mb-8">
                  <span className="text-gray-900">Rebeca</span>
                  <br />
                  <span className="text-[#D090B0]">Barreto</span>
                </h2>
              </div>

              <div className="space-y-8 text-2xl text-gray-700 font-bold leading-relaxed">
                <p>
                  Durante más de <span className="font-black text-gray-900">15 años mágicos</span>, Rebeca 
                  Barreto ha convertido en realidad los sueños de belleza de <span className="font-black text-[#D090B0]">más 
                  de 500 mujeres paraguayas</span>.
                </p>
                <p>
                  Su pasión por crear transformaciones espectaculares, combinada con certificaciones 
                  internacionales de élite, la convierten en la <span className="font-black text-gray-900">referencia 
                  absoluta</span> en estética en Paraguay.
                </p>
                <p>
                  Cada clienta es tratada como una reina. Cada tratamiento es una obra de arte. 
                  Cada resultado es un <span className="font-black text-[#D090B0]">sueño cumplido</span>.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8 pt-8">
                <div className="p-10 bg-white rounded-3xl shadow-2xl border-4 border-[#FFE0EC] transform hover:scale-105 transition-all">
                  <Award className="w-12 h-12 text-[#D090B0] mb-6" />
                  <p className="font-black text-2xl text-gray-900 mb-3">Certificada Elite</p>
                  <p className="text-lg font-bold text-gray-600">Técnicas internacionales</p>
                </div>
                <div className="p-10 bg-white rounded-3xl shadow-2xl border-4 border-[#FFE0EC] transform hover:scale-105 transition-all">
                  <Heart className="w-12 h-12 text-[#D090B0] mb-6" />
                  <p className="font-black text-2xl text-gray-900 mb-3">Trato VIP</p>
                  <p className="text-lg font-bold text-gray-600">Como una reina</p>
                </div>
                <div className="p-10 bg-white rounded-3xl shadow-2xl border-4 border-[#FFE0EC] transform hover:scale-105 transition-all">
                  <ShieldCheck className="w-12 h-12 text-[#D090B0] mb-6" />
                  <p className="font-black text-2xl text-gray-900 mb-3">Resultados Garantizados</p>
                  <p className="text-lg font-bold text-gray-600">98% satisfacción</p>
                </div>
                <div className="p-10 bg-white rounded-3xl shadow-2xl border-4 border-[#FFE0EC] transform hover:scale-105 transition-all">
                  <Gem className="w-12 h-12 text-[#D090B0] mb-6" />
                  <p className="font-black text-2xl text-gray-900 mb-3">Experiencia Premium</p>
                  <p className="text-lg font-bold text-gray-600">Productos de lujo</p>
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
            <h2 className="text-8xl md:text-9xl font-black text-gray-900 mb-10">
              Masajes<br />
              <span className="text-[#D090B0]">de Ensueño</span>
            </h2>
            <p className="text-3xl text-gray-700 font-bold max-w-4xl mx-auto">
              Relájate y renueva tu cuerpo con nuestros masajes exclusivos
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
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
                className="group bg-white rounded-[3rem] shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:-rotate-2 cursor-pointer border-4 border-[#FFE0EC] hover:border-[#F5C0D0] overflow-hidden"
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
                  <h3 className="font-black text-xl text-gray-900 mb-4 leading-tight">{servicio}</h3>
                  <p className="text-lg font-bold text-gray-600">Bienestar total</p>
                </div>
              </div>
              )
            })}
          </div>

          <div className="mt-24 text-center">
            <button
              onClick={() => copyPrompt('Imagen profesional: Masaje corporal maderoterapia en spa de lujo. Mujer paraguaya de 30-40 años, expresión relajada. Ambiente sereno con tonos nude y rosa suave. Elementos de madera, decoración paraguaya sutil (artesanías, ñandutí). Iluminación cálida natural. Estilo profesional, elegante. Centro Rebeca Barreto, Asunción Paraguay. Alta resolución, realista.', 'corp-img')}
              className="inline-flex items-center gap-4 px-14 py-7 bg-black text-amber-500 rounded-full font-black text-2xl shadow-3xl hover:shadow-4xl transition-all transform hover:scale-110"
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

      {/* Testimonios - ROMANTIC CARDS */}
      <section className="py-32 px-4 bg-gradient-to-b from-[#FFF5F8] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-8xl md:text-9xl font-black text-gray-900 mb-10">
              Sueños<br />
              <span className="text-[#D090B0]">Cumplidos</span>
            </h2>
            <p className="text-3xl text-gray-700 font-bold max-w-4xl mx-auto">
              Paraguayas que viven su mejor versión
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
              <div key={index} className="group bg-white rounded-[3rem] overflow-hidden shadow-3xl border-4 border-[#FFE0EC] hover:border-[#F5C0D0] hover:shadow-4xl transition-all duration-500 transform hover:scale-105">
                <div className="relative h-[480px] overflow-hidden">
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
                      <Star key={i} className="w-7 h-7 text-[#F5C0D0] fill-[#F5C0D0]" />
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
              className="inline-flex items-center gap-4 px-14 py-7 bg-black text-amber-500 rounded-full font-black text-2xl shadow-3xl hover:shadow-4xl transition-all transform hover:scale-110"
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
            <h2 className="text-8xl md:text-9xl font-black text-gray-900 mb-10">
              Maquillaje<br />
              <span className="text-[#D090B0]">de Princesa</span>
            </h2>
            <p className="text-3xl text-gray-700 font-bold max-w-4xl mx-auto">
              Luce espectacular en tu día soñado
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
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
                className="group bg-white rounded-[3rem] shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:rotate-2 cursor-pointer border-4 border-[#FFE0EC] hover:border-[#F5C0D0] overflow-hidden"
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
                  <h3 className="font-black text-2xl text-gray-900 mb-4 leading-tight">{servicio}</h3>
                  <p className="text-lg font-bold text-gray-600">Perfección total</p>
                </div>
              </div>
              )
            })}
          </div>

          <div className="mt-24 text-center">
            <button
              onClick={() => copyPrompt('Imagen profesional: Maquillaje profesional siendo aplicado. Mujer paraguaya de 25-35 años, rostro perfecto, piel impecable. Spa elegante minimalista. Productos de belleza de alta gama, espejo con iluminación profesional, brochas y paletas. Ambiente paraguayo sofisticado y moderno. Tonos nude y rosa suave. Centro Rebeca Barreto, Asunción. Alta resolución, estilo profesional, realista.', 'maq-img')}
              className="inline-flex items-center gap-4 px-14 py-7 bg-black text-amber-500 rounded-full font-black text-2xl shadow-3xl hover:shadow-4xl transition-all transform hover:scale-110"
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

      {/* CTA Final - ROMANTIC DREAM */}
      <section className="py-40 px-4 bg-gradient-to-br from-[#F5C0D0] via-[#E5A0C0] to-[#D090B0] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full opacity-5 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-white rounded-full opacity-5 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white rounded-full opacity-5 blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <Flower2 className="w-24 h-24 text-white mx-auto mb-10 opacity-90" />
          <h2 className="text-9xl md:text-[11rem] font-black text-white mb-16 drop-shadow-2xl leading-none">
            HAZ REALIDAD<br />TU SUEÑO
          </h2>
          <p className="text-5xl text-white font-black mb-24 drop-shadow-xl">
            Tu mejor versión te está esperando
          </p>
          <button className="group px-24 py-12 bg-white text-[#D090B0] rounded-full font-black text-4xl shadow-4xl hover:shadow-5xl transition-all transform hover:scale-110 hover:rotate-2">
            <span className="flex items-center gap-5 justify-center">
              <Phone className="w-14 h-14" />
              Reservar Ahora
            </span>
          </button>
          <p className="text-white/90 mt-16 text-3xl font-bold drop-shadow-lg">✨ Cupos VIP limitados · Asunción, Paraguay</p>
        </div>
      </section>
    </div>
  )
}


