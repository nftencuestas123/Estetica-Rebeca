import Navbar from '@/components/Navbar'
import ChatSofia from '@/components/ChatSofia'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export default function TratamientosPage() {
  const tratamientos = [
    {
      nombre: 'Botox',
      slug: 'botox',
      descripcion: 'Suaviza arrugas y líneas de expresión',
      precio: 200,
      categoria: 'Anti-Aging',
      duracion: '30 min',
    },
    {
      nombre: 'Rellenos de Ácido Hialurónico',
      slug: 'rellenos-acido-hialuronico',
      descripcion: 'Aumento de volumen y definición',
      precio: 350,
      categoria: 'Anti-Aging',
      duracion: '45 min',
    },
    {
      nombre: 'HIFU Facial',
      slug: 'hifu-facial',
      descripcion: 'Lifting sin cirugía',
      precio: 450,
      categoria: 'Anti-Aging',
      duracion: '60 min',
    },
    {
      nombre: 'Limpieza Facial Profunda',
      slug: 'limpieza-facial-profunda',
      descripcion: 'Renovación y cuidado de la piel',
      precio: 80,
      categoria: 'Facial',
      duracion: '60 min',
    },
    {
      nombre: 'Mesoterapia',
      slug: 'mesoterapia',
      descripcion: 'Hidratación y nutrición profunda',
      precio: 120,
      categoria: 'Facial',
      duracion: '45 min',
    },
  ]

  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">
            Nuestros Tratamientos
          </h1>
          <p className="text-xl text-primary-600 max-w-2xl mx-auto">
            Descubrí nuestros tratamientos personalizados diseñados para realzar tu belleza natural
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tratamientos.map((tratamiento) => (
            <Link
              key={tratamiento.slug}
              href={`/tratamientos/${tratamiento.slug}`}
              className="group bg-cream-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
            >
              <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Sparkles className="w-16 h-16 text-primary opacity-50 group-hover:scale-110 transition-transform" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                    {tratamiento.categoria}
                  </span>
                  <span className="text-xs text-primary-500">{tratamiento.duracion}</span>
                </div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2 group-hover:text-primary transition-colors">
                  {tratamiento.nombre}
                </h3>
                <p className="text-primary-600 mb-4 text-sm">
                  {tratamiento.descripcion}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    ${tratamiento.precio} USD
                  </span>
                  <span className="text-sm text-primary group-hover:underline">
                    Ver más →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <ChatSofia />
    </div>
  )
}




