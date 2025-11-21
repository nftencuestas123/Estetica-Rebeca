'use client'

import { ArrowRight, Award, Users, TrendingUp, Phone, Star } from 'lucide-react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import OptimizedImage from '@/components/OptimizedImage'
import { SERVICIOS, TRATAMIENTOS_FACIALES, TRATAMIENTOS_CORPORALES, TRATAMIENTOS_MAQUILLAJE } from '@/constants/tratamientos'

/**
 * =====================================================
 * LANDING PAGE: NUDE ELEGANCE
 * OPTIMIZACIÓN EXTREMA - Máxima velocidad de carga
 * =====================================================
 */

const TESTIMONIOS = [
  {
    nombre: 'María González',
    edad: 35,
    ubicacion: 'Asunción',
    historia: 'Después de 3 sesiones de Hidrofacial Profesional, mi piel cambió completamente. Las manchas que tenía hace años desaparecieron.',
    tratamiento: 'Hidrofacial Profesional',
    rating: 5
  },
  {
    nombre: 'Ana Rodríguez',
    edad: 42,
    ubicacion: 'Ciudad del Este',
    historia: 'El tratamiento antiage fue lo mejor que me pudo pasar. Mis amigas no pueden creer que tengo 42 años.',
    tratamiento: 'Tratamiento Antiage',
    rating: 5
  },
  {
    nombre: 'Carmen Pérez',
    edad: 28,
    ubicacion: 'Encarnación',
    historia: 'Luché con el acné por años. Después del peeling ultrasónico, mi piel está perfecta.',
    tratamiento: 'Peeling + Tratamiento Manchas',
    rating: 5
  }
]

// Lazy load heavy components with ssr: false for instant initial render
const LocationSection = dynamic(() => import('@/app/(landing)/nude-elegance/components/LocationSection'), {
  ssr: false,
  loading: () => <div className="h-screen bg-white" />
})

const TestimoniosSection = dynamic(() => Promise.resolve(Testimonios), {
  ssr: false,
  loading: () => <div className="h-96 bg-white" />
})

const RebekaSection = dynamic(() => Promise.resolve(Rebeka), {
  ssr: false,
  loading: () => <div className="h-96 bg-white" />
})

export default function NudeElegancePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - CRÍTICO: Renderiza PRIMERO */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-b from-[#FFF8F5] via-white to-[#FFF8F5]">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#F5D5D5] rounded-full opacity-10"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-[#E8C4C4] rounded-full opacity-10"></div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <HeroText />
          <HeroImage />
        </div>
      </section>

      {/* Tratamientos Faciales - SIN imágenes pesadas inicialmente */}
      <section className="py-20 px-4 bg-white">
        <Suspense fallback={<div className="h-96 bg-slate-100" />}>
          <TreatmentSection
            title="Faciales"
            description="Tecnología de vanguardia que transforma tu piel desde la primera sesión"
            items={SERVICIOS.faciales}
            imagePrefix="/images/landing/treatments/facial"
          />
        </Suspense>
      </section>

      {/* Rebeca Barreto Presentación - Lazy loaded */}
      <Suspense fallback={<div className="h-96 bg-white" />}>
        <RebekaSection />
      </Suspense>

      {/* Tratamientos Corporales - Lazy loaded */}
      <section className="py-20 px-4 bg-white">
        <Suspense fallback={<div className="h-96 bg-slate-100" />}>
          <TreatmentSection
            title="Corporales"
            description="Relájate, renueva y transforma tu cuerpo con nuestros masajes especializados"
            items={SERVICIOS.corporales}
            imagePrefix="/images/landing/treatments/corporal"
            isBodyTreatment
          />
        </Suspense>
      </section>

      {/* Testimonios - Lazy loaded */}
      <Suspense fallback={<div className="h-96 bg-slate-100" />}>
        <TestimoniosSection />
      </Suspense>

      {/* Maquillaje Profesional - Lazy loaded */}
      <section className="py-20 px-4 bg-white">
        <Suspense fallback={<div className="h-96 bg-slate-100" />}>
          <TreatmentSection
            title="Profesional"
            description="Luce radiante en cada ocasión especial de tu vida"
            items={SERVICIOS.maquillaje}
            imagePrefix="/images/landing/treatments/maquillaje"
          />
        </Suspense>
      </section>

      {/* CTA Final */}
      <CTAFinalSection />

      {/* Ubicación - Lazy Load */}
      <Suspense fallback={<div className="h-screen bg-white" />}>
        <LocationSection />
      </Suspense>
    </div>
  )
}

// ============= COMPONENTES =============

function HeroText() {
  return (
    <div className="space-y-8">
      <div className="inline-block">
        <span className="px-6 py-3 bg-black text-amber-500 rounded-full text-sm font-bold shadow-lg">
          ✨ Estética Premium en Paraguay
        </span>
      </div>

      <h1 className="text-6xl md:text-8xl font-black leading-tight">
        <span className="text-gray-900 font-black">Tu Belleza Natural</span>
      </h1>

      <p className="text-2xl text-gray-800 leading-relaxed font-semibold">
        Más de 500 mujeres paraguayas han descubierto su mejor versión con{' '}
        <span className="font-black text-amber-500 relative inline-block">
          <span className="relative z-10">Rebeca Barreto</span>
          <svg className="absolute bottom-0 left-0 w-full h-2 z-0" viewBox="0 0 200 6" fill="none">
            <defs>
              <linearGradient id="brushGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.2" />
                <stop offset="15%" stopColor="#f59e0b" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path d="M5 3.5C50 2.5 100 4 150 3C180 2.5 195 3.2 198 3" stroke="url(#brushGradient)" strokeWidth="2.8" strokeLinecap="round" fill="none" opacity="0.7" />
          </svg>
        </span>
        . ¿Lista para ser la próxima?
      </p>

      <button className="group px-10 py-5 bg-black text-amber-500 rounded-full font-bold text-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
        <span className="flex items-center gap-2 justify-center">
          <Phone className="w-5 h-5" />
          Reservar Mi Cita Ahora
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
      </button>

      {/* Stats */}
      <div className="flex gap-8 pt-8 border-t-2 border-amber-500 bg-black rounded-2xl p-6 -mx-6">
        <StatItem value="500+" label="Clientas Felices" />
        <StatItem value="15+" label="Años Experiencia" />
        <StatItem value="4.9★" label="Valoración" />
      </div>
    </div>
  )
}

function HeroImage() {
  return (
    <div className="relative">
      <div className="relative p-4 bg-gradient-to-br from-amber-400/20 via-amber-500/15 to-amber-600/20 rounded-[2.5rem] shadow-2xl">
        <div className="relative p-3 bg-gradient-to-br from-amber-500/30 via-amber-400/25 to-amber-600/30 rounded-[2rem] shadow-xl">
          <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/15 via-transparent to-amber-600/10 z-10"></div>
            <div className="absolute top-0 left-1/4 right-1/4 h-32 bg-gradient-to-b from-white/20 to-transparent z-20 rounded-b-full blur-sm"></div>

            {/* Priority Image - Hero - OPTIMIZADO CON BLUR */}
            <OptimizedImage
              src="/images/rebeca-barreto.jpg"
              alt="Rebeca Barreto - Estética Premium"
              fill
              className="object-cover"
              priority
              quality={85}
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-amber-400 z-30"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-amber-400 z-30"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-amber-400 z-30"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-amber-400 z-30"></div>
          </div>
        </div>

        {/* Glow effects - SIN animate-pulse para mejor performance */}
        <div className="absolute -top-2 -left-2 w-6 h-6 bg-amber-400 rounded-full opacity-60 blur-sm"></div>
        <div className="absolute -bottom-2 -left-3 w-5 h-5 bg-amber-500 rounded-full opacity-50 blur-sm"></div>
      </div>
    </div>
  )
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="transform hover:scale-110 transition-transform">
      <p className="text-5xl font-black text-amber-500">{value}</p>
      <p className="text-sm font-bold text-white">{label}</p>
    </div>
  )
}

interface TreatmentSectionProps {
  title: string
  description: string
  items: string[]
  imagePrefix: string
  isBodyTreatment?: boolean
}

function TreatmentSection({ title, description, items, imagePrefix, isBodyTreatment }: TreatmentSectionProps) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-6xl md:text-7xl font-black mb-6">
          <span className="text-gray-900">Tratamientos </span>
          <span className="relative inline-block px-6 py-2">
            <span className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl"></span>
            <span className="relative text-amber-500">{title}</span>
          </span>
        </h2>
        <p className="text-2xl text-gray-800 font-semibold max-w-3xl mx-auto">{description}</p>
      </div>

      <div className={`grid gap-6 ${isBodyTreatment ? 'md:grid-cols-3 lg:grid-cols-5' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
        {items.map((servicio, index) => (
          <TreatmentCard key={index} servicio={servicio} imageIndex={index} imagePrefix={imagePrefix} />
        ))}
      </div>
    </div>
  )
}

function TreatmentCard({ servicio, imageIndex, imagePrefix }: { servicio: string; imageIndex: number; imagePrefix: string }) {
  // Obtener datos del tratamiento según el tipo
  let tratamientoData = { imagen: '/images/rebeca-barreto.jpg', descripcion: 'Resultados profesionales' }
  
  if (imagePrefix.includes('facial') && servicio in TRATAMIENTOS_FACIALES) {
    tratamientoData = TRATAMIENTOS_FACIALES[servicio as keyof typeof TRATAMIENTOS_FACIALES]
  } else if (imagePrefix.includes('corporal') && servicio in TRATAMIENTOS_CORPORALES) {
    tratamientoData = TRATAMIENTOS_CORPORALES[servicio as keyof typeof TRATAMIENTOS_CORPORALES]
  } else if (imagePrefix.includes('maquillaje') && servicio in TRATAMIENTOS_MAQUILLAJE) {
    tratamientoData = TRATAMIENTOS_MAQUILLAJE[servicio as keyof typeof TRATAMIENTOS_MAQUILLAJE]
  }

  return (
    <div className="group bg-white rounded-3xl border-2 border-[#E8C4C4] hover:border-[#C4A5A5] shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden">
      <div className="relative h-64 overflow-hidden bg-gray-200">
        <OptimizedImage
          src={tratamientoData.imagen}
          alt={servicio}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          quality={90}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="p-6">
        <h3 className="font-black text-xl text-gray-900 mb-2">{servicio}</h3>
        <p className="text-base font-semibold text-gray-700">{tratamientoData.descripcion}</p>
      </div>
    </div>
  )
}

function Rebeka() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#FFF8F5] to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative w-full h-[700px] rounded-3xl overflow-hidden shadow-2xl">
              <OptimizedImage
                src="/images/rebeca-barreto.jpg"
                alt="Rebeca Barreto"
                fill
                className="object-cover"
                quality={85}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-block px-6 py-3 bg-black text-amber-500 rounded-full text-sm font-bold shadow-lg">
              ⭐ Experta Certificada Internacionalmente
            </div>

            <h2 className="text-6xl md:text-7xl font-black">
              <span className="text-gray-900">Rebeca </span>
              <span className="relative inline-block px-6 py-2">
                <span className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl"></span>
                <span className="relative text-amber-500">Barreto</span>
              </span>
            </h2>

            <p className="text-xl text-gray-800 leading-relaxed font-semibold">
              Con más de 15 años transformando vidas, Rebeca Barreto es la referencia #1 en estética y belleza en Paraguay.
            </p>

            <div className="flex flex-col gap-4 pt-4">
              <InfoCard icon={<Award className="w-6 h-6 text-[#C4A5A5]" />} text="Certificación Internacional" />
              <InfoCard icon={<Users className="w-6 h-6 text-[#C4A5A5]" />} text="+500 Paraguayas Transformadas" />
              <InfoCard icon={<TrendingUp className="w-6 h-6 text-[#C4A5A5]" />} text="15+ Años de Excelencia" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function InfoCard({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-lg border-2 border-[#F5D5D5]">
      {icon}
      <span className="text-gray-900 font-bold text-lg">{text}</span>
    </div>
  )
}

function Testimonios() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#FFF8F5] to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-black mb-6">
            <span className="text-gray-900">Historias </span>
            <span className="relative inline-block px-6 py-2">
              <span className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl"></span>
              <span className="relative text-amber-500">Reales</span>
            </span>
          </h2>
          <p className="text-2xl text-gray-800 font-semibold max-w-3xl mx-auto">
            Mujeres paraguayas que transformaron su vida
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIOS.map((testimonio, index) => (
            <TestimonioCard key={index} testimonio={testimonio} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface Testimonio {
  nombre: string
  edad: number
  ubicacion: string
  historia: string
  tratamiento: string
  rating: number
}

function TestimonioCard({ testimonio, index }: { testimonio: Testimonio; index: number }) {
  // Mapeo ULTRA COMPRIMIDO de imágenes de testimonios
  const testimonioImages = [
    '/images/landing/testimonials/testimonio-mujer-01.jpg',
    '/images/landing/testimonials/testimonio-mujer-02.jpg',
    '/images/landing/testimonials/testimonio-mujer-03.jpg',
  ]

  const imageSrc = testimonioImages[index] || '/images/rebeca-barreto.jpg'

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-[#E8C4C4]">
      <div className="relative h-[400px] overflow-hidden bg-gray-200">
        <OptimizedImage
          src={imageSrc}
          alt={`${testimonio.nombre} - Cliente`}
          fill
          className="object-cover"
          quality={75}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <p className="font-black text-2xl mb-1">{testimonio.nombre}</p>
          <p className="text-white/90 font-semibold text-lg">{testimonio.edad} años · {testimonio.ubicacion}</p>
        </div>
      </div>
      <div className="p-8">
        <div className="mb-4">
          <span className="px-4 py-2 bg-black text-amber-500 rounded-full text-sm font-bold">
            {testimonio.tratamiento}
          </span>
        </div>
        <p className="text-gray-800 font-semibold text-base leading-relaxed mb-6">
          "{testimonio.historia}"
        </p>
        <div className="flex items-center gap-2">
          {Array.from({ length: testimonio.rating }).map((_, i) => (
            <Star key={i} className="w-5 h-5 text-[#E8C4C4] fill-[#E8C4C4]" />
          ))}
        </div>
      </div>
    </div>
  )
}

function CTAFinalSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      <div className="absolute top-5 right-5 w-64 h-64 bg-[#E8C4C4] rounded-full opacity-15 blur-3xl"></div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-amber-500 mb-4">
          ¿Lista para Tu Transformación?
        </h2>
        <p className="text-xl md:text-2xl text-white font-bold mb-6">
          Únete a las 500+ paraguayas que ya descubrieron su mejor versión
        </p>
        <button className="group px-12 py-4 bg-black text-amber-500 rounded-full font-black text-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 mb-4">
          <span className="flex items-center gap-3 justify-center">
            <Phone className="w-6 h-6" />
            Reservar Mi Cita Ahora
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </span>
        </button>
        <p className="text-white text-base font-semibold">✨ Cupos limitados · Reserva hoy</p>
      </div>
    </section>
  )
}
